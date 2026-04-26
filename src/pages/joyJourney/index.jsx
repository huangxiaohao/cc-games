import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BackButton from '../../components/BackButton';
import bgImg from '../../assets/joyJ/01.png';

/* 乐启新程 */

export default function JoyJourney() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bgImg} className={styles.img} alt="" />
        <BackButton top={2} left={2} width={4} height={4} showImg={false} />

        {/* 按钮热区1 */}
        <div className={styles.hotArea1} onClick={() => navigate('/joy-journey/baoming')} />

        {/* 按钮热区2 */}
        <div className={styles.hotArea2} onClick={() => navigate('/joy-journey/toupiao')} />
      </div>
    </div>
  );
}
