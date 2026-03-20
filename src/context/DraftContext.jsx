import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { optimizeContentStream } from '../api/apiService';

const DraftContext = createContext();

export function DraftProvider({ children }) {
    const [activeVersionId, setActiveVersionId] = useState(null);
    const [versions, setVersions] = useState([]); // { id, content, timestamp, name }
    const [isGenerating, setIsGenerating] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [layoutMode, setLayoutMode] = useState('default'); // 'default' | 'editing'
    const [tempVersion, setTempVersion] = useState(null); // Temporary state for streaming

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Init from local storage or sys pref
        return localStorage.getItem('snapwrite_theme') === 'dark';
    });

    const [conversionStyle, setConversionStyle] = useState(() => {
        return localStorage.getItem('snapwrite_conversion_style') || 'magazine';
    });

    const [customStylePrompt, setCustomStylePrompt] = useState(() => {
        return localStorage.getItem('snapwrite_custom_style_prompt') || '';
    });

    useEffect(() => {
        localStorage.setItem('snapwrite_conversion_style', conversionStyle);
    }, [conversionStyle]);

    useEffect(() => {
        localStorage.setItem('snapwrite_custom_style_prompt', customStylePrompt);
    }, [customStylePrompt]);

    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    // Toggle Theme
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('snapwrite_theme', newValue ? 'dark' : 'light');
            if (newValue) {
                document.body.classList.add('dark');
                setIsConfigModalOpen(true); // Open modal when switching to dark/custom mode
            } else {
                document.body.classList.remove('dark');
                setIsConfigModalOpen(false); // Close if switching back
            }
            return newValue;
        });
    }, []);

    // Sync body class on mount
    useState(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []);

    const [customConfig, setCustomConfig] = useState(() => {
        const savedConfig = localStorage.getItem('snapwrite_custom_config');
        if (savedConfig) {
            try {
                return JSON.parse(savedConfig);
            } catch (e) {
                console.error('Failed to parse saved config', e);
            }
        }
        return {
            apiUrl: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-3.5-turbo',
            apiKey: ''
        };
    });

    const generateDraft = useCallback(async () => {
        if (!originalText.trim()) return;

        setIsGenerating(true);

        // Prepare temp version
        const newId = Date.now().toString();
        const startingVersion = {
            id: newId,
            content: '',
            timestamp: new Date(),
            name: `Version ${versions.length + 1}`
        };

        // 生成的一瞬间立刻在状态中产生一个版本记录（空内容），作为缓存占位
        setVersions(prev => [...prev, startingVersion]);
        setActiveVersionId(newId);
        setTempVersion(startingVersion);

        try {
            let accumulatedContent = '';

            // Determining Config: Dark Mode = Custom
            let requestConfig = null;
            if (isDarkMode) {
                // Use in-memory config directly
                requestConfig = customConfig;
            }

            for await (const chunk of optimizeContentStream(originalText, requestConfig, conversionStyle, customStylePrompt)) {
                accumulatedContent += chunk;

                // Update temp version for real-time preview
                setTempVersion(prev => ({ ...prev, content: accumulatedContent }));
            }

            // Only commit complete content if not empty
            if (accumulatedContent.trim()) {
                const finalVersion = { ...startingVersion, content: accumulatedContent };
                // 更新刚才生成的那个版本的实际内容
                setVersions(prev => prev.map(v => v.id === newId ? finalVersion : v));
                setActiveVersionId(newId);

                // Increment usage count and check for donation (daily reset & cumulative trigger 5,15,30,50...)
                try {
                    const today = new Date().toDateString();
                    let stats = { date: today, count: 0 };
                    const savedStats = localStorage.getItem('snapwrite_usage_stats');
                    if (savedStats) {
                        const parsed = JSON.parse(savedStats);
                        if (parsed.date === today) {
                            stats.count = parsed.count;
                        }
                    }

                    stats.count += 1;
                    localStorage.setItem('snapwrite_usage_stats', JSON.stringify(stats));
                    // Cleanup old key if any
                    localStorage.removeItem('snapwrite_usage_count');

                    // Formula: Trigger at T_n = 5 * n * (n + 1) / 2  =>  2 * T_n / 5 = n * (n + 1)
                    if (stats.count > 0 && (stats.count * 2) % 5 === 0) {
                        const x = (stats.count * 2) / 5;
                        const n = Math.floor(Math.sqrt(x));
                        if (n * (n + 1) === x) {
                            setIsDonationModalOpen(true);
                        }
                    }
                } catch (e) {
                    console.error('Failed to update usage stats', e);
                }
            }

        } catch (error) {
            console.error("Generation failed", error);
            // On error, we basically discard the temp version (it won't be added to versions)
        } finally {
            setTempVersion(null);
            setIsGenerating(false);
        }
    }, [originalText, versions.length, isDarkMode, customConfig]);

    const updateVersion = useCallback((id, newContent) => {
        setVersions(prev => prev.map(v =>
            v.id === id ? { ...v, content: newContent, name: `${v.name} (Edited)` } : v
        ));
    }, []);

    // If generating, show the temp version. Otherwise show the active selected version.
    const currentVersion = tempVersion || versions.find(v => v.id === activeVersionId);

    const value = {
        versions,
        activeVersionId,
        setActiveVersionId,
        currentVersion,
        isGenerating,
        originalText,
        setOriginalText,
        generateDraft,
        updateVersion,
        layoutMode,
        setLayoutMode,
        isDarkMode,
        toggleTheme,
        customConfig,
        setCustomConfig,
        isConfigModalOpen,
        setIsConfigModalOpen,
        isDonationModalOpen,
        setIsDonationModalOpen,
        conversionStyle,
        setConversionStyle,
        customStylePrompt,
        setCustomStylePrompt
    };

    return (
        <DraftContext.Provider value={value}>
            {children}
        </DraftContext.Provider>
    );
}

export function useDraft() {
    const context = useContext(DraftContext);
    if (!context) {
        throw new Error('useDraft must be used within a DraftProvider');
    }
    return context;
}
