import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgHome from '../../assets/bg-home.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgHome} alt="cc-games" className={styles.img} />
      <p className={styles.info}>XXXXXXXXXXXXXXXXXXX</p>

      {/* 点击热区 - 智绘新章入口 */}
      <div className={styles.hotArea1} onClick={() => navigate("/smartDraw")} />

      {/* 点击热区2 */}
      <div className={styles.hotArea2} onClick={() => alert("点击热区2")} />

      {/* 点击热区3 */}
      <div className={styles.hotArea3} onClick={() => alert("点击热区3")} />

      {/* 点击热区4 */}
      <div className={styles.hotArea4} onClick={() => alert("点击热区4")} />

      {/* 点击热区5 */}
      <div className={styles.hotArea5} onClick={() => alert("点击热区5")} />
    </div>
  );
}