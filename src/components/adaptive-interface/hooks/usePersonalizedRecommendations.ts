
import { useMemo } from 'react';
import { AdaptiveInterfaceProps, Recommendation } from '../types';

export function usePersonalizedRecommendations({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  
  const recommendations = useMemo((): Recommendation[] => {
    const recs: Recommendation[] = [];
    
    // Recommendations based on user segment
    if (userSegment === 'new_user') {
      recs.push({
        id: 'explore_services',
        title: 'Explore Security Services',
        description: 'Discover our comprehensive Web3 security audit services',
        href: '/marketplace',
        action: 'Explore',
        tags: ['Getting Started', 'Marketplace'],
        priority: 1,
        relevanceScore: 0.9
      });
    }
    
    if (userSegment === 'regular_user') {
      recs.push({
        id: 'request_new_audit',
        title: 'Request New Audit',
        description: 'Start a new security audit for your latest project',
        href: '/request-audit',
        action: 'Request',
        tags: ['Audit', 'Project'],
        priority: 1,
        relevanceScore: 0.8
      });
    }
    
    if (userType === 'auditor' && userSegment === 'power_user') {
      recs.push({
        id: 'view_opportunities',
        title: 'New Audit Opportunities',
        description: 'Check out fresh audit requests matching your expertise',
        href: '/audits',
        action: 'View',
        tags: ['Opportunities', 'Earnings'],
        priority: 1,
        relevanceScore: 0.95
      });
    }
    
    // Recommendations based on user behavior
    const mostVisited = behaviorProfile?.mostVisitedPages || [];
    if (mostVisited.includes('/marketplace') && !mostVisited.includes('/request-audit')) {
      recs.push({
        id: 'try_requesting_audit',
        title: 'Try Requesting an Audit',
        description: 'You\'ve been browsing services - ready to request your first audit?',
        href: '/request-audit',
        action: 'Start',
        tags: ['Next Step', 'Audit'],
        priority: 2,
        relevanceScore: 0.7
      });
    }
    
    // Experience level based recommendations
    if (preferences?.experienceLevel === 'beginner') {
      recs.push({
        id: 'learning_resources',
        title: 'Web3 Security Learning Hub',
        description: 'Learn about smart contract security best practices',
        href: '/guides',
        action: 'Learn',
        tags: ['Education', 'Security'],
        priority: 3,
        relevanceScore: 0.6
      });
    }
    
    return recs.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [userSegment, userType, preferences, behaviorProfile]);

  const getRecommendationPriority = () => {
    return recommendations.map(rec => rec.priority);
  };

  return {
    recommendations,
    getRecommendationPriority
  };
}
