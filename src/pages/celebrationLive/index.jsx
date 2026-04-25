import styles from './index.module.css';
import celebrationLiveImg from '../../assets/celebrationLive/01.png';
import BackButton from '../../components/BackButton';

/* 庆典直播 */

export default function CelebrationLive() {
  return (
    <div className={styles.page}>
      <img src={celebrationLiveImg} className={styles.bg} alt="" />
      <BackButton top={4} left={2} width={8} height={8} />
    </div>
  );
}