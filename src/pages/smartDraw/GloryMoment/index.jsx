import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgGloryMoment from "../../../assets/smartDraw/01-03-01.png";

export default function GloryMoment() {
  return (
    <div className={styles.page}>
      <img src={bgGloryMoment} alt="荣耀时刻" className={styles.img} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
    </div>
  );
}