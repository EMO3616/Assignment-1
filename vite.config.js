/**
 * @file vite.config.js
 * @author LongHP CE190280
 * @description Cấu hình Vite và plugin React cho môi trường phát triển/build.

 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { defineConfig } from 'vite';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import react from '@vitejs/plugin-react';
// Xuất giá trị/component để module khác có thể import.
export default defineConfig({ plugins: [react()] });
