import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Bot, Loader2 } from 'lucide-react';

const AnimatedMockup = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev >= 4 ? 0 : prev + 1));
        }, 2500); // 2.5s per step
        return () => clearInterval(interval);
    }, []);

    const plainText = "SnapWrite 是一款极其强大的工具。它能够理解常规的文本语境，会自动提取出重点段落。不需要写任何复杂的排版指令，直接输入你的草稿，就能直接得到杂志风格的高级排版。";

    return (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left: Input Text */}
            <div style={{ flex: 1, borderRight: '1px solid var(--glass-border)', padding: '32px', color: 'var(--text-secondary)', fontSize: '16px', textAlign: 'left', lineHeight: 2, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>普通文本输入区</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {step === 0 ? "SnapWrite 是一款极其" : plainText}
                    {step === 0 && <span style={{ borderRight: '2px solid var(--primary)', animation: 'pulse 1s infinite' }}>&nbsp;</span>}
                </motion.div>
            </div>

            {/* Right: AI Output */}
            <div style={{ flex: 1, padding: '32px', background: 'var(--bg-app)', textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                    <Bot size={20} color="var(--primary)" />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>AI 智能排版生成区</span>
                    {step > 0 && step < 4 && (
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--primary)' }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
                                <Loader2 size={14} />
                            </motion.div>
                            生成中...
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    borderLeft: '4px solid var(--primary)',
                                    background: 'linear-gradient(90deg, var(--glow-primary) 0%, transparent 100%)',
                                    padding: '12px 16px',
                                    borderRadius: '0 8px 8px 0'
                                }}
                            >
                                <h2 style={{ fontSize: '22px', color: 'var(--text-main)', fontWeight: 800 }}>强大的 SnapWrite 工具</h2>
                            </motion.div>
                        )}

                        {step >= 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    color: 'var(--text-main)',
                                    lineHeight: 1.8,
                                    fontSize: '15px',
                                    background: 'var(--bg-panel)',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border)',
                                    boxShadow: 'var(--shadow-md)',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-12px', left: '20px', background: 'var(--primary)', color: 'white', fontSize: '12px', padding: '4px 10px', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 8px var(--glow-primary)' }}>✨ AI 分析摘要</div>
                                它能够<span style={{ color: 'var(--primary)', fontWeight: 600, background: 'var(--glow-primary)', padding: '0 4px', borderRadius: '4px' }}>理解常规文本语境</span>，并自动提取重点段落。无需复杂指令，输入草稿即可得到<span style={{ borderBottom: '2px solid var(--secondary)', color: 'var(--secondary)', fontWeight: 600, fontStyle: 'italic', margin: '0 4px' }}>杂志风格</span>的高级排版。
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default function HeroSection({ onStart }) {
    return (
        <section style={{
            position: 'relative',
            padding: 'var(--spacing-xl) 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            zIndex: 1
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    marginBottom: 'var(--spacing-lg)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                }}
            >
                <Sparkles size={16} />
                <span>全新 AI 排版引擎 Beta 版上线</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    maxWidth: '850px',
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, var(--text-main) 0%, var(--text-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                重塑你的 <br /><span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>微信公众号</span> 排版体验
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                style={{
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--spacing-lg)',
                    fontSize: '1.2rem',
                    maxWidth: '600px',
                    lineHeight: 1.6
                }}
            >
                告别繁琐的复制粘贴与样式调校。SnapWrite 利用 AI 技术，
                一键将纯文本转换为适配移动端阅读的精美排版，让你的文章脱颖而出。
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                style={{
                    marginTop: 'calc(var(--spacing-xl) * 1.5)',
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <button
                    onClick={onStart}
                    className="hero-btn-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '16px 36px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 8px 24px var(--glow-primary)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px var(--glow-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px var(--glow-primary)';
                    }}
                >
                    免费开始使用
                    <ArrowRight size={20} />
                </button>
            </motion.div>

            {/* Floating Editor Mockup Widget */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{
                    marginTop: '80px',
                    width: '100%',
                    maxWidth: '960px',
                    height: '420px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-2xl)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Mockup Header */}
                <div style={{ height: '56px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '8px', background: 'var(--glass-bg)' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                    <div style={{ marginLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, fontFamily: 'monospace' }}>snapwrite-editor - /draft.txt</div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'var(--border)' }} />
                        <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'var(--bg-app)' }} />
                    </div>
                </div>
                {/* Mockup Body: Replaced with animated AI Demo */}
                <AnimatedMockup />
            </motion.div>
        </section>
    );
}
