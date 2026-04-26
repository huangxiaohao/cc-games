import * as dd from 'dingtalk-jsapi';
import { useUser } from '../context/UserContext';
import { dingtalkLogin, mockLogin } from '../services/api';

export function isDingtalk() {
  return /DingTalk/i.test(navigator.userAgent);
}

export function useDingtalkLogin() {
  const { setUser } = useUser();

  async function login() {
    // ---- 非钉钉环境（开发调试）：调用 mock 登录接口 ----
    if (!isDingtalk()) {
      const userInfo = await mockLogin();
      setUser(userInfo);
      return userInfo;
    }

    // ---- 钉钉环境：标准免登流程 ----
    return new Promise((resolve, reject) => {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: import.meta.env.VITE_DINGTALK_CORP_ID,
          onSuccess: async ({ code }) => {
            try {
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