import { useState, useRef } from 'react';
import styles from './index.module.css';
import BackButton from '../../../components/BackButton';
import { useOSSUpload } from '../../../hooks/useOSSUpload';
import bgImg from '../../../assets/joyJ/09.png';
import centerImg from '../../../assets/joyJ/03.png';

/* 乐启新程 - 报名 */

export default function Baoming() {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [programUrl, setProgramUrl] = useState(null);
  const [hostUrl, setHostUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const programInputRef = useRef();
  const hostInputRef = useRef();
  const { upload: uploadProgram, uploading: uploadingProgram } = useOSSUpload();
  const { upload: uploadHost, uploading: uploadingHost } = useOSSUpload();

  async function handleProgramChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadProgram(file);
      setProgramUrl(url);
    } catch {}
    e.target.value = '';
  }

  async function handleHostChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadHost(file);
      setHostUrl(url);
    } catch {}
    e.target.value = '';
  }

  async function handleSubmit() {
    if (!name.trim()) return alert('请输入姓名');
    if (!team.trim()) return alert('请输入战队');
    if (!programUrl && !hostUrl) return alert('请至少上传一个文件');

    setSubmitting(true);
    try {
      // TODO: 接口后续补充
      // await submitBaoming({ name: name.trim(), team: team.trim(), programUrl, hostUrl });
      console.log('提交数据:', { name: name.trim(), team: team.trim(), programUrl, hostUrl });
      alert('提交成功');
    } catch {
      alert('提交失败');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.imgWrapper}>
        <img src={bgImg} className={styles.img} alt="" />
        <BackButton top={2} left={2} width={4} height={4} />
        <div className={styles.centerWrapper}>
          <img src={centerImg} className={styles.centerImg} alt="" />
          <input className={styles.input1} placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={styles.input2} placeholder="战队" value={team} onChange={(e) => setTeam(e.target.value)} />

          {/* 隐藏文件输入 */}
          <input ref={programInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleProgramChange} />
          <input ref={hostInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleHostChange} />

          {/* 节目类上传按钮 */}
          <div className={styles.hotArea1} onClick={() => !uploadingProgram && programInputRef.current.click()} />
          {programUrl && <span className={styles.uploadTag1}>✓</span>}

          {/* 主持人上传按钮 */}
          <div className={styles.hotArea2} onClick={() => !uploadingHost && hostInputRef.current.click()} />
          {hostUrl && <span className={styles.uploadTag2}>✓</span>}

          {/* 提交 */}
          <div className={styles.hotArea3} onClick={submitting ? undefined : handleSubmit} />
        </div>
      </div>
    </div>
  );
}
