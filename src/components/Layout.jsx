/**
 * @file src/components/Layout.jsx
 * @author LongHP CE190280
 * @description Bố cục quản trị dùng chung: thanh menu, header, nội dung hiện tại và đăng xuất.

 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { LayoutDashboard, FolderOpen, Newspaper, Users, Settings, LogOut, PanelLeft, Menu } from 'lucide-react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import logo from '../assets/logo.svg';
// Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
const menus = [['dashboard', 'Dashboard', LayoutDashboard], ['categories', 'Categories', FolderOpen], ['news', 'News Articles', Newspaper], ['users', 'Users', Users], ['settings', 'Settings', Settings]];
// Xuất giá trị/component để module khác có thể import.
export default function Layout({ page, setPage, onLogout, children }) {
  // Trả về JSX để React dựng giao diện theo trạng thái hiện tại.
  return <div className="app-shell"><aside className="sidebar"><div className="side-brand"><img src={logo} alt="FUNews logo" /><span>FUNews<small>MANAGEMENT</small></span></div><div className="side-label">WORKSPACE</div><nav aria-label="Main navigation">{menus.map(([id, label, Icon]) => <button key={id} className={'nav-link ' + (page === id ? 'active' : '')} onClick={() => setPage(id)}><Icon size={19} />{label}</button>)}</nav><div className="sidebar-bottom"><div className="mini-profile"><span className="avatar">A</span><div><strong>Admin</strong><small>Administrator</small></div></div><button onClick={onLogout} className="nav-link logout"><LogOut size={18} /> Sign out</button></div></aside><div className="work-area"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{menus.find(m => m[0] === page)?.[1]}</strong></div><div className="top-user"><span className="status-dot" /> Administrator <span className="avatar small">A</span></div></header><main className="main-content">{children}</main><footer className="site-footer">FUNewsManagementSystem <span>Assignment 01 · Demo frontend</span></footer></div></div>;
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
