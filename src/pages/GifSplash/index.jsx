import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carGif from '@/assets/car.gif';

/* Gif开屏页 */

export default function GifSplash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 8秒后跳转
    const timeout = setTimeout(() => {
      navigate('/home');
    }, 700000000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={carGif}
        alt="car"
        style={{ width: "100vw", height: "100vh", objectFit: "contain" }}
      />
    </div>
  );
}
