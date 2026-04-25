# Claude Code Task List · cc-games

> 在已建好的 `cc-games` 目录下执行，按顺序来，每个 Task 验收通过再继续。
> 静态阶段全部 mock 数据，钉钉免登也 mock，接口 ready 后改开关。

---

## Task 0：项目初始化

```bash
cd cc-games
npm create vite@latest . -- --template react
npm install
npm install react-router-dom
```

**`index.html`** 替换 viewport meta：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>cc-games</title>
```

**`vite.config.js`**：
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // 部署到 OSS 时用相对路径
})
```

创建目录结构：
```
src/
├── context/
├── pages/
├── components/
├── hooks/
├── services/
├── mock/
├── assets/
└── styles/
```

**验收：** `npm run dev` 正常启动，浏览器打开无报错。

---

## Task 1：rem 适配 + 全局样式

**`src/main.jsx`**：
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

// rem 适配：设计稿 750px，1rem = 20px
function setRem() {
  const rem = document.documentElement.clientWidth / 750 * 20;
  document.documentElement.style.fontSize = rem + 'px';
}
setRem();
window.addEventListener('resize', setRem);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

**`src/styles/global.css`**：
```css
* { margin: 0; padding: 0; box-sizing: border-box; }

html, body, #root {
  width: 100%;
  min-height: 100vh;
}

body {
  background: #000;
  overflow-x: hidden;
}

/* 页面通用容器 */
.page {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* 背景图：宽撑满，高自适应，永远不写死高度 */
.page-bg {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  user-select: none;
}
```

**验收：** 打开 DevTools 切换不同手机尺寸，`document.documentElement.style.fontSize` 随屏幕宽度等比变化。375px 屏时约为 10px，750px 屏时约为 20px。

---

## Task 2：钉钉免登

### 2.1 安装 SDK
```bash
npm install dingtalk-jsapi
```

### 2.2 用户 Context

**`src/context/UserContext.jsx`**：
```jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { userId, userName, token, ... }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
```

### 2.3 免登 Hook

**`src/hooks/useDingtalk.js`**：
```javascript
import * as dd from 'dingtalk-jsapi';
import { useUser } from '../context/UserContext';
import { dingtalkLogin } from '../services/api';

// 判断是否在钉钉环境
export function isDingtalk() {
  return /DingTalk/i.test(navigator.userAgent);
}

export function useDingtalkLogin() {
  const { setUser } = useUser();

  async function login() {
    // ---- 非钉钉环境（开发调试）：直接 mock ----
    if (!isDingtalk()) {
      const mockUser = { userId: 'dev-001', userName: '开发测试', token: 'mock-token' };
      setUser(mockUser);
      return mockUser;
    }

    // ---- 钉钉环境：标准免登流程 ----
    return new Promise((resolve, reject) => {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: import.meta.env.VITE_DINGTALK_CORP_ID,
          onSuccess: async ({ code }) => {
            try {
              // 把 code 给后端换用户信息
              const userInfo = await dingtalkLogin(code);
              setUser(userInfo);
              resolve(userInfo);
            } catch (err) {
              reject(err);
            }
          },
          onFail: reject,
        });
      });
    });
  }

  return { login };
}
```

### 2.4 在 App.jsx 入口处理免登

**`src/App.jsx`**：
```jsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useDingtalkLogin } from './hooks/useDingtalk';
import Home from './pages/Home';
// ... 其他页面

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

  if (!ready) return null; // 免登完成前不渲染任何页面

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 后续在这里加页面路由 */}
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
```

### 2.5 环境变量

**`.env`**：
```
VITE_DINGTALK_CORP_ID=your_corp_id_here
```

**`.env.development`**（开发环境可留空，会走 mock）：
```
VITE_DINGTALK_CORP_ID=mock
```

**验收：** 本地开发时（非钉钉环境）自动走 mock，控制台能看到 `user` 已设置，页面正常进入首页。

---

## Task 3：API 层 + Mock 数据

