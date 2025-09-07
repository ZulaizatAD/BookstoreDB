import { useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { buildApiUrl } from "../config/api";

export const useBooksStore = () => {
  // State
  const [books, setBooks] = useState([]);
  const [addBookLoading, setAddBookLoading] = useState(false);
  const [addBookError, setAddBookError] = useState("");
  const [updateBookLoading, setUpdateBookLoading] = useState(false);
  const [updateBookError, setUpdateBookError] = useState("");
  const [bookLoaded, setBookLoaded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper function to handle API errors
  const handleApiError = (error, defaultMessage) => {
    console.error("API Error:", error);
    if (error.message.includes("Failed to fetch")) {
      return "Unable to connect to server. Please check your connection.";
    }
    return error.message || defaultMessage;
  };

  // Actions
  const addBook = useCallback(async (bookData) => {
    try {
      setAddBookLoading(true);
      setAddBookError("");

      const response = await fetch(buildApiUrl("api/books"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookData.title,
          author: bookData.author,
          price: Number(bookData.price),
          qty: Number(bookData.qty),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Failed to add book`
        );
      }

      const result = await response.json();
      setBooks((prevBooks) => [...prevBooks, result]);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err, "Failed to add book");
      setAddBookError(errorMessage);
      throw err;
    } finally {
      setAddBookLoading(false);
    }
  }, []);

  // Fetch books from backend
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(buildApiUrl("api/books"));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Failed to fetch books`
        );
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message || "Failed to fetch books");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete book by ID
  const deleteBook = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(buildApiUrl(`api/books/${bookId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Failed to delete book`
        );
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      const errorMessage = handleApiError(err, "Failed to delete book");
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch book by ID
  const fetchBookById = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError("");
      setBookLoaded(null);

      const response = await fetch(buildApiUrl(`api/books/${bookId}`));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Book not found`
        );
      }

      const result = await response.json();
      setBookLoaded(result);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err, "Failed to fetch book");
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update book by ID
  const updateBook = useCallback(
    async (bookId, bookData) => {
      try {
        setUpdateBookLoading(true);
        setUpdateBookError("");

        const response = await fetch(buildApiUrl(`api/books/${bookId}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: bookData.title,
            author: bookData.author,
            price: Number(bookData.price),
            qty: Number(bookData.qty),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `HTTP ${response.status}: Failed to update book`
          );
        }

        const result = await response.json();

        // Update the book in local state
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === parseInt(bookId) ? result : book
          )
        );

        // Update bookLoaded if it's the same book
        if (bookLoaded && bookLoaded.id === parseInt(bookId)) {
          setBookLoaded(result);
        }

        return result;
      } catch (err) {
        const errorMessage = handleApiError(err, "Failed to update book");
        setUpdateBookError(errorMessage);
        throw err;
      } finally {
        setUpdateBookLoading(false);
      }
    },
    [bookLoaded]
  );

  // Clear error functions
  const clearAddBookError = useCallback(() => setAddBookError(""), []);
  const clearUpdateBookError = useCallback(() => setUpdateBookError(""), []);
  const clearError = useCallback(() => setError(""), []);

  return {
    // State
    books,
    bookLoaded,
    loading,
    error,
    addBookLoading,
    addBookError,
    updateBookLoading,
    updateBookError,

    // Getters
    booksCount: books.length,

    // Actions
    fetchBooks,
    fetchBookById,
    addBook,
    deleteBook,
    updateBook,

    // Error clearing functions
    clearAddBookError,
    clearUpdateBookError,
    clearError,

    // State setters (if needed for direct manipulation)
    setBooks,
    setBookLoaded,
    setError,
    setAddBookError,
    setUpdateBookError,
  };
};
