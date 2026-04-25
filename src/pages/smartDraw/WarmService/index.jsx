import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgWarmService from "../../../assets/smartDraw/01-01.png";

export default function WarmService() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgWarmService} alt="让服务升温" className={styles.img} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw')} />
    </div>
  );
}