**`src/mock/data.js`**：
```javascript
// 所有 mock 数据集中管理，接口 ready 后逐个替换

export const mockUserInfo = {
  userId: 'mock-001',
  userName: '张三',
  token: 'mock-token-xxx',
};

export const mockActivityInfo = {
  title: '活动名称',
  status: 'active',
};

export const mockRankList = [
  { rank: 1, name: '张**', score: 1580 },
  { rank: 2, name: '李**', score: 1320 },
  { rank: 3, name: '王**', score: 1280 },
  { rank: 4, name: '赵**', score: 1100 },
  { rank: 5, name: '陈**', score: 980 },
];

export const mockBarData = [
  { label: '项目A', value: 980 },
  { label: '项目B', value: 756 },
  { label: '项目C', value: 634 },
];

export const mockColumnData = [
  { label: '1月', value: 65 },
  { label: '2月', value: 80 },
  { label: '3月', value: 55 },
  { label: '4月', value: 90 },
];

export const mockMediaList = [
  { id: 1, type: 'image', url: 'https://picsum.photos/750/400?random=1' },
  { id: 2, type: 'image', url: 'https://picsum.photos/750/400?random=2' },
  { id: 3, type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];
```

**`src/services/api.js`**：
```javascript
import * as mock from '../mock/data';

// ⚑ 接口 ready 后改为 false
const USE_MOCK = true;

// 所有请求统一走这里，自动带 token
async function request(path, options = {}) {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`请求失败: ${res.status}`);
  return res.json();
}

// 钉钉免登
export async function dingtalkLogin(code) {
  if (USE_MOCK) return mock.mockUserInfo;
  const data = await request('/user/dingtalk-login', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  localStorage.setItem('token', data.token);
  return data;
}

// 活动信息
export async function getActivityInfo() {
  if (USE_MOCK) return mock.mockActivityInfo;
  return request('/activity/info');
}

// 排行榜
export async function getRankList() {
  if (USE_MOCK) return mock.mockRankList;
  return request('/rank/list');
}

// 提交表单
export async function submitForm(data) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 500));
    return { success: true, score: 1280, rank: 3 };
  }
  return request('/activity/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

**验收：** 调用 `getActivityInfo()` 能返回 mock 数据，无报错。

---

## Task 4：BackButton 组件

**`src/components/BackButton/index.jsx`**：
```jsx
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

// top/left/width/height 单位均为 rem（设计稿 px ÷ 20）
export default function BackButton({ top = 4, left = 2, width = 8, height = 8 }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.btn}
      style={{ top: `${top}rem`, left: `${left}rem`, width: `${width}rem`, height: `${height}rem` }}
      onClick={() => navigate(-1)}
    />
  );
}
```

```css
/* BackButton/index.module.css */
.btn {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  /* background: rgba(255, 0, 0, 0.2); */
}
```

---

## Task 5：图表组件

### BarChart（水平条形图）

**`src/components/BarChart/index.jsx`**：
```jsx
import styles from './index.module.css';

