import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface HawklyTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  glassEffect?: boolean;
  bordered?: boolean;
  fullWidth?: boolean;
}

export const HawklyTabs = React.forwardRef<
  React.ElementRef<typeof Tabs>,
  HawklyTabsProps
>(({ className, glassEffect = true, bordered = true, fullWidth = false, ...props }, ref) => {
  return (
    <Tabs
      ref={ref}
      className={cn(
        'w-full',
        glassEffect && 'backdrop-blur-sm',
        bordered && 'border-gray-800',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  );
});

HawklyTabs.displayName = 'HawklyTabs';
