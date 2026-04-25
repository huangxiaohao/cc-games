import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import bgHome from '../../assets/bg-home.png';

const TEXT = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

export default function Home() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    let timeout;

    const tick = () => {
      if (index < TEXT.length) {
        index += 1;
        setDisplayText(TEXT.slice(0, index));
        timeout = setTimeout(tick, 150);
      } else {
        // 播完后停顿1秒再重试
        timeout = setTimeout(() => {
          index = 0;
          tick();
        }, 1000);
      }
    };

    timeout = setTimeout(tick, 150);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.page}>
      <img src={bgHome} alt="cc-games" className={styles.img} />
      <p className={styles.info}>{displayText}</p>

      {/* 点击热区 - 智绘新章入口 */}
      <div className={styles.hotArea1} onClick={() => navigate("/smartDraw")} />

      {/* 点击热区2 - 乐启新程 */}
      <div className={styles.hotArea2} onClick={() => alert("点击热区2")} />

      {/* 点击热区3 - 运动汇*/}
      <div className={styles.hotArea3} onClick={() => alert("点击热区3")} />

      {/* 点击热区4 - 积分排名 */}
      <div
        className={styles.hotArea4}
        onClick={() => navigate("/point-rank")}
      />

      {/* 点击热区5 - 庆典直播 */}
      <div
        className={styles.hotArea5}
        onClick={() => navigate("/celebration-live")}
      />
    </div>
  );
}