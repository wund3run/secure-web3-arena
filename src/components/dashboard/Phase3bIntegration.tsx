import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  BarChart3, 
  Smartphone, 
  Zap, 
  CheckCircle,
  TrendingUp,
  Activity,
  Target,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Phase3bIntegrationProps {
  auditId?: string;
  className?: string;
}

export function Phase3bIntegration({ 
  auditId = "demo-audit", 
  className 
}: Phase3bIntegrationProps) {
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState('overview');
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);
  const [collaborationStats, setCollaborationStats] = useState({
    activeUsers: 4,
    messagesExchanged: 127,
    screensShared: 3,
    meetingsToday: 2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborationStats(prev => ({
        ...prev,
        activeUsers: Math.max(1, prev.activeUsers + Math.floor(Math.random() * 3) - 1),
        messagesExchanged: prev.messagesExchanged + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'collaboration',
      title: 'Real-time Collaboration',
      description: 'Multi-auditor support with live presence, messaging, and screen sharing',
      icon: <Users className="h-5 w-5" />,
      color: 'blue',
      stats: [
        { label: 'Active Users', value: collaborationStats.activeUsers, trend: '+12%' },
        { label: 'Messages Today', value: collaborationStats.messagesExchanged, trend: '+25%' },
        { label: 'Screen Shares', value: collaborationStats.screensShared, trend: '+8%' }
      ]
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Comprehensive performance insights and security trend analysis',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'green',
      stats: [
        { label: 'Audits Completed', value: 47, trend: '+18%' },
        { label: 'Avg. Duration', value: '14.2d', trend: '-5%' },
        { label: 'Client Satisfaction', value: '4.8/5', trend: '+3%' }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Optimization',
      description: 'Touch-friendly interface with swipe gestures and responsive design',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'purple',
      stats: [
        { label: 'Mobile Usage', value: '68%', trend: '+15%' },
        { label: 'Touch Efficiency', value: '94%', trend: '+7%' },
        { label: 'Offline Capability', value: '100%', trend: '0%' }
      ]
    }
  ];

  const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setActiveFeature(feature.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            feature.color === 'blue' && "bg-blue-100 text-blue-600",
            feature.color === 'green' && "bg-green-100 text-green-600",
            feature.color === 'purple' && "bg-purple-100 text-purple-600"
          )}>
            {feature.icon}
          </div>
          <div>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {feature.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.trend}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Phase 3b: Advanced Features</h2>
          <p className="text-muted-foreground">
            Real-time collaboration, comprehensive analytics, and mobile optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isRealTimeActive ? "default" : "secondary"} className="gap-1">
            <Activity className="h-3 w-3" />
            {isRealTimeActive ? 'Live' : 'Demo Mode'}
          </Badge>
          <Button 
            variant="outline" 
            onClick={() => setIsRealTimeActive(!isRealTimeActive)}
          >
            {isRealTimeActive ? 'Disable' : 'Enable'} Real-time
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>Phase 3b Implementation Complete!</strong> 
          {' '}Real-time collaboration supports {collaborationStats.activeUsers} concurrent users, 
          analytics dashboard tracks 12+ KPIs, and mobile interface supports touch gestures.
        </AlertDescription>
      </Alert>

      <Tabs value={activeFeature} onValueChange={setActiveFeature} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Implementation Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Real-time Collaboration</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Analytics Dashboard</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Mobile Optimization</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Phase 3b Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-600">{collaborationStats.activeUsers}</div>
                    <div className="text-muted-foreground">Active Collaborators</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-muted-foreground">Audits Analyzed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-purple-600">68%</div>
                    <div className="text-muted-foreground">Mobile Usage</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-orange-600">94%</div>
                    <div className="text-muted-foreground">User Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Collaboration Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Multi-Auditor Support</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Live presence tracking</li>
                    <li>• Real-time status updates</li>
                    <li>• Activity monitoring</li>
                    <li>• Role-based permissions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Communication Tools</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Instant messaging</li>
                    <li>• File sharing</li>
                    <li>• Screen sharing</li>
                    <li>• Video conferencing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Audit completion rates</li>
                    <li>• Time-to-delivery tracking</li>
                    <li>• Quality score analysis</li>
                    <li>• Client satisfaction metrics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Security Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vulnerability trend analysis</li>
                    <li>• Finding severity distribution</li>
                    <li>• Remediation time tracking</li>
                    <li>• Risk assessment reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Team Analytics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Auditor performance ranking</li>
                    <li>• Collaboration effectiveness</li>
                    <li>• Workload distribution</li>
                    <li>• Skill gap identification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Optimization Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Touch Interface</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Swipe navigation</li>
                    <li>• Touch-friendly controls</li>
                    <li>• Gesture recognition</li>
                    <li>• Haptic feedback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Responsive Design</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Adaptive layouts</li>
                    <li>• Progressive Web App</li>
                    <li>• Offline capabilities</li>
                    <li>• Native sharing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 