/**
 * @file src/main.jsx
 * @author LongHP CE190280
 * @description Điểm khởi chạy React: gắn ứng dụng vào phần tử root của index.html.
 * @remarks Chú thích phục vụ học tập; giữ nguyên logic nghiệp vụ của source gốc.
 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import './styles/app.css'; createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
