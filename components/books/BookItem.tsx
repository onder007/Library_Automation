
import React from 'react';
import { Book } from '../../types';
import { ICONS } from '../../constants';

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onEdit, onDelete }) => {
  const coverImage = book.coverImageUrl || `https://picsum.photos/seed/${book.id}/200/300?grayscale&blur=2`;
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <img 
        src={coverImage} 
        alt={`Cover of ${book.title}`} 
        className="w-full h-48 object-cover" 
        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/error/200/300?grayscale&blur=2')} // Fallback
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-primary-dark mb-1 truncate" title={book.title}>{book.title}</h3>
        <p className="text-sm text-neutral-dark mb-1">by {book.author}</p>
        <p className="text-xs text-gray-500 mb-2">ISBN: {book.isbn}</p>
        <p className="text-xs text-gray-500 mb-2">Genre: {book.genre} ({book.publicationYear})</p>
        
        <div className="text-xs text-neutral-dark my-2 p-2 bg-neutral-light rounded max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-DEFAULT scrollbar-track-neutral-light">
          {book.description || <span className="italic">No description available.</span>}
        </div>

        <div className="mt-auto pt-2">
          <p className="text-sm font-medium text-primary">
            Copies: {book.availableCopies} / {book.totalCopies} available
          </p>
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="p-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-md flex items-center transition-colors"
              aria-label={`Edit ${book.title}`}
            >
              {ICONS.edit} <span className="ml-1 hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center transition-colors"
              aria-label={`Delete ${book.title}`}
            >
              {ICONS.delete} <span className="ml-1 hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
