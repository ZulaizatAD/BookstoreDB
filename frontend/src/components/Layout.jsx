import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, PlusIcon, HomeIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-cadetblue to-steel-blue shadow-cadet sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white text-shadow">
                BookStore Manager
              </h1>
            </div>
            
            <nav className="flex space-x-2">
              <Link
                to="/"
                className={`nav-link flex items-center space-x-2 ${
                  isActive('/') ? 'bg-white/20' : ''
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/add-book"
                className={`nav-link flex items-center space-x-2 ${
                  isActive('/add-book') ? 'bg-white/20' : ''
                }`}
              >
                <PlusIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Add Book</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-gray text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm opacity-80">
            © 2025 BookStore Manager. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;