// data: [{ label: string, value: number }]
// barColor: CSS 颜色或渐变字符串
// position: 绝对定位参数 { top, left, width } 单位 rem
export default function BarChart({ data = [], barColor = 'linear-gradient(90deg, #FFD700, #FF8C00)', position }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div
      className={styles.chart}
      style={position ? {
        position: 'absolute',
        top: `${position.top}rem`,
        left: `${position.left}rem`,
        width: `${position.width}rem`,
      } : {}}
    >
      {data.map((item, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.label}>{item.label}</span>
          <div className={styles.barWrap}>
            <div
              className={styles.bar}
              style={{ width: `${(item.value / max) * 100}%`, background: barColor }}
            />
            <span className={styles.value}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

```css
/* BarChart/index.module.css */
.chart { width: 100%; }
.row { display: flex; align-items: center; margin-bottom: 1.2rem; }
.label { flex-shrink: 0; width: 6rem; font-size: 1.2rem; color: #fff; }
.barWrap { flex: 1; display: flex; align-items: center; gap: 0.6rem; }
.bar { height: 1.8rem; border-radius: 0.9rem; transition: width 0.8s ease; min-width: 0.2rem; }
.value { flex-shrink: 0; font-size: 1.2rem; color: #fff; min-width: 3rem; }
```

### ColumnChart（垂直柱状图）

**`src/components/ColumnChart/index.jsx`**：
```jsx
import styles from './index.module.css';

export default function ColumnChart({ data = [], barColor = '#FFD700', position, chartHeight = 15 }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div
      className={styles.chart}
      style={{
        height: `${chartHeight}rem`,
        ...(position ? {
          position: 'absolute',
          top: `${position.top}rem`,
          left: `${position.left}rem`,
          width: `${position.width}rem`,
        } : {}),
      }}
    >
      {data.map((item, i) => (
        <div key={i} className={styles.col}>
          <div className={styles.barWrap}>
            <div
              className={styles.bar}
              style={{ height: `${(item.value / max) * 100}%`, background: barColor }}
            />
          </div>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
```

```css
/* ColumnChart/index.module.css */
.chart { width: 100%; display: flex; align-items: flex-end; gap: 0.6rem; padding-bottom: 2rem; position: relative; }
.col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
.barWrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
.bar { width: 100%; border-radius: 0.3rem 0.3rem 0 0; transition: height 0.8s ease; min-height: 0.2rem; }
.label { font-size: 1rem; color: #fff; margin-top: 0.4rem; text-align: center; white-space: nowrap; }
```

**验收：** 传入 mockBarData / mockColumnData 正确渲染，数据变化时有动画。

---

## Task 6：MediaViewer 组件

**`src/components/MediaViewer/index.jsx`**：
```jsx
import { useEffect } from 'react';
import styles from './index.module.css';

export default function MediaViewer({ visible, type, url, onClose }) {
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.mask} onClick={onClose}>
      <div className={styles.inner} onClick={e => e.stopPropagation()}>
        {type === 'image'
          ? <img src={url} className={styles.media} alt="" />
          : <video src={url} controls autoPlay playsInline className={styles.media} />
        }
      </div>
      <div className={styles.close} onClick={onClose}>✕</div>
    </div>
  );
}
```

```css
/* MediaViewer/index.module.css */
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner { width: 100%; display: flex; align-items: center; justify-content: center; }
.media { width: 100%; max-height: 100vh; object-fit: contain; display: block; }
.close {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  font-size: 2.4rem;
  color: #fff;
  cursor: pointer;
  padding: 1rem;
  line-height: 1;
}
```

**`src/hooks/useMediaViewer.js`**：
```javascript
import { useState } from 'react';

export function useMediaViewer() {
  const [viewer, setViewer] = useState({ visible: false, type: 'image', url: '' });
  const open = (type, url) => setViewer({ visible: true, type, url });
  const close = () => setViewer(v => ({ ...v, visible: false }));
  return { viewer, open, close };
}
```

**验收：** 图片预览全屏显示，点蒙层关闭；视频自动播放，playsInline 避免 iOS 强制全屏。

---

## Task 7：OSS 上传

**`src/services/oss.js`**：
```javascript
// ⚑ 接口 ready 后改为 false
const USE_MOCK = true;

export async function getOSSToken(filename, fileType) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 200));
    return {
      host: 'https://mock-bucket.oss-cn-hangzhou.aliyuncs.com',
      key: `cc-games/mock/${Date.now()}_${filename}`,
      policy: 'mock-policy',
      OSSAccessKeyId: 'mock-key-id',
      signature: 'mock-sig',
      _isMock: true,
    };
  }
  const token = localStorage.getItem('token') || '';
  const res = await fetch('/api/oss/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ filename, type: fileType }),
  });
  if (!res.ok) throw new Error('获取上传凭证失败');
  return res.json();
}

export function uploadToOSS(file, token, onProgress) {
  // mock 上传：模拟进度
  if (token._isMock) {
    return new Promise(resolve => {
      let p = 0;
      const timer = setInterval(() => {
        p = Math.min(p + 25, 100);
        onProgress?.(p);
        if (p >= 100) { clearInterval(timer); resolve(`${token.host}/${token.key}`); }
      }, 150);
    });
  }

  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('key', token.key);
    form.append('policy', token.policy);
    form.append('OSSAccessKeyId', token.OSSAccessKeyId);
    form.append('signature', token.signature);
    form.append('success_action_status', '200');
    if (token.callback) form.append('callback', token.callback);
    form.append('file', file); // 必须最后

    const xhr = new XMLHttpRequest();
    xhr.open('POST', token.host);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round(e.loaded / e.total * 100));
    };
    xhr.onload = () => {
      (xhr.status === 200 || xhr.status === 204)
        ? resolve(`${token.host}/${token.key}`)
        : reject(new Error(`OSS上传失败: ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error('网络错误'));
    xhr.send(form);
  });
}
```

**`src/hooks/useOSSUpload.js`**：
```javascript
import { useState } from 'react';
import { getOSSToken, uploadToOSS } from '../services/oss';

