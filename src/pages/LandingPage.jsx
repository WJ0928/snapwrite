import { useNavigate } from 'react-router-dom';
import { Github, Wand2, Smartphone, History, Zap, Layers, Share, Settings, ShieldCheck, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/layout/HeroSection';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/app');
    };

    const features = [
        {
            icon: <Wand2 size={24} />,
            title: 'AI 智能排版',
            desc: '智能识别内容结构，秒级生成公众号精美格式，释放你的创造力。'
        },
        {
            icon: <Smartphone size={24} />,
            title: '移动端所见即所得',
            desc: '内置高保真 iPhone 预览模型，确保在手机端拥有完美的阅读体验。'
        },
        {
            icon: <History size={24} />,
            title: '时光机版本控制',
            desc: '自动保存历次排版记录，随时轻松回溯和比对历史版本，安全无忧。'
        },
        {
            icon: <Zap size={24} />,
            title: '流式生成反馈',
            desc: '支持类似 ChatGPT 的打字机动效，让你实时看见 AI 工作过程。'
        },
        {
            icon: <Layers size={24} />,
            title: '专业且灵活的双模',
            desc: '提供沉浸式极简预览模式与强大的三栏编辑模式，满足各阶段需求。'
        },
        {
            icon: <Share size={24} />,
            title: '一键无缝拷贝',
            desc: '生成后支持一键复制，直接粘贴至微信公众号后台，完美保留样式。'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-gradient)',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            {/* Dynamic Background Elements */}
            <div style={{
                position: 'fixed',
                top: '-15%',
                left: '-10%',
                width: '60vw',
                height: '60vw',
                borderRadius: '50%',
                background: 'var(--glow-primary)',
                filter: 'blur(120px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-15%',
                right: '-5%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'var(--glow-secondary)',
                filter: 'blur(120px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Header / Nav */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 40px',
                zIndex: 50,
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--glass-border)',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px var(--glow-primary)' }}>
                        <Wand2 size={20} />
                    </div>
                    <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>SnapWrite</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <a
                        href="https://github.com/wtechtec/SnapWrite"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s',
                            fontWeight: 500
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Github size={20} />
                        <span style={{ display: 'none' }} className="sm-show">GitHub</span>
                    </a>
                    <button
                        onClick={handleStart}
                        style={{
                            padding: '10px 24px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--text-main)',
                            color: 'var(--bg-app)',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'transform 0.2s, opacity 0.2s',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.opacity = '0.9'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
                    >
                        进入应用
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '120px', paddingBottom: '120px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
                <HeroSection onStart={handleStart} />

                {/* Features Section */}
                <section style={{ marginTop: '160px', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>一切你所需要的功能</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            专门为现代内容创作者打造的轻量级工作流，从激发灵感到排版发布，只需一键。
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '32px'
                        }}
                    >
                        {features.map((feat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                style={{
                                    padding: '40px 32px',
                                    background: 'var(--glass-bg)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '32px',
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    cursor: 'default'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    boxShadow: '0 8px 16px var(--glow-primary)'
                                }}>
                                    {feat.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', letterSpacing: '-0.01em' }}>{feat.title}</h3>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Dark Mode Pro Section */}
                <section style={{ marginTop: '160px', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: '#020617', // Deep dark
                            borderRadius: '40px',
                            padding: '80px 40px',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            border: '1px solid #1e293b'
                        }}
                    >
                        {/* Glow Effects inside dark container */}
                        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '80%', height: '150%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-50%', right: '-20%', width: '80%', height: '150%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <span style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>Pro 进阶功能</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            切换深色，解锁完整能力
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', lineHeight: 1.6, marginBottom: '60px' }}>
                            在 SnapWrite 中，深色模式不仅是主题的切换，更是为高级创作者准备的专属工作流，提供极高的定制化自由度。
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', width: '100%', maxWidth: '1000px', textAlign: 'left', zIndex: 1 }}>
                            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#818cf8' }}>
                                    <Settings size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px', color: '#f8fafc' }}>自定义 AI 大模型</h3>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>自由配置你自己的 OpenAI 或其他兼容模型的 API 接口和 Key，突破限制，打造完全私人的定制化排版引擎。</p>
                            </div>
                            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(236,72,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#f472b6' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px', color: '#f8fafc' }}>发布前智能检测</h3>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>一键借助 AI 对文章进行多维度的预检查，智能排查错别字与敏感内容，确保每一篇发布文章的质量与合规。</p>
                            </div>
                            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#34d399' }}>
                                    <Layout size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px', color: '#f8fafc' }}>高级排版风格解禁</h3>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>告别千篇一律。深色模式下将解锁更多高级预设，并支持输入“自定义 Prompt”风格指令，让你的排版由你定义。</p>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '48px 20px',
                borderTop: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'var(--text-secondary)',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Wand2 size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>SnapWrite</span>
                </div>
                <p style={{ fontSize: '0.9rem' }}>© 2026 SnapWrite. Crafted with AI.</p>
            </footer>
        </div>
    );
}
