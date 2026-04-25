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