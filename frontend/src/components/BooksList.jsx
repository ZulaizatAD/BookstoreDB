import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const BooksList = ({ books = [], loading = false, onDeleteBook }) => {
  const navigate = useNavigate();

  const editBook = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card animate-pulse">
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

  // Show info message when no books and not loading
  if (books.length === 0 && !loading) {
    return (
      <div className="w-full">
        <div className="alert alert-info max-w-2xl mx-auto">
          <div className="flex items-center">
            <BookOpenIcon className="w-6 h-6 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">No books found</h3>
              <p className="text-sm opacity-90">
                Click "Load Books" to fetch data or "Add Books" to create new
                ones.
              </p>
            </div>
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
          className="card group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Card Header */}
          <div className="p-6 flex-grow">
            <div className="flex items-start justify-between mb-3">
              <BookOpenIcon className="h-6 w-6 text-cadetblue flex-shrink-0 mt-1" />
              <span className="text-xs font-medium text-cadetblue bg-cadetblue/10 px-2 py-1 rounded-full">
                #{book.id}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-slate-gray mb-2 line-clamp-2 group-hover:text-cadetblue transition-colors duration-200">
              {book.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4 flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {book.author}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cadetblue">
                  ${parseFloat(book.price).toFixed(2)}
                </span>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Quantity</div>
                  <div className="text-lg font-semibold text-slate-gray">
                    {book.qty}
                  </div>
                </div>
              </div>

              {/* Stock status indicator */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    book.qty > 10
                      ? "bg-green-400"
                      : book.qty > 0
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                ></div>
                <span
                  className={`text-xs font-medium ${
                    book.qty > 10
                      ? "text-green-600"
                      : book.qty > 0
                      ? "text-yellow-600"
                      : "text-red-600"
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

          {/* Card Actions */}
          <div className="px-6 py-4 bg-gradient-to-r from-aliceblue to-blue-50 rounded-b-xl border-t border-light-steel-blue/30">
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-cadetblue hover:bg-cadetblue hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cadetblue focus:ring-offset-2"
                onClick={() => editBook(book.id)}
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed transform-none" : ""
                }`}
                disabled={loading}
                onClick={() => onDeleteBook(book.id)}
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
