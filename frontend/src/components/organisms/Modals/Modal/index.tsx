import React, { useEffect, useCallback } from 'react';
import './index.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show d-block app-modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="generic-modal-title"
      >
        <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold" id="generic-modal-title">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={onClose}
              />
            </div>
            <div className="modal-body p-4">{children}</div>
            {footer && <div className="modal-footer border-top">{footer}</div>}
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        data-testid="modal-backdrop"
        onClick={onClose}
      />
    </>
  );
};

export default Modal;
