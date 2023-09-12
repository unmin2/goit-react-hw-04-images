import React, { useEffect } from 'react';
import '../styles.css';

const Modal = ({ imageURL, onClose }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
