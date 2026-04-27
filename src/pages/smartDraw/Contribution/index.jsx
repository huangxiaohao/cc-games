import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import Uploader from '../../../components/Uploader';
import bgContribution from "../../../assets/smartDraw/01-03-02.png";
import { submitAIVoiceSubmission } from '../../../services/api';

/* 贡献榜/投稿 */

export default function Contribution() {
  const navigate = useNavigate();
  const [mediaUrls, setMediaUrls] = useState([]);
  const [mediaType, setMediaType] = useState(null); // 'image' | 'video'
  const [submitting, setSubmitting] = useState(false);
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  function handleUploadSuccess(urls) {
    // 判断本次上传的文件类型（通过后缀判断，OSS URL 已包含扩展名）
    const isImage = urls.some(url => /\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i.test(url));
    const type = isImage ? 'image' : 'video';

    if (mediaType && type !== mediaType) {
      alert('只能全部上传图片或全部上传视频，不能混合');
      return;
    }

    setMediaType(type);
    setMediaUrls(prev => [...prev, ...urls]);
  }

  async function handleSubmit() {
    const texts = [input1Ref, input2Ref, input3Ref, input4Ref]
      .map(ref => ref.current?.value?.trim())
      .filter(Boolean);

    if (texts.length === 0) return alert('请至少填写一段文案');
    if (mediaUrls.length === 0) return alert('请先上传文件');
    if (mediaType === 'image' && mediaUrls.length < 3) return alert('图片至少需要3张');

    setSubmitting(true);
    try {
      await submitAIVoiceSubmission({
        texts,
        mediaUrls,
      });
      navigate(-1);
    } catch {
      console.error('提交失败');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <BackButton top={1} left={5} width={13} height={5} unit="%" />
      <div className={styles.imgWrapper}>
        <img src={bgContribution} alt="投稿" className={styles.img} />

        <Uploader
          multiple
          triggerStyle={{ top: 114, left: 10, width: 18, height: 5 }}
          onSuccess={handleUploadSuccess}
        />
        <input ref={input1Ref} className={styles.input1} />
        <input ref={input2Ref} className={styles.input2} />
        <input ref={input3Ref} className={styles.input3} />
        <input ref={input4Ref} className={styles.input4} />
        <div className={styles.submitBtn} onClick={submitting ? undefined : handleSubmit} />
        {mediaUrls.length > 0 && (
          <div className={styles.uploadInfo}>
            已上传 {mediaUrls.length} 个{mediaType === 'image' ? '图片' : '视频'}
            {mediaType === 'image' && mediaUrls.length < 3 ? '（至少3张）' : ''}
          </div>
        )}
      </div>
    </div>
  );
}