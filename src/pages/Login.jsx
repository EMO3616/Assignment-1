/**
 * @file src/pages/Login.jsx
 * @author LongHP CE190280
 * @description Trang đăng nhập mẫu: nhận tài khoản Admin/Admin, kiểm tra dữ liệu và phát sự kiện đăng nhập.

 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { useState } from 'react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { LockKeyhole, ArrowRight, Newspaper } from 'lucide-react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import logo from '../assets/logo.svg';
// Xuất giá trị/component để module khác có thể import.
export default function Login({ onLogin }) {
  // Tạo state React và hàm setter; thay đổi state sẽ yêu cầu render lại.
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  // Định nghĩa hàm xử lý nghiệp vụ hoặc event; xem tham số và kết quả trả về.
  function submit(e) {    
// Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
e.preventDefault(); if (!username.trim() || !password.trim()) { setError('Please enter both username and password.'); return; }
    // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
    if (username === 'Admin' && password === 'Admin') { setError(''); onLogin({ id: 1, username: 'Admin', role: 1 }); } else setError('Incorrect username or password.');  
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
  // Trả về JSX để React dựng giao diện theo trạng thái hiện tại.
  return <main className="login-screen"><div className="login-aside"><div className="login-brand"><img src={logo} alt="FUNews AI-generated logo" /> FUNews</div><div><span className="eyebrow light">CAMPUS NEWS PLATFORM</span><h1>Stories that<br />move us <em>forward.</em></h1><p>One workspace to manage your categories, news articles, and editorial team.</p></div><div className="login-footer">FUNewsManagementSystem · SBA301 Assignment 01</div></div><div className="login-form-panel"><form className="login-card" onSubmit={submit}><div className="signin-icon"><LockKeyhole size={25} /></div><span className="eyebrow">ADMIN WORKSPACE</span><h2>Welcome back</h2><p>Sign in to access your content dashboard.</p><label htmlFor="username">Username</label><input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoComplete="username" /><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" />{error && <p className="form-error" role="alert">{error}</p>}<button className="btn primary login-button" type="submit">Sign in <ArrowRight size={18} /></button><div className="credential-hint"><Newspaper size={16} /> Demo: <strong>Admin / Admin</strong></div></form></div></main>;
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
