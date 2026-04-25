import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* 开屏页 */

// public 目录下的资源直接用 / 路径，不经过 Vite 模块解析
const carVideo = '/car.mp4';

export default function VideoSplash() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      navigate('/home');
    };

    video.addEventListener('ended', handleEnded);
    // 兼容：视频加载失败时也跳转
    video.addEventListener('error', handleEnded);

    // 显式调用 play() 确保播放
    video.play().catch(err => console.log('play() failed:', err));

    // 超时保护：最大等待10秒
    const timeout = setTimeout(() => {
      navigate('/home');
    }, 10000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleEnded);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <video
        ref={videoRef}
        src={carVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
        onVolumeChange={e => console.log('volumechange', e.target.volume)}
        onLoadedMetadata={e => console.log('loadedMetadata', e.target.duration, e.target.videoWidth, e.target.videoHeight)}
        onError={e => console.log('video error', e.target.error)}
      />
      <p style={{ color: '#fff', position: 'fixed', bottom: 20, fontSize: 14 }}>视频加载中...</p>
    </div>
  );
}
