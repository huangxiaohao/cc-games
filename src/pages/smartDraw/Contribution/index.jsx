import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgContribution from "../../../assets/smartDraw/01-03-02.png";

export default function Contribution() {
  return (
    <div className={styles.page}>
      <img src={bgContribution} alt="投稿" className={styles.img} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
    </div>
  );
}