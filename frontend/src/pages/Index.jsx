import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BooksList from "../components/BooksList";
import FilterSort from "../components/FilterSort";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useBooksStore } from "../stores/BookStores";
import { useFilterSort } from "../hooks/useFilterSort";

const Index = () => {
  const { books, loading, error, booksCount, fetchBooks, deleteBook } =
    useBooksStore();

  const {
    filteredBooks,
    filters,
    sortConfig,
    handleFilterChange,
    handleSortChange,
    resetFiltersAndSort,
    totalBooks,
    filteredCount,
  } = useFilterSort(books);

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

  // Calculate stats from filtered books
  const inStockBooks = filteredBooks.filter((book) => book.qty > 10).length;
  const lowStockBooks = filteredBooks.filter(
    (book) => book.qty > 0 && book.qty < 10
  ).length;
  const outOfStockBooks = filteredBooks.filter((book) => book.qty === 0).length;

  const hasActiveFilters =
    filters.search ||
    filters.stockStatus !== "all" ||
    filters.priceRange !== "all" ||
    filters.author;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-slate-gray">
          Welcome to BookStore Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your book inventory with ease. Add, edit, filter, and track
          your books in one place.
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

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFiltersAndSort}
            className="btn-secondary text-sm"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-cadetblue mb-2 group-hover:text-cadetblue-dark transition-colors">
              {filteredCount}
            </div>
            <div className="text-gray-600">
              {filteredCount === totalBooks ? "Total Books" : "Filtered Books"}
            </div>
            {filteredCount !== totalBooks && (
              <div className="text-xs text-gray-500 mt-1">
                of {totalBooks} total
              </div>
            )}
          </div>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors">
              {inStockBooks}
            </div>
            <div className="text-gray-600">In Stock (10+)</div>
          </div>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-700 transition-colors">
              {lowStockBooks}
            </div>
            <div className="text-gray-600">Low Stock (1-9)</div>
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

      {/* Filter and Sort Controls */}
      {!loading && books.length > 0 && (
        <FilterSort
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          totalBooks={totalBooks}
          filteredBooks={filteredCount}
        />
      )}

      {/* Books List Section */}
      <div
        className="space-y-6 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-gray">
            Book Inventory
          </h2>
          <div className="text-sm text-gray-500 flex items-center space-x-4">
            <span>
              Showing {filteredCount} of {totalBooks} books
            </span>
            {sortConfig.field !== "title" && (
              <span className="text-cadetblue font-medium">
                Sorted by {sortConfig.field}{" "}
                {sortConfig.direction === "asc" ? "↑" : "↓"}
              </span>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">
              Active filters:
            </span>
            {filters.search && (
              <span className="filter-badge">Search: "{filters.search}"</span>
            )}
            {filters.stockStatus !== "all" && (
              <span className="filter-badge">
                Stock:{" "}
                {filters.stockStatus.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
            )}
            {filters.priceRange !== "all" && (
              <span className="filter-badge">
                Price:{" "}
                {filters.priceRange === "under10"
                  ? "Under RM10"
                  : filters.priceRange === "10to50"
                  ? "RM10-RM50"
                  : "Over RM50"}
              </span>
            )}
            {filters.author && (
              <span className="filter-badge">Author: "{filters.author}"</span>
            )}
          </div>
        )}

        {/* Books Display */}
        {loading && books.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading books..." />
          </div>
        ) : filteredBooks.length === 0 && books.length > 0 ? (
          <div className="w-full">
            <div className="alert alert-warning max-w-2xl mx-auto">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">
                    No books match your filters
                  </h3>
                  <p className="text-sm opacity-90">
                    Try adjusting your search terms or filters to see more
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <BooksList
            books={filteredBooks}
            loading={loading}
            onDeleteBook={handleDeleteBook}
            showStats={hasActiveFilters}
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
