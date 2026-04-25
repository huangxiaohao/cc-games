import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

export default function BackButton({ top = 4, left = 2, width = 8, height = 8 }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.btn}
      style={{ top: `${top}rem`, left: `${left}rem`, width: `${width}rem`, height: `${height}rem` }}
      onClick={() => navigate(-1)}
    />
  );
}