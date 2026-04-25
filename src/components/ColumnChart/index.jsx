import styles from './index.module.css';

export default function ColumnChart({ data = [], barColor = '#FFD700', position, chartHeight = 15 }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div
      className={styles.chart}
      style={{
        height: `${chartHeight}rem`,
        ...(position ? {
          position: 'absolute',
          top: `${position.top}rem`,
          left: `${position.left}rem`,
          width: `${position.width}rem`,
        } : {}),
      }}
    >
      {data.map((item, i) => (
        <div key={i} className={styles.col}>
          <div className={styles.barWrap}>
            <div
              className={styles.bar}
              style={{ height: `${(item.value / max) * 100}%`, background: barColor }}
            />
          </div>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}