import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BooksList from "../components/BooksList";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useBooksStore } from "../stores/BookStores";

const Index = () => {
  const { books, loading, error, booksCount, fetchBooks, deleteBook } =
    useBooksStore();

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const handleLoadBooks = async () => {
    try {
      await fetchBooks();
      showToast("success", "Books loaded successfully!");
    } catch (error) {
      showToast("error", "Failed to load books");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      showToast("success", "Book deleted successfully!");
    } catch (error) {
      showToast("error", "Failed to delete book");
    }
  };

  useEffect(() => {
    handleLoadBooks();
  }, []);

  // Calculate stats
  const inStockBooks = books.filter((book) => book.qty > 0).length;
  const outOfStockBooks = books.filter((book) => book.qty === 0).length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-slate-gray">
          Welcome to BookStore Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your book inventory with ease. Add, edit, and track your books
          in one place.
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
        <Link to="/add-book" className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Book
        </Link>

        <button
          onClick={handleLoadBooks}
          disabled={loading}
          className="btn-secondary"
        >
          <ArrowPathIcon
            className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          {loading ? "Loading..." : "Refresh Books"}
        </button>
      </div>

      {/* Stats Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-cadetblue mb-2 group-hover:text-cadetblue-dark transition-colors">
              {booksCount}
            </div>
            <div className="text-gray-600">Total Books</div>
          </div>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors">
              {inStockBooks}
            </div>
            <div className="text-gray-600">In Stock</div>
          </div>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors">
              {outOfStockBooks}
            </div>
            <div className="text-gray-600">Out of Stock</div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-error animate-slide-up">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold">Error Loading Books</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Books List */}
      <div
        className="space-y-6 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-gray">
            Book Inventory
          </h2>
          <div className="text-sm text-gray-500">
            {booksCount} {booksCount === 1 ? "book" : "books"} total
          </div>
        </div>

        {loading && books.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading books..." />
          </div>
        ) : (
          <BooksList
            books={books}
            loading={loading}
            onDeleteBook={handleDeleteBook}
          />
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Index;
