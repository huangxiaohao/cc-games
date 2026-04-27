import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import BackButton from '../../components/BackButton';
import bgSmartDraw from "../../assets/smartDraw/01.png";
import { getTeamRanking } from '../../services/api';

// 固定配色方案
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'];

// 计算进度条百分比（基于最大值归一化）
const getPercent = (val, maxValue) => (val / maxValue) * 100;

export default function SmartDraw() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamRanking()
      .then((res) => {
        const list = (res.data || []).map((item, index) => ({
          name: item.teamName,
          value: item.totalPoints,
          color: COLORS[index % COLORS.length],
        }));
        setTeams(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxValue = teams.length > 0 ? Math.max(...teams.map(t => t.value)) : 0;

  return (
    <div className={styles.page}>
      <img src={bgSmartDraw} alt="智绘新章" className={styles.img} />

      {/* 返回首页 */}
      <BackButton top={1} left={5} width={15} height={5} unit="%" onClick={() => navigate('/home')} />

      {/* 让服务升温 */}
      <div className={styles.hotArea1} onClick={() => navigate('/smartDraw/warm-service')} />

      {/* 让活力沸腾 */}
      <div className={styles.hotArea2} onClick={() => navigate('/smartDraw/boiling-vitality')} />

      {/* 让AI传声 */}
      <div className={styles.hotArea3} onClick={() => navigate('/smartDraw/ai-voice')} />

      {/* 战队排名进度条 */}
      <div className={styles.rankContainer}>
        {!loading && teams.map((team) => (
          <div key={team.name} className={styles.rankItem}>
            <div className={styles.teamName} style={{ color: team.color }}>{team.name}</div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ width: `${getPercent(team.value, maxValue)}%`, backgroundColor: team.color }}
              />
            </div>
            <div className={styles.value}>{team.value}</div>
          </div>
        ))}
        {/* 底部文案 */}
        <div className={styles.bottomText}>（每日零点更新数据）</div>
      </div>
    </div>
  );
}
