import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgSmartDraw from "../../assets/smartDraw/01.png";

export default function SmartDraw() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgSmartDraw} alt="智绘新章" className={styles.img} />

      {/* 返回首页 */}
      <div className={styles.backArea} onClick={() => navigate('/home')} />

      {/* 让服务升温 */}
      <div className={styles.hotArea1} onClick={() => navigate('/smartDraw/warm-service')} />

      {/* 让活力沸腾 */}
      <div className={styles.hotArea2} onClick={() => navigate('/smartDraw/boiling-vitality')} />

      {/* 让AI传声 */}
      <div className={styles.hotArea3} onClick={() => navigate('/smartDraw/ai-voice')} />
    </div>
  );
}
