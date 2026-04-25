import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgAIVoice from "../../../assets/smartDraw/01-03.png";

export default function AIVoice() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgAIVoice} alt="让AI传声" className={styles.img} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw')} />
    </div>
  );
}
