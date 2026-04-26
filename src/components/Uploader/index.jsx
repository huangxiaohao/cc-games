import { useRef } from 'react';
import { useOSSUpload } from '../../hooks/useOSSUpload';
import styles from './index.module.css';

export default function Uploader({ onSuccess, triggerStyle, accept = 'image/*,video/*', multiple = false }) {
  const inputRef = useRef();
  const { upload, progress, uploading, error } = useOSSUpload();

  async function handleChange(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (multiple) {
      const urls = [];
      for (const file of files) {
        try {
          const url = await upload(file);
          urls.push(url);
        } catch {
          // 单个文件失败继续上传下一个
        }
      }
      if (urls.length > 0) onSuccess?.(urls);
    } else {
      try {
        const url = await upload(files[0]);
        console.log('上传成功:', url);
        onSuccess?.(url, files[0]);
      } catch {}
    }
    e.target.value = '';
  }

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} style={{ display: 'none' }} onChange={handleChange} />
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