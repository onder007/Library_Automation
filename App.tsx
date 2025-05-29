
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import PageContainer from './components/shared/PageContainer';
import BookListPage from './pages/books/BookListPage';

// Placeholder components for other pages
const MemberListPage: React.FC = () => (
  <PageContainer title="Members">
    <p>Member management will be implemented here.</p>
  </PageContainer>
);

const TransactionListPage: React.FC = () => (
  <PageContainer title="Transactions">
    <p>Transaction history will be implemented here.</p>
  </PageContainer>
);

const NotFoundPage: React.FC = () => (
  <PageContainer title="Page Not Found">
    <p>The page you are looking for does not exist.</p>
  </PageContainer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-light flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/members" element={<MemberListPage />} />
          <Route path="/transactions" element={<TransactionListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="bg-neutral-dark text-center text-neutral-light p-4">
        © {new Date().getFullYear()} {APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};

// Make APP_TITLE accessible if not already globally (it's in constants.tsx)
import { APP_TITLE } from './constants'; 

export default App;
