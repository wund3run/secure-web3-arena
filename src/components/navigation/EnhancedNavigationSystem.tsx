
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  Settings, 
  Home,
  Users,
  FileText,
  Search,
  Bell,
  ChevronDown,
  Monitor,
  Database,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { platformOrchestrator } from '@/services/platformOrchestration';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  description?: string;
  category: 'core' | 'advanced' | 'tools' | 'admin';
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export function EnhancedNavigationSystem() {
  const location = useLocation();
  const [systemHealth, setSystemHealth] = useState({ overall: 100, criticalIssues: [] });
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  const navigationItems: NavigationItem[] = [
    // Core Platform
    { label: 'Dashboard', href: '/dashboard', icon: Home, category: 'core' },
    { label: 'Marketplace', href: '/marketplace', icon: Search, category: 'core' },
    { label: 'Audits', href: '/audits', icon: FileText, category: 'core' },
    { label: 'Request Audit', href: '/request-audit', icon: Users, category: 'core' },
    
    // Advanced Features
    { label: 'Security & Compliance', href: '/security-compliance', icon: Shield, badge: 'New', category: 'advanced', description: 'Advanced security monitoring and compliance' },
    { label: 'Performance Hub', href: '/performance-optimization', icon: Zap, badge: 'Enhanced', category: 'advanced', description: 'Performance monitoring and optimization' },
    { label: 'Platform Control', href: '/platform-optimization', icon: Monitor, badge: 'Pro', category: 'advanced', description: 'Advanced platform management' },
    
    // Tools & Analytics
    { label: 'Analytics Center', href: '/analytics', icon: BarChart3, category: 'tools', description: 'Comprehensive analytics dashboard' },
    { label: 'System Health', href: '/system-health', icon: Activity, category: 'tools', description: 'Real-time system monitoring' },
    { label: 'Database Tools', href: '/database-tools', icon: Database, category: 'tools', description: 'Database management and insights' },
    
    // Admin
    { label: 'Settings', href: '/settings', icon: Settings, category: 'admin' },
  ];

  useEffect(() => {
    const updateSystemHealth = () => {
      const health = platformOrchestrator.getSystemHealth();
      setSystemHealth(health);
      
      // Generate alerts based on system health
      const newAlerts: SystemAlert[] = health.criticalIssues.map((issue, index) => ({
        id: `alert-${index}`,
        type: 'warning' as const,
        message: issue,
        timestamp: new Date()
      }));
      
      setAlerts(newAlerts);
    };

    updateSystemHealth();
    const interval = setInterval(updateSystemHealth, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderNavigationSection = (category: string, items: NavigationItem[]) => {
    const categoryItems = items.filter(item => item.category === category);
    if (categoryItems.length === 0) return null;

    const categoryLabels = {
      core: 'Core Platform',
      advanced: 'Advanced Features',
      tools: 'Tools & Analytics',
      admin: 'Administration'
    };

    return (
      <div key={category} className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h3>
        </div>
        {categoryItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
              isActiveRoute(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
        <Separator className="my-2" />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with System Status */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Platform Control</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bell className="h-3 w-3" />
                {alerts.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {alerts.length}
                  </Badge>
                )}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>System Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {alerts.length === 0 ? (
                <DropdownMenuItem>
                  <div className="text-sm text-muted-foreground">No alerts</div>
                </DropdownMenuItem>
              ) : (
                alerts.map((alert) => (
                  <DropdownMenuItem key={alert.id}>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* System Health Indicator */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">System Health</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${getHealthColor(systemHealth.overall)}`}>
              {systemHealth.overall}%
            </span>
            <TrendingUp className="h-3 w-3 text-green-500" />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {renderNavigationSection('core', navigationItems)}
          {renderNavigationSection('advanced', navigationItems)}
          {renderNavigationSection('tools', navigationItems)}
          {renderNavigationSection('admin', navigationItems)}
        </nav>
      </div>

      {/* Quick Actions Footer */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link to="/platform-optimization">
              <Monitor className="h-3 w-3 mr-2" />
              Platform Overview
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link to="/security-compliance">
              <Shield className="h-3 w-3 mr-2" />
              Security Center
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
