
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  type: 'article' | 'tutorial' | 'topic';
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  author_id: string;
  author_name: string;
  author_avatar_url?: string;
  relevance_score: number;
  rating_average?: number;
  created_at: string;
}

export interface SearchFilters {
  types: string[];
  tags: string[];
  category?: string;
  sortBy: 'relevance' | 'newest' | 'rating';
}

export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseAdvancedSearchReturn {
  results: SearchResult[];
  pagination: SearchPagination | null;
  loading: boolean;
  error: string | null;
  search: (query: string, filters?: Partial<SearchFilters>, page?: number) => Promise<void>;
  clearResults: () => void;
}

export const useAdvancedSearch = (): UseAdvancedSearchReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pagination, setPagination] = useState<SearchPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (
    query: string,
    filters: Partial<SearchFilters> = {},
    page: number = 1
  ) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = {
        query: query.trim() || null,
        types: filters.types || [],
        tags: filters.tags || [],
        category: filters.category || null,
        sortBy: filters.sortBy || 'relevance',
        page,
        limit: 20
      };

      const { data, error: searchError } = await supabase.functions.invoke('advanced-search', {
        body: searchParams
      });

      if (searchError) {
        throw searchError;
      }

      setResults(data.results || []);
      setPagination(data.pagination || null);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
      setResults([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setPagination(null);
    setError(null);
  }, []);

  return {
    results,
    pagination,
    loading,
    error,
    search,
    clearResults
  };
};
