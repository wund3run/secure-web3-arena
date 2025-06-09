
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
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

  useEffect(() => {
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
              },
              {
                title: 'Learn About Web3 Security',
                description: 'Discover best practices and security guidelines',
                href: '/web3-security',
                priority: 'medium' as const
              }
            ],
            relatedPages: [
              {
                title: 'Security Audits',
                href: '/security-audits',
                description: 'Comprehensive smart contract security audits'
              },
              {
                title: 'AI Security Tools',
                href: '/ai-tools',
                description: 'Advanced AI-powered security analysis'
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
              },
              {
                title: 'View Past Audits',
                description: 'Browse completed security audit reports',
                href: '/audits',
                priority: 'medium' as const,
                requiresAuth: true
              },
              {
                title: 'Compare Services',
                description: 'See detailed comparison of security services',
                href: '/security-audits',
                priority: 'medium' as const
              }
            ],
            relatedPages: [
              {
                title: 'Code Reviews',
                href: '/code-reviews',
                description: 'Expert code analysis and review services'
              },
              {
                title: 'Penetration Testing',
                href: '/penetration-testing',
                description: 'Advanced security testing services'
              }
            ]
          };
          
        case '/request-audit':
          return {
            currentPage: 'Request Audit',
            suggestedNextSteps: user ? [
              {
                title: 'View Dashboard',
                description: 'Monitor your audit requests and progress',
                href: '/dashboard',
                priority: 'high' as const
              },
              {
                title: 'Browse Marketplace',
                description: 'Find additional security services',
                href: '/marketplace',
                priority: 'medium' as const
              }
            ] : [
              {
                title: 'Sign Up to Continue',
                description: 'Create an account to submit audit requests',
                href: '/auth',
                priority: 'high' as const
              }
            ],
            relatedPages: [
              {
                title: 'Security Guidelines',
                href: '/web3-security',
                description: 'Best practices for smart contract security'
              },
              {
                title: 'FAQ',
                href: '/faq',
                description: 'Common questions about security audits'
              }
            ]
          };
          
        default:
          return null;
      }
    };

    setEnhancement(generateEnhancement());
  }, [location.pathname, user]);

  const handleNavigation = (href: string, requiresAuth?: boolean) => {
    if (requiresAuth && !user) {
      toast.error('Please sign in to access this feature');
      navigate('/auth');
      return;
    }
    navigate(href);
  };

  if (!enhancement) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Smart Navigation</span>
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
                    <div className="flex items-center gap-1">
                      {step.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">High</Badge>
                      )}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            {enhancement.relatedPages.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Related Pages</h4>
                <div className="space-y-1">
                  {enhancement.relatedPages.slice(0, 2).map((page, index) => (
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
