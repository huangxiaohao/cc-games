import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BackButton from '../../components/BackButton';
import bgSmartDraw from "../../assets/smartDraw/01.png";

/* 智绘新章 - 战队排名数据 */
const teams = [
  { name: '华东联合战队', value: 12276, color: '#FF6B6B' },
  { name: '华东联合战队', value: 18474, color: '#4ECDC4' },
  { name: '华东联合战队', value: 19950, color: '#45B7D1' },
  { name: '华东联合战队', value: 17468, color: '#96CEB4' },
  { name: '华东联合战队', value: 17435, color: '#DDA0DD' },
];

// 计算进度条百分比（基于最大值归一化）
const maxValue = Math.max(...teams.map(t => t.value));
const getPercent = (val) => (val / maxValue) * 100;

export default function SmartDraw() {
  const navigate = useNavigate();

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
        {teams.map((team) => (
          <div key={team.name} className={styles.rankItem}>
            <div className={styles.teamName} style={{ color: team.color }}>{team.name}</div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ width: `${getPercent(team.value)}%`, backgroundColor: team.color }}
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
