import { X, Heart } from 'lucide-react';

export default function DonationModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'var(--bg-panel)',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '420px',
                padding: '32px',
                position: 'relative',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '56px', height: '56px',
                        borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)',
                        color: 'var(--secondary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 4px 12px var(--glow-secondary)'
                    }}>
                        <Heart size={28} fill="currentColor" />
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)' }}>感谢使用 SnapWrite！</h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                        看来你已经用它排版了很多次啦！如果这个小工具为你节省了时间、提高了效率，不妨请开发者喝杯咖啡 ☕️，支持项目的持续更新。
                    </p>

                    <div style={{
                        background: 'var(--bg-app)',
                        padding: '24px',
                        borderRadius: '16px',
                        marginBottom: '20px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img
                            src="/wx.png"
                            alt="微信赞赏码"
                            style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px' }}
                        />
                        <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>使用微信扫一扫</p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'var(--border)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                        下次一定
                    </button>
                </div>
            </div>
        </div>
    );
}
