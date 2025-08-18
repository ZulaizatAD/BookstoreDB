import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BookForm from '../components/BookForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooksStore } from '../stores/BookStores';

const EditBook = () => {
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const {
    updateBookError,
    loading,
    error,
    bookLoaded,
    updateBook,
    fetchBookById,
    setError,
  } = useBooksStore();

  // Form data
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: 0,
    qty: 0,
  });

  // Store original data to detect changes
  const [originalData, setOriginalData] = useState({});

  // Form validation
  const [valid, setValid] = useState(false);

  // Computed property to check if there are changes
  const hasChanges = useMemo(() => {
    return JSON.stringify(bookData) !== JSON.stringify(originalData);
  }, [bookData, originalData]);

  // Watch for changes in bookLoaded from store
  useEffect(() => {
    if (bookLoaded) {
      const bookInfo = {
        title: bookLoaded.title,
        author: bookLoaded.author,
        price: bookLoaded.price,
        qty: bookLoaded.qty,
      };
      setBookData({ ...bookInfo });
      setOriginalData({ ...bookInfo });
    }
  }, [bookLoaded]);

  // Fetch book data on component mount
  useEffect(() => {
    if (bookId) {
      fetchBookById(bookId).catch((error) => {
        console.error('Failed to fetch book:', error);
      });
    } else {
      navigate('/');
    }
  }, [bookId, fetchBookById, navigate]);

  // Methods
  const handleUpdateBook = async (formData) => {
    if (!valid || !hasChanges) return;

    try {
      await updateBook(bookId, formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aliceblue via-blue-50 to-aliceblue py-8">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={goBack}
              className="p-2 text-cadetblue hover:bg-cadetblue/10 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-gray">Edit Book</h1>
              <p className="text-gray-600 mt-1">Update the book details below</p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && !bookLoaded && (
          <div className="card animate-fade-in">
            <div className="p-12 text-center">
              <LoadingSpinner size="lg" text="Loading book details..." />
            </div>
          </div>
        )}

        {/* Main form card */}
        {!loading && !error && bookLoaded && (
          <div className="card animate-fade-in">
            {/* Card Header */}
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <PencilSquareIcon className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Edit Book Information</h2>
              </div>
              {!hasChanges && (
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  No changes detected
                </span>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6">
              <BookForm
                value={bookData}
                onChange={setBookData}
                valid={valid}
                onValidChange={setValid}
                onSubmit={handleUpdateBook}
              />
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="card animate-fade-in">
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-gray mb-2">Book Not Found</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                className="btn-primary"
                onClick={goBack}
              >
                Go Back to Books
              </button>
            </div>
          </div>
        )}

        {/* Update Error Messages */}
        {updateBookError && (
          <div className="mt-6 alert alert-error animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold">Update Failed</h3>
                  <p className="text-sm mt-1">{updateBookError}</p>
                </div>
              </div>
              <button
                className="text-current hover:opacity-70 transition-opacity"
                onClick={clearError}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;