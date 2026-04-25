import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgWarmService from "../../../assets/smartDraw/01-01.png";

export default function WarmService() {
  return (
    <div className={styles.page}>
      <img src={bgWarmService} alt="让服务升温" className={styles.img} />
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
    </div>
  );
}
