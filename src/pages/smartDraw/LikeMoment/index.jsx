import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import { getLikeMomentList, toggleLikeMoment } from '../../../services/api';

// 资源导入
import bg from "../../../assets/smartDraw/01-03-031.png";
import titleImg from "../../../assets/smartDraw/01-03-032.png";
import badgeBase from "../../../assets/smartDraw/01-03-033.png";
import badgeBaseLiked from "../../../assets/smartDraw/01-03-033-1.png";
import rankBadge1 from "../../../assets/smartDraw/01-03-034.png";
import rankBadge2 from "../../../assets/smartDraw/01-03-035.png";
import rankBadge3 from "../../../assets/smartDraw/01-03-036.png";
import rankBadge4 from "../../../assets/smartDraw/01-03-037.png";
import rankBadge5 from "../../../assets/smartDraw/01-03-038.png";

const rankBadges = [rankBadge1, rankBadge2, rankBadge3, rankBadge4, rankBadge5];

// 可配置常量
const PAGE_SIZE_FIRST = 5;   // 第一页显示条数
const PAGE_SIZE = 6;         // 后续每页条数（可改为10）

export default function LikeMoment() {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedIds, setLikedIds] = useState(new Set()); // 本地维护点赞状态
  const containerRef = useRef(null);

  // 加载数据
  const loadData = useCallback(async (pageNum, isReset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const pageSize = isReset ? PAGE_SIZE_FIRST : PAGE_SIZE;
      const res = await getLikeMomentList({ page: pageNum, pageSize });

      // 兼容接口返回格式：{ list, total } 或直接返回数组
      const newList = Array.isArray(res) ? res : (res.list || []);

      if (isReset) {
        setDataList(newList);
      } else {
        setDataList(prev => [...prev, ...newList]);
      }

      // 判断是否还有更多
      const total = res.total || newList.length;
      setHasMore(dataList.length + newList.length < total);
    } catch (err) {
      console.error('加载失败:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, dataList.length]);

  // 初始加载
  useEffect(() => {
    loadData(1, true);
  }, []);

  // 滚动到底部时加载更多
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // 滚动到距离底部 50px 时触发加载
    if (scrollHeight - scrollTop - clientHeight < 50) {
      if (!loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadData(nextPage);
      }
    }
  }, [loading, hasMore, page, loadData]);

  // 当前显示的数据
  const currentData = dataList;

  // 徽章数字点击事件 - 在这里写你的逻辑
  const handleBadgeClick = async (item) => {
    // 本地立即切换状态
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });

    try {
      await toggleLikeMoment(item.id);
      // 重新加载数据（真实接口返回最新状态）
      loadData(1, true);
    } catch (err) {
      console.error('点赞失败:', err);
    }
  };

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
          {/* 第1名 - 独占一行居中 */}
          {currentData[0] && (
            <div className={styles.rankFirst}>
              <div className={styles.rankFirstInner}>
                <img src={rankBadges[0]} alt="第1名" className={styles.rankBadge} />
                <img src={likedIds.has(currentData[0].id) ? badgeBaseLiked : badgeBase} alt="徽章" className={styles.badgeBase} />
                <img src={currentData[0].thumbnail} alt="缩略图" className={styles.thumbnail} />
                <span className={styles.userName}>{currentData[0].userName}</span>
                <span className={styles.teamName}>{currentData[0].teamName}</span>
                <span className={styles.badgeNum}>{currentData[0].voteCount}</span>
                <div className={`${styles.badgeClickArea} ${styles.firstBadgeClickArea}`} onClick={() => handleBadgeClick(currentData[0])} />
              </div>
            </div>
          )}

          {/* 第2名起 - 每行两个，左边就在左边，奇数时最后落单在左边 */}
          {currentData.slice(1).reduce((rows, item, idx) => {
            if (idx % 2 === 0) {
              const nextItem = currentData.slice(1)[idx + 1];
              rows.push(
                <div key={item.id} className={styles.rankRow}>
                  <div className={styles.rankItem}>
                    <div className={styles.rankItemInner}>
                      <img src={rankBadges[1 + idx]} alt={`第${2 + idx}名`} className={styles.rankBadge} />
                      <img src={likedIds.has(item.id) ? badgeBaseLiked : badgeBase} alt="徽章" className={styles.badgeBase} />
                      <img src={item.thumbnail} alt="缩略图" className={styles.thumbnail} />
                      <span className={styles.userName}>{item.userName}</span>
                      <span className={styles.teamName}>{item.teamName}</span>
                      <span className={styles.badgeNum}>{item.voteCount}</span>
                      <div className={styles.badgeClickArea} onClick={() => handleBadgeClick(item)} />
                    </div>
                  </div>
                  {nextItem && (
                    <div className={styles.rankItem}>
                      <div className={styles.rankItemInner}>
                        <img src={rankBadges[2 + idx]} alt={`第${3 + idx}名`} className={styles.rankBadge} />
                        <img src={likedIds.has(nextItem.id) ? badgeBaseLiked : badgeBase} alt="徽章" className={styles.badgeBase} />
                        <img src={nextItem.thumbnail} alt="缩略图" className={styles.thumbnail} />
                        <span className={styles.userName}>{nextItem.userName}</span>
                        <span className={styles.teamName}>{nextItem.teamName}</span>
                        <span className={styles.badgeNum}>{nextItem.voteCount}</span>
                        <div className={styles.badgeClickArea} onClick={() => handleBadgeClick(nextItem)} />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return rows;
          }, [])}

          {/* 加载中提示 */}
          {loading && <div className={styles.loadingTip}>正在加载...</div>}
        </div>
      </div>
    </div>
  );
}
