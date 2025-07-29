
import React from 'react';
import { useAdaptiveDashboard } from './hooks/useAdaptiveDashboard';
import { AdaptiveInterfaceProps } from './types';

export function AdaptiveDashboard({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  const { 
    getDashboardLayout, 
    getWidgetPriority, 
    getPersonalizedMetrics 
  } = useAdaptiveDashboard({ userSegment, userType, preferences, behaviorProfile });

  const layout = getDashboardLayout();
  const widgetPriority = getWidgetPriority();
  const personalizedMetrics = getPersonalizedMetrics();

  return (
    <div className={`adaptive-dashboard ${layout}`}>
      {/* This component provides dashboard adaptation logic */}
      <style>
        {`
          .adaptive-dashboard.compact .dashboard-widget {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
          .adaptive-dashboard.detailed .dashboard-widget {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
          }
          .adaptive-dashboard.cards .dashboard-widget {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        `}
      </style>
    </div>
  );
}
