import * as mock from '../mock/data';

// ⚑ 接口 ready 后改为 false
const USE_MOCK = false;

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

export async function mockLogin() {
  const res = await fetch('/api/mock-login/select-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ mockUserId: '0124631849001206438' }),
  });
  if (!res.ok) throw new Error(`mock登录失败: ${res.status}`);
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
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

export async function getWarmServiceList() {
  if (USE_MOCK) return mock.mockWarmServiceList;
  return request('/warm-service/list');
}

export async function getBoilingVitalityList() {
  if (USE_MOCK) return mock.mockBoilingVitalityList;
  const res = await request('/activity/energy/star-ranking');
  return res.data;
}

export async function submitAIVoiceSubmission(data) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 500));
    return { success: true };
  }
  return request('/ai-voice/submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
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

export async function getLikeMomentList({ page = 1, pageSize = 5 } = {}) {
  if (true) {
    await new Promise(r => setTimeout(r, 300));
    const start = (page - 1) * pageSize;
    const list = Array.from({ length: pageSize }, (_, i) => ({
      id: start + i + 1,
      rank: start + i + 123456,
      thumbnail: `https://picsum.photos/200/200?random=${start + i + 1}`,
      type: (start + i) % 3 === 0 ? "video" : "image",
    }));
    return {
      list,
      total: 30,
      page,
      pageSize,
    };
  }
  return request(`/like-moment/list?page=${page}&pageSize=${pageSize}`);
}