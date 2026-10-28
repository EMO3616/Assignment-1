/**
 * @file src/data/storage.js
 * @author LongHP CE190280
 * @description Đọc, lưu và đặt lại dữ liệu mẫu trong localStorage; cung cấp khóa session.
 * @remarks Chú thích phục vụ học tập; giữ nguyên logic nghiệp vụ của source gốc.
 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { seed } from './seed';
// Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
const KEY = 'funews-assignment01-v1';
// Xuất giá trị/component để module khác có thể import.
export function readData() {
  // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
  try {
    // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
    const parsed = JSON.parse(localStorage.getItem(KEY));
    // Trả kết quả của hàm để nơi gọi sử dụng.
    if (parsed && ['categories', 'news', 'users'].every(k => Array.isArray(parsed[k]))) return parsed;
  // Kết thúc khối hàm hoặc đối tượng được mở trước đó.
  } catch { /* Corrupted storage: fall back to seed. */ }
  // Trả kết quả của hàm để nơi gọi sử dụng.
  return structuredClone(seed);
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
// Xuất giá trị/component để module khác có thể import.
export function saveData(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
// Xuất giá trị/component để module khác có thể import.
export function resetData() { localStorage.removeItem(KEY); return structuredClone(seed); }
// Xuất giá trị/component để module khác có thể import.
export const sessionKey = 'funews-session-v1';
