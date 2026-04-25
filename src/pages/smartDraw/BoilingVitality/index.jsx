import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import bgBoilingVitality from "../../../assets/smartDraw/01-02.png";
import gifBoilingVitality from "../../../assets/smartDraw/01-02-01.gif";

export default function BoilingVitality() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src={bgBoilingVitality} alt="让活力沸腾" className={styles.img} />
      <img src={gifBoilingVitality} alt="" className={styles.gif} />
      <div className={styles.backArea} onClick={() => navigate('/smartDraw')} />
    </div>
  );
}
