
import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  actionButtonText?: string;
  onActionClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, actionButtonText, onActionClick }) => {
  return (
    <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md">
      {icon && <div className="text-primary text-5xl mb-4 inline-block">{icon}</div>}
      <h3 className="text-xl font-semibold text-neutral-dark mb-2">{title}</h3>
      <p className="text-neutral-dark mb-6">{message}</p>
      {actionButtonText && onActionClick && (
        <button
          onClick={onActionClick}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-lg transition-all"
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