// 文件大小限制（视频 100MB，图片 20MB）
const SIZE_LIMIT = { video: 100 * 1024 * 1024, image: 20 * 1024 * 1024 };

export function useOSSUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function upload(file) {
    // 大小校验
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
      const token = await getOSSToken(file.name, file.type);
      const url = await uploadToOSS(file, token, setProgress);
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
```

**`src/components/Uploader/index.jsx`**：
```jsx
import { useRef } from 'react';
import { useOSSUpload } from '../../hooks/useOSSUpload';
import styles from './index.module.css';

// onSuccess(url, file) 上传成功回调
// triggerStyle: 热区的绝对定位样式 { top, left, width, height } 单位 rem
// accept: 'image/*' | 'video/*' | 'image/*,video/*'
export default function Uploader({ onSuccess, triggerStyle, accept = 'image/*,video/*' }) {
  const inputRef = useRef();
  const { upload, progress, uploading, error } = useOSSUpload();

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await upload(file);
      onSuccess?.(url, file);
    } catch {}
    e.target.value = ''; // 允许重复上传同一文件
  }

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={handleChange} />

      {/* 热区：绝对定位，覆盖设计图上的上传按钮 */}
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

      {/* 进度条：上传中显示 */}
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
```

```css
/* Uploader/index.module.css */
.trigger {
  position: absolute;
  cursor: pointer;
  z-index: 5;
  /* background: rgba(0, 255, 0, 0.2); */
}
.progressMask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progressBox {
  width: 28rem;
  background: rgba(255,255,255,0.15);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  height: 3rem;
}
.progressBar {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FF8C00);
  transition: width 0.2s ease;
}
.progressText {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.4rem;
}
.errorToast {
  position: fixed;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(220,50,50,0.9);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  z-index: 1000;
  white-space: nowrap;
}
```

**验收：** 点击热区触发文件选择，选择后进度条从 0 跑到 100，`onSuccess` 收到 URL，可重复上传。

---

## Task 8：页面开发模板

> 每新增一个页面，复制此模板，按设计稿填坐标。同步在 `App.jsx` 加路由。

**`src/pages/PageName/index.jsx`**：
```jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './index.module.css';
import bgImg from '../../assets/bg-pagename.jpg';
import BackButton from '../../components/BackButton';
import MediaViewer from '../../components/MediaViewer';
import { useMediaViewer } from '../../hooks/useMediaViewer';

