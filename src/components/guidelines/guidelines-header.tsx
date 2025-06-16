
import React from 'react';
import { HawklyLogo } from '@/components/layout/hawkly-logo';

export function GuidelinesHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <HawklyLogo 
              variant="large"
              className="text-white"
              showText={false}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Audit Guidelines & Standards
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive guidelines for conducting professional Web3 security audits on the Hawkly platform
          </p>
        </div>
      </div>
    </div>
  );
}
