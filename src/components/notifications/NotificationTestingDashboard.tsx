
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info, Volume2, VolumeX } from 'lucide-react';

export const NotificationTestingDashboard = () => {
  const { addNotification, notifications, unreadCount } = useNotifications();
  const { user } = useAuth();
  const { 
    isSupported, 
    permission, 
    requestPermission, 
    canSendNotifications 
  } = useBrowserNotifications();
  const [testResults, setTestResults] = useState<string[]>([]);

  if (!user) return null;

  const addTestResult = (result: string) => {
    setTestResults(prev => [result, ...prev.slice(0, 9)]);
  };

  const testNotificationFlow = async () => {
    addTestResult('Starting notification flow test...');
    
    // Test 1: Basic notification
    addNotification({
      title: 'Test Notification',
      message: 'This is a test notification to verify the system works.',
      type: 'info',
      category: 'system',
      userId: user.id,
    });
    addTestResult('✅ Basic notification sent');

    // Test 2: Browser permission
    if (isSupported) {
      const granted = await requestPermission();
      addTestResult(granted ? '✅ Browser permission granted' : '❌ Browser permission denied');
    } else {
      addTestResult('❌ Browser notifications not supported');
    }

    // Test 3: Sound test
    if ((window as any).playNotificationSound) {
      (window as any).playNotificationSound();
      addTestResult('✅ Sound notification triggered');
    } else {
      addTestResult('❌ Sound notification not available');
    }

    // Test 4: Multiple notification types
    const testTypes: Array<{ type: 'success' | 'warning' | 'error' | 'info', title: string }> = [
      { type: 'success', title: 'Success Test' },
      { type: 'warning', title: 'Warning Test' },
      { type: 'error', title: 'Error Test' },
    ];

    testTypes.forEach((test, index) => {
      setTimeout(() => {
        addNotification({
          title: test.title,
          message: `Testing ${test.type} notification type`,
          type: test.type,
          category: 'system',
          userId: user.id,
        });
        addTestResult(`✅ ${test.type} notification sent`);
      }, (index + 1) * 1000);
    });
  };

  const testAuditScenario = () => {
    addTestResult('Testing audit workflow scenario...');
    
    const auditId = 'test-audit-123';
    const scenarios = [
      { status: 'submitted', type: 'info' as const, message: 'Your audit request has been submitted for review.' },
      { status: 'in_review', type: 'info' as const, message: 'Your audit is now under review by our team.' },
      { status: 'assigned', type: 'success' as const, message: 'An auditor has been assigned to your project.' },
      { status: 'in_progress', type: 'info' as const, message: 'Your audit is now in progress.' },
      { status: 'completed', type: 'success' as const, message: 'Your audit has been completed!' },
    ];

    scenarios.forEach((scenario, index) => {
      setTimeout(() => {
        addNotification({
          title: `Audit ${scenario.status.replace('_', ' ').toUpperCase()}`,
          message: scenario.message,
          type: scenario.type,
          category: 'audit',
          userId: user.id,
          actionUrl: `/audit/${auditId}`,
          actionLabel: 'View Audit',
        });
        addTestResult(`✅ Audit ${scenario.status} notification sent`);
      }, index * 1500);
    });
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification System Testing Dashboard
        </CardTitle>
        <CardDescription>
          Test and monitor the notification system functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="testing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
            <TabsTrigger value="results">Test Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="testing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={testNotificationFlow} 
                    className="w-full"
                    variant="outline"
                  >
                    Run Full System Test
                  </Button>
                  <Button 
                    onClick={testAuditScenario} 
                    className="w-full"
                    variant="outline"
                  >
                    Test Audit Workflow
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => addNotification({
                      title: 'Quick Test',
                      message: 'Quick notification test',
                      type: 'info',
                      category: 'system',
                      userId: user.id,
                    })}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    Send Test Notification
                  </Button>
                  <Button 
                    onClick={async () => {
                      const granted = await requestPermission();
                      addTestResult(granted ? 'Permission granted' : 'Permission denied');
                    }}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    Test Browser Permission
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Browser Support</span>
                    {isSupported ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                  </div>
                  <Badge variant={isSupported ? "default" : "destructive"}>
                    {isSupported ? "Supported" : "Not Supported"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Permission</span>
                    {permission === 'granted' ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      permission === 'denied' ?
                      <XCircle className="h-4 w-4 text-red-500" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    }
                  </div>
                  <Badge variant={
                    permission === 'granted' ? "default" : 
                    permission === 'denied' ? "destructive" : "secondary"
                  }>
                    {permission}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Notifications</span>
                    <Info className="h-4 w-4 text-blue-500" />
                  </div>
                  <Badge variant="outline">
                    {notifications.length}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Unread Count</span>
                    <Bell className="h-4 w-4 text-orange-500" />
                  </div>
                  <Badge variant={unreadCount > 0 ? "destructive" : "outline"}>
                    {unreadCount}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Results</CardTitle>
                <CardDescription>
                  Latest test results and system logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No test results yet. Run some tests to see results here.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div 
                        key={index} 
                        className="text-sm p-2 bg-muted rounded font-mono"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
                {testResults.length > 0 && (
                  <Button 
                    onClick={() => setTestResults([])} 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                  >
                    Clear Results
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
