import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { 
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  Bell,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  RotateCcw,
  Share
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface MobileOptimizedAuditInterfaceProps {
  auditId: string;
  auditData?: {
    title: string;
    status: string;
    progress: number;
    dueDate: string;
    client: string;
    auditor: string;
  };
  onBack?: () => void;
}

export function MobileOptimizedAuditInterface({
  auditId,
  auditData,
  onBack
}: MobileOptimizedAuditInterfaceProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  // Mock audit data
  const mockAuditData = auditData || {
    title: 'DeFi Protocol Security Review',
    status: 'in_progress',
    progress: 65,
    dueDate: '2024-01-20',
    client: 'MetaDeFi Labs',
    auditor: 'Sarah Chen'
  };

  const mockTasks = [
    { id: 1, title: 'Smart Contract Review', status: 'completed', progress: 100 },
    { id: 2, title: 'Access Control Analysis', status: 'in_progress', progress: 75 },
    { id: 3, title: 'Economic Model Review', status: 'in_progress', progress: 40 },
    { id: 4, title: 'Final Report Generation', status: 'pending', progress: 0 }
  ];

  const mockFindings = [
    { id: 1, severity: 'critical', title: 'Reentrancy Vulnerability', status: 'open' },
    { id: 2, severity: 'high', title: 'Access Control Issue', status: 'fixed' },
    { id: 3, severity: 'medium', title: 'Input Validation', status: 'open' },
    { id: 4, severity: 'low', title: 'Code Optimization', status: 'acknowledged' }
  ];

  const mockMessages = [
    { id: 1, sender: 'Client', message: 'When will the review be complete?', time: '10:30 AM' },
    { id: 2, sender: 'Auditor', message: 'Initial findings uploaded for review', time: '11:45 AM' },
    { id: 3, sender: 'Client', message: 'Thanks, reviewing now', time: '12:15 PM' }
  ];

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSwipe('left');
    } else if (isRightSwipe) {
      handleSwipe('right');
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const tabs = ['overview', 'tasks', 'findings', 'communication'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'left' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      setSwipeDirection('left');
    } else if (direction === 'right' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      setSwipeDirection('right');
    }

    setTimeout(() => setSwipeDirection(null), 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockAuditData.title,
          text: `Audit progress: ${mockAuditData.progress}%`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const DeviceIndicator = () => (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {isMobile ? <Smartphone className="h-3 w-3" /> : 
       isTablet ? <Tablet className="h-3 w-3" /> : 
       <Monitor className="h-3 w-3" />}
      <span>{isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</span>
    </div>
  );

  const MobileHeader = () => (
    <div className="sticky top-0 z-50 bg-background border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-sm truncate">{mockAuditData.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={mockAuditData.status === 'in_progress' ? 'default' : 'secondary'} className="text-xs">
                {mockAuditData.status.replace('_', ' ')}
              </Badge>
              <span className="text-xs text-muted-foreground">{mockAuditData.progress}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Audit Actions</SheetTitle>
                <SheetDescription>
                  Manage your audit workflow
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Results
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );

  const TabContent = ({ children, tabName }: { children: React.ReactNode, tabName: string }) => (
    <div 
      className={cn(
        "transition-transform duration-300 ease-in-out",
        swipeDirection === 'left' && activeTab === tabName && "transform translate-x-full",
        swipeDirection === 'right' && activeTab === tabName && "transform -translate-x-full"
      )}
    >
      {children}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col h-screen bg-background",
        isFullscreen && "fixed inset-0 z-50"
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <MobileHeader />
      
      {/* Progress Bar */}
      <div className="px-4 py-2 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{mockAuditData.progress}%</span>
        </div>
        <Progress value={mockAuditData.progress} className="h-2" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Mobile-optimized tab navigation */}
        <div className="border-b overflow-x-auto">
          <TabsList className="w-full h-12 grid grid-cols-4 rounded-none bg-background">
            <TabsTrigger value="overview" className="flex-col gap-1 h-full">
              <Eye className="h-4 w-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex-col gap-1 h-full">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="findings" className="flex-col gap-1 h-full">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Findings</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex-col gap-1 h-full">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">Chat</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="overview" className="h-full mt-0">
            <TabContent tabName="overview">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {/* Audit Summary Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{mockAuditData.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Client</span>
                          <p className="font-medium">{mockAuditData.client}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Auditor</span>
                          <p className="font-medium">{mockAuditData.auditor}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due Date</span>
                          <p className="font-medium">{new Date(mockAuditData.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status</span>
                          <Badge variant="outline">{mockAuditData.status.replace('_', ' ')}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{mockTasks.filter(t => t.status === 'completed').length}</div>
                          <div className="text-sm text-muted-foreground">Tasks Done</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{mockFindings.filter(f => f.severity === 'critical').length}</div>
                          <div className="text-sm text-muted-foreground">Critical Issues</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <DeviceIndicator />
                </div>
              </ScrollArea>
            </TabContent>
          </TabsContent>

          <TabsContent value="tasks" className="h-full mt-0">
            <TabContent tabName="tasks">
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {mockTasks.map((task) => (
                    <Card key={task.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full", getStatusColor(task.status))} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={task.progress} className="flex-1 h-2" />
                            <span className="text-xs text-muted-foreground">{task.progress}%</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabContent>
          </TabsContent>

          <TabsContent value="findings" className="h-full mt-0">
            <TabContent tabName="findings">
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {mockFindings.map((finding) => (
                    <Card key={finding.id} className={cn("p-4 border", getSeverityColor(finding.severity))}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {finding.severity}
                            </Badge>
                            <Badge variant={finding.status === 'fixed' ? 'default' : 'secondary'} className="text-xs">
                              {finding.status}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm">{finding.title}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabContent>
          </TabsContent>

          <TabsContent value="communication" className="h-full mt-0">
            <TabContent tabName="communication">
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {message.sender.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabContent>
          </TabsContent>
        </div>
      </Tabs>

      {/* Swipe indicator for mobile */}
      {isMobile && (
        <div className="flex justify-center py-2 border-t">
          <div className="flex gap-1">
            {['overview', 'tasks', 'findings', 'communication'].map((tab) => (
              <div
                key={tab}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  activeTab === tab ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 