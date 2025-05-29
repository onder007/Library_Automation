
import React from 'react';
import { AlertMessage } from '../../types';

interface AlertProps extends AlertMessage {
  onDismiss?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onDismiss }) => {
  const baseClasses = "p-4 mb-4 rounded-lg shadow-md flex items-center justify-between";
  const typeClasses = {
    success: "bg-green-100 border-l-4 border-green-500 text-green-700",
    error: "bg-red-100 border-l-4 border-red-500 text-red-700",
    info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <span>{message}</span>
      {onDismiss && (
        <button 
          onClick={onDismiss} 
          className="ml-4 text-lg font-semibold hover:opacity-75"
          aria-label="Dismiss alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
