
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { PageQualityAudit } from '@/components/audit/PageQualityAudit';
import { SEOChecker } from '@/components/audit/SEOChecker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Layout, Navigation, Eye, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const quickChecks = [
    {
      name: 'Navigation Links',
      status: 'warning',
      message: '2 broken links found',
      icon: Navigation
    },
    {
      name: 'SEO Optimization',
      status: 'error',
      message: '5 pages missing meta descriptions',
      icon: Search
    },
    {
      name: 'Design Consistency',
      status: 'success',
      message: 'All pages use design system',
      icon: Layout
    },
    {
      name: 'User Journey',
      status: 'warning',
      message: '3 incomplete flows detected',
      icon: Eye
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardizedLayout
      title="Platform Audit Dashboard | Hawkly"
      description="Comprehensive audit of platform design, SEO, and user experience"
      showBreadcrumbs={false}
    >
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Platform Audit Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and improve platform quality, SEO performance, and user experience
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Page Quality</TabsTrigger>
            <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
            <TabsTrigger value="journey">User Journey</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickChecks.map((check, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <check.icon className="h-5 w-5 text-muted-foreground" />
                      {getStatusIcon(check.status)}
                    </div>
                    <h3 className="font-medium text-sm">{check.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{check.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Score</span>
                    <Badge className="bg-yellow-100 text-yellow-800">76/100</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pages Audited</span>
                    <span className="text-sm font-medium">15/15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Issues</span>
                    <Badge className="bg-red-100 text-red-800">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warnings</span>
                    <Badge className="bg-yellow-100 text-yellow-800">8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Fix broken navigation links</p>
                      <p className="text-xs text-muted-foreground">
                        Update navigation menu to point to correct pages
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Add missing SEO meta descriptions</p>
                      <p className="text-xs text-muted-foreground">
                        5 service pages need proper meta descriptions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimize user journey flows</p>
                      <p className="text-xs text-muted-foreground">
                        Improve CTA placement and form completion rates
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <PageQualityAudit />
          </TabsContent>

          <TabsContent value="seo">
            <SEOChecker />
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Journey Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Homepage → Marketplace</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Users clicking "Find Security Experts" from homepage
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Working</Badge>
                      <span className="text-xs text-muted-foreground">85% completion rate</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Marketplace → Request Audit</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Users proceeding from browsing to requesting audit
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                      <span className="text-xs text-muted-foreground">62% completion rate</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Service Pages → Contact</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Users viewing services and reaching out
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">Broken</Badge>
                      <span className="text-xs text-muted-foreground">Contact links not working</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardizedLayout>
  );
}
