import { useRef } from 'react';
import parse from 'html-react-parser';
import { toast } from 'sonner';
import { Copy, Edit2, FileText, Smartphone, Image as ImageIcon, Download } from 'lucide-react';
import { useDraft } from '../../context/DraftContext';
import VersionTabs from '../preview/VersionTabs';
import PhoneModel from '../preview/PhoneModel';
import html2canvas from 'html2canvas';

export default function PreviewPanel() {
  const { currentVersion, isGenerating, setLayoutMode, previewTab, setPreviewTab, currentCoverVersion, isGeneratingCover } = useDraft();
  const coverRef = useRef(null);

  const handleDownloadCover = () => {
    if (!coverRef.current) return;

    html2canvas(coverRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'snapwrite-cover.png';
      link.href = imgData;
      link.click();
    }).catch(err => {
      console.error("生成图片失败", err);
      toast.error("生成图片失败，请检查调试信息。");
    });
  };

  // Copy rich text (HTML) function
  const handleCopy = () => {
    const preview = document.getElementById('preview-content');
    if (!preview) return;

    try {
      const range = document.createRange();
      range.selectNodeContents(preview);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Rich Text copied! Ready to paste into WeChat/Word.');
      } else {
        toast.error('Copy failed. Please try again.');
      }

      selection.removeAllRanges(); // Deselect
    } catch (err) {
      console.error('Copy error:', err);
      toast.error('Failed to copy content.');
    }
  };

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-app)',
      overflow: 'hidden' // Prevent child overflow affecting layout
    }}>
      <div style={{ display: 'flex', gap: '30px', padding: '10px 20px', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={() => setPreviewTab('layout')}
          style={{ background: 'transparent', border: 'none', fontSize: '0.95rem', cursor: 'pointer', color: previewTab === 'layout' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: previewTab === 'layout' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={18} /> 排版模式
        </button>
        <button
          onClick={() => setPreviewTab('cover')}
          style={{ background: 'transparent', border: 'none', fontSize: '0.95rem', cursor: 'pointer', color: previewTab === 'cover' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: previewTab === 'cover' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ImageIcon size={18} /> 封面生成
        </button>
      </div>

      <VersionTabs />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'relative'
      }}>
        {previewTab === 'layout' ? (
          currentVersion ? (
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: '-50px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <button
                  onClick={() => setLayoutMode('editing')}
                  disabled={isGenerating}
                  title="Edit Content"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isGenerating ? 0.5 : 1,
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={handleCopy}
                  disabled={isGenerating}
                  title="Copy HTML"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    padding: 0,
                    background: 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isGenerating ? 0.5 : 1,
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Copy size={18} />
                </button>
              </div>

              <PhoneModel>
                <div
                  id="preview-content"
                  style={{ padding: '20px', lineHeight: '1.6' }}
                >
                  {/* Use html-react-parser to stable re-render images */}
                  {parse(currentVersion.content || '')}
                </div>
              </PhoneModel>

              {isGenerating && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '12px 20px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  pointerEvents: 'none'
                }}>
                  <Smartphone size={20} className="animate-pulse" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary)' }}>
                    {!currentVersion.content ? 'Initializing...' : 'Generating...'}
                  </span>
                </div>
              )}
            </div>
          ) : !isGenerating ? (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              <p>No version generated yet.</p>
              <p style={{ fontSize: '0.8em', marginTop: '8px' }}>Enter text on the right to start.</p>
            </div>
          ) : null
        ) : (
          currentCoverVersion ? (
            <div style={{ width: '100%', height: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              <div style={{ paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  提示：如果内容超出或样式错乱，您可以重新生成几次获取更佳排版。
                </span>
                <button
                  onClick={handleDownloadCover}
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem'
                  }}
                >
                  <Download size={16} /> 导出图片
                </button>
              </div>
              <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-panel)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div
                  ref={coverRef}
                  style={{ width: '900px', height: '383px', background: '#fff', overflow: 'hidden', position: 'relative', flexShrink: 0 }}
                  dangerouslySetInnerHTML={{ __html: currentCoverVersion.content.replace(/^```[a-z]*\n?/i, '').replace(/```\n?$/i, '').trim() }}
                />
                {isGeneratingCover && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', gap: '10px', backdropFilter: 'blur(2px)', zIndex: 10 }}>
                    <ImageIcon size={24} className="animate-pulse" /> 正在智能生成封面...
                  </div>
                )}
              </div>
            </div>
          ) : !isGeneratingCover ? (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              <p>暂无封面版本。</p>
              <p style={{ fontSize: '0.8em', marginTop: '8px' }}>点击上方魔法棒按钮由 AI 根据文章内容自动绘制。</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
