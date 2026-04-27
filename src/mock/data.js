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

export const mockWarmServiceList = [
  { name: '张三', score: 1200 },
  { name: '李四', score: 980 },
  { name: '王五', score: 860 },
  { name: '赵六', score: 750 },
  { name: '孙七', score: 630 },
];

export const mockBoilingVitalityList = [
  { userName: '张三', calorie: 3200 },
  { userName: '李四', calorie: 2980 },
  { userName: '王五', calorie: 2750 },
  { userName: '赵六', calorie: 2510 },
  { userName: '孙七', calorie: 2340 },
  { userName: '周八', calorie: 2180 },
  { userName: '吴九', calorie: 1960 },
  { userName: '郑十', calorie: 1850 },
  { userName: '陈一一', calorie: 1720 },
  { userName: '林一二', calorie: 1600 },
  { userName: '黄一三', calorie: 1480 },
  { userName: '杨一四', calorie: 1350 },
  { userName: '刘一五', calorie: 1240 },
  { userName: '何一六', calorie: 1120 },
  { userName: '吕一七', calorie: 980 },
  { userName: '施一八', calorie: 870 },
  { userName: '张一九', calorie: 760 },
  { userName: '孔二十', calorie: 650 },
  { userName: '曹二一', calorie: 540 },
  { userName: '严二二', calorie: 430 },
];

export const mockMediaList = [
  { id: 1, type: 'image', url: 'https://picsum.photos/750/400?random=1' },
  { id: 2, type: 'image', url: 'https://picsum.photos/750/400?random=2' },
  { id: 3, type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

// 点赞瞬间 - 排名列表 Mock 数据
export const mockLikeMomentList = {
  list: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    rank: i + 123456,
    thumbnail: `https://picsum.photos/200/200?random=${i + 1}`,
    type: i % 3 === 0 ? 'video' : 'image',
  })),
  total: 30,
};

// 战队排名 Mock 数据
export const mockTeamRanking = {
  data: [
    { teamId: 3, teamName: 'CC', totalPoints: 19950, serviceWarmthPoints: 5000, aiVoicePoints: 8000, energyPoints: 6950 },
    { teamId: 1, teamName: 'AA', totalPoints: 18474, serviceWarmthPoints: 4000, aiVoicePoints: 7000, energyPoints: 7474 },
    { teamId: 2, teamName: 'BB', totalPoints: 17468, serviceWarmthPoints: 3000, aiVoicePoints: 6000, energyPoints: 8468 },
    { teamId: 4, teamName: 'DD', totalPoints: 17435, serviceWarmthPoints: 3500, aiVoicePoints: 5500, energyPoints: 8435 },
    { teamId: 5, teamName: 'EE', totalPoints: 12276, serviceWarmthPoints: 2000, aiVoicePoints: 4000, energyPoints: 6276 },
  ],
};