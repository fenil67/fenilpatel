import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSearch } from '../../hooks/useSearch';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { searchQuery, results, loading, error } = useSearch();

  const handleSearch = (query: string) => {
    searchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      <main className="flex-grow">
        {children}
        
        {/* Search results */}
        {loading && (
          <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary"></div>
              <span className="ml-3 text-gray-700 dark:text-gray-300">Searching...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-red-300 dark:border-red-700 z-50 animate-fade-in">
            <div className="text-red-500 dark:text-red-400">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && results.length > 0 && (
          <div className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Search Results</h3>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="p-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{result.text}</p>
                  {result.source && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Source: {result.source}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 