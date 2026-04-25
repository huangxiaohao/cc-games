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

      {/* 点击热区1 */}
      <div className={styles.hotArea1} onClick={() => alert("点击热区1")} />

      {/* 点击热区2 */}
      <div className={styles.hotArea2} onClick={() => alert("点击热区2")} />

      {/* 点击热区3 */}
      <div className={styles.hotArea3} onClick={() => alert("点击热区3")} />
    </div>
  );
}
