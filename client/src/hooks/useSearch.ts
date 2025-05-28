import { useState } from 'react';
import { apiService, QueryResult } from '../services/api';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.sendQuery(searchQuery);
      setResults(response.results || []);
    } catch (err) {
      console.error('Error searching:', err);
      setError('Failed to search. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchQuery,
  };
}; 