import styles from './index.module.css';
import pointRankImg from '../../assets/pointRank/01.png';
import BackButton from '../../components/BackButton';

/* 积分排名 */

export default function PointRank() {
  return (
    <div className={styles.page}>
      <img src={pointRankImg} className={styles.bg} alt="" />
      <BackButton top={2} left={2} width={8} height={8} />
    </div>
  );
}