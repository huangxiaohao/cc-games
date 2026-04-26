import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import backBtn from '../../assets/backBtn/back.png';

export default function BackButton({ top = 4, left = 2, width = 8, height = 8, unit = 'rem', showImg = true, onClick }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.btn}
      style={{ top: `${top}${unit}`, left: `${left}${unit}`, width: `${width}${unit}`, height: `${height}${unit}` }}
      onClick={onClick || (() => navigate(-1))}
    >
      {showImg && <img src={backBtn} alt="back" />}
    </div>
  );
}