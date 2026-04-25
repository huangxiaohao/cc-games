import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgSmartDraw from "../../assets/smartDraw/01.png";

export default function SmartDraw() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgSmartDraw} alt="智绘新章" className={styles.img} />

      {/* 返回首页 */}
      <div className={styles.backArea} onClick={() => navigate('/')} />
    </div>
  );
}
