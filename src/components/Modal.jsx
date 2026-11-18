import { FiX } from "react-icons/fi";

const Modal = ({ title, children, onClose, size = "medium" }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>

          <button className="icon-button" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;