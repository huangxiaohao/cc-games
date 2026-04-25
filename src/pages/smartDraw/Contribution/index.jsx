import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgContribution from "../../../assets/smartDraw/01-03-02.png";

export default function Contribution() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgContribution} alt="投稿" className={styles.img} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw/ai-voice')} />
    </div>
  );
}