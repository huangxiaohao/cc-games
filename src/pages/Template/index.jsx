import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './index.module.css';
import BackButton from '../../components/BackButton';
import MediaViewer from '../../components/MediaViewer';
import { useMediaViewer } from '../../hooks/useMediaViewer';

// 开发阶段用在线占位图，正式环境替换为：import bgImg from '../../assets/bg-template.jpg'
const bgImg = 'https://picsum.photos/750/1200?random=99';

export default function Template() {
  const navigate = useNavigate();
  const { viewer, open, close } = useMediaViewer();

  // Tab 状态（如果此页有 Tab）
  const [activeTab, setActiveTab] = useState('a');

  return (
    <div className={styles.page}>
      {/* 背景图：宽撑满，高自适应 */}
      <img src={bgImg} className={styles.bg} alt="" />

      {/* 返回热区（top/left 按设计稿 px ÷ 20） */}
      <BackButton top={4} left={2} width={8} height={8} />

      {/* ---- Tab 热区（如有）---- */}
      <div className={styles.tabA} onClick={() => setActiveTab('a')} />
      <div className={styles.tabB} onClick={() => setActiveTab('b')} />

      {/* ---- Tab 内容（切换显示/隐藏）---- */}
      {activeTab === 'a' && (
        <div className={styles.panelA}>
          {/* Panel A 内容 */}
        </div>
      )}
      {activeTab === 'b' && (
        <div className={styles.panelB}>
          {/* Panel B 内容 */}
        </div>
      )}

      {/* ---- 按钮热区 ---- */}
      <div className={styles.btnNext} onClick={() => navigate('/next-page')} />

      {/* ---- 动态数据 ---- */}
      <span className={styles.scoreText}>1280</span>

      {/* ---- 媒体预览触发 ---- */}
      <div
        className={styles.mediaTrigger}
        onClick={() => open('image', 'https://picsum.photos/750/400?random=1')}
      />

      {/* ---- 媒体预览 ---- */}
      <MediaViewer {...viewer} onClose={close} />
    </div>
  );
}
