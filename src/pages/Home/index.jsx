import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '10rem', fontSize: '2rem' }}>
        cc-games 首页
      </h1>
    </div>
  );
}