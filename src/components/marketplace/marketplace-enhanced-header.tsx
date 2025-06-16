
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Star } from 'lucide-react';
import { HawklyLogo } from '@/components/layout/hawkly-logo';

export function MarketplaceEnhancedHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <HawklyLogo 
              variant="large"
              className="text-white"
              showText={true}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Premium Security Marketplace
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Connect with elite security professionals for comprehensive smart contract audits, penetration testing, and blockchain security consultations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              <Search className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Filter className="mr-2 h-5 w-5" />
              Filter by Expertise
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-300 mr-1" />
              <span>500+ Verified Auditors</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
            <div>1000+ Completed Audits</div>
            <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
            <div>99.9% Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
