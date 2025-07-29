import React, { useReducer, useCallback } from 'react';
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";
import { toast } from "sonner";
import { handleApiError } from "@/utils/apiErrorHandler";
import { useQuery } from '@tanstack/react-query';
import { 
  MarketplaceState, 
  MarketplaceAction, 
  initialState, 
  MarketplaceContextType, 
  MarketplaceContext 
} from './MarketplaceContextTypes';

// Create the reducer
const marketplaceReducer = (state: MarketplaceState, action: MarketplaceAction): MarketplaceState => {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SHOW_FILTERS':
      return { ...state, showFilters: action.payload };
    case 'SET_ACTIVE_CATEGORY':
      return { ...state, activeCategory: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SHOW_ONBOARDING':
      return { ...state, showOnboarding: action.payload };
    case 'SET_SHOW_ENHANCED_ONBOARDING':
      return { ...state, showEnhancedOnboarding: action.payload };
    case 'SET_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    case 'SET_ACTIVE_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'SET_SHOW_AI_RECOMMENDATIONS':
      return { ...state, showAIRecommendations: action.payload };
    case 'SET_SERVICES_FOR_COMPARISON':
      return { ...state, servicesForComparison: action.payload };
    case 'SET_SHOW_COMPARISON':
      return { ...state, showComparison: action.payload };
    case 'TOGGLE_COMPARE_SERVICE': {
      const isAlreadyAdded = state.servicesForComparison.some(s => s.id === action.payload.id);
      if (isAlreadyAdded) {
        return {
          ...state,
          servicesForComparison: state.servicesForComparison.filter(s => s.id !== action.payload.id)
        };
      } else {
        if (state.servicesForComparison.length >= 3) {
          toast.warning("You can compare up to 3 services at a time", {
            description: "Remove a service before adding another"
          });
          return state;
        }
        return {
          ...state,
          servicesForComparison: [...state.servicesForComparison, action.payload]
        };
      }
    }
    case 'APPLY_FILTERS':
      return {
        ...state,
        activeFilters: action.payload,
        showAIRecommendations: !!action.payload.aiRecommendations
      };
    case 'COMPLETE_ONBOARDING':
      localStorage.setItem('marketplace-onboarding-completed', 'true');
      localStorage.setItem('hawkly_onboarding_completed', 'true');
      return {
        ...state,
        showEnhancedOnboarding: false,
        showOnboarding: false
      };
    default:
      return state;
  }
};

interface MarketplaceProviderProps {
  children: React.ReactNode;
  services?: ServiceCardProps[];
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({ children, services = [] }) => {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  // Check onboarding status on mount
  React.useEffect(() => {
    const hasCompletedMarketplaceOnboarding = localStorage.getItem('marketplace-onboarding-completed');
    const hasCompletedEnhancedOnboarding = localStorage.getItem('hawkly_onboarding_completed');
    
    if (!hasCompletedMarketplaceOnboarding && !hasCompletedEnhancedOnboarding) {
      // Delay showing onboarding slightly for better UX
      const timer = setTimeout(() => 
        dispatch({ type: 'SET_SHOW_ENHANCED_ONBOARDING', payload: true }), 
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [dispatch]);
  
  // Simulate loading state for better UX
  React.useEffect(() => {
    const timer = setTimeout(() => 
      dispatch({ type: 'SET_IS_LOADING', payload: false }),
      800
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Use React Query to fetch services
  const servicesQuery = useQuery({
    queryKey: ['marketplace-services'],
    queryFn: async () => {
      // In a real app, this would be an actual API call
      // For now, we just return the services prop or mock data after a delay
      return new Promise<ServiceCardProps[]>((resolve) => {
        setTimeout(() => {
          resolve(services);
        }, 600);
      });
    },
    initialData: services,
  });

  // Action creators as hooks to avoid repetitive dispatch calls
  const setViewMode = useCallback((mode: "grid" | "list") => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  }, []);

  const setShowFilters = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_FILTERS', payload: show });
  }, []);

  const setActiveCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: category });
  }, []);

  const setSelectedService = useCallback((service: ServiceCardProps | null) => {
    dispatch({ type: 'SET_SELECTED_SERVICE', payload: service });
  }, []);

  const handleApplyFilters = useCallback((filters: Record<string, unknown>) => {
    dispatch({ type: 'APPLY_FILTERS', payload: filters });
    console.log("Applied filters:", filters);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  }, []);

  const toggleCompareService = useCallback((service: ServiceCardProps | ServiceCardProps[]) => {
    if (Array.isArray(service)) {
      // Handle array input - clear all services
      dispatch({ type: 'SET_SERVICES_FOR_COMPARISON', payload: [] });
    } else {
      // Handle single service input - toggle it
      dispatch({ type: 'TOGGLE_COMPARE_SERVICE', payload: service });
    }
  }, []);

  const isServiceInComparison = useCallback((serviceId: string) => {
    return state.servicesForComparison.some(service => service.id === serviceId);
  }, [state.servicesForComparison]);

  const handleOpenComparison = useCallback(() => {
    if (state.servicesForComparison.length >= 2) {
      dispatch({ type: 'SET_SHOW_COMPARISON', payload: true });
    } else {
      toast.info("Select at least 2 services to compare", {
        description: "You can select up to 3 services"
      });
    }
  }, [state.servicesForComparison]);

  const setShowComparison = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_COMPARISON', payload: show });
  }, []);

  // Function to filter services based on active filters and category
  const filterServices = useCallback((services: ServiceCardProps[]) => {
    let filtered = state.activeCategory === "all" 
      ? [...services] 
      : services.filter(service => 
          service.category.toLowerCase() === state.activeCategory.toLowerCase() || 
          service.tags.some(tag => tag.toLowerCase() === state.activeCategory.toLowerCase())
        );
    
    // Apply additional filters if any
    const filters = state.activeFilters;
    
    if (filters.auditTypes && filters.auditTypes.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.auditTypes.includes(tag.toLowerCase())
        )
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(service => 
        service.pricing.amount >= filters.priceRange[0] && 
        service.pricing.amount <= filters.priceRange[1]
      );
    }
    
    if (filters.blockchains && filters.blockchains.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.blockchains.includes(tag.toLowerCase())
        )
      );
    }
    
    if (filters.minReputation) {
      filtered = filtered.filter(service => 
        service.provider.reputation >= filters.minReputation
      );
    }
    
    // Sort by verification status and then by rating to show best services first
    return filtered.sort((a, b) => {
      if (a.provider.isVerified !== b.provider.isVerified) {
        return a.provider.isVerified ? -1 : 1;
      }
      return b.rating - a.rating;
    });
  }, [state.activeCategory, state.activeFilters]);

  return (
    <MarketplaceContext.Provider value={{
      state,
      dispatch,
      setViewMode,
      setShowFilters,
      setActiveCategory,
      setSelectedService,
      handleApplyFilters,
      handleOnboardingComplete,
      toggleCompareService,
      isServiceInComparison,
      handleOpenComparison,
      setShowComparison,
      filterServices,
      servicesQuery: {
        data: servicesQuery.data,
        isLoading: servicesQuery.isLoading || state.isLoading,
        error: servicesQuery.error || null
      }
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = React.useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
