import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgImg from '../../../assets/joyJ/09.png';
import centerImg from '../../../assets/joyJ/02.png';

/* 乐启新程 - 报名 */

export default function Baoming() {
  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bgImg} className={styles.img} alt="" />
        <BackButton top={2} left={2} width={4} height={4} />
        <img src={centerImg} className={styles.centerImg} alt="" />
        <div className={styles.hotArea1} onClick={() => {}} />
        <div className={styles.hotArea2} onClick={() => {}} />
        <div className={styles.hotArea3} onClick={() => {}} />
        <input className={styles.input1} placeholder="" />
        <input className={styles.input2} placeholder="" />
      </div>
    </div>
  );
}
