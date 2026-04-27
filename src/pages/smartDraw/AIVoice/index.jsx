import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgAIVoice from "../../../assets/smartDraw/05.png";

/* AI好声音 */

export default function AIVoice() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bgAIVoice} alt="让AI传声" className={styles.img} />
        <BackButton top={1} left={5} width={13} height={6} unit="%" />
        <div className={styles.btn1} onClick={() => navigate('/smartDraw/glory-moment')} />
        <div className={styles.btn2} onClick={() => navigate('/smartDraw/contribution')} />
        <div className={styles.btn3} onClick={() => navigate('/smartDraw/like-moment')} />
      </div>
    </div>
  );
}
