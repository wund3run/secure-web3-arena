
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdaptiveContent } from './hooks/useAdaptiveContent';
import { AdaptiveInterfaceProps } from './types';

interface AdaptiveContentProps extends AdaptiveInterfaceProps {
  children: React.ReactNode;
}

export function AdaptiveContent({ 
  children, 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveContentProps) {
  const { 
    getLayoutVariant, 
    getContentPriority, 
    shouldShowFeature,
    personalizedMessages 
  } = useAdaptiveContent({ userSegment, userType, preferences, behaviorProfile });

  const layoutVariant = getLayoutVariant();
  const contentPriority = getContentPriority();

  // Show contextual help for beginners
  const showContextualHelp = preferences?.experienceLevel === 'beginner' && 
    shouldShowFeature('contextual_help');

  // Adaptive layout based on user preferences and behavior
  const getLayoutClasses = () => {
    const baseClasses = "adaptive-content";
    
    switch (layoutVariant) {
      case 'compact':
        return `${baseClasses} space-y-2`;
      case 'detailed':
        return `${baseClasses} space-y-6`;
      case 'cards':
        return `${baseClasses} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`;
      default:
        return `${baseClasses} space-y-4`;
    }
  };

  return (
    <div className={getLayoutClasses()}>
      {/* Personalized welcome message */}
      {personalizedMessages.welcome && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{personalizedMessages.welcome.title}</h3>
                <p className="text-sm text-muted-foreground">{personalizedMessages.welcome.message}</p>
              </div>
              <Badge variant="secondary">{userSegment}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contextual help for beginners */}
      {showContextualHelp && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Getting Started</h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  {personalizedMessages.helpTip || "Here are some tips to help you navigate the platform."}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Priority content based on user behavior */}
      {contentPriority.map((section, index) => (
        <div key={section} className={`content-section priority-${index + 1}`}>
          {children}
        </div>
      ))}
    </div>
  );
}
