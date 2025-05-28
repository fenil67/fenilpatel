import React, { useState, useRef, useEffect } from 'react';
import { FiMoon, FiSun, FiSearch } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus on input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter key
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <a href="/" className="hover:text-secondary transition-colors">Portfolio</a>
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors">
              About
            </a>
            <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors">
              Skills
            </a>
            <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isSearchOpen ? (
              <form 
                className="relative animate-fade-in"
                onSubmit={handleSearchSubmit}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-2 text-sm border rounded-full dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    if (!searchQuery) {
                      setTimeout(() => setIsSearchOpen(false), 200);
                    }
                  }}
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  disabled={!searchQuery.trim()}
                >
                  <FiSearch />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            )}
            
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 