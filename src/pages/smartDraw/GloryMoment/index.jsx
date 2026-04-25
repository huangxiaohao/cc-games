import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgGloryMoment from "../../../assets/smartDraw/01-03-01.png";

export default function GloryMoment() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgGloryMoment} alt="荣耀时刻" className={styles.img} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw/ai-voice')} />
    </div>
  );
}