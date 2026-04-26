import { useRef } from 'react';
import { useOSSUpload } from '../../hooks/useOSSUpload';
import styles from './index.module.css';

export default function Uploader({ onSuccess, triggerStyle, accept = 'image/*,video/*' }) {
  const inputRef = useRef();
  const { upload, progress, uploading, error } = useOSSUpload();

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await upload(file);
      console.log('上传成功:', url);
      onSuccess?.(url, file);
    } catch {}
    e.target.value = '';
  }

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={handleChange} />
      <div
        className={styles.trigger}
        style={triggerStyle ? {
          top: `${triggerStyle.top}rem`,
          left: `${triggerStyle.left}rem`,
          width: `${triggerStyle.width}rem`,
          height: `${triggerStyle.height}rem`,
        } : {}}
        onClick={() => !uploading && inputRef.current.click()}
      />
      {uploading && (
        <div className={styles.progressMask}>
          <div className={styles.progressBox}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            <span className={styles.progressText}>{progress}%</span>
          </div>
        </div>
      )}
      {error && <div className={styles.errorToast}>{error}</div>}
    </>
  );
}