import { Outlet } from 'react-router-dom';
import './index.module.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
