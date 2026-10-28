/**
 * @file src/components/Modal.jsx
 * @author LongHP CE190280
 * @description Hộp thoại tái sử dụng cho biểu mẫu Create/Update và xác nhận xóa.
 * @remarks Chú thích phục vụ học tập; giữ nguyên logic nghiệp vụ của source gốc.
 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { X } from 'lucide-react';
// Xuất giá trị/component để module khác có thể import.
export default function Modal({ title, children, onClose, footer }) {
  // Trả về JSX để React dựng giao diện theo trạng thái hiện tại.
  return <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} role="presentation">
    // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
    <section className="modal" role="dialog" aria-modal="true" aria-label={title}>
      // Gắn sự kiện click và gọi handler tương ứng khi người dùng thao tác.
      <header className="modal-title"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></header>
      // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
      <div className="modal-body">{children}</div>{footer && <footer className="modal-footer">{footer}</footer>}
    // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
    </section>
  // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
  </div>;
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
