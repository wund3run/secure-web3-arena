
import { useState } from "react";

export function useAuditsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return {
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters
  };
}
