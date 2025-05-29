
import React from 'react';
import { ICONS } from '../../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100] p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-neutral-DEFAULT">
          <h3 id="modal-title" className="text-xl font-semibold text-neutral-dark">{title}</h3>
          <button
            onClick={onClose}
            className="text-neutral-dark hover:text-red-500 transition-colors p-1 rounded-full hover:bg-neutral-light"
            aria-label="Close modal"
          >
            {ICONS.close}
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
          {children}
        </div>
        {footer && (
          <div className="p-4 sm:p-6 border-t border-neutral-DEFAULT bg-neutral-light rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