export default function PageName() {
  const navigate = useNavigate();
  const { viewer, open, close } = useMediaViewer();

  // Tab 状态（如果此页有 Tab）
  const [activeTab, setActiveTab] = useState('a');

  return (
    <div className={styles.page}>
      {/* 背景图：宽撑满，高自适应 */}
      <img src={bgImg} className={styles.bg} alt="" />

      {/* 返回热区（top/left 按设计稿 px ÷ 20） */}
      <BackButton top={4} left={2} width={8} height={8} />

      {/* ---- Tab 热区（如有）---- */}
      <div className={styles.tabA} onClick={() => setActiveTab('a')} />
      <div className={styles.tabB} onClick={() => setActiveTab('b')} />

      {/* ---- Tab 内容（切换显示/隐藏）---- */}
      {activeTab === 'a' && (
        <div className={styles.panelA}>
          {/* Panel A 内容 */}
        </div>
      )}
      {activeTab === 'b' && (
        <div className={styles.panelB}>
          {/* Panel B 内容 */}
        </div>
      )}

      {/* ---- 按钮热区 ---- */}
      <div className={styles.btnNext} onClick={() => navigate('/next-page')} />

      {/* ---- 动态数据 ---- */}
      <span className={styles.scoreText}>1280</span>

      {/* ---- 媒体预览 ---- */}
      <MediaViewer {...viewer} onClose={close} />
    </div>
  );
}
```

```css
/* src/pages/PageName/index.module.css */
.page { position: relative; width: 100%; }
.bg { width: 100%; height: auto; display: block; pointer-events: none; }

/* 所有尺寸 = 设计稿标注 px ÷ 20 */

/* 返回按钮（BackButton 组件已处理，无需在这里写） */

/* Tab 热区 */
.tabA {
  position: absolute;
  top: 20rem;    /* 设计稿 400px → 20rem */
  left: 2rem;
  width: 16rem;
  height: 5rem;
  cursor: pointer;
  /* background: rgba(255,0,0,0.2); */
}
.tabB {
  position: absolute;
  top: 20rem;
  left: 19rem;
  width: 16rem;
  height: 5rem;
  cursor: pointer;
  /* background: rgba(255,0,0,0.2); */
}

/* 按钮热区 */
.btnNext {
  position: absolute;
  top: 80rem;
  left: 5rem;
  width: 27.5rem;
  height: 5rem;
  cursor: pointer;
  /* background: rgba(255,0,0,0.2); */
}

/* 动态数据文字 */
.scoreText {
  position: absolute;
  top: 50rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.2rem;
  color: #FFD700;
  font-weight: bold;
}
```

---

## Task 9：图片预加载

**`src/utils/preload.js`**：
```javascript
export function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
```

在 `App.jsx` 的 `AppRoutes` 组件里，免登完成后触发预加载：
```javascript
import { preloadImages } from './utils/preload';
// 导入所有背景图
import bg1 from './assets/bg-home.jpg';
// ...

// 免登成功后
login().then(() => {
  setReady(true);
  preloadImages([bg1, /* 其他背景图 */]);
});
```

---

## Task 10：接口联调（接口 Ready 后执行）

1. `src/services/api.js` → `USE_MOCK = false`
2. `src/services/oss.js` → `USE_MOCK = false`，确认 `/api/oss/token` 返回字段与代码一致
3. `vite.config.js` 配置代理（本地联调用）：
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend.com',
      changeOrigin: true,
    }
  }
}
```
4. 确认 OSS bucket 已配置 CORS（允许 POST，允许前端域名）
5. 钉钉 corpId 填入 `.env`，在真实钉钉环境验证免登流程

---

## 真机验收 Checklist

- [ ] 钉钉内打开：免登正常，用户信息获取成功
- [ ] iPhone + 钉钉：各页面背景图不变形，热区位置准确
- [ ] Android + 钉钉：同上
- [ ] 文件上传：图片 ✓，视频 ✓，超大文件提示 ✓，进度条 ✓
- [ ] 图片预览：全屏显示 ✓，点击关闭 ✓
- [ ] 视频预览：自动播放 ✓，有控制条 ✓，不强制全屏 ✓
- [ ] 返回按钮：history 回退正常 ✓
- [ ] Tab 切换：内容切换 ✓，状态不保留 ✓
- [ ] 图表：数据正确 ✓，过渡动画 ✓
- [ ] 所有热区调试红框已去掉 ✓
