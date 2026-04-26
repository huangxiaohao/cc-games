import { useState, useEffect } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgWarmService from "../../../assets/smartDraw/01-01.png";
import { getWarmServiceList } from '../../../services/api';

/* 暖心服务 */

export default function WarmService() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getWarmServiceList().then(setList);
  }, []);

  return (
    <div className={styles.page}>
      <BackButton top={1} left={5} width={15} height={5} unit="%" />
      <div className={styles.imgWrapper}>
        <img src={bgWarmService} alt="让服务升温" className={styles.img} />
        <div className={styles.info}>
          {list.map((item, index) => (
            <div key={index}>{item.name}　{item.score}积分</div>
          ))}
        </div>
      </div>
    </div>
  );
}
