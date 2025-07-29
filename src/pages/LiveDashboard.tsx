
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveAuditProgress } from '@/components/realtime/LiveAuditProgress';
import { RealtimeNotifications } from '@/components/realtime/RealtimeNotifications';
import { ComprehensiveAnalyticsDashboard } from '@/components/analytics/ComprehensiveAnalyticsDashboard';
import { AIMatchingInterface } from '@/components/ai-matching/AIMatchingInterface';
import { RealtimeChat } from '@/components/chat/RealtimeChat';
import { useState } from 'react';
import { 
  Activity, 
  Brain, 
  BarChart3, 
  MessageSquare,
  Zap,
  Users,
  Shield
} from 'lucide-react';

export default function LiveDashboard() {
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

  const mockParticipants = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '',
      status: 'online' as const,
      role: 'auditor' as const,
    },
    {
      id: '2', 
      name: 'You',
      avatar: '',
      status: 'online' as const,
      role: 'client' as const,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Live Dashboard | Hawkly</title>
        <meta
          name="description"
          content="Real-time dashboard with live audit progress, analytics, and AI-powered features."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Live Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Real-time audit progress, advanced analytics, and AI-powered insights
              </p>
            </div>

            <Tabs defaultValue="live-progress" className="space-y-8">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="live-progress" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Live Progress
                </TabsTrigger>
                <TabsTrigger value="ai-matching" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Matching
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="real-time" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Real-time Hub
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live-progress" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <LiveAuditProgress 
                      auditId="audit-123"
                      onMessageClick={() => setShowChat(true)}
                      onViewDetails={() => console.log('View details clicked')}
                    />
                  </div>
                  <div>
                    <RealtimeNotifications />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-matching" className="space-y-6">
                <AIMatchingInterface />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <ComprehensiveAnalyticsDashboard />
              </TabsContent>

              <TabsContent value="real-time" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Activity className="h-8 w-8 text-blue-600" />
                      <h3 className="text-lg font-semibold">Real-time Updates</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Live tracking of audit progress, findings, and status changes.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Instant progress notifications</li>
                      <li>• Live finding alerts</li>
                      <li>• Status change tracking</li>
                      <li>• Milestone completion updates</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="h-8 w-8 text-green-600" />
                      <h3 className="text-lg font-semibold">Live Messaging</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Real-time communication between clients and auditors.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Instant message delivery</li>
                      <li>• Typing indicators</li>
                      <li>• File sharing capabilities</li>
                      <li>• Message read receipts</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="h-8 w-8 text-purple-600" />
                      <h3 className="text-lg font-semibold">AI Insights</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Intelligent matching and predictive analytics.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Smart auditor matching</li>
                      <li>• Risk assessment predictions</li>
                      <li>• Performance analytics</li>
                      <li>• Trend identification</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-8 w-8 text-orange-600" />
                      <h3 className="text-lg font-semibold">Security Monitoring</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Continuous security monitoring and threat detection.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Real-time vulnerability scanning</li>
                      <li>• Automated security alerts</li>
                      <li>• Compliance monitoring</li>
                      <li>• Risk score tracking</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="h-8 w-8 text-cyan-600" />
                      <h3 className="text-lg font-semibold">Live Analytics</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Real-time data visualization and reporting.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Live performance metrics</li>
                      <li>• Dynamic chart updates</li>
                      <li>• Real-time KPI tracking</li>
                      <li>• Instant report generation</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-8 w-8 text-yellow-600" />
                      <h3 className="text-lg font-semibold">Collaboration Hub</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Enhanced collaboration tools for teams.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Team presence indicators</li>
                      <li>• Shared workspaces</li>
                      <li>• Collaborative editing</li>
                      <li>• Activity feeds</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
        
        {showChat && (
          <RealtimeChat
            chatId="chat-123"
            participants={mockParticipants}
            onClose={() => setShowChat(false)}
            minimized={chatMinimized}
            onToggleMinimize={() => setChatMinimized(!chatMinimized)}
          />
        )}
      </div>
    </>
  );
}
