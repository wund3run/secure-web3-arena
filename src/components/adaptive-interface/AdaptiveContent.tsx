
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
    let classes = 'adaptive-content ';
    
    // Add segment-specific classes
    classes += `segment-${userSegment} `;
    
    // Add user type classes
    classes += `user-${userType} `;
    
    // Add preference-based classes
    if (preferences.dashboardLayout) {
      classes += `layout-${preferences.dashboardLayout} `;
    }
    
    return classes.trim();
  };

  return (
    <div className={getContentClasses()}>
      {children}
      <style jsx>{`
        .adaptive-content.segment-new_user .advanced-features {
          display: none;
        }
        .adaptive-content.segment-power_user .beginner-tips {
          display: none;
        }
        .adaptive-content.layout-compact .detailed-cards {
          grid-template-columns: 1fr;
        }
        .adaptive-content.layout-detailed .summary-cards {
          display: none;
        }
      `}</style>
    </div>
  );
}
