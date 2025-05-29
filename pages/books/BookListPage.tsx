
import React, { useState, useMemo, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Book, FormMode, AlertMessage } from '../../types';
import PageContainer from '../../components/shared/PageContainer';
import SectionHeader from '../../components/shared/SectionHeader';
import BookItem from '../../components/books/BookItem';
import BookFormModal from '../../components/books/BookFormModal';
import Alert from '../../components/shared/Alert';
import EmptyState from '../../components/shared/EmptyState';
import { ICONS } from '../../constants';

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    genre: 'Classic',
    publicationYear: 1925,
    description: 'A story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, set in the Jazz Age on Long Island.',
    totalCopies: 5,
    availableCopies: 3,
    coverImageUrl: `https://picsum.photos/seed/1/200/300?grayscale&blur=2`
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    genre: 'Classic',
    publicationYear: 1960,
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, as seen through the eyes of a young girl named Scout Finch.',
    totalCopies: 3,
    availableCopies: 1,
    coverImageUrl: `https://picsum.photos/seed/2/200/300?grayscale&blur=2`
  },
   {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    genre: 'Dystopian',
    publicationYear: 1949,
    description: 'A chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever.',
    totalCopies: 7,
    availableCopies: 7,
    coverImageUrl: `https://picsum.photos/seed/3/200/300?grayscale&blur=2`
  }
];


const BookListPage: React.FC = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<FormMode>('add');
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

  const handleOpenModal = useCallback((mode: FormMode, book: Book | null = null) => {
    setModalMode(mode);
    setCurrentBook(book);
    setIsModalOpen(true);
    setAlertMessage(null); // Clear previous alerts
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentBook(null);
  }, []);

  const handleFormSubmit = useCallback((bookData: Book) => {
    if (modalMode === 'add') {
      const newBook: Book = {
        ...bookData,
        id: Date.now().toString(), // Simple ID generation
        availableCopies: bookData.totalCopies, // Initially all copies are available
        coverImageUrl: bookData.coverImageUrl || `https://picsum.photos/seed/${Date.now().toString()}/200/300?grayscale&blur=2`
      };
      setBooks(prevBooks => [...prevBooks, newBook]);
      setAlertMessage({ type: 'success', message: 'Book added successfully!' });
    } else if (currentBook) {
      setBooks(prevBooks =>
        prevBooks.map(b => (b.id === currentBook.id ? { ...b, ...bookData } : b))
      );
      setAlertMessage({ type: 'success', message: 'Book updated successfully!' });
    }
    handleCloseModal();
  }, [modalMode, currentBook, setBooks, handleCloseModal]);

  const handleDeleteBook = useCallback((bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      setBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
      setAlertMessage({ type: 'success', message: 'Book deleted successfully.' });
    }
  }, [setBooks]);
  
  const handleDismissAlert = useCallback(() => {
    setAlertMessage(null);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  return (
    <PageContainer>
      {alertMessage && <Alert type={alertMessage.type} message={alertMessage.message} onDismiss={handleDismissAlert} />}
      
      <SectionHeader 
        title="Manage Books" 
        buttonText="Add New Book" 
        onButtonClick={() => handleOpenModal('add')}
      >
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search books (title, author, ISBN, genre)..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search books"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {ICONS.search}
          </div>
        </div>
      </SectionHeader>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookItem
              key={book.id}
              book={book}
              onEdit={() => handleOpenModal('edit', book)}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ICONS.book}
          title={searchTerm ? "No Books Match Your Search" : "No Books Yet"}
          message={searchTerm ? "Try adjusting your search terms." : "Get started by adding a new book to your library collection."}
          actionButtonText={searchTerm ? undefined : "Add New Book"}
          onActionClick={searchTerm ? undefined : () => handleOpenModal('add')}
        />
      )}

      {isModalOpen && (
        <BookFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          initialData={currentBook}
          mode={modalMode}
        />
      )}
    </PageContainer>
  );
};

export default BookListPage;
