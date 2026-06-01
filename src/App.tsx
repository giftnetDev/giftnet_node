import {
  BarChart3,
  Bell,
  CalendarDays,
  Gift,
  Home,
  PackageCheck,
  Search,
  Settings,
  ShoppingBag,
  Users
} from 'lucide-react';

const stats = [
  { label: '오늘 주문', value: '128', change: '+12%' },
  { label: '발송 대기', value: '34', change: '-8%' },
  { label: '활성 고객', value: '2,480', change: '+4%' },
  { label: '이번 달 매출', value: '48.2M', change: '+18%' }
];

const orders = [
  { id: 'GF-2048', customer: '이지은', product: '프리미엄 기프트 박스', status: '결제 완료', amount: '89,000원' },
  { id: 'GF-2047', customer: '김도윤', product: '커피 쿠폰 10매', status: '발송 대기', amount: '45,000원' },
  { id: 'GF-2046', customer: '박서연', product: '생일 축하 세트', status: '배송 중', amount: '126,000원' },
  { id: 'GF-2045', customer: '최민준', product: '모바일 상품권', status: '완료', amount: '30,000원' }
];

const menuItems = [
  { icon: Home, label: '홈', active: true },
  { icon: ShoppingBag, label: '주문' },
  { icon: Gift, label: '상품' },
  { icon: Users, label: '고객' },
  { icon: BarChart3, label: '리포트' },
  { icon: Settings, label: '설정' }
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Gift size={20} />
          </div>
          <div>
            <strong>Giftnet</strong>
            <span>Admin</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="주요 메뉴">
          {menuItems.map((item) => (
            <button className={item.active ? 'nav-item active' : 'nav-item'} key={item.label}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>운영 현황</h1>
          </div>
          <div className="top-actions">
            <label className="search-box">
              <Search size={18} />
              <input placeholder="주문, 고객, 상품 검색" />
            </label>
            <button className="icon-button" aria-label="알림">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <section className="stats-grid" aria-label="핵심 지표">
          {stats.map((stat) => (
            <article className="metric-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.change}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel orders-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Orders</p>
                <h2>최근 주문</h2>
              </div>
              <button className="text-button">
                <PackageCheck size={17} />
                처리하기
              </button>
            </div>

            <div className="table">
              {orders.map((order) => (
                <div className="table-row" key={order.id}>
                  <span className="order-id">{order.id}</span>
                  <span>{order.customer}</span>
                  <span>{order.product}</span>
                  <span className="status-pill">{order.status}</span>
                  <strong>{order.amount}</strong>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel schedule-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Today</p>
                <h2>오늘 할 일</h2>
              </div>
              <CalendarDays size={20} />
            </div>
            <ul className="task-list">
              <li>
                <strong>배송 보류 8건 확인</strong>
                <span>오전 11:00</span>
              </li>
              <li>
                <strong>신규 상품 검수</strong>
                <span>오후 2:30</span>
              </li>
              <li>
                <strong>정산 리포트 발행</strong>
                <span>오후 5:00</span>
              </li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
}
