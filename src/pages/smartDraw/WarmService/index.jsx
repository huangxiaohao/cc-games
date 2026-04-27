import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgWarmService from "../../../assets/smartDraw/01-01.png";
import { getWarmServiceList } from '../../../services/api';

/* 暖心服务 */

export default function WarmService() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    getWarmServiceList().then(setList);
  }, []);

  return (
    <div className={styles.page}>
      <BackButton top={1} left={5} width={13} height={5} unit="%" />
      <div className={styles.imgWrapper}>
        <img src={bgWarmService} alt="让服务升温" className={styles.img} />
        <div className={styles.info}>
          {list.map((item, index) => (
            <div key={index}>
              {item.name}　{item.score}积分
            </div>
          ))}
        </div>

        {/* 点击热区1 */}
        <div
          className={styles.hotArea1}
          onClick={() =>
            window.open(
              "https://survey.caocaokeji.cn/survey/diaowen.html?sid=lyh5guqt6",
              "_blank",
            )
          }
        />

        {/* 点击热区2 */}
        <div
          className={styles.hotArea2}
          onClick={() =>
            window.open(
              "https://survey.caocaokeji.cn/survey/diaowen.html?sid=r37k52xx",
              "_blank",
            )
          }
        />

        {/* 点击热区3 */}
        <div
          className={styles.hotArea3}
          onClick={() =>
            window.open(
              "https://mobile.caocaokeji.cn/driver-review/customer-service/login?isServiceCheck=true",
              "_blank",
            )
          }
        />
      </div>
    </div>
  );
}
