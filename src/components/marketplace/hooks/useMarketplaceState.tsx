
import { useState, useEffect } from 'react';

export function useMarketplaceState() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showEnhancedOnboarding, setShowEnhancedOnboarding] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedMarketplaceOnboarding = localStorage.getItem('marketplace-onboarding-completed');
    const hasCompletedEnhancedOnboarding = localStorage.getItem('hawkly_onboarding_completed');
    
    if (!hasCompletedMarketplaceOnboarding && !hasCompletedEnhancedOnboarding) {
      // Delay showing onboarding slightly for better UX
      const timer = setTimeout(() => setShowEnhancedOnboarding(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters function
  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    setShowAIRecommendations(filters.aiRecommendations || false);
    
    console.log("Applied filters:", filters);
  };

  const handleOnboardingComplete = () => {
    // Mark both onboardings as completed
    localStorage.setItem('marketplace-onboarding-completed', 'true');
    localStorage.setItem('hawkly_onboarding_completed', 'true');
    setShowEnhancedOnboarding(false);
    setShowOnboarding(false);
  };

  return {
    viewMode, setViewMode,
    showFilters, setShowFilters,
    activeCategory, setActiveCategory,
    isLoading, setIsLoading,
    showOnboarding, setShowOnboarding,
    showEnhancedOnboarding, setShowEnhancedOnboarding,
    selectedService, setSelectedService,
    activeFilters, setActiveFilters,
    showAIRecommendations, setShowAIRecommendations,
    handleApplyFilters,
    handleOnboardingComplete
  };
}
