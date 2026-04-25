import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgHome from '../../assets/bg-home.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgHome} alt="cc-games" className={styles.img} />

      {/* 点击热区 - 智绘新章入口 */}
      <div
        className={styles.hotArea1}
        onClick={() => navigate('/smartDraw')}
      />
    </div>
  );
}