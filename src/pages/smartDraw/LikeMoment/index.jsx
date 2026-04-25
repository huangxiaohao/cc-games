import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgLikeMoment from "../../../assets/smartDraw/01-03-03.png";

/* 点赞瞬间 */

export default function LikeMoment() {
  return (
    <div className={styles.page}>
      <img src={bgLikeMoment} alt="点赞" className={styles.img} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
    </div>
  );
}