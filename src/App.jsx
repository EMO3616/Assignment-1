/**
 * @file src/App.jsx
 * @author LongHP CE190280
 * @description Component gốc: quản lý phiên đăng nhập, dữ liệu dùng chung, kiểm tra hợp lệ, CRUD và chọn trang hiển thị.

 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { useEffect, useState } from 'react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { Newspaper, FolderOpen, Users, CheckCircle2, ArrowUpRight, Database, RotateCcw, ShieldCheck } from 'lucide-react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import Login from './pages/Login'; import Layout from './components/Layout'; import CrudPage from './components/CrudPage';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { readData, saveData, resetData, sessionKey } from './data/storage';
// Khai báo các lựa chọn cho trường dạng select.
const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }], roleOptions = [{ value: 1, label: 'Admin' }, { value: 2, label: 'Staff' }];
// Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
const statusCell = value => <span className={'status-badge ' + (value === 1 ? 'enabled' : 'disabled')}><span className="status-dot" />{value === 1 ? 'Active' : 'Inactive'}</span>;
// Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.
const categoryFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'name', label: 'Category Name', required: true }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }];
// Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.
const newsFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'title', label: 'Title', required: true }, { name: 'content', label: 'Content', type: 'textarea', required: true, table: false }, { name: 'categoryId', label: 'Category', type: 'select', required: true }, { name: 'createdBy', label: 'Author', type: 'select', required: true }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }, { name: 'tags', label: 'Tags', default: '' }];
// Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.
const userFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'username', label: 'Username', required: true }, { name: 'password', label: 'Password', type: 'password', required: true, table: false }, { name: 'role', label: 'Role', type: 'select', options: roleOptions, default: 2 }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }];
// Kiểm tra chuỗi không rỗng sau trim, dùng lại trong validation.
function validName(v) { return typeof v === 'string' && v.trim().length > 0; }
// Component App bắt đầu: nơi sở hữu shared state.
function App() {
  // Khởi tạo data từ storage, user từ sessionStorage và page từ dashboard.
  const [data, setData] = useState(readData); const [user, setUser] = useState(() => { try { return JSON.parse(sessionStorage.getItem(sessionKey)); } catch { return null; } }); const [page, setPage] = useState('dashboard');
  // Mỗi lần data đổi, hiệu ứng lưu dữ liệu sang localStorage.
  useEffect(() => saveData(data), [data]);
  // Login: lưu phiên đăng nhập, cập nhật user state rồi mở dashboard.
  const login = (u) => { sessionStorage.setItem(sessionKey, JSON.stringify(u)); setUser(u); setPage('dashboard'); };
  // Logout: xóa session, đặt user=null và trở lại dashboard.
  const logout = () => { sessionStorage.removeItem(sessionKey); setUser(null); setPage('dashboard'); };
  // Create/Update: clone data, chuẩn hóa chuỗi, sinh id hoặc thay record theo id rồi setData.
  function onSave(kind, mode, form) { setData(old => { const next = structuredClone(old); const item = { ...form }; if (kind === 'categories') item.name = item.name.trim(); if (kind === 'news') { item.title = item.title.trim(); item.content = item.content.trim(); } if (kind === 'users') item.username = item.username.trim(); if (mode === 'create') { item.id = Math.max(0, ...next[kind].map(x => x.id)) + 1; next[kind] = [...next[kind], item]; } else { next[kind] = next[kind].map(x => x.id === item.id ? item : x); } return next; }); }
  // Delete: chặn xóa record đang được tham chiếu; chỉ xóa khi an toàn.
  function onDelete(kind, id) { if (kind === 'categories' && data.news.some(n => n.categoryId === id)) return 'Cannot delete: at least one article is assigned to this category.'; if (kind === 'users' && data.news.some(n => n.createdBy === id)) return 'Cannot delete: at least one article references this author.'; if (kind === 'users' && id === user.id) return 'Cannot delete the currently signed-in administrator.'; setData(old => ({ ...old, [kind]: old[kind].filter(x => x.id !== id) })); return true; }
  // Đầu hàm validate: kiểm tra đầu vào theo loại entity.
  function validate(kind, form, id) {    
// Category: yêu cầu tên và không trùng tên với danh mục khác.
if (kind === 'categories') { if (!validName(form.name)) return 'Category name is required.'; if (data.categories.some(c => c.id !== id && c.name.toLowerCase() === form.name.trim().toLowerCase())) return 'Category name already exists.'; }
    // News: yêu cầu title/content và xác minh Category/User tham chiếu tồn tại.
    if (kind === 'news') { if (!validName(form.title) || !validName(form.content)) return 'Title and content are required.'; if (!data.categories.some(c => c.id === Number(form.categoryId))) return 'Please select an existing category.'; if (!data.users.some(u => u.id === Number(form.createdBy))) return 'Please select an existing author.'; }
    // Users: username/password bắt buộc và username không được trùng.
    if (kind === 'users') { if (!validName(form.username) || !validName(form.password)) return 'Username and password are required.'; if (data.users.some(u => u.id !== id && u.username.toLowerCase() === form.username.trim().toLowerCase())) return 'Username already exists.'; } return '';  
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
  // Chuyển giá trị dữ liệu thành nhãn, badge hoặc trường quan hệ để hiển thị.
  const display = (row, field) => { if (field === 'status') return statusCell(row.status); if (field === 'role') return <span className="role-pill">{row.role === 1 ? 'Admin' : 'Staff'}</span>; if (field === 'categoryId') return data.categories.find(c => c.id === row.categoryId)?.name ?? 'Unknown'; if (field === 'createdBy') return data.users.find(u => u.id === row.createdBy)?.username ?? 'Unknown'; if (field === 'title') return <strong className="table-title">{row.title}</strong>; if (field === 'name' || field === 'username') return <strong className="table-title">{row[field]}</strong>; return String(row[field] ?? '—'); };
  // Chưa đăng nhập thì chỉ render Login và dừng nhánh admin.
  if (!user) return <Login onLogin={login} />;
  // Tính các chỉ số Dashboard từ data đang lưu trong React state.
  const metric = [{ label: 'Total Articles', value: data.news.length, icon: Newspaper, cls: 'blue' }, { label: 'Categories', value: data.categories.length, icon: FolderOpen, cls: 'purple' }, { label: 'Team Members', value: data.users.length, icon: Users, cls: 'orange' }, { label: 'Published Articles', value: data.news.filter(n => n.status === 1).length, icon: CheckCircle2, cls: 'green' }];
  // Bổ sung options động cho Category và Author trong form News.
  const completeNewsFields = newsFields.map(f => f.name === 'categoryId' ? { ...f, options: data.categories.map(c => ({ value: c.id, label: c.name })), default: data.categories[0]?.id ?? 0 } : f.name === 'createdBy' ? { ...f, options: data.users.map(u => ({ value: u.id, label: u.username })), default: data.users[0]?.id ?? 0 } : f);
  // Trả AdminLayout và truyền state điều hướng cùng handler logout.
  return <Layout page={page} setPage={setPage} onLogout={logout}>
    {/* Nhánh Dashboard: dựng card thống kê và bài viết gần đây. */}
    {page === 'dashboard' && <section><div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Welcome back, Admin. Here's what is happening with your content.</p></div><span className="today-chip">FUNews · Live local data</span></div><div className="metrics">{metric.map(m => <div className="metric-card" key={m.label}><div className={'metric-icon ' + m.cls}><m.icon size={21} /></div><div className="metric-value">{m.value}</div><div className="metric-label">{m.label}</div><ArrowUpRight className="metric-arrow" size={17} /></div>)}</div><div className="dashboard-columns"><div className="panel"><div className="panel-heading"><h2>Recent articles</h2><button className="text-action" onClick={() => setPage('news')}>View all <ArrowUpRight size={15} /></button></div><div className="recent-list">{data.news.slice(-4).reverse().map(n => <div className="recent-item" key={n.id}><div className="recent-icon"><Newspaper size={17} /></div><div><strong>{n.title}</strong><small>{data.categories.find(c => c.id === n.categoryId)?.name ?? 'Uncategorized'}</small></div>{statusCell(n.status)}</div>)}{!data.news.length && <p className="muted-pad">No articles yet.</p>}</div></div><div className="panel about-panel"><div className="panel-heading"><h2>Quick start</h2></div><div className="quick-icon"><Database size={28} /></div><h3>Manage your newsroom</h3><p>Create categories, publish news, and organize users from one convenient workspace.</p><button className="btn primary" onClick={() => setPage('news')}>Manage articles <ArrowUpRight size={16} /></button></div></div></section>}
    {/* Nhánh Categories: truyền data, field, validate và CRUD handlers cho CrudPage. */}
    {page === 'categories' && <CrudPage kind="categories" title="Categories" subtitle="Organize topics and keep your newsroom structured." rows={data.categories} fields={categoryFields} renderCell={display} searchFields={['name']} validate={(f, id) => validate('categories', f, id)} onSave={onSave} onDelete={onDelete} />}
    {/* Nhánh News: truyền dữ liệu News và các lựa chọn relation động. */}
    {page === 'news' && <CrudPage kind="news" title="News Articles" subtitle="Create, edit, and manage all your published stories." rows={data.news} fields={completeNewsFields} renderCell={display} searchFields={['title', 'content']} validate={(f, id) => validate('news', f, id)} onSave={onSave} onDelete={onDelete} />}
    {/* Nhánh Users: truyền dữ liệu tài khoản và cấu hình quản lý. */}
    {page === 'users' && <CrudPage kind="users" title="Users" subtitle="Manage access and team member accounts." rows={data.users} fields={userFields} renderCell={display} searchFields={['username']} validate={(f, id) => validate('users', f, id)} onSave={onSave} onDelete={onDelete} />}
    {/* Nhánh Settings: reset dữ liệu sau khi người dùng xác nhận. */}
    {page === 'settings' && <section><div className="page-heading"><div><span className="eyebrow">SYSTEM</span><h1>Settings</h1><p>Local demo configuration and data maintenance.</p></div></div><div className="panel settings-panel"><div className="settings-row"><div className="settings-icon"><ShieldCheck size={24} /></div><div><h3>Mock administrator access</h3><p>Login is intentionally limited to Admin / Admin for this assignment demonstration. No backend or real security layer is included.</p></div></div><div className="settings-row"><div className="settings-icon"><Database size={24} /></div><div><h3>Browser data</h3><p>Categories, articles, and users are stored in this browser's localStorage. Reset restores demo data.</p></div><button className="btn neutral" onClick={() => { if (window.confirm('Reset all records to their initial demo values?')) setData(resetData()); }}><RotateCcw size={16} /> Reset data</button></div></div></section>}
  {/* Đóng Layout JSX để hoàn tất cây UI. */}
  </Layout>;
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
// Xuất giá trị/component để module khác có thể import.
export default App;
