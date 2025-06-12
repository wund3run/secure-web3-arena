
import React, { useState, useEffect } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  RefreshCw, 
  Download, 
  Settings, 
  Eye, 
  ExternalLink,
  Filter,
  Calendar,
  Bell,
  Share2
} from 'lucide-react';
import { EnhancedAnalyticsDashboard } from '@/components/analytics/EnhancedAnalyticsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const SecurityInsightsPage = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data that would come from API
  const [metrics, setMetrics] = useState({
    activeThreats: 12,
    vulnerabilitiesFixed: 847,
    securityScore: 92,
    projectsMonitored: 1245
  });

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handler functions
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update metrics with new data
      setMetrics(prev => ({
        ...prev,
        activeThreats: Math.floor(Math.random() * 20) + 5,
        vulnerabilitiesFixed: prev.vulnerabilitiesFixed + Math.floor(Math.random() * 10),
        securityScore: Math.min(100, prev.securityScore + Math.floor(Math.random() * 5) - 2)
      }));
      
      setLastUpdated(new Date());
      toast({
        title: "Data Refreshed",
        description: "Security insights have been updated with the latest data.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportReport = async () => {
    try {
      toast({
        title: "Generating Report",
        description: "Your security insights report is being prepared...",
      });
      
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real app, this would trigger a file download
      const blob = new Blob(['Security Insights Report - Generated on ' + new Date().toISOString()], 
        { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `security-insights-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Downloaded",
        description: "Your security insights report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewThreatDetails = () => {
    navigate('/security/threats');
  };

  const handleViewVulnerabilities = () => {
    navigate('/security/vulnerabilities');
  };

  const handleConfigureAlerts = () => {
    navigate('/settings/alerts');
  };

  const handleShareDashboard = async () => {
    try {
      const shareUrl = `${window.location.origin}/security-insights/shared/${Date.now()}`;
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Dashboard Link Copied",
        description: "Shareable dashboard link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to generate shareable link.",
        variant: "destructive",
      });
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    toast({
      title: "Time Range Updated",
      description: `Dashboard updated to show ${range} data.`,
    });
  };

  const recentAlerts = [
    { id: 1, type: 'critical', message: 'Potential reentrancy vulnerability detected', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Unusual transaction pattern observed', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Security scan completed successfully', time: '1 hour ago' },
  ];

  return (
    <StandardLayout
      title="Security Insights | Hawkly"
      description="Real-time security insights and vulnerability analytics"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-hawkly-gradient mb-2">
              Security Insights Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time vulnerability analysis and comprehensive security metrics
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleShareDashboard}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleConfigureAlerts}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          <Badge variant="outline" className="px-3 py-1">
            <Calendar className="h-3 w-3 mr-1" />
            Time Range:
          </Badge>
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange(range)}
            >
              {range}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Enhanced Analytics</TabsTrigger>
            <TabsTrigger value="overview">Quick Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <EnhancedAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards with Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleViewThreatDetails}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Active Threats
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{metrics.activeThreats}</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleViewVulnerabilities}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Vulnerabilities Fixed
                    <Shield className="h-4 w-4 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{metrics.vulnerabilitiesFixed}</div>
                  <p className="text-xs text-muted-foreground">+15% this month</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    View Report
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Security Score
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hawkly-primary">{metrics.securityScore}%</div>
                  <p className="text-xs text-muted-foreground">Above average</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto mt-2"
                    onClick={() => navigate('/security/score-breakdown')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Score Breakdown
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Projects Monitored</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.projectsMonitored}</div>
                  <p className="text-xs text-muted-foreground">+8% growth</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto mt-2"
                    onClick={() => navigate('/projects')}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Manage Projects
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Cards with Interactive Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Threat Trends
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/analytics/threats')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Full Analysis
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Advanced threat trend analysis showing increasing sophistication in DeFi attacks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Reentrancy Attacks</span>
                      <Badge variant="destructive">+23%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Flash Loan Exploits</span>
                      <Badge variant="destructive">+15%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Oracle Manipulation</span>
                      <Badge variant="secondary">-5%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Recent Alerts
                    </div>
                    <Button variant="outline" size="sm" onClick={handleConfigureAlerts}>
                      <Bell className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'critical' ? 'bg-red-500' :
                          alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                };

export default SecurityInsights;
