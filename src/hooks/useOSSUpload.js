import { useState } from 'react';
import { uploadToOSS } from '../services/oss';

const SIZE_LIMIT = { video: 100 * 1024 * 1024, image: 20 * 1024 * 1024 };

export function useOSSUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function upload(file) {
    const isVideo = file.type.startsWith('video/');
    const limit = isVideo ? SIZE_LIMIT.video : SIZE_LIMIT.image;
    if (file.size > limit) {
      const msg = `文件过大，${isVideo ? '视频' : '图片'}不能超过 ${limit / 1024 / 1024}MB`;
      setError(msg);
      throw new Error(msg);
    }

    setUploading(true);
    setError(null);
    setProgress(0);
    try {
      const url = await uploadToOSS(file, setProgress);
      return url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }

  return { upload, progress, uploading, error };
}
