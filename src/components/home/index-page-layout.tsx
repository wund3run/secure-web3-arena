
import React from "react";
import { VibrantHero } from "./VibrantHero";
import { EnhancedFeaturesSection } from "./EnhancedFeaturesSection";

export function IndexPageLayout() {
  return (
    <div className="min-h-screen">
      {/* Import the enhanced brand system CSS */}
      <style>
        {`@import url('/src/styles/enhanced-brand-system.css');`}
      </style>
      
      {/* Use the new vibrant hero */}
      <VibrantHero />
      
      {/* Enhanced sections with brand styling */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <EnhancedFeaturesSection />
      </div>
    </div>
  );
}
