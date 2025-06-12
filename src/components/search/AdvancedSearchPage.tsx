
import React, { useState, useEffect } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { AdvancedSearchFilters } from './AdvancedSearchFilters';
import { SearchResultCard } from './SearchResultCard';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

export const AdvancedSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    types: [],
    tags: [],
    category: undefined,
    sortBy: 'relevance' as const
  });

  const { results, pagination, loading, error, search, clearResults } = useAdvancedSearch();
  const debouncedQuery = useDebounce(query, 300);

  // Perform search when debounced query or filters change
  useEffect(() => {
    if (debouncedQuery.trim() || filters.types.length > 0 || filters.tags.length > 0 || filters.category) {
      search(debouncedQuery, filters, 1);
    } else {
      clearResults();
    }
  }, [debouncedQuery, filters, search, clearResults]);

  // Update URL with search query
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set('q', query.trim());
    }
    setSearchParams(params);
  }, [query, setSearchParams]);

  const handleResultClick = (result: any) => {
    const basePath = {
      'article': '/knowledge-base',
      'tutorial': '/tutorials', 
      'topic': '/forum'
    }[result.type] || '/';
    
    navigate(`${basePath}/${result.slug}`);
  };

  const loadMore = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      search(debouncedQuery, filters, pagination.page + 1);
    }
  };

  return (
    <StandardLayout
      title="Advanced Search | Hawkly"
      description="Search across articles, tutorials, and forum topics"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
              Advanced Search
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Find articles, tutorials, and discussions across our platform
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for security guides, tutorials, or discussions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <AdvancedSearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClear={() => setFilters({
                  types: [],
                  tags: [],
                  category: undefined,
                  sortBy: 'relevance'
                })}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {loading && results.length === 0 && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2 text-lg">Searching...</span>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              {!loading && !error && results.length === 0 && (query.trim() || filters.types.length > 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No results found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}

              {pagination && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {results.length} of {pagination.total} results
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {results.map((result) => (
                  <SearchResultCard
                    key={`${result.type}-${result.id}`}
                    result={result}
                    onClick={() => handleResultClick(result)}
                  />
                ))}
              </div>

              {pagination && pagination.page < pagination.totalPages && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMore}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More Results'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};
