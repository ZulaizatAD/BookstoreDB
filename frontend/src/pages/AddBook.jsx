import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import BookForm from "../components/BookForm";
import { useBooksStore } from "../stores/BookStores";

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook, addBookLoading, addBookError } = useBooksStore();

  // Form data
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    qty: 0,
  });

  // Form validation
  const [valid, setValid] = useState(false);

  // Methods
  const handleAddBook = async () => {
    if (!valid) return;

    try {
      await addBook(bookData);

      // Reset form on success
      setBookData({
        title: "",
        author: "",
        price: 0,
        qty: 0,
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const goBack = () => {
    navigate("/");
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
              <h1 className="text-3xl font-bold text-slate-gray">Add New Book</h1>
              <p className="text-gray-600 mt-1">Fill in the details to add a new book to your inventory</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="card animate-fade-in">
          {/* Card Header */}
          <div className="card-header">
            <div className="flex items-center space-x-3">
              <PlusIcon className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Book Information</h2>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Loading State */}
            {addBookLoading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cadetblue"></div>
                  <span className="text-blue-800 font-medium">Adding book to inventory...</span>
                </div>
              </div>
            )}

            <BookForm
              value={bookData}
              onChange={setBookData}
              valid={valid}
              onValidChange={setValid}
              onSubmit={handleAddBook}
            />
          </div>
        </div>

        {/* Error Message */}
        {addBookError && (
          <div className="mt-6 alert alert-error animate-slide-up">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-3 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Error Adding Book</h3>
                <p className="text-sm mt-1">{addBookError}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBook;