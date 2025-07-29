
import { useMemo } from 'react';
import { useAuth } from '@/contexts/auth';
import { mainNavigation, authenticatedNavigation, NavigationItem } from '@/config/navigation';

export function useRoleBasedNavigation() {
  const { user } = useAuth();

  const filteredNavigation = useMemo(() => {
    // Filter main navigation based on auth status
    const filteredMain = mainNavigation.map(section => ({
      ...section,
      children: section.children?.filter(child => 
        !child.requiresAuth || (child.requiresAuth && user)
      )
    }));

    // Add authenticated navigation items if user is logged in
    const navigation = user 
      ? [...filteredMain, ...authenticatedNavigation]
      : filteredMain;

    return navigation;
  }, [user]);

  return {
    navigation: filteredNavigation,
    isAuthenticated: !!user
  };
}
