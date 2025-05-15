
import { useState, useEffect } from "react";

export function useAuditsPage() {
  // Retrieve user preferences from local storage with defaults
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window === 'undefined') return "grid";
    const saved = localStorage.getItem("audit-view-preference");
    return (saved === "list" || saved === "grid") ? saved : "grid";
  });
  
  const [showFilters, setShowFilters] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem("audit-filters-visible");
    return saved === "true";
  });
  
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Save preferences to local storage when they change
  useEffect(() => {
    localStorage.setItem("audit-view-preference", viewMode);
  }, [viewMode]);
  
  useEffect(() => {
    localStorage.setItem("audit-filters-visible", String(showFilters));
  }, [showFilters]);
  
  // Performance tracking
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const loadTime = performance.now() - startTime;
      console.info(`Audits page render time: ${loadTime.toFixed(2)}ms`);
      
      // Report to analytics in a real implementation
      if (loadTime > 500) {
        console.warn("Slow render time for audits page");
      }
    };
  }, []);

  return {
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading
  };
}
