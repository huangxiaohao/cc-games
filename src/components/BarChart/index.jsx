import styles from './index.module.css';

export default function BarChart({ data = [], barColor = 'linear-gradient(90deg, #FFD700, #FF8C00)', position }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div
      className={styles.chart}
      style={position ? {
        position: 'absolute',
        top: `${position.top}rem`,
        left: `${position.left}rem`,
        width: `${position.width}rem`,
      } : {}}
    >
      {data.map((item, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.label}>{item.label}</span>
          <div className={styles.barWrap}>
            <div
              className={styles.bar}
              style={{ width: `${(item.value / max) * 100}%`, background: barColor }}
            />
            <span className={styles.value}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}