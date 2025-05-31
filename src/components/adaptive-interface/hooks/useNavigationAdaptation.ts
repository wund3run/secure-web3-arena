
import { useMemo } from 'react';
import { AdaptiveInterfaceProps, QuickAction } from '../types';

export function useNavigationAdaptation({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  
  const getAdaptedMenuItems = () => {
    const baseItems = [
      { id: 'marketplace', label: 'Marketplace', href: '/marketplace' },
      { id: 'audits', label: 'Audits', href: '/audits' },
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard' }
    ];
    
    // Customize based on user type and behavior
    if (userType === 'auditor') {
      return [
        ...baseItems,
        { id: 'opportunities', label: 'Opportunities', href: '/audits' },
        { id: 'earnings', label: 'Earnings', href: '/dashboard/analytics' }
      ];
    }
    
    if (userType === 'project_owner') {
      return [
        ...baseItems,
        { id: 'request-audit', label: 'Request Audit', href: '/request-audit' },
        { id: 'projects', label: 'Projects', href: '/dashboard/projects' }
      ];
    }
    
    return baseItems;
  };

  const quickActions = useMemo((): QuickAction[] => {
    const actions: QuickAction[] = [];
    
    // Add quick actions based on user behavior and most visited pages
    const mostVisited = behaviorProfile?.mostVisitedPages || [];
    const completedActions = behaviorProfile?.completedActions || [];
    
    if (userSegment === 'first_time_visitor') {
      actions.push({
        id: 'explore',
        label: 'Explore Services',
        href: '/marketplace',
        priority: 1
      });
    }
    
    if (userType === 'project_owner' && !completedActions.includes('audit_request_created')) {
      actions.push({
        id: 'request_audit',
        label: 'Request Audit',
        href: '/request-audit',
        priority: 2
      });
    }
    
    if (userType === 'auditor' && mostVisited.includes('/audits')) {
      actions.push({
        id: 'view_opportunities',
        label: 'New Opportunities',
        href: '/audits',
        priority: 1
      });
    }
    
    return actions.sort((a, b) => a.priority - b.priority);
  }, [userSegment, userType, behaviorProfile]);

  const shouldHighlightItem = (itemId: string): boolean => {
    const highlightMap: Record<string, boolean> = {
      'marketplace': userSegment === 'first_time_visitor',
      'request-audit': userType === 'project_owner' && userSegment === 'explorer',
      'opportunities': userType === 'auditor' && userSegment === 'active_auditor',
    };
    
    return highlightMap[itemId] || false;
  };

  return {
    getAdaptedMenuItems,
    quickActions,
    shouldHighlightItem
  };
}
