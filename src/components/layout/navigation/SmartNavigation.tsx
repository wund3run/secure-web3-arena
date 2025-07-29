import React from 'react';
import { useAuth } from '@/contexts/auth';
import { navigationLinks } from './navigation-links';
import { publicNavigationLinks } from './PublicNavigationLinks';
import { NavigationMenuDemo } from './NavigationMenuDemo';

export function SmartNavigation() {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="hidden md:flex items-center space-x-8">
        <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
      </div>
    );
  }

  // Use appropriate navigation links based on auth status
  const links = user ? navigationLinks : publicNavigationLinks as any;

  return <NavigationMenuDemo navigationLinks={links} />;
}
