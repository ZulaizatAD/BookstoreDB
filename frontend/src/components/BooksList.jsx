import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
  UserIcon,
  CurrencyDollarIcon,
  CubeIcon
} from "@heroicons/react/24/outline";

const BooksList = ({ books = [], loading = false, onDeleteBook, showStats = false }) => {
  const navigate = useNavigate();

  const editBook = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  // Loading skeleton with enhanced animations
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="card filter-loading"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-6">
              <div className="h-6 bg-light-steel-blue rounded mb-2"></div>
              <div className="h-4 bg-light-steel-blue rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-light-steel-blue rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-light-steel-blue rounded w-2/3"></div>
            </div>
            <div className="px-6 py-4 bg-aliceblue rounded-b-xl">
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-light-steel-blue rounded"></div>
                <div className="flex-1 h-8 bg-light-steel-blue rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Enhanced no results state
  if (books.length === 0 && !loading) {
    return (
      <div className="w-full">
        <div className={`${showStats ? 'no-results' : 'alert alert-info'} max-w-2xl mx-auto animate-fade-in`}>
          <div className="flex flex-col items-center text-center">
            <BookOpenIcon className="w-12 h-12 text-cadetblue mb-4" />
            <h3 className="text-lg font-semibold text-slate-gray mb-2">
              {showStats ? 'No books match your filters' : 'No books found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {showStats 
                ? "Try adjusting your search criteria or filters to see more results."
                : "Click \"Load Books\" to fetch data or \"Add Books\" to create new ones."
              }
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
          className="book-card-filtered filter-delay-1"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Card Header */}
          <div className="p-6 flex-grow">
            <div className="flex items-start justify-between mb-3">
              <BookOpenIcon className="h-6 w-6 text-cadetblue flex-shrink-0 mt-1" />
              <span className="text-xs font-medium text-cadetblue bg-cadetblue/10 px-2 py-1 rounded-full">
                #{book.id}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-slate-gray mb-2 line-clamp-2 group-hover:text-cadetblue filter-transition">
              {book.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4 flex items-center">
              <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1 filter-text-truncate">{book.author}</span>
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-cadetblue">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  <span className="text-2xl font-bold">
                    {parseFloat(book.price).toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <CubeIcon className="h-4 w-4 mr-1" />
                    <span>Qty</span>
                  </div>
                  <div className="text-lg font-semibold text-slate-gray">
                    {book.qty}
                  </div>
                </div>
              </div>

              {/* Enhanced stock status indicator with animations */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full filter-transition ${
                      book.qty > 10
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : book.qty > 0
                        ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                        : "bg-red-400 shadow-lg shadow-red-400/50"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full filter-transition ${
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

          {/* Enhanced Card Actions */}
          <div className="px-6 py-4 bg-gradient-to-r from-aliceblue to-blue-50 rounded-b-xl border-t border-light-steel-blue/30">
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-cadetblue hover:bg-cadetblue hover:text-white rounded-lg filter-transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cadetblue focus:ring-offset-2"
                onClick={() => editBook(book.id)}
                title={`Edit ${book.title}`}
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white rounded-lg filter-transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed transform-none" : ""
                }`}
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