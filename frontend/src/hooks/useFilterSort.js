import { useState, useMemo, useCallback } from 'react';

export const useFilterSort = (books) => {
  const [filters, setFilters] = useState({
    search: '',
    stockStatus: 'all',
    priceRange: 'all',
    author: ''
  });

  const [sortConfig, setSortConfig] = useState({
    field: 'title',
    direction: 'asc'
  });

  // Filter books based on current filters
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Search filter (title and author)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = book.title.toLowerCase().includes(searchTerm);
        const authorMatch = book.author.toLowerCase().includes(searchTerm);
        if (!titleMatch && !authorMatch) return false;
      }

      // Stock status filter
      if (filters.stockStatus !== 'all') {
        switch (filters.stockStatus) {
          case 'inStock':
            if (book.qty < 10) return false;
            break;
          case 'lowStock':
            if (book.qty === 0 || book.qty >= 10) return false;
            break;
          case 'outOfStock':
            if (book.qty > 0) return false;
            break;
        }
      }

      // Price range filter
      if (filters.priceRange !== 'all') {
        const price = parseFloat(book.price);
        switch (filters.priceRange) {
          case 'under10':
            if (price >= 10) return false;
            break;
          case '10to50':
            if (price < 10 || price > 50) return false;
            break;
          case 'over50':
            if (price <= 50) return false;
            break;
        }
      }

      // Author filter
      if (filters.author) {
        const authorTerm = filters.author.toLowerCase();
        if (!book.author.toLowerCase().includes(authorTerm)) return false;
      }

      return true;
    });
  }, [books, filters]);

  // Sort filtered books
  const sortedAndFilteredBooks = useMemo(() => {
    const sorted = [...filteredBooks].sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      // Handle different data types
      if (sortConfig.field === 'price' || sortConfig.field === 'qty') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortConfig.field === 'id') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      } else {
        // String comparison for title and author
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredBooks, sortConfig]);

  // Handlers
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSortConfig) => {
    setSortConfig(newSortConfig);
  }, []);

  // Reset filters and sort
  const resetFiltersAndSort = useCallback(() => {
    setFilters({
      search: '',
      stockStatus: 'all',
      priceRange: 'all',
      author: ''
    });
    setSortConfig({
      field: 'title',
      direction: 'asc'
    });
  }, []);

  return {
    filteredBooks: sortedAndFilteredBooks,
    filters,
    sortConfig,
    handleFilterChange,
    handleSortChange,
    resetFiltersAndSort,
    totalBooks: books.length,
    filteredCount: sortedAndFilteredBooks.length
  };
};