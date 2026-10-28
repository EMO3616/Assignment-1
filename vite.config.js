/**
 * @file vite.config.js
 * @author LongHP CE190280
 * @description Cấu hình Vite và plugin React cho môi trường phát triển/build.
 * @remarks Chú thích phục vụ học tập; giữ nguyên logic nghiệp vụ của source gốc.
 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { defineConfig } from 'vite';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import react from '@vitejs/plugin-react';
// Xuất giá trị/component để module khác có thể import.
export default defineConfig({ plugins: [react()] });
