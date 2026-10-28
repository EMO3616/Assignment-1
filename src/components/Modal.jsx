import { X } from 'lucide-react';
export default function Modal({title,children,onClose,footer}) {
  return <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) onClose();}} role="presentation">
    <section className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <header className="modal-title"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={19}/></button></header>
      <div className="modal-body">{children}</div>{footer && <footer className="modal-footer">{footer}</footer>}
    </section>
  </div>;
}
