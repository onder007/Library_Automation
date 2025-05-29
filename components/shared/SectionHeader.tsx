
import React from 'react';
import { ICONS } from '../../constants';

interface SectionHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: React.ReactNode; // For search bars or filters
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, buttonText, onButtonClick, children }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-neutral-DEFAULT">
      <h2 className="text-2xl font-semibold text-neutral-dark mb-4 sm:mb-0">{title}</h2>
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {children}
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ICONS.add}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
