
import React from 'react';

// Lazy load heavy components with enhanced loading states
export const InteractiveDemo = React.lazy(() => 
  import("@/components/home/interactive-demo").then(module => ({
    default: module.InteractiveDemo
  }))
);

export const FaqSection = React.lazy(() => 
  import("@/components/home/faq-section").then(module => ({
    default: module.FaqSection
  }))
);

export const UserJourneySection = React.lazy(() => 
  import("@/components/home/user-journey-section").then(module => ({
    default: module.UserJourneySection
  })).catch(error => {
    console.error('Failed to load UserJourneySection:', error);
    // Return a fallback component
    return { default: () => <div className="py-16 bg-muted/20"><div className="container px-4 md:px-6"><div className="text-center"><h2 className="text-3xl font-bold mb-4">Choose Your Path</h2><p className="text-muted-foreground">Content temporarily unavailable</p></div></div></div> };
  })
);

export const QuickStartSection = React.lazy(() => 
  import("@/components/home/quick-start-section").then(module => ({
    default: module.QuickStartSection
  }))
);

export const MarketPositioning = React.lazy(() => 
  import("@/components/home/market-positioning").then(module => ({
    default: module.MarketPositioning
  })).catch(error => {
    console.error('Failed to load MarketPositioning:', error);
    // Return a fallback component
    return { default: () => <div className="py-16"><div className="container px-4 md:px-6"><div className="text-center"><h2 className="text-3xl font-bold mb-4">Market Positioning</h2><p className="text-muted-foreground">Content temporarily unavailable</p></div></div></div> };
  })
);

export const PlatformFeaturesShowcase = React.lazy(() => 
  import("@/components/home/platform-features-showcase").then(module => ({
    default: module.PlatformFeaturesShowcase
  }))
);

export const CompetitiveAdvantages = React.lazy(() => 
  import("@/components/home/competitive-advantages").then(module => ({
    default: module.CompetitiveAdvantages
  }))
);

export const NetworkEffectsSection = React.lazy(() => 
  import("@/components/home/network-effects-section").then(module => ({
    default: module.NetworkEffectsSection
  }))
);

export const StrategicPartnershipsSection = React.lazy(() => 
  import("@/components/home/strategic-partnerships-section").then(module => ({
    default: module.StrategicPartnershipsSection
  }))
);

export const GlobalExpansionSection = React.lazy(() => 
  import("@/components/home/global-expansion-section").then(module => ({
    default: module.GlobalExpansionSection
  }))
);
