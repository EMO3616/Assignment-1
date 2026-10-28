/**
 * @file src/data/seed.js
 * @author LongHP CE190280
 * @description Khai báo tập dữ liệu mẫu gồm Category, News Article và User.
 * @remarks Chú thích phục vụ học tập; giữ nguyên logic nghiệp vụ của source gốc.
 */

// Xuất giá trị/component để module khác có thể import.
export const seed = {
  // Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.
  categories: [
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 1, name: 'Technology', status: 1 },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 2, name: 'Education', status: 1 },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 3, name: 'Campus Life', status: 0 },
  // Kết thúc mảng dữ liệu được khai báo phía trên.
  ],
  // Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.
  news: [
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 1, title: 'React workshop opens this week', content: 'Students can register for the ReactJS workshop.', categoryId: 1, createdBy: 1, status: 1, tags: 'react,workshop' },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 2, title: 'New semester orientation', content: 'Orientation sessions for new students.', categoryId: 2, createdBy: 2, status: 1, tags: 'education' },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 3, title: 'Campus newsletter', content: 'Highlights from the student community.', categoryId: 3, createdBy: 1, status: 0, tags: 'campus' },
  // Kết thúc mảng dữ liệu được khai báo phía trên.
  ],
  // Tạo dữ liệu mẫu cho nhóm đối tượng tương ứng.
  users: [
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 1, username: 'Admin', password: 'Admin', role: 1, status: 1 },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 2, username: 'editor', password: 'staff123', role: 2, status: 1 },
    // Khai báo record hoặc biểu thức JSX dùng cho dữ liệu/hiển thị.
    { id: 3, username: 'reporter', password: 'staff123', role: 2, status: 0 },
  // Kết thúc mảng dữ liệu được khai báo phía trên.
  ],
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
};
