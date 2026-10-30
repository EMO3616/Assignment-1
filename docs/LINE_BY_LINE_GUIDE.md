# GIẢI THÍCH THEO TỪNG DÒNG SOURCE – FUNews Assignment 01

**Author metadata yêu cầu:** LongHP CE190280

Tài liệu đối chiếu số dòng **trước khi bổ sung comment**; trong bản source đã chú thích, số dòng tăng lên.


## `src/App.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { useEffect, useState } from 'react';
```

**Dòng gốc 2** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { Newspaper, FolderOpen, Users, CheckCircle2, ArrowUpRight, Database, RotateCcw, ShieldCheck } from 'lucide-react';
```

**Dòng gốc 3** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import Login from './pages/Login'; import Layout from './components/Layout'; import CrudPage from './components/CrudPage';
```

**Dòng gốc 4** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { readData, saveData, resetData, sessionKey } from './data/storage';
```

**Dòng gốc 5** — Khai báo các lựa chọn cho trường dạng select.

```jsx
const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }], roleOptions = [{ value: 1, label: 'Admin' }, { value: 2, label: 'Staff' }];
```

**Dòng gốc 6** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
const statusCell = value => <span className={'status-badge ' + (value === 1 ? 'enabled' : 'disabled')}><span className="status-dot" />{value === 1 ? 'Active' : 'Inactive'}</span>;
```

**Dòng gốc 7** — Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.

```jsx
const categoryFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'name', label: 'Category Name', required: true }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }];
```

**Dòng gốc 8** — Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.

```jsx
const newsFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'title', label: 'Title', required: true }, { name: 'content', label: 'Content', type: 'textarea', required: true, table: false }, { name: 'categoryId', label: 'Category', type: 'select', required: true }, { name: 'createdBy', label: 'Author', type: 'select', required: true }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }, { name: 'tags', label: 'Tags', default: '' }];
```

**Dòng gốc 9** — Khai báo cấu hình trường dữ liệu dùng để dựng bảng và form.

```jsx
const userFields = [{ name: 'id', label: 'ID', editable: false }, { name: 'username', label: 'Username', required: true }, { name: 'password', label: 'Password', type: 'password', required: true, table: false }, { name: 'role', label: 'Role', type: 'select', options: roleOptions, default: 2 }, { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 1 }];
```

**Dòng gốc 10** — Kiểm tra chuỗi không rỗng sau trim, dùng lại trong validation.

```jsx
function validName(v) { return typeof v === 'string' && v.trim().length > 0; }
```

**Dòng gốc 11** — Component App bắt đầu: nơi sở hữu shared state.

```jsx
function App() {
```

**Dòng gốc 12** — Khởi tạo data từ storage, user từ sessionStorage và page từ dashboard.

```jsx
const [data, setData] = useState(readData); const [user, setUser] = useState(() => { try { return JSON.parse(sessionStorage.getItem(sessionKey)); } catch { return null; } }); const [page, setPage] = useState('dashboard');
```

**Dòng gốc 13** — Mỗi lần data đổi, hiệu ứng lưu dữ liệu sang localStorage.

```jsx
useEffect(() => saveData(data), [data]);
```

**Dòng gốc 14** — Login: lưu phiên đăng nhập, cập nhật user state rồi mở dashboard.

```jsx
const login = (u) => { sessionStorage.setItem(sessionKey, JSON.stringify(u)); setUser(u); setPage('dashboard'); };
```

**Dòng gốc 15** — Logout: xóa session, đặt user=null và trở lại dashboard.

```jsx
const logout = () => { sessionStorage.removeItem(sessionKey); setUser(null); setPage('dashboard'); };
```

**Dòng gốc 16** — Create/Update: clone data, chuẩn hóa chuỗi, sinh id hoặc thay record theo id rồi setData.

```jsx
function onSave(kind, mode, form) { setData(old => { const next = structuredClone(old); const item = { ...form }; if (kind === 'categories') item.name = item.name.trim(); if (kind === 'news') { item.title = item.title.trim(); item.content = item.content.trim(); } if (kind === 'users') item.username = item.username.trim(); if (mode === 'create') { item.id = Math.max(0, ...next[kind].map(x => x.id)) + 1; next[kind] = [...next[kind], item]; } else { next[kind] = next[kind].map(x => x.id === item.id ? item : x); } return next; }); }
```

**Dòng gốc 17** — Delete: chặn xóa record đang được tham chiếu; chỉ xóa khi an toàn.

```jsx
function onDelete(kind, id) { if (kind === 'categories' && data.news.some(n => n.categoryId === id)) return 'Cannot delete: at least one article is assigned to this category.'; if (kind === 'users' && data.news.some(n => n.createdBy === id)) return 'Cannot delete: at least one article references this author.'; if (kind === 'users' && id === user.id) return 'Cannot delete the currently signed-in administrator.'; setData(old => ({ ...old, [kind]: old[kind].filter(x => x.id !== id) })); return true; }
```

**Dòng gốc 18** — Đầu hàm validate: kiểm tra đầu vào theo loại entity.

```jsx
function validate(kind, form, id) {
```

**Dòng gốc 19** — Category: yêu cầu tên và không trùng tên với danh mục khác.

```jsx
if (kind === 'categories') { if (!validName(form.name)) return 'Category name is required.'; if (data.categories.some(c => c.id !== id && c.name.toLowerCase() === form.name.trim().toLowerCase())) return 'Category name already exists.'; }
```

**Dòng gốc 20** — News: yêu cầu title/content và xác minh Category/User tham chiếu tồn tại.

```jsx
if (kind === 'news') { if (!validName(form.title) || !validName(form.content)) return 'Title and content are required.'; if (!data.categories.some(c => c.id === Number(form.categoryId))) return 'Please select an existing category.'; if (!data.users.some(u => u.id === Number(form.createdBy))) return 'Please select an existing author.'; }
```

**Dòng gốc 21** — Users: username/password bắt buộc và username không được trùng.

```jsx
if (kind === 'users') { if (!validName(form.username) || !validName(form.password)) return 'Username and password are required.'; if (data.users.some(u => u.id !== id && u.username.toLowerCase() === form.username.trim().toLowerCase())) return 'Username already exists.'; } return '';
```

**Dòng gốc 22** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```

**Dòng gốc 23** — Chuyển giá trị dữ liệu thành nhãn, badge hoặc trường quan hệ để hiển thị.

```jsx
const display = (row, field) => { if (field === 'status') return statusCell(row.status); if (field === 'role') return <span className="role-pill">{row.role === 1 ? 'Admin' : 'Staff'}</span>; if (field === 'categoryId') return data.categories.find(c => c.id === row.categoryId)?.name ?? 'Unknown'; if (field === 'createdBy') return data.users.find(u => u.id === row.createdBy)?.username ?? 'Unknown'; if (field === 'title') return <strong className="table-title">{row.title}</strong>; if (field === 'name' || field === 'username') return <strong className="table-title">{row[field]}</strong>; return String(row[field] ?? '—'); };
```

**Dòng gốc 24** — Chưa đăng nhập thì chỉ render Login và dừng nhánh admin.

```jsx
if (!user) return <Login onLogin={login} />;
```

**Dòng gốc 25** — Tính các chỉ số Dashboard từ data đang lưu trong React state.

```jsx
const metric = [{ label: 'Total Articles', value: data.news.length, icon: Newspaper, cls: 'blue' }, { label: 'Categories', value: data.categories.length, icon: FolderOpen, cls: 'purple' }, { label: 'Team Members', value: data.users.length, icon: Users, cls: 'orange' }, { label: 'Published Articles', value: data.news.filter(n => n.status === 1).length, icon: CheckCircle2, cls: 'green' }];
```

**Dòng gốc 26** — Bổ sung options động cho Category và Author trong form News.

```jsx
const completeNewsFields = newsFields.map(f => f.name === 'categoryId' ? { ...f, options: data.categories.map(c => ({ value: c.id, label: c.name })), default: data.categories[0]?.id ?? 0 } : f.name === 'createdBy' ? { ...f, options: data.users.map(u => ({ value: u.id, label: u.username })), default: data.users[0]?.id ?? 0 } : f);
```

**Dòng gốc 27** — Trả AdminLayout và truyền state điều hướng cùng handler logout.

```jsx
return <Layout page={page} setPage={setPage} onLogout={logout}>
```

**Dòng gốc 28** — Nhánh Dashboard: dựng card thống kê và bài viết gần đây.

```jsx
{page === 'dashboard' && <section><div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Welcome back, Admin. Here's what is happening with your content.</p></div><span className="today-chip">FUNews · Live local data</span></div><div className="metrics">{metric.map(m => <div className="metric-card" key={m.label}><div className={'metric-icon ' + m.cls}><m.icon size={21} /></div><div className="metric-value">{m.value}</div><div className="metric-label">{m.label}</div><ArrowUpRight className="metric-arrow" size={17} /></div>)}</div><div className="dashboard-columns"><div className="panel"><div className="panel-heading"><h2>Recent articles</h2><button className="text-action" onClick={() => setPage('news')}>View all <ArrowUpRight size={15} /></button></div><div className="recent-list">{data.news.slice(-4).reverse().map(n => <div className="recent-item" key={n.id}><div className="recent-icon"><Newspaper size={17} /></div><div><strong>{n.title}</strong><small>{data.categories.find(c => c.id === n.categoryId)?.name ?? 'Uncategorized'}</small></div>{statusCell(n.status)}</div>)}{!data.news.length && <p className="muted-pad">No articles yet.</p>}</div></div><div className="panel about-panel"><div className="panel-heading"><h2>Quick start</h2></div><div className="quick-icon"><Database size={28} /></div><h3>Manage your newsroom</h3><p>Create categories, publish news, and organize users from one convenient workspace.</p><button className="btn primary" onClick={() => setPage('news')}>Manage articles <ArrowUpRight size={16} /></button></div></div></section>}
```

**Dòng gốc 29** — Nhánh Categories: truyền data, field, validate và CRUD handlers cho CrudPage.

```jsx
{page === 'categories' && <CrudPage kind="categories" title="Categories" subtitle="Organize topics and keep your newsroom structured." rows={data.categories} fields={categoryFields} renderCell={display} searchFields={['name']} validate={(f, id) => validate('categories', f, id)} onSave={onSave} onDelete={onDelete} />}
```

**Dòng gốc 30** — Nhánh News: truyền dữ liệu News và các lựa chọn relation động.

```jsx
{page === 'news' && <CrudPage kind="news" title="News Articles" subtitle="Create, edit, and manage all your published stories." rows={data.news} fields={completeNewsFields} renderCell={display} searchFields={['title', 'content']} validate={(f, id) => validate('news', f, id)} onSave={onSave} onDelete={onDelete} />}
```

**Dòng gốc 31** — Nhánh Users: truyền dữ liệu tài khoản và cấu hình quản lý.

```jsx
{page === 'users' && <CrudPage kind="users" title="Users" subtitle="Manage access and team member accounts." rows={data.users} fields={userFields} renderCell={display} searchFields={['username']} validate={(f, id) => validate('users', f, id)} onSave={onSave} onDelete={onDelete} />}
```

**Dòng gốc 32** — Nhánh Settings: reset dữ liệu sau khi người dùng xác nhận.

```jsx
{page === 'settings' && <section><div className="page-heading"><div><span className="eyebrow">SYSTEM</span><h1>Settings</h1><p>Local demo configuration and data maintenance.</p></div></div><div className="panel settings-panel"><div className="settings-row"><div className="settings-icon"><ShieldCheck size={24} /></div><div><h3>Mock administrator access</h3><p>Login is intentionally limited to Admin / Admin for this assignment demonstration. No backend or real security layer is included.</p></div></div><div className="settings-row"><div className="settings-icon"><Database size={24} /></div><div><h3>Browser data</h3><p>Categories, articles, and users are stored in this browser's localStorage. Reset restores demo data.</p></div><button className="btn neutral" onClick={() => { if (window.confirm('Reset all records to their initial demo values?')) setData(resetData()); }}><RotateCcw size={16} /> Reset data</button></div></div></section>}
```

**Dòng gốc 33** — Đóng Layout JSX để hoàn tất cây UI.

```jsx
</Layout>;
```

**Dòng gốc 34** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```

**Dòng gốc 35** — Xuất giá trị/component để module khác có thể import.

```jsx
export default App;
```


## `src/components/CrudPage.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { useMemo, useState, useEffect } from 'react';
```

**Dòng gốc 2** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';
```

**Dòng gốc 3** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import Modal from './Modal';
```

**Dòng gốc 4** — Component CRUD generic nhận cấu hình và callback từ App.

```jsx
export default function CrudPage({ kind, title, subtitle, rows, fields, onSave, onDelete, validate, renderCell, searchFields }) {
```

**Dòng gốc 5** — Các state cục bộ: từ khóa, mode dialog, form, lỗi và record chuẩn bị xóa.

```jsx
const [query, setQuery] = useState(''), [dialog, setDialog] = useState(null), [form, setForm] = useState({}), [error, setError] = useState(''), [deleting, setDeleting] = useState(null);
```

**Dòng gốc 6** — Tính danh sách hiển thị từ rows và query; không chỉnh sửa source rows.

```jsx
const shown = useMemo(() => rows.filter(row => searchFields.some(field => String(row[field] ?? '').toLowerCase().includes(query.trim().toLowerCase()))), [rows, query, searchFields]);
```

**Dòng gốc 7** — Mở Create: khởi tạo form theo default rồi mở popup.

```jsx
function openCreate() { setForm(Object.fromEntries(fields.map(f => [f.name, f.default ?? '']))); setError(''); setDialog('create'); }
```

**Dòng gốc 8** — Mở Edit: copy record đang chọn vào form và mở popup Update.

```jsx
function openEdit(record) { setForm({ ...record }); setError(''); setDialog('update'); }
```

**Dòng gốc 9** — Submit: chặn reload, validate, gọi onSave và đóng popup khi hợp lệ.

```jsx
function submit(e) { e.preventDefault(); const problem = validate(form, dialog === 'update' ? form.id : null); if (problem) { setError(problem); return; } onSave(kind, dialog, form); setDialog(null); setError(''); }
```

**Dòng gốc 10** — Dựng tiêu đề, nút Add, công cụ search, bảng records và nút Edit/Delete.

```jsx
return <section><div className="page-heading"><div><span className="eyebrow">CONTENT MANAGEMENT</span><h1>{title}</h1><p>{subtitle}</p></div><button className="btn primary" onClick={openCreate}><Plus size={18} /> Add {kind === 'categories' ? 'Category' : kind === 'news' ? 'Article' : 'User'}</button></div><div className="panel"><div className="table-toolbar"><div className="search-field"><Search size={18} /><input aria-label={'Search ' + title} value={query} onChange={e => setQuery(e.target.value)} placeholder={'Search ' + title.toLowerCase() + '...'} />{query && <button className="icon-btn" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</div><span className="record-count">{shown.length} of {rows.length} records</span></div><div className="table-wrap"><table><thead><tr>{fields.filter(f => f.table !== false).map(f => <th key={f.name}>{f.label}</th>)}<th className="actions-col">Actions</th></tr></thead><tbody>{shown.map(record => <tr key={record.id}>{fields.filter(f => f.table !== false).map(f => <td key={f.name}>{renderCell(record, f.name)}</td>)}<td className="actions-cell"><button className="action-btn" title="Edit" aria-label={'Edit ' + record.id} onClick={() => openEdit(record)}><Pencil size={16} /></button><button className="action-btn danger" title="Delete" aria-label={'Delete ' + record.id} onClick={() => setDeleting(record)}><Trash2 size={16} /></button></td></tr>)}</tbody></table>{shown.length === 0 && <div className="empty"><Search size={28} /><strong>{rows.length ? 'No matching results' : 'No records yet'}</strong><p>{rows.length ? 'Try another keyword or clear the search.' : 'Click Add to create your first record.'}</p></div>}</div></div>
```

**Dòng gốc 11** — Dựng form Create/Update với controlled input/select/textarea.

```jsx
{dialog && <Modal title={(dialog === 'create' ? 'Create' : 'Edit') + ' ' + (kind === 'news' ? 'Article' : kind === 'users' ? 'User' : 'Category')} onClose={() => setDialog(null)}><form onSubmit={submit} className="editor-form">{fields.filter(f => f.editable !== false).map(f => <label key={f.name}>{f.label} {f.required && <span className="required">*</span>}{f.type === 'select' ? <select value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: Number(e.target.value) }))}>{f.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> : f.type === 'textarea' ? <textarea rows={4} value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))} /> : <input type={f.type === 'password' ? 'password' : 'text'} value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))} />}</label>)}{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-footer inline-footer"><button type="button" className="btn neutral" onClick={() => setDialog(null)}>Cancel</button><button type="submit" className="btn primary">{dialog === 'create' ? 'Create' : 'Save changes'}</button></div></form></Modal>}
```

**Dòng gốc 12** — Dựng hộp xác nhận xóa; chỉ gọi onDelete sau thao tác xác nhận.

```jsx
{deleting && <Modal title="Confirm deletion" onClose={() => setDeleting(null)}><p>Delete <strong>{deleting.name || deleting.title || deleting.username}</strong>? This action cannot be undone.</p><div className="modal-footer inline-footer"><button className="btn neutral" onClick={() => setDeleting(null)}>Cancel</button><button className="btn destructive" onClick={() => { const result = onDelete(kind, deleting.id); if (result === true) setDeleting(null); else alert(result); }}>Delete record</button></div></Modal>}
```

**Dòng gốc 13** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
</section>;
```

**Dòng gốc 14** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```


## `src/components/Layout.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { LayoutDashboard, FolderOpen, Newspaper, Users, Settings, LogOut, PanelLeft, Menu } from 'lucide-react';
```

**Dòng gốc 2** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import logo from '../assets/logo.svg';
```

**Dòng gốc 3** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
const menus = [['dashboard', 'Dashboard', LayoutDashboard], ['categories', 'Categories', FolderOpen], ['news', 'News Articles', Newspaper], ['users', 'Users', Users], ['settings', 'Settings', Settings]];
```

**Dòng gốc 4** — Xuất giá trị/component để module khác có thể import.

```jsx
export default function Layout({ page, setPage, onLogout, children }) {
```

**Dòng gốc 5** — Trả về JSX để React dựng giao diện theo trạng thái hiện tại.

```jsx
return <div className="app-shell"><aside className="sidebar"><div className="side-brand"><img src={logo} alt="FUNews logo" /><span>FUNews<small>MANAGEMENT</small></span></div><div className="side-label">WORKSPACE</div><nav aria-label="Main navigation">{menus.map(([id, label, Icon]) => <button key={id} className={'nav-link ' + (page === id ? 'active' : '')} onClick={() => setPage(id)}><Icon size={19} />{label}</button>)}</nav><div className="sidebar-bottom"><div className="mini-profile"><span className="avatar">A</span><div><strong>Admin</strong><small>Administrator</small></div></div><button onClick={onLogout} className="nav-link logout"><LogOut size={18} /> Sign out</button></div></aside><div className="work-area"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{menus.find(m => m[0] === page)?.[1]}</strong></div><div className="top-user"><span className="status-dot" /> Administrator <span className="avatar small">A</span></div></header><main className="main-content">{children}</main><footer className="site-footer">FUNewsManagementSystem <span>Assignment 01 · Demo frontend</span></footer></div></div>;
```

**Dòng gốc 6** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```


## `src/components/Modal.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { X } from 'lucide-react';
```

**Dòng gốc 2** — Xuất giá trị/component để module khác có thể import.

```jsx
export default function Modal({ title, children, onClose, footer }) {
```

**Dòng gốc 3** — Trả về JSX để React dựng giao diện theo trạng thái hiện tại.

```jsx
return <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} role="presentation">
```

**Dòng gốc 4** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
<section className="modal" role="dialog" aria-modal="true" aria-label={title}>
```

**Dòng gốc 5** — Gắn sự kiện click và gọi handler tương ứng khi người dùng thao tác.

```jsx
<header className="modal-title"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></header>
```

**Dòng gốc 6** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
<div className="modal-body">{children}</div>{footer && <footer className="modal-footer">{footer}</footer>}
```

**Dòng gốc 7** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
</section>
```

**Dòng gốc 8** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
</div>;
```

**Dòng gốc 9** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```


## `src/data/seed.js`

**Dòng gốc 1** — Xuất giá trị/component để module khác có thể import.

```jsx
export const seed = {
```

**Dòng gốc 2** — Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.

```jsx
categories: [
```

**Dòng gốc 3** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 1, name: 'Technology', status: 1 },
```

**Dòng gốc 4** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 2, name: 'Education', status: 1 },
```

**Dòng gốc 5** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 3, name: 'Campus Life', status: 0 },
```

**Dòng gốc 6** — Kết thúc mảng dữ liệu được khai báo phía trên.

```jsx
],
```

**Dòng gốc 7** — Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.

```jsx
news: [
```

**Dòng gốc 8** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 1, title: 'React workshop opens this week', content: 'Students can register for the ReactJS workshop.', categoryId: 1, createdBy: 1, status: 1, tags: 'react,workshop' },
```

**Dòng gốc 9** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 2, title: 'New semester orientation', content: 'Orientation sessions for new students.', categoryId: 2, createdBy: 2, status: 1, tags: 'education' },
```

**Dòng gốc 10** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 3, title: 'Campus newsletter', content: 'Highlights from the student community.', categoryId: 3, createdBy: 1, status: 0, tags: 'campus' },
```

