
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, AlertTriangle, ExternalLink, Download } from 'lucide-react';
import { extractRoutesFromApp, routeExists } from '@/utils/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function RouteValidator() {
  const [routes, setRoutes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [validationResults, setValidationResults] = useState<Map<string, boolean>>(new Map());
  const [activeTab, setActiveTab] = useState<string>('all');
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

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'dynamic' && route.includes(':')) ||
                      (activeTab === 'static' && !route.includes(':')) ||
                      (activeTab === 'invalid' && validationResults.get(route) === false);
    
    return matchesSearch && matchesTab;
  });

  const navigateToRoute = (route: string) => {
    if (!route.includes(':')) {
      navigate(route);
    }
  };

  const getRouteTypeBadge = (route: string) => {
    if (route.includes('/admin')) {
      return <Badge variant="secondary">Admin</Badge>;
    } else if (route.includes('/dashboard')) {
      return <Badge variant="default">Dashboard</Badge>;
    } else if (route.includes('/auth')) {
      return <Badge variant="outline">Auth</Badge>;
    } else if (route === '/' || route.includes('/marketplace')) {
      return <Badge variant="default" className="bg-green-500">Marketplace</Badge>;
    } else if (route.includes('/audit')) {
      return <Badge variant="default" className="bg-blue-500">Audit</Badge>;
    }
    return <Badge variant="outline">General</Badge>;
  };

  const exportRoutesAsCSV = () => {
    const csvContent = [
      ["Route", "Valid", "Type", "Has Parameters"].join(","),
      ...Array.from(validationResults.entries()).map(([route, isValid]) => {
        const routeType = route.includes('/admin') ? "Admin" :
                        route.includes('/dashboard') ? "Dashboard" :
                        route.includes('/auth') ? "Auth" :
                        route === '/' || route.includes('/marketplace') ? "Marketplace" :
                        route.includes('/audit') ? "Audit" : "General";
        
        return [
          route,
          isValid ? "Valid" : "Invalid",
          routeType,
          route.includes(':') ? "Yes" : "No"
        ].join(",");
      })
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'platform_routes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRoutes = routes.length;
  const dynamicRoutes = routes.filter(route => route.includes(':')).length;
  const invalidRoutes = Array.from(validationResults.values()).filter(isValid => !isValid).length;
  const validRoutes = totalRoutes - invalidRoutes;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Platform Route Validator</span>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              {validRoutes} Valid
            </Badge>
            {invalidRoutes > 0 && (
              <Badge variant="destructive">
                {invalidRoutes} Invalid
              </Badge>
            )}
            <Badge variant="outline">
              {dynamicRoutes} Dynamic
            </Badge>
          </div>
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button 
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={exportRoutesAsCSV}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All Routes</TabsTrigger>
            <TabsTrigger value="static">Static</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
            <TabsTrigger value="invalid" disabled={invalidRoutes === 0}>
              Invalid ({invalidRoutes})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredRoutes.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-8">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">No routes found matching your search</p>
            </div>
          ) : (
            filteredRoutes.map(route => (
              <div 
                key={route}
                className={`border rounded-md p-2 flex items-center justify-between ${
                  validationResults.get(route) === false ? 'border-red-300 bg-red-50' : ''
                }`}
              >
                <div className="flex items-center overflow-hidden">
                  {validationResults.get(route) ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <span className={`font-mono text-xs ${route.includes(':') ? 'text-muted-foreground' : ''} truncate`}>
                      {route}
                    </span>
                    <div className="mt-1">
                      {getRouteTypeBadge(route)}
                    </div>
                  </div>
                </div>
                {!route.includes(':') && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateToRoute(route)}
                    title={`Navigate to ${route}`}
                    className="flex-shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RouteValidator;
