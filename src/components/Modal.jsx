import { createPortal } from "react-dom";

export default function Modal({
   title,
   content,
   show,
   onClose,
   onConfirm,
   confirmText = "Conferma",
}) {
   if (!show) return null;

   return createPortal(
      <div
         className="modal fade show d-block"
         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h2 className="modal-title">{title}</h2>
                  <button className="btn-close" onClick={onClose} />
               </div>
               <div className="modal-body">{content}</div>
               <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={onClose}>
                     Annulla
                  </button>
                  <button className="btn btn-danger" onClick={onConfirm}>
                     {confirmText}
                  </button>
               </div>
            </div>
         </div>
      </div>,
      document.body,
   );
}
