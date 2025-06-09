
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, ExternalLink, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface NavigationEnhancement {
  currentPage: string;
  suggestedNextSteps: Array<{
    title: string;
    description: string;
    href: string;
    priority: 'high' | 'medium' | 'low';
    requiresAuth?: boolean;
  }>;
  relatedPages: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

export function SmartNavigationEnhancer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enhancement, setEnhancement] = useState<NavigationEnhancement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Only show for authenticated users or after some interaction
  useEffect(() => {
    const hasVisited = localStorage.getItem('hawkly-has-visited');
    const isDismissedStored = localStorage.getItem('smart-nav-dismissed');
    
    if (isDismissedStored || (!user && !hasVisited)) {
      return;
    }

    if (!hasVisited) {
      localStorage.setItem('hawkly-has-visited', 'true');
    }

    // Show with a delay to avoid interrupting the user experience
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (!isVisible) return;

    const generateEnhancement = () => {
      const currentPath = location.pathname;
      
      switch (currentPath) {
        case '/':
          return {
            currentPage: 'Homepage',
            suggestedNextSteps: [
              {
                title: 'Browse Security Services',
                description: 'Explore our marketplace of verified security experts',
                href: '/marketplace',
                priority: 'high' as const
              },
              {
                title: 'Request an Audit',
                description: 'Get your smart contract audited by experts',
                href: '/request-audit',
                priority: 'high' as const,
                requiresAuth: true
              }
            ],
            relatedPages: [
              {
                title: 'Security Audits',
                href: '/security-audits',
                description: 'Comprehensive smart contract security audits'
              }
            ]
          };
        
        case '/marketplace':
          return {
            currentPage: 'Marketplace',
            suggestedNextSteps: [
              {
                title: 'Request Custom Audit',
                description: 'Submit your project for a tailored security audit',
                href: '/request-audit',
                priority: 'high' as const,
                requiresAuth: true
              }
            ],
            relatedPages: [
              {
                title: 'Code Reviews',
                href: '/code-reviews',
                description: 'Expert code analysis and review services'
              }
            ]
          };
          
        default:
          return null;
      }
    };

    setEnhancement(generateEnhancement());
  }, [location.pathname, user, isVisible]);

  const handleNavigation = (href: string, requiresAuth?: boolean) => {
    if (requiresAuth && !user) {
      toast.error('Please sign in to access this feature');
      navigate('/auth');
      return;
    }
    navigate(href);
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('smart-nav-dismissed', 'true');
  };

  if (!enhancement || !isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Quick Actions</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Suggested Next Steps</h4>
              <div className="space-y-2">
                {enhancement.suggestedNextSteps.slice(0, 2).map((step, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-left h-auto p-2"
                    onClick={() => handleNavigation(step.href, step.requiresAuth)}
                  >
                    <div className="flex-1">
                      <div className="text-xs font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {step.description}
                      </div>
                    </div>
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                ))}
              </div>
            </div>
            
            {enhancement.relatedPages.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Related Pages</h4>
                <div className="space-y-1">
                  {enhancement.relatedPages.slice(0, 1).map((page, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(page.href)}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground w-full text-left"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>{page.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
