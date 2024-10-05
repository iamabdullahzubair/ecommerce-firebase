import React from "react";

const Modal = ({ onClose, children, outsideClose }) => {
  // Function to handle clicks outside the modal
  const handleOverlayClick = (e) => {
    // Check if the click is on the overlay
    if (!outsideClose) {
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-11/12 max-w-fit">
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 absolute top-4 right-4"
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