**Dòng gốc 11** — Kết thúc mảng dữ liệu được khai báo phía trên.

```jsx
],
```

**Dòng gốc 12** — Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.

```jsx
users: [
```

**Dòng gốc 13** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 1, username: 'Admin', password: 'Admin', role: 1, status: 1 },
```

**Dòng gốc 14** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 2, username: 'editor', password: 'staff123', role: 2, status: 1 },
```

**Dòng gốc 15** — Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.

```jsx
{ id: 3, username: 'reporter', password: 'staff123', role: 2, status: 0 },
```

**Dòng gốc 16** — Kết thúc mảng dữ liệu được khai báo phía trên.

```jsx
],
```

**Dòng gốc 17** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
};
```


## `src/data/storage.js`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { seed } from './seed';
```

**Dòng gốc 2** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
const KEY = 'funews-assignment01-v1';
```

**Dòng gốc 3** — Xuất giá trị/component để module khác có thể import.

```jsx
export function readData() {
```

**Dòng gốc 4** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
try {
```

**Dòng gốc 5** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
const parsed = JSON.parse(localStorage.getItem(KEY));
```

**Dòng gốc 6** — Trả kết quả của hàm để nơi gọi sử dụng.

```jsx
if (parsed && ['categories', 'news', 'users'].every(k => Array.isArray(parsed[k]))) return parsed;
```

**Dòng gốc 7** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
} catch { /* Corrupted storage: fall back to seed. */ }
```

**Dòng gốc 8** — Trả kết quả của hàm để nơi gọi sử dụng.

```jsx
return structuredClone(seed);
```

**Dòng gốc 9** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```

**Dòng gốc 10** — Xuất giá trị/component để module khác có thể import.

```jsx
export function saveData(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
```

**Dòng gốc 11** — Xuất giá trị/component để module khác có thể import.

```jsx
export function resetData() { localStorage.removeItem(KEY); return structuredClone(seed); }
```

**Dòng gốc 12** — Xuất giá trị/component để module khác có thể import.

```jsx
export const sessionKey = 'funews-session-v1';
```


## `src/main.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import './styles/app.css'; createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
```


## `src/pages/Login.jsx`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { useState } from 'react';
```

**Dòng gốc 2** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { LockKeyhole, ArrowRight, Newspaper } from 'lucide-react';
```

**Dòng gốc 3** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import logo from '../assets/logo.svg';
```

**Dòng gốc 4** — Xuất giá trị/component để module khác có thể import.

```jsx
export default function Login({ onLogin }) {
```

**Dòng gốc 5** — Tạo state React và hàm setter; thay đổi state sẽ yêu cầu render lại.

```jsx
const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
```

**Dòng gốc 6** — Định nghĩa hàm xử lý nghiệp vụ hoặc event; xem tham số và kết quả trả về.

```jsx
function submit(e) {
```

**Dòng gốc 7** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
e.preventDefault(); if (!username.trim() || !password.trim()) { setError('Please enter both username and password.'); return; }
```

**Dòng gốc 8** — Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.

```jsx
if (username === 'Admin' && password === 'Admin') { setError(''); onLogin({ id: 1, username: 'Admin', role: 1 }); } else setError('Incorrect username or password.');
```

**Dòng gốc 9** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```

**Dòng gốc 10** — Trả về JSX để React dựng giao diện theo trạng thái hiện tại.

```jsx
return <main className="login-screen"><div className="login-aside"><div className="login-brand"><img src={logo} alt="FUNews AI-generated logo" /> FUNews</div><div><span className="eyebrow light">CAMPUS NEWS PLATFORM</span><h1>Stories that<br />move us <em>forward.</em></h1><p>One workspace to manage your categories, news articles, and editorial team.</p></div><div className="login-footer">FUNewsManagementSystem · SBA301 Assignment 01</div></div><div className="login-form-panel"><form className="login-card" onSubmit={submit}><div className="signin-icon"><LockKeyhole size={25} /></div><span className="eyebrow">ADMIN WORKSPACE</span><h2>Welcome back</h2><p>Sign in to access your content dashboard.</p><label htmlFor="username">Username</label><input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoComplete="username" /><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" />{error && <p className="form-error" role="alert">{error}</p>}<button className="btn primary login-button" type="submit">Sign in <ArrowRight size={18} /></button><div className="credential-hint"><Newspaper size={16} /> Demo: <strong>Admin / Admin</strong></div></form></div></main>;
```

**Dòng gốc 11** — Kết thúc khối hàm hoặc đối tượng được mở trước đó.

```jsx
}
```


## `vite.config.js`

**Dòng gốc 1** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import { defineConfig } from 'vite';
```

**Dòng gốc 2** — Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.

```jsx
import react from '@vitejs/plugin-react';
```

**Dòng gốc 3** — Xuất giá trị/component để module khác có thể import.

```jsx
export default defineConfig({ plugins: [react()] });
```
