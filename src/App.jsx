import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useDingtalkLogin } from './hooks/useDingtalk';
import Home from './pages/Home';
import Template from './pages/Template';

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
      <Route path="/" element={<Home />} />
      <Route path="/template" element={<Template />} />
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