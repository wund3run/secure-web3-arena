
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AuditProgressTracker } from '@/components/dashboard/enhanced/AuditProgressTracker';
import { RealtimeChatSystem } from '@/components/chat/RealtimeChatSystem';
import { EnhancedNotificationCenter } from '@/components/notifications/EnhancedNotificationCenter';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, MessageSquare, Bell } from 'lucide-react';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your personalized security dashboard with real-time tracking and communication" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Audit Progress
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <DashboardLayout />
              </TabsContent>
              
              <TabsContent value="progress" className="mt-6">
                <AuditProgressTracker />
              </TabsContent>
              
              <TabsContent value="chat" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <RealtimeChatSystem />
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <EnhancedNotificationCenter />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
