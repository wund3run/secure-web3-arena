
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationLinks } from '@/components/layout/navigation/navigation-links';
import { getFallbackRoute, routeExists } from '@/utils/navigation';

type RouteStatus = 'valid' | 'invalid' | 'checking';

interface RouteCheckResult {
  route: string;
  title: string;
  section: string;
  status: RouteStatus;
}

export function useRouteChecker() {
  const [results, setResults] = useState<RouteCheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidRoutes, setInvalidRoutes] = useState<string[]>([]);
  const navigate = useNavigate();

  const checkAllRoutes = () => {
    setIsChecking(true);
    const allResults: RouteCheckResult[] = [];
    const invalid: string[] = [];
    
    // Check all navigation links
    const processLinks = (links: typeof navigationLinks.marketplace, section: string) => {
      links.forEach(link => {
        const route = link.href;
        const isValid = routeExists(route);
        allResults.push({
          route,
          title: link.title,
          section,
          status: isValid ? 'valid' : 'invalid'
        });
        
        if (!isValid) {
          invalid.push(route);
        }
      });
    };
    
    processLinks(navigationLinks.marketplace, 'Marketplace');
    processLinks(navigationLinks.audits, 'Audits');
    processLinks(navigationLinks.resources, 'Resources');
    
    setResults(allResults);
    setInvalidRoutes(invalid);
    setIsChecking(false);
    
    return { results: allResults, invalidRoutes: invalid };
  };

  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  const getSuggestedRoute = (route: string) => {
    return getFallbackRoute(route);
  };

  useEffect(() => {
    // Check routes on component mount
    checkAllRoutes();
  }, []);

  return { 
    results, 
    invalidRoutes, 
    isChecking, 
    checkAllRoutes, 
    navigateToRoute, 
    getSuggestedRoute 
  };
}

export function RouteCheckerPanel() {
  const { results, isChecking, checkAllRoutes, navigateToRoute, getSuggestedRoute } = useRouteChecker();
  const [isOpen, setIsOpen] = useState(true);
  
  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 left-4 z-50 bg-primary text-white px-4 py-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Show Route Checker
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 bg-background border shadow-lg rounded-lg overflow-hidden max-h-[80vh]">
      <div className="p-3 bg-muted flex justify-between items-center border-b">
        <h3 className="font-medium">Navigation Route Checker</h3>
        <div>
          <button 
            onClick={checkAllRoutes} 
            disabled={isChecking}
            className="mr-2 text-xs bg-primary text-white px-2 py-1 rounded"
          >
            {isChecking ? 'Checking...' : 'Check Again'}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
      </div>
      <div className="p-3 overflow-y-auto max-h-[calc(80vh-3rem)]">
        <div className="space-y-1">
          {results.map((result, idx) => (
            <div 
              key={idx} 
              className={`text-xs p-2 rounded ${
                result.status === 'valid' ? 'bg-green-50 border-l-4 border-green-500' : 
                'bg-red-50 border-l-4 border-red-500'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{result.title}</span>
                <span className="text-gray-500">{result.section}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="italic">{result.route}</span>
                {result.status === 'valid' ? (
                  <button 
                    onClick={() => navigateToRoute(result.route)}
                    className="text-xs bg-green-600 text-white px-2 py-0.5 rounded"
                  >
                    Visit
                  </button>
                ) : (
                  <div className="flex space-x-1">
                    <span className="text-red-600 text-xs">Invalid Route</span>
                    {getSuggestedRoute(result.route) !== '/' && (
                      <button 
                        onClick={() => navigateToRoute(getSuggestedRoute(result.route))}
                        className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded"
                        title={`Try ${getSuggestedRoute(result.route)} instead`}
                      >
                        Try Suggestion
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteCheckerPanel;
