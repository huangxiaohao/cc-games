import { useState, useEffect } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgBoilingVitality from "../../../assets/smartDraw/04.jpg";
import gifBoilingVitality from "../../../assets/smartDraw/01-02-01.gif";
import { getBoilingVitalityList } from '../../../services/api';

/* 沸腾活力 */

export default function BoilingVitality() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getBoilingVitalityList().then(setList);
  }, []);

  return (
    <div className={styles.page}>
      <BackButton top={1} left={5} width={13} height={5} unit="%" />
      <div className={styles.imgWrapper}>
        <img src={bgBoilingVitality} alt="让活力沸腾" className={styles.img} />
        <img src={gifBoilingVitality} alt="" className={styles.gif} />
        <div className={styles.info}>
          {list.map((item, index) => (
            <div key={index}>{item.userName}　{item.calorie}kcal</div>
          ))}
        </div>
      </div>
    </div>
  );
}
