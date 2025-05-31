
import React from 'react';
import { useNavigationAdaptation } from './hooks/useNavigationAdaptation';
import { AdaptiveInterfaceProps } from './types';

export function AdaptiveNavigation({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  const { 
    getAdaptedMenuItems, 
    getQuickActions, 
    shouldHighlightItem 
  } = useNavigationAdaptation({ userSegment, userType, preferences, behaviorProfile });

  const adaptedMenuItems = getAdaptedMenuItems();
  const quickActions = getQuickActions();

  // This component enhances existing navigation rather than replacing it
  return (
    <div className="adaptive-navigation-enhancements">
      {/* Quick actions based on user behavior */}
      {quickActions.length > 0 && (
        <div className="quick-actions-bar bg-muted/50 p-2 rounded-lg mb-4">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-muted-foreground">Quick Actions:</span>
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="text-xs bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded transition-colors"
                onClick={() => window.location.href = action.href}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation hints */}
      <style>
        {adaptedMenuItems.map(item => 
          shouldHighlightItem(item.id) 
            ? `[data-nav-item="${item.id}"] { position: relative; }
               [data-nav-item="${item.id}"]:after { 
                 content: "●"; 
                 color: hsl(var(--primary)); 
                 position: absolute; 
                 right: -8px; 
                 top: 50%; 
                 transform: translateY(-50%); 
                 font-size: 8px; 
               }`
            : ''
        ).join('\n')}
      </style>
    </div>
  );
}
