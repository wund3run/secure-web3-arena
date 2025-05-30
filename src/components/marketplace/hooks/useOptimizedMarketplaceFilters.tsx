
import { useState, useCallback, useMemo } from 'react';

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  blockchains: string[];
  deliveryTime: string;
  rating: number;
  sortBy: string;
}

export const useOptimizedMarketplaceFilters = (initialFilters: Partial<FilterState> = {}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    priceRange: [0, 10000],
    blockchains: [],
    deliveryTime: 'any',
    rating: 0,
    sortBy: 'relevance',
    ...initialFilters,
  });

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: [0, 10000],
      blockchains: [],
      deliveryTime: 'any',
      rating: 0,
      sortBy: 'relevance',
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.category !== 'all' ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 10000 ||
      filters.blockchains.length > 0 ||
      filters.deliveryTime !== 'any' ||
      filters.rating > 0 ||
      filters.sortBy !== 'relevance'
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search !== '') count++;
    if (filters.category !== 'all') count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000) count++;
    if (filters.blockchains.length > 0) count++;
    if (filters.deliveryTime !== 'any') count++;
    if (filters.rating > 0) count++;
    if (filters.sortBy !== 'relevance') count++;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
};
