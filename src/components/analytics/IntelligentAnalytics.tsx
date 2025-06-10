
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Clock, MousePointer, Smartphone, Monitor, Tablet } from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionTime: number;
  bounceRate: number;
  topPages: { page: string; views: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
  userEngagement: number;
}

export function IntelligentAnalytics() {
  const location = useLocation();
  const { behaviorProfile, getUserSegment } = useUserProfiling();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 1247,
    uniqueVisitors: 892,
    averageSessionTime: 245,
    bounceRate: 0.34,
    topPages: [
      { page: '/', views: 324 },
      { page: '/marketplace', views: 198 },
      { page: '/security-audits', views: 156 },
      { page: '/dashboard', views: 134 },
      { page: '/request-audit', views: 98 }
    ],
    deviceBreakdown: { mobile: 45, tablet: 20, desktop: 35 },
    userEngagement: 78
  });

  const userSegment = getUserSegment();
  const DeviceIcon = getDeviceIcon(behaviorProfile?.deviceType || 'desktop');

  useEffect(() => {
    // Track page view
    console.log(`📊 Page view tracked: ${location.pathname}`);
    
    // Update analytics data (in real app, this would come from your analytics service)
    setAnalyticsData(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1
    }));
  }, [location.pathname]);

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="bg-background/95 backdrop-blur border shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Analytics Dashboard
            <Badge variant="secondary" className="text-xs">
              Dev Only
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-muted-foreground">Page Views</div>
              <div className="font-semibold">{analyticsData.pageViews.toLocaleString()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Unique Visitors</div>
              <div className="font-semibold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">User Engagement</span>
              <span className="font-semibold">{analyticsData.userEngagement}%</span>
            </div>
            <Progress value={analyticsData.userEngagement} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">User Profile</div>
            <div className="flex items-center gap-2">
              <DeviceIcon className="h-3 w-3" />
              <Badge variant="outline" className="text-xs">
                {userSegment.replace('_', ' ')}
              </Badge>
            </div>
            {behaviorProfile && (
              <div className="text-muted-foreground">
                Visit #{behaviorProfile.visitCount} • {Math.round(behaviorProfile.averageSessionDuration)}s avg
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">Device Breakdown</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Mobile</span>
                <span>{analyticsData.deviceBreakdown.mobile}%</span>
              </div>
              <div className="flex justify-between">
                <span>Desktop</span>
                <span>{analyticsData.deviceBreakdown.desktop}%</span>
              </div>
              <div className="flex justify-between">
                <span>Tablet</span>
                <span>{analyticsData.deviceBreakdown.tablet}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getDeviceIcon(deviceType: string) {
  switch (deviceType) {
    case 'mobile': return Smartphone;
    case 'tablet': return Tablet;
    default: return Monitor;
  }
}
