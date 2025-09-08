import React, { useState, useCallback, memo } from "react";
import {
  FunnelIcon,
  ArrowsUpDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const FilterSort = memo(
  ({ onFilterChange, onSortChange, totalBooks, filteredBooks }) => {
    const [filters, setFilters] = useState({
      search: "",
      stockStatus: "all",
      priceRange: "all",
      author: "",
    });

    const [sortConfig, setSortConfig] = useState({
      field: "title",
      direction: "asc",
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    // Handle filter changes
    const handleFilterChange = useCallback(
      (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
      },
      [filters, onFilterChange]
    );

    // Handle sort changes
    const handleSortChange = useCallback(
      (field) => {
        const newDirection =
          sortConfig.field === field && sortConfig.direction === "asc"
            ? "desc"
            : "asc";

        const newSortConfig = { field, direction: newDirection };
        setSortConfig(newSortConfig);
        onSortChange(newSortConfig);
      },
      [sortConfig, onSortChange]
    );

    // Clear all filters
    const clearFilters = useCallback(() => {
      const clearedFilters = {
        search: "",
        stockStatus: "all",
        priceRange: "all",
        author: "",
      };
      setFilters(clearedFilters);
      onFilterChange(clearedFilters);
    }, [onFilterChange]);

    const hasActiveFilters =
      filters.search ||
      filters.stockStatus !== "all" ||
      filters.priceRange !== "all" ||
      filters.author;

    const activeFilterCount = [
      filters.search,
      filters.stockStatus !== "all",
      filters.priceRange !== "all",
      filters.author,
    ].filter(Boolean).length;

    return (
      <div className="card filter-shadow-hover animate-fade-in">
        <div className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-cadetblue" />
            </div>
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="filter-input pl-10 w-full filter-focus"
            />
          </div>

          {/* Quick Filters & Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {/* Stock Status Filter */}
              <div className="relative">
                <select
                  value={filters.stockStatus}
                  onChange={(e) =>
                    handleFilterChange("stockStatus", e.target.value)
                  }
                  className="filter-input py-2 text-sm filter-focus appearance-none pr-10 cursor-pointer"
                >
                  <option value="all">All Stock Status</option>
                  <option value="inStock">In Stock (10+)</option>
                  <option value="lowStock">Low Stock (1-9)</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-cadetblue pointer-events-none" />
              </div>

              {/* Price Range Filter */}
              <div className="relative">
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                  className="filter-input py-2 text-sm filter-focus appearance-none pr-10 cursor-pointer"
                >
                  <option value="all">All Prices</option>
                  <option value="under10">Under RM10</option>
                  <option value="10to50">RM10 - RM50</option>
                  <option value="over50">Over RM50</option>
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-cadetblue pointer-events-none" />
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`relative flex items-center ${
                  showAdvanced ? "sort-button-active" : "sort-button-inactive"
                }`}
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                <span>Advanced</span>
                {activeFilterCount > 0 && (
                  <span className="filter-count">{activeFilterCount}</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Results Count */}
              <span className="text-sm text-gray-600 font-medium">
                {filteredBooks} of {totalBooks} books
              </span>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 filter-transition"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="filter-panel">
              <div className="filter-grid">
                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Filter by Author
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name..."
                    value={filters.author}
                    onChange={(e) =>
                      handleFilterChange("author", e.target.value)
                    }
                    className="filter-input w-full text-sm filter-focus"
                  />
                </div>

                {/* Additional filter space for future enhancements */}
                <div className="flex items-end">
                  <div className="text-xs text-gray-500 italic">
                    More filters coming soon...
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="border-t border-light-steel-blue pt-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowsUpDownIcon className="h-5 w-5 text-cadetblue" />
              <span className="text-sm font-medium text-slate-gray">
                Sort by:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { field: "title", label: "Title", icon: "📚" },
                { field: "author", label: "Author", icon: "👤" },
                { field: "price", label: "Price", icon: "💰" },
                { field: "qty", label: "Quantity", icon: "📦" },
                { field: "id", label: "Date Added", icon: "📅" },
              ].map(({ field, label, icon }) => (
                <button
                  key={field}
                  onClick={() => handleSortChange(field)}
                  className={`${
                    sortConfig.field === field
                      ? "sort-button-active"
                      : "sort-button-inactive"
                  } filter-focus`}
                >
                  <span className="mr-1">{icon}</span>
                  {label}
                  {sortConfig.field === field && (
                    <span className="ml-2 font-bold">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="border-t border-light-steel-blue pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FunnelIcon className="h-4 w-4 text-cadetblue" />
                  <span className="text-sm font-medium text-slate-gray">
                    Active Filters:
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {((filteredBooks / totalBooks) * 100).toFixed(1)}% of books
                  shown
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FilterSort.displayName = "FilterSort";

export default FilterSort;