import styles from './index.module.css';
import bgHome from '../../assets/bg-home.png';

export default function Home() {
  return (
    <div className={styles.page}>
      <img src={bgHome} alt="cc-games" className={styles.img} />
    </div>
  );
}