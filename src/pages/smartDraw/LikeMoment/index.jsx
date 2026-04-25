import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgLikeMoment from "../../../assets/smartDraw/01-03-03.png";

export default function LikeMoment() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgLikeMoment} alt="点赞" className={styles.img} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw/ai-voice')} />
    </div>
  );
}