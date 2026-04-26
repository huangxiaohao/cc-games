import { useState, useRef, useCallback } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';

// 资源导入
import bg from "../../../assets/smartDraw/01-03-031.png";
import titleImg from "../../../assets/smartDraw/01-03-032.png";
import badgeBase from "../../../assets/smartDraw/01-03-033.png";
import rankBadge1 from "../../../assets/smartDraw/01-03-034.png";
import rankBadge2 from "../../../assets/smartDraw/01-03-035.png";
import rankBadge3 from "../../../assets/smartDraw/01-03-036.png";
import rankBadge4 from "../../../assets/smartDraw/01-03-037.png";
import rankBadge5 from "../../../assets/smartDraw/01-03-038.png";

const rankBadges = [rankBadge1, rankBadge2, rankBadge3, rankBadge4, rankBadge5];

// Mock 数据（后续替换为真实接口）
const mockData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  rank: i + 187654,
  thumbnail: `https://picsum.photos/200/200?random=${i + 1}`,
  type: i % 3 === 0 ? 'video' : 'image',
}));

// 可配置常量
const PAGE_SIZE_FIRST = 5;   // 第一页显示条数
const PAGE_SIZE = 6;         // 后续每页条数（可改为10）

export default function LikeMoment() {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE_FIRST);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // 是否有更多数据
  const hasMore = displayCount < mockData.length;

  // 滚动到底部时加载更多
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // 滚动到距离底部 50px 时触发加载
    if (scrollHeight - scrollTop - clientHeight < 50) {
      if (!loading && hasMore) {
        setLoading(true);
        // 模拟加载延迟
        setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + PAGE_SIZE, mockData.length));
          setLoading(false);
        }, 500);
      }
    }
  }, [loading, hasMore]);

  // 当前显示的数据
  const currentData = mockData.slice(0, displayCount);

  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bg} alt="背景" className={styles.img} />

        <BackButton top={1} left={5} width={15} height={6} unit="%" showImg={true} />

        <img src={titleImg} alt="标题" className={styles.title} />

        {/* 滚动区域 */}
        <div
          ref={containerRef}
          className={styles.rankingContainer}
          onScroll={handleScroll}
        >
          {/* 第1名 - 独占一行 */}
          {currentData[0] && (
            <div className={styles.rankFirst}>
              <div className={styles.rankFirstInner}>
                <img src={rankBadges[0]} alt={`排名${currentData[0].rank}`} className={styles.rankBadge} />
                <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                <img src={currentData[0].thumbnail} alt="缩略图" className={styles.thumbnail} />
                <span className={styles.badgeNum}>{currentData[0].rank}</span>
              </div>
            </div>
          )}

          {/* 第2-3名 - 一行 */}
          {currentData[1] && currentData[2] && (
            <div className={styles.rankRow}>
              <div className={styles.rankItem}>
                <div className={styles.rankItemInner}>
                  <img src={rankBadges[1]} alt={`排名${currentData[1].rank}`} className={styles.rankBadge} />
                  <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                  <img src={currentData[1].thumbnail} alt="缩略图" className={styles.thumbnail} />
                  <span className={styles.badgeNum}>{currentData[1].rank}</span>
                </div>
              </div>
              <div className={styles.rankItem}>
                <div className={styles.rankItemInner}>
                  <img src={rankBadges[2]} alt={`排名${currentData[2].rank}`} className={styles.rankBadge} />
                  <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                  <img src={currentData[2].thumbnail} alt="缩略图" className={styles.thumbnail} />
                  <span className={styles.badgeNum}>{currentData[2].rank}</span>
                </div>
              </div>
            </div>
          )}

          {/* 第4-5名 - 一行 */}
          {currentData[3] && currentData[4] && (
            <div className={styles.rankRow}>
              <div className={styles.rankItem}>
                <div className={styles.rankItemInner}>
                  <img src={rankBadges[3]} alt={`排名${currentData[3].rank}`} className={styles.rankBadge} />
                  <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                  <img src={currentData[3].thumbnail} alt="缩略图" className={styles.thumbnail} />
                  <span className={styles.badgeNum}>{currentData[3].rank}</span>
                </div>
              </div>
              <div className={styles.rankItem}>
                <div className={styles.rankItemInner}>
                  <img src={rankBadges[4]} alt={`排名${currentData[4].rank}`} className={styles.rankBadge} />
                  <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                  <img src={currentData[4].thumbnail} alt="缩略图" className={styles.thumbnail} />
                  <span className={styles.badgeNum}>{currentData[4].rank}</span>
                </div>
              </div>
            </div>
          )}

          {/* 后续数据 - 两两一行 */}
          {currentData.slice(5).map((item, idx) => {
            if (idx % 2 === 0) {
              const nextItem = currentData[5 + idx + 1];
              return (
                <div key={item.id} className={styles.rankRow}>
                  <div className={styles.rankItem}>
                    <div className={styles.rankItemInner}>
                      <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                      <img src={item.thumbnail} alt="缩略图" className={styles.thumbnail} />
                      <span className={styles.badgeNum}>{item.rank}</span>
                    </div>
                  </div>
                  {nextItem && (
                    <div className={styles.rankItem}>
                      <div className={styles.rankItemInner}>
                        <img src={badgeBase} alt="徽章" className={styles.badgeBase} />
                        <img src={nextItem.thumbnail} alt="缩略图" className={styles.thumbnail} />
                        <span className={styles.badgeNum}>{nextItem.rank}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

          {/* 加载中提示 */}
          {loading && <div className={styles.loadingTip}>正在加载...</div>}
        </div>
      </div>
    </div>
  );
}
