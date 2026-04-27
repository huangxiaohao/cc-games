import { useState } from 'react';
import './index.css';

const mockData = [
  { id: 1, name: '张三', team: '战队A', activity: 'AI作品', score: 200, status: '已发放' },
  { id: 2, name: '李四', team: '战队B', activity: '集碎片', score: 150, status: '已发放' },
  { id: 3, name: '王五', team: '战队C', activity: '战地风采', score: 100, status: '待发放' },
  { id: 4, name: '赵六', team: '战队A', activity: '战地记者', score: 80, status: '待发放' },
  { id: 5, name: '钱七', team: '战队B', activity: '表演大赛', score: 60, status: '已发放' },
  { id: 6, name: '孙八', team: '战队C', activity: '啦啦队', score: 50, status: '已发放' },
  { id: 7, name: '周九', team: '战队A', activity: 'AI作品', score: 50, status: '已发放' },
  { id: 8, name: '吴十', team: '战队B', activity: '集碎片', score: 6, status: '待发放' },
];

const actionButtons = [
  { id: 1, name: 'AI 作品最终结算', desc: '作品点赞前5，分别积200、150、100、50、50分' },
  { id: 2, name: '集碎片活动积分最终结算', desc: '最终每个战队的个人积分总数排出1、2、3名，给他们10、6、3的一级积分' },
  { id: 3, name: '战地风采投稿结算', desc: '战地风采投稿积分根据点赞总数分别进行排名，给予前 10 名同学所在战队 10-1 递减活动积分' },
  { id: 4, name: '战地记者投稿结算', desc: '根据各战队参与总人数给予 Top3 战队 10、6、3的活动积分；根据点赞总数分别进行排名，给予前 10 名同学所在战队 10-1 的活动积分' },
  { id: 5, name: '表演大赛积分结算', desc: '根据节目提交数量、战队投票数、作品票选前 5 等维度累计总积分排名，分别给予 Top3 战队 10、6、3 活动积分' },
  { id: 6, name: '啦啦队积分结算', desc: '每人次参与活动累积 1 积分，所有项目结束后按照积分排名，分别赋予 Top3 战队 10、6、3 活动积分' },
];

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBtn, setSelectedBtn] = useState(null);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = mockData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSettle = (btn) => {
    setSelectedBtn(btn.id);
    setTimeout(() => setSelectedBtn(null), 1500);
    alert('敬请期待');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>积分结算中心</h1>
        <span className="subtitle">Sports Meet Score Settlement</span>
      </header>

      <section className="action-grid">
        {actionButtons.map((btn, index) => (
          <button
            key={btn.id}
            className={`action-btn ${selectedBtn === btn.id ? 'active' : ''}`}
            onClick={() => handleSettle(btn)}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className="btn-index">0{btn.id}</span>
            <span className="btn-name">{btn.name}</span>
            <span className="btn-desc">{btn.desc}</span>
          </button>
        ))}
      </section>

      <section className="data-section">
        <div className="section-header">
          <h2>结算记录</h2>
          <span className="total">共 {mockData.length} 条记录</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>战队</th>
                <th>活动</th>
                <th>积分</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.name}</td>
                  <td>
                    <span className={`team-tag team-${row.team.slice(-1).toLowerCase()}`}>
                      {row.team}
                    </span>
                  </td>
                  <td>{row.activity}</td>
                  <td className="mono score">{row.score}</td>
                  <td>
                    <span className={`status ${row.status === '已发放' ? 'done' : 'pending'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? 'current' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
}
