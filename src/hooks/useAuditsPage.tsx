
import { useState } from "react";

export interface FilterOptions {
  auditStatus?: string[];
  severity?: string[];
  blockchains?: string[];
  dateRange?: [Date | null, Date | null];
  searchTerm?: string;
}

export function useAuditsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("dateDesc");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    auditStatus: [],
    severity: [],
    blockchains: [],
    dateRange: [null, null],
    searchTerm: ""
  });

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => {
      const currentValues = prev[type] as string[] || [];
      const valueExists = currentValues.includes(value);
      
      if (valueExists) {
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      }
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      auditStatus: [],
      severity: [],
      blockchains: [],
      dateRange: [null, null],
      searchTerm: ""
    });
  };

  const updateSearchTerm = (term: string) => {
    setFilterOptions(prev => ({
      ...prev,
      searchTerm: term
    }));
  };

  return {
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    sortBy,
    setSortBy,
    filterOptions,
    setFilterOptions,
    toggleFilter,
    clearFilters,
    updateSearchTerm
  };
}
