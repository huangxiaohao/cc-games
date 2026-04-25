import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgBoilingVitality from "../../../assets/smartDraw/01-02.png";
import gifBoilingVitality from "../../../assets/smartDraw/01-02-01.gif";

export default function BoilingVitality() {
  return (
    <div className={styles.page}>
      <img src={bgBoilingVitality} alt="让活力沸腾" className={styles.img} />
      <img src={gifBoilingVitality} alt="" className={styles.gif} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
    </div>
  );
}
