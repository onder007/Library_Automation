
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {title && <h1 className="text-3xl font-bold text-neutral-dark mb-6">{title}</h1>}
      {children}
    </div>
  );
};

export default PageContainer;
