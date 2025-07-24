import React from 'react';
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";

export interface MarketplaceState {
  viewMode: "grid" | "list";
  showFilters: boolean;
  activeCategory: string;
  isLoading: boolean;
  showOnboarding: boolean;
  showEnhancedOnboarding: boolean;
  selectedService: ServiceCardProps | null;
  activeFilters: Record<string, any>;
  showAIRecommendations: boolean;
  servicesForComparison: ServiceCardProps[];
  showComparison: boolean;
}

export type MarketplaceAction = 
  | { type: 'SET_VIEW_MODE'; payload: "grid" | "list" }
  | { type: 'SET_SHOW_FILTERS'; payload: boolean }
  | { type: 'SET_ACTIVE_CATEGORY'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_SHOW_ONBOARDING'; payload: boolean }
  | { type: 'SET_SHOW_ENHANCED_ONBOARDING'; payload: boolean }
  | { type: 'SET_SELECTED_SERVICE'; payload: ServiceCardProps | null }
  | { type: 'SET_ACTIVE_FILTERS'; payload: Record<string, any> }
  | { type: 'SET_SHOW_AI_RECOMMENDATIONS'; payload: boolean }
  | { type: 'SET_SERVICES_FOR_COMPARISON'; payload: ServiceCardProps[] }
  | { type: 'SET_SHOW_COMPARISON'; payload: boolean }
  | { type: 'TOGGLE_COMPARE_SERVICE'; payload: ServiceCardProps }
  | { type: 'APPLY_FILTERS'; payload: Record<string, any> }
  | { type: 'COMPLETE_ONBOARDING' };

export const initialState: MarketplaceState = {
  viewMode: "grid",
  showFilters: false,
  activeCategory: "all",
  isLoading: true,
  showOnboarding: false,
  showEnhancedOnboarding: false,
  selectedService: null,
  activeFilters: {},
  showAIRecommendations: false,
  servicesForComparison: [],
  showComparison: false,
};

export interface MarketplaceContextType {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
  setViewMode: (mode: "grid" | "list") => void;
  setShowFilters: (show: boolean) => void;
  setActiveCategory: (category: string) => void;
  setSelectedService: (service: ServiceCardProps | null) => void;
  handleApplyFilters: (filters: Record<string, unknown>) => void;
  handleOnboardingComplete: () => void;
  toggleCompareService: (service: ServiceCardProps | ServiceCardProps[]) => void;
  isServiceInComparison: (serviceId: string) => boolean;
  handleOpenComparison: () => void;
  setShowComparison: (show: boolean) => void;
  filterServices: (services: ServiceCardProps[]) => ServiceCardProps[];
  servicesQuery: {
    data: ServiceCardProps[] | undefined;
    isLoading: boolean;
    error: any;
  };
}

export const MarketplaceContext = React.createContext<MarketplaceContextType | undefined>(undefined);
