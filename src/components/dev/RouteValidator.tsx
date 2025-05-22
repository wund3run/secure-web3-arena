
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { extractRoutesFromApp, routeExists } from '@/utils/navigation';

export function RouteValidator() {
  const [routes, setRoutes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [validationResults, setValidationResults] = useState<Map<string, boolean>>(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    // Get all routes from App.tsx
    const appRoutes = extractRoutesFromApp();
    setRoutes(appRoutes);
    
    // Validate all routes
    const results = new Map<string, boolean>();
    appRoutes.forEach(route => {
      // Skip dynamic routes for validation
      if (route.includes(':')) {
        results.set(route, true);
      } else {
        results.set(route, routeExists(route));
      }
    });
    setValidationResults(results);
  }, []);

  const filteredRoutes = routes.filter(route => 
    route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToRoute = (route: string) => {
    if (!route.includes(':')) {
      navigate(route);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Platform Route Validator</span>
          <Badge variant="outline" className="ml-2">
            {routes.length} Routes
          </Badge>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredRoutes.map(route => (
            <div 
              key={route}
              className="border rounded-md p-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                {validationResults.get(route) ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span className={route.includes(':') ? 'font-mono text-xs text-muted-foreground' : 'font-mono text-xs'}>
                  {route}
                </span>
              </div>
              {!route.includes(':') && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigateToRoute(route)}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RouteValidator;
