const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
