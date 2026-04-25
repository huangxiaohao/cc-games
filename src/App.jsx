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
      <Route path="/" element={<VideoSplash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/smartDraw" element={<SmartDraw />} />
      <Route path="/smartDraw/warm-service" element={<WarmService />} />
      <Route path="/smartDraw/boiling-vitality" element={<BoilingVitality />} />
      <Route path="/smartDraw/ai-voice" element={<AIVoice />} />
      <Route path="/smartDraw/glory-moment" element={<GloryMoment />} />
      <Route path="/smartDraw/contribution" element={<Contribution />} />
      <Route path="/smartDraw/like-moment" element={<LikeMoment />} />
      <Route path="/template" element={<Template />} />
      <Route path="/point-rank" element={<PointRank />} />
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