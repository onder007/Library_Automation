
import React, { useState, useEffect, useCallback } from 'react';
import { Book, FormMode } from '../../types';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import { generateBookDescription } from '../../services/geminiService';
import { ICONS } from '../../constants';
import LoadingSpinner from '../shared/LoadingSpinner';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Book) => void;
  initialData?: Book | null;
  mode: FormMode;
}

const currentYear = new Date().getFullYear();

const BookFormModal: React.FC<BookFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    publicationYear: currentYear,
    description: '',
    totalCopies: 1,
    coverImageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      setFormData({
        ...initialData,
        publicationYear: initialData.publicationYear || currentYear,
        totalCopies: initialData.totalCopies || 1,
      });
    } else if (isOpen && mode === 'add') {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        publicationYear: currentYear,
        description: '',
        totalCopies: 1,
        availableCopies: 1, // Default for new books
        coverImageUrl: '',
      });
    }
    setErrors({}); // Reset errors when modal opens or mode changes
    setAiError(null);
  }, [isOpen, mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required.';
    if (!formData.author?.trim()) newErrors.author = 'Author is required.';
    if (!formData.isbn?.trim()) newErrors.isbn = 'ISBN is required.';
    else if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(formData.isbn)) { // Basic ISBN-10/13 check
        newErrors.isbn = 'Enter a valid 10 or 13 digit ISBN.';
    }
    if (!formData.genre?.trim()) newErrors.genre = 'Genre is required.';
    if (!formData.publicationYear || formData.publicationYear < 1000 || formData.publicationYear > currentYear) {
      newErrors.publicationYear = `Year must be between 1000 and ${currentYear}.`;
    }
    if (!formData.totalCopies || formData.totalCopies < 0) {
      newErrors.totalCopies = 'Total copies must be a non-negative number.';
    }
     if (mode === 'edit' && initialData && (formData.totalCopies || 0) < (initialData.totalCopies - initialData.availableCopies)) {
      newErrors.totalCopies = `Total copies cannot be less than the number of copies currently out on loan (${initialData.totalCopies - initialData.availableCopies}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submittedBookData: Book = {
      id: initialData?.id || '', // ID will be set by parent for 'add' mode
      title: formData.title!,
      author: formData.author!,
      isbn: formData.isbn!,
      genre: formData.genre!,
      publicationYear: formData.publicationYear!,
      description: formData.description,
      totalCopies: formData.totalCopies!,
      availableCopies: mode === 'add' 
        ? formData.totalCopies! 
        : (initialData?.availableCopies !== undefined 
            ? initialData.availableCopies + (formData.totalCopies! - (initialData.totalCopies || 0)) // Adjust available if total changed
            : formData.totalCopies!), 
      coverImageUrl: formData.coverImageUrl || `https://picsum.photos/seed/${formData.isbn || Date.now()}/200/300?grayscale&blur=2`,
    };
     // Ensure availableCopies is not negative or greater than totalCopies
    submittedBookData.availableCopies = Math.max(0, Math.min(submittedBookData.availableCopies, submittedBookData.totalCopies!));

    onSubmit(submittedBookData);
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.author) {
      setAiError("Please enter a title and author before generating a description.");
      return;
    }
    setIsGeneratingDesc(true);
    setAiError(null);
    try {
      const description = await generateBookDescription(formData.title, formData.author);
      setFormData(prev => ({ ...prev, description }));
      if (description.toLowerCase().includes("api key not valid") || description.toLowerCase().includes("service error")) {
        setAiError(description);
      }
    } catch (error) {
      console.error("AI Description generation failed:", error);
      setAiError("Failed to generate description. Please try again or enter manually.");
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const modalTitle = mode === 'add' ? 'Add New Book' : 'Edit Book';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormField
            label="Title"
            id="title"
            value={formData.title || ''}
            onChange={handleChange}
            error={errors.title}
            required
          />
          <FormField
            label="Author"
            id="author"
            value={formData.author || ''}
            onChange={handleChange}
            error={errors.author}
            required
          />
        </div>
        <FormField
          label="ISBN"
          id="isbn"
          value={formData.isbn || ''}
          onChange={handleChange}
          error={errors.isbn}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormField
            label="Genre"
            id="genre"
            value={formData.genre || ''}
            onChange={handleChange}
            error={errors.genre}
            required
          />
          <FormField
            label="Publication Year"
            id="publicationYear"
            type="number"
            value={formData.publicationYear || ''}
            onChange={handleChange}
            error={errors.publicationYear}
            required
          />
        </div>
        <FormField
            label="Total Copies"
            id="totalCopies"
            type="number"
            value={formData.totalCopies || ''}
            onChange={handleChange}
            error={errors.totalCopies}
            required
        />
        <FormField
          label="Cover Image URL (Optional)"
          id="coverImageUrl"
          value={formData.coverImageUrl || ''}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg or leave blank for placeholder"
        />
        <div>
          <FormField
            label="Description"
            id="description"
            textarea
            rows={4}
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Enter book description or generate with AI"
          />
          <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={isGeneratingDesc || !formData.title || !formData.author}
            className="mt-1 mb-3 flex items-center text-sm text-primary hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGeneratingDesc ? (
              <>
                <LoadingSpinner size="sm" /> 
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              <>
                {ICONS.aiSparkle}
                <span className="ml-1">Generate with AI</span>
              </>
            )}
          </button>
          {aiError && <p className="text-xs text-red-500 mb-2">{aiError}</p>}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-dark bg-neutral-light hover:bg-neutral-DEFAULT rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
            disabled={isGeneratingDesc}
          >
            {mode === 'add' ? 'Add Book' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookFormModal;
