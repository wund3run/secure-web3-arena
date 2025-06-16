
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { HawklyLogo } from '@/components/layout/hawkly-logo';

export function MarketplaceHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <HawklyLogo 
              variant="large"
              className="text-white"
              showText={false}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Web3 Security Marketplace
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with verified security experts for comprehensive smart contract audits and blockchain security services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              <Search className="mr-2 h-5 w-5" />
              Browse Services
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Filter className="mr-2 h-5 w-5" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
