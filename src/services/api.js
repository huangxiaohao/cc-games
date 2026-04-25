import * as mock from '../mock/data';

// ⚑ 接口 ready 后改为 false
const USE_MOCK = true;

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

export async function dingtalkLogin(code) {
  if (USE_MOCK) return mock.mockUserInfo;
  const data = await request('/user/dingtalk-login', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  localStorage.setItem('token', data.token);
  return data;
}

export async function getActivityInfo() {
  if (USE_MOCK) return mock.mockActivityInfo;
  return request('/activity/info');
}

export async function getRankList() {
  if (USE_MOCK) return mock.mockRankList;
  return request('/rank/list');
}

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