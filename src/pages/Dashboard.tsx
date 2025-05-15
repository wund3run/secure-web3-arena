
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuth } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart4, 
  Shield, 
  Settings, 
  FileText, 
  Github, 
  LayoutDashboard, 
  Users, 
  Calendar,
  Accessibility
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GuidedOnboarding } from '@/components/onboarding/guided-onboarding';
import { DashboardLoader } from '@/components/admin/dashboard/DashboardLoader';
import { CustomizableDashboard } from '@/components/dashboard/CustomizableDashboard';
import { IntelligentMatching } from '@/components/matching/intelligent-matching';
import { AccessibilityAssessment } from '@/components/dashboard/AccessibilityAssessment';
import { GithubIntegration } from '@/components/dashboard/GithubIntegration';
import { PricingPlans } from '@/components/dashboard/PricingPlans';
import { AuditProgressTracker } from '@/components/dashboard/AuditProgressTracker';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is first login
    const hasSeenOnboarding = localStorage.getItem('hawkly_onboarding_completed');
    if (!hasSeenOnboarding && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  // If loading, show loader
  if (loading) {
    return <DashboardLoader />;
  }

  // If no user, redirect to auth page
  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Helmet>
        <title>Dashboard | Hawkly Security Platform</title>
        <meta name="description" content="View your security audits, manage your profile, and monitor your projects" />
      </Helmet>
      
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className={`p-4 sm:p-6 lg:p-8 flex-grow ${!sidebarOpen ? 'ml-0' : 'ml-0 lg:ml-64'} transition-all duration-300`}>
          <header className="mb-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Welcome back, {user?.user_metadata?.full_name || 'User'}
                </h1>
                <p className="text-muted-foreground">
                  Monitor your security audits, manage your profile, and track your progress
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={() => setShowOnboarding(true)}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Take Tour
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/request-audit')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Request Audit
                </Button>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="audits">
                  <Shield className="h-4 w-4 mr-2" />
                  Audits
                </TabsTrigger>
                <TabsTrigger value="subscriptions">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Plans
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <Users className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <CustomizableDashboard
                  title="Your Dashboard"
                  widgets={[
                    {
                      id: "audit-progress",
                      title: "Audit Progress",
                      size: "medium",
                      type: "audit-progress",
                      content: <AuditProgressTracker />,
                      minimizable: true,
                    },
                    {
                      id: "security-matching",
                      title: "Recommended Security Services",
                      size: "large",
                      type: "matching",
                      content: <IntelligentMatching />,
                      minimizable: true,
                    },
                    {
                      id: "github",
                      title: "GitHub Integration",
                      size: "small",
                      type: "github",
                      content: <GithubIntegration />,
                      minimizable: true,
                    },
                    {
                      id: "accessibility",
                      title: "Accessibility Profile",
                      size: "small",
                      type: "accessibility",
                      content: <AccessibilityAssessment />,
                      minimizable: true,
                    },
                  ]}
                />
              </TabsContent>

              <TabsContent value="audits">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Your Audit Projects</CardTitle>
                      <CardDescription>
                        Track the progress of your security audits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AuditProgressTracker expanded={true} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="subscriptions">
                <PricingPlans />
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Integration</CardTitle>
                    <CardDescription>
                      Connect your GitHub account to simplify the audit process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GithubIntegration expanded={true} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Settings</CardTitle>
                    <CardDescription>
                      Personalize your experience with accessibility options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AccessibilityAssessment expanded={true} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Account settings form would go here */}
                      <p className="text-sm text-muted-foreground">
                        Manage your account settings, notification preferences, and security options.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Footer />
      </div>

      {/* Guided Onboarding */}
      {showOnboarding && (
        <GuidedOnboarding onClose={() => {
          setShowOnboarding(false);
          localStorage.setItem('hawkly_onboarding_completed', 'true');
        }} />
      )}
    </div>
  );
}
