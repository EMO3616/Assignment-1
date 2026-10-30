/**
 * @file src/components/CrudPage.jsx
 * @author LongHP CE190280
 * @description Component CRUD dùng chung cho Category, News và Users: bảng, tìm kiếm, modal và xác nhận xóa.

 */

// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { useMemo, useState, useEffect } from 'react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';
// Nạp các thư viện hoặc component cần dùng; import không tự chạy UI.
import Modal from './Modal';
// Component CRUD generic nhận cấu hình và callback từ App.
export default function CrudPage({ kind, title, subtitle, rows, fields, onSave, onDelete, validate, renderCell, searchFields }) {
  // Các state cục bộ: từ khóa, mode dialog, form, lỗi và record chuẩn bị xóa.
  const [query, setQuery] = useState(''), [dialog, setDialog] = useState(null), [form, setForm] = useState({}), [error, setError] = useState(''), [deleting, setDeleting] = useState(null);
  // Tính danh sách hiển thị từ rows và query; không chỉnh sửa source rows.
  const shown = useMemo(() => rows.filter(row => searchFields.some(field => String(row[field] ?? '').toLowerCase().includes(query.trim().toLowerCase()))), [rows, query, searchFields]);
  // Mở Create: khởi tạo form theo default rồi mở popup.
  function openCreate() { setForm(Object.fromEntries(fields.map(f => [f.name, f.default ?? '']))); setError(''); setDialog('create'); }
  // Mở Edit: copy record đang chọn vào form và mở popup Update.
  function openEdit(record) { setForm({ ...record }); setError(''); setDialog('update'); }
  // Submit: chặn reload, validate, gọi onSave và đóng popup khi hợp lệ.
  function submit(e) { e.preventDefault(); const problem = validate(form, dialog === 'update' ? form.id : null); if (problem) { setError(problem); return; } onSave(kind, dialog, form); setDialog(null); setError(''); }
  // Dựng tiêu đề, nút Add, công cụ search, bảng records và nút Edit/Delete.
  return <section><div className="page-heading"><div><span className="eyebrow">CONTENT MANAGEMENT</span><h1>{title}</h1><p>{subtitle}</p></div><button className="btn primary" onClick={openCreate}><Plus size={18} /> Add {kind === 'categories' ? 'Category' : kind === 'news' ? 'Article' : 'User'}</button></div><div className="panel"><div className="table-toolbar"><div className="search-field"><Search size={18} /><input aria-label={'Search ' + title} value={query} onChange={e => setQuery(e.target.value)} placeholder={'Search ' + title.toLowerCase() + '...'} />{query && <button className="icon-btn" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</div><span className="record-count">{shown.length} of {rows.length} records</span></div><div className="table-wrap"><table><thead><tr>{fields.filter(f => f.table !== false).map(f => <th key={f.name}>{f.label}</th>)}<th className="actions-col">Actions</th></tr></thead><tbody>{shown.map(record => <tr key={record.id}>{fields.filter(f => f.table !== false).map(f => <td key={f.name}>{renderCell(record, f.name)}</td>)}<td className="actions-cell"><button className="action-btn" title="Edit" aria-label={'Edit ' + record.id} onClick={() => openEdit(record)}><Pencil size={16} /></button><button className="action-btn danger" title="Delete" aria-label={'Delete ' + record.id} onClick={() => setDeleting(record)}><Trash2 size={16} /></button></td></tr>)}</tbody></table>{shown.length === 0 && <div className="empty"><Search size={28} /><strong>{rows.length ? 'No matching results' : 'No records yet'}</strong><p>{rows.length ? 'Try another keyword or clear the search.' : 'Click Add to create your first record.'}</p></div>}</div></div>
    // Dựng form Create/Update với controlled input/select/textarea.
    {dialog && <Modal title={(dialog === 'create' ? 'Create' : 'Edit') + ' ' + (kind === 'news' ? 'Article' : kind === 'users' ? 'User' : 'Category')} onClose={() => setDialog(null)}><form onSubmit={submit} className="editor-form">{fields.filter(f => f.editable !== false).map(f => <label key={f.name}>{f.label} {f.required && <span className="required">*</span>}{f.type === 'select' ? <select value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: Number(e.target.value) }))}>{f.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> : f.type === 'textarea' ? <textarea rows={4} value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))} /> : <input type={f.type === 'password' ? 'password' : 'text'} value={form[f.name] ?? ''} onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))} />}</label>)}{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-footer inline-footer"><button type="button" className="btn neutral" onClick={() => setDialog(null)}>Cancel</button><button type="submit" className="btn primary">{dialog === 'create' ? 'Create' : 'Save changes'}</button></div></form></Modal>}
    // Dựng hộp xác nhận xóa; chỉ gọi onDelete sau thao tác xác nhận.
    {deleting && <Modal title="Confirm deletion" onClose={() => setDeleting(null)}><p>Delete <strong>{deleting.name || deleting.title || deleting.username}</strong>? This action cannot be undone.</p><div className="modal-footer inline-footer"><button className="btn neutral" onClick={() => setDeleting(null)}>Cancel</button><button className="btn destructive" onClick={() => { const result = onDelete(kind, deleting.id); if (result === true) setDeleting(null); else alert(result); }}>Delete record</button></div></Modal>}
  // Thực hiện khai báo hoặc biểu thức theo ngữ cảnh của module.
  </section>;
// Kết thúc khối hàm hoặc đối tượng được mở trước đó.
}
