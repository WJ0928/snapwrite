import { useDraft } from '../../context/DraftContext';

export default function VersionTabs() {
    const { previewTab, versions, activeVersionId, setActiveVersionId, coverVersions, activeCoverVersionId, setActiveCoverVersionId } = useDraft();

    const isCover = previewTab === 'cover';
    const currentVersions = isCover ? coverVersions : versions;
    const currentActiveId = isCover ? activeCoverVersionId : activeVersionId;
    const setCurrentActiveId = isCover ? setActiveCoverVersionId : setActiveVersionId;

    if (currentVersions.length === 0) return null;

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            padding: '0 var(--spacing-md)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-panel)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            width: '100%', // Ensure full width
            flexShrink: 0,
        }}>
            {currentVersions.map((version) => (
                <button
                    key={version.id}
                    onClick={() => setCurrentActiveId(version.id)}
                    style={{
                        background: currentActiveId === version.id ? 'var(--bg-app)' : 'transparent',
                        color: currentActiveId === version.id ? 'var(--primary)' : 'var(--text-secondary)',
                        border: 'none',
                        borderBottom: currentActiveId === version.id ? '2px solid var(--primary)' : '2px solid transparent',
                        borderRadius: 0,
                        padding: '12px 16px',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}
                >
                    {version.name}
                </button>
            ))}
        </div>
    );
}
