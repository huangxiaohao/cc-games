import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useDingtalkLogin } from './hooks/useDingtalk';
import Home from './pages/Home';
import SmartDraw from './pages/smartDraw';
import WarmService from './pages/smartDraw/WarmService';
import BoilingVitality from './pages/smartDraw/BoilingVitality';
import AIVoice from './pages/smartDraw/AIVoice';
import GloryMoment from './pages/smartDraw/GloryMoment';
import Contribution from './pages/smartDraw/Contribution';
import LikeMoment from './pages/smartDraw/LikeMoment';
import PointRank from './pages/pointRank';
import CelebrationLive from './pages/celebrationLive';
import Template from './pages/Template';
import VideoSplash from './pages/VideoSplash';

function AppRoutes() {
  const { login } = useDingtalkLogin();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    login()
      .then(() => setReady(true))
      .catch(err => setError(err.message || '登录失败'));
  }, []);

  if (error) return (
    <div style={{ color: '#fff', textAlign: 'center', paddingTop: '40vw', fontSize: '1.4rem' }}>
      {error}
    </div>
  );

  if (!ready) return null;

  return (
    <Routes>
      {/* 开屏页 */}
      <Route path="/" element={<VideoSplash />} />
      {/* 首页 */}
      <Route path="/home" element={<Home />} />
      {/* 智绘新章 */}
      <Route path="/smartDraw" element={<SmartDraw />} />
      {/* 暖心服务 */}
      <Route path="/smartDraw/warm-service" element={<WarmService />} />
      {/* 沸腾活力 */}
      <Route path="/smartDraw/boiling-vitality" element={<BoilingVitality />} />
      {/* AI好声音 */}
      <Route path="/smartDraw/ai-voice" element={<AIVoice />} />
      {/* 荣耀时刻 */}
      <Route path="/smartDraw/glory-moment" element={<GloryMoment />} />
      {/* 贡献榜 */}
      <Route path="/smartDraw/contribution" element={<Contribution />} />
      {/* 点赞瞬间 */}
      <Route path="/smartDraw/like-moment" element={<LikeMoment />} />
      {/* 模板页 */}
      <Route path="/template" element={<Template />} />
      {/* 积分排名 */}
      <Route path="/point-rank" element={<PointRank />} />
      {/* 庆典直播 */}
      <Route path="/celebration-live" element={<CelebrationLive />} />
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}