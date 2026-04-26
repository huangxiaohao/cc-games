import { useState } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import bgImg from '../../../assets/joyJ/09.png';
import img10 from '../../../assets/joyJ/10.png';
import img11 from '../../../assets/joyJ/11.png';
import img12 from '../../../assets/joyJ/12.png';
import img13 from '../../../assets/joyJ/13.png';

/* 乐启新程 - 投票 */

const imgs = [img10, img11];
const listItems = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  bg: i % 2 === 0 ? img12 : img13,
}));

export default function Toupiao() {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bgImg} className={styles.img} alt="" />
        <BackButton top={2} left={2} width={4} height={4} showImg={false} />
        <img src={imgs[index]} className={styles.centerImg} alt="" />
        <div className={styles.hotArea1} onClick={() => setIndex((i) => (i + 1) % imgs.length)} />
        <div className={styles.contentArea}>
          {listItems.map((item) => (
            <div key={item.id} className={styles.listItem}>
              <img src={item.bg} className={styles.listItemBg} alt="" />
              <div className={styles.itemBtn} onClick={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
