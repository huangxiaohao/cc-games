import styles from './index.module.css';
import celebrationLiveImg from '../../assets/celebrationLive/01.png';
import BackButton from "../../components/BackButton";

/* 庆典直播 */

export default function CelebrationLive() {
  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={celebrationLiveImg} alt="庆典直播" className={styles.img} />
        <BackButton showImg={false} top={2} left={2} width={5} height={4} />

        {/* 按钮区域1 */}
        <div className={styles.hotArea1} onClick={() => alert("敬请期待")} />

        {/* 按钮区域2 */}
        <div className={styles.hotArea2} onClick={() => alert("敬请期待")} />
      </div>
    </div>
  );
}