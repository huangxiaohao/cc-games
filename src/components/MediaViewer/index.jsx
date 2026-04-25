import { useEffect } from 'react';
import styles from './index.module.css';

export default function MediaViewer({ visible, type, url, onClose }) {
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.mask} onClick={onClose}>
      <div className={styles.inner} onClick={e => e.stopPropagation()}>
        {type === 'image'
          ? <img src={url} className={styles.media} alt="" />
          : <video src={url} controls autoPlay playsInline className={styles.media} />
        }
      </div>
      <div className={styles.close} onClick={onClose}>✕</div>
    </div>
  );
}