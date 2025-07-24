import { useContext } from 'react';
import { MarketplaceContext } from './MarketplaceContextTypes';

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}; 