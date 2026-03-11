import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import { useDraft } from '../../context/DraftContext';
import { checkArticleStream } from '../../api/apiService';
import parse from 'html-react-parser';

export default function CheckModal({ isOpen, onClose }) {
    const { currentVersion, originalText, customConfig, isDarkMode } = useDraft();
    const [checkResult, setCheckResult] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const textToCheck = currentVersion?.content || originalText;
            if (textToCheck && textToCheck.trim().length > 0) {
                startCheck(textToCheck);
            } else {
                setCheckResult('当前没有内容可以检测。请先在左侧输入内容或生成草稿。');
                setIsChecking(false);
            }
        }
    }, [isOpen, currentVersion, originalText]);

    const startCheck = async (text) => {
        setCheckResult('');
        setIsChecking(true);
        let accumulatedResult = '';
        try {
            for await (const chunk of checkArticleStream(text, customConfig)) {
                accumulatedResult += chunk;
                // Parse markdown-like newlines to HTML for display, or just use css white-space
                setCheckResult(accumulatedResult);
            }
        } catch (error) {
            console.error('Check failed:', error);
            setCheckResult(prev => prev + '\\n\\n检查过程中出现错误。');
        } finally {
            setIsChecking(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--bg-panel)',
                padding: '30px',
                borderRadius: '16px',
                width: '600px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '4px',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    {isChecking ? <Loader2 size={24} color="var(--primary)" className="animate-spin" /> : <ShieldCheck size={24} color="var(--primary)" />}
                    发布前合规检测
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    系统正在根据平台内容规范对当前草稿进行深度审查...
                </p>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    background: 'var(--bg-app)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                }}>
                    {checkResult || '等待检测中...'}
                </div>
            </div>
            <style>{`
            .animate-spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            `}</style>
        </div>
    );
}
