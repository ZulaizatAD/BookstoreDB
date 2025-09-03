import { useState, useCallback } from "react";

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

  // Getters
  const booksCount = books.length;

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

      const response = await fetch("http://127.0.0.1:8000/books", {
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

      // Update local state
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

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.from("books").select("*");

      if (error) throw error;

      setBooks(data);
    } catch (err) {
      setError(err.message || "Failed to fetch books");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBook = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://127.0.0.1:8000/books/${bookId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  const fetchBookById = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError("");
      setBookLoaded(null);

      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`);

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

  const updateBook = useCallback(
    async (bookId, bookData) => {
      try {
        setUpdateBookLoading(true);
        setUpdateBookError("");

        const response = await fetch(
          `http://127.0.0.1:8000/books/${bookId}/edit`,
          {
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
          }
        );

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
    booksCount,

    // Actions
    fetchBooks,
    fetchBookById,
    addBook,
    deleteBook,
    updateBook,

    booksCount: books.length,

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
