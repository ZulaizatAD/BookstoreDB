import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
  UserIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const BooksList = ({
  books = [],
  loading = false,
  onDeleteBook,
  showStats = false,
}) => {
  const navigate = useNavigate();

  const editBook = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  // Loading skeleton with fixed structure
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="book-card filter-loading"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="book-card-content">
              <div className="h-6 bg-light-steel-blue rounded mb-2"></div>
              <div className="h-4 bg-light-steel-blue rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-light-steel-blue rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-light-steel-blue rounded w-2/3"></div>
            </div>
            <div className="card-actions">
              <div className="card-actions-buttons">
                <div className="flex-1 h-10 bg-light-steel-blue rounded"></div>
                <div className="flex-1 h-10 bg-light-steel-blue rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No results state
  if (books.length === 0 && !loading) {
    return (
      <div className="w-full">
        <div
          className={`${
            showStats ? "no-results" : "alert alert-info"
          } max-w-2xl mx-auto animate-fade-in`}
        >
          <div className="flex flex-col items-center text-center">
            <BookOpenIcon className="w-12 h-12 text-cadetblue mb-4" />
            <h3 className="text-lg font-semibold text-slate-gray mb-2">
              {showStats ? "No books match your filters" : "No books found"}
            </h3>
            <p className="text-gray-600 mb-4">
              {showStats
                ? "Try adjusting your search criteria or filters to see more results."
                : 'Click "Load Books" to fetch data or "Add Books" to create new ones.'}
            </p>
            {showStats && (
              <div className="flex gap-2 text-xs text-gray-500">
                <span>💡 Tip: Try broader search terms or reset filters</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="book-card group animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Card Content */}
          <div className="book-card-content">
            {/* Card Header */}
            <div className="book-card-header">
              <BookOpenIcon className="h-6 w-6 text-cadetblue flex-shrink-0 mt-1" />
              <span className="text-xs font-medium text-cadetblue bg-cadetblue/10 px-2 py-1 rounded-full ml-auto">
                #{book.id}
              </span>
            </div>

            {/* Title */}
            <h2 className="book-card-title">{book.title}</h2>

            {/* Author */}
            <p className="book-card-author">
              <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{book.author}</span>
            </p>

            {/* Details Section */}
            <div className="book-card-details">
              {/* Price and Quantity */}
              <div className="book-card-price-qty">
                <div className="book-card-price">
                  <span className="text-sm font-medium text-cadetblue mr-1">
                    RM
                  </span>
                  <span className="text-2xl font-bold">
                    {parseFloat(book.price).toFixed(2)}
                  </span>
                </div>
                <div className="book-card-qty">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <CubeIcon className="h-4 w-4 mr-1" />
                    <span>Qty</span>
                  </div>
                  <div className="text-lg font-semibold text-slate-gray">
                    {book.qty}
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="book-card-status">
                <div className="book-card-status-indicator">
                  <div
                    className={`book-card-status-dot ${
                      book.qty > 10
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : book.qty > 0
                        ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                        : "bg-red-400 shadow-lg shadow-red-400/50"
                    }`}
                  ></div>
                  <span
                    className={`book-card-status-label ${
                      book.qty > 10
                        ? "text-green-700 bg-green-100"
                        : book.qty > 0
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {book.qty > 10
                      ? "In Stock"
                      : book.qty > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="card-actions">
            <div className="card-actions-buttons">
              <button
                className="card-action-button-edit"
                onClick={() => editBook(book.id)}
                title={`Edit ${book.title}`}
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button
                className="card-action-button-delete"
                disabled={loading}
                onClick={() => onDeleteBook(book.id)}
                title={`Delete ${book.title}`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    <span>Delete</span>
                  </>
                ) : (
                  <>
                    <TrashIcon className="h-4 w-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
