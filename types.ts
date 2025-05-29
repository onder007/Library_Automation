
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  coverImageUrl?: string; // Optional: using picsum for now
}

export interface Member {
  id: string;
  name: string;
  memberId: string; // Unique library-assigned ID
  email: string;
  phone?: string;
  joinDate: string; // ISO string
}

export interface Loan {
  id:string;
  bookId: string;
  memberId: string;
  borrowDate: string; // ISO string
  dueDate: string;    // ISO string
  returnDate?: string; // ISO string, undefined if not returned
}

export type FormMode = 'add' | 'edit';

export interface AlertMessage {
  type: 'success' | 'error' | 'info';
  message: string;
}
