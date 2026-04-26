import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import Uploader from '../../../components/Uploader';
import bgContribution from "../../../assets/smartDraw/01-03-02.png";

/* 贡献榜/投稿 */

export default function Contribution() {

  return (
    <div className={styles.page}>
      <img src={bgContribution} alt="投稿" className={styles.img} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
      {/* 上传热区：根据设计稿调整 top/left/width/height */}
      <Uploader
        triggerStyle={{ top: 114, left: 10, width: 18, height: 7 }}
      />
    </div>
  );
}