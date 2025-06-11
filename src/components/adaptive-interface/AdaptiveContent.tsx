
import React from 'react';
import { AdaptiveInterfaceProps } from './types';

export function AdaptiveContent({ 
  children, 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps & { children: React.ReactNode }) {
  
  const getContentClasses = () => {
    const baseClasses = 'adaptive-content';
    
    // Add classes based on preferences
    const layoutClass = preferences?.dashboardLayout ? `layout-${preferences.dashboardLayout}` : 'layout-default';
    const segmentClass = `segment-${userSegment}`;
    const typeClass = `type-${userType}`;
    
    return `${baseClasses} ${layoutClass} ${segmentClass} ${typeClass}`;
  };

  const shouldShowOnboarding = () => {
    return userSegment === 'new_user' && (!behaviorProfile || behaviorProfile.visitCount < 3);
  };

  const shouldShowAdvancedFeatures = () => {
    return userSegment === 'power_user' || userSegment === 'champion';
  };

  return (
    <div className={getContentClasses()}>
      {shouldShowOnboarding() && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
            Welcome to Hawkly! 👋
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            We're customizing your experience based on your role as a {userType.replace('_', ' ')}.
          </p>
        </div>
      )}
      
      <div className="adaptive-content-wrapper">
        {children}
      </div>
    </div>
  );
}
