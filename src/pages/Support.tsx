
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  HelpCircle,
  Book,
  Users,
  Video,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportChannels = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      status: "online",
      action: "Start Chat"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send detailed questions via email",
      availability: "24/7",
      responseTime: "< 24 hours",
      status: "online",
      action: "Send Email"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Talk directly with our experts",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate",
      status: "online",
      action: "Call Now"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Call",
      description: "Schedule a video consultation",
      availability: "By appointment",
      responseTime: "Same day",
      status: "schedule",
      action: "Book Call"
    }
  ];

  const helpResources = [
    {
      category: "Getting Started",
      icon: <Book className="h-5 w-5" />,
      articles: [
        "How to create your first audit request",
        "Understanding audit pricing and timelines",
        "Setting up your project profile",
        "Navigating the Hawkly dashboard"
      ]
    },
    {
      category: "Auditors",
      icon: <Users className="h-5 w-5" />,
      articles: [
        "Becoming a verified auditor",
        "Managing your auditor profile",
        "Best practices for audit proposals",
        "Using the auditor dashboard"
      ]
    },
    {
      category: "Security",
      icon: <Zap className="h-5 w-5" />,
      articles: [
        "Understanding different audit types",
        "Preparing your code for audit",
        "Interpreting audit reports",
        "Post-audit security recommendations"
      ]
    },
    {
      category: "Technical",
      icon: <FileText className="h-5 w-5" />,
      articles: [
        "API integration guide",
        "Webhook configuration",
        "SDK documentation",
        "Troubleshooting common issues"
      ]
    }
  ];

  const commonIssues = [
    {
      issue: "Can't log into my account",
      solution: "Try resetting your password or contact support if the issue persists",
      category: "account",
      priority: "high"
    },
    {
      issue: "Audit request not receiving proposals",
      solution: "Check your project details and budget range. Consider expanding criteria",
      category: "audits",
      priority: "medium"
    },
    {
      issue: "Payment or escrow issues",
      solution: "Verify your payment method and contact our billing team",
      category: "billing",
      priority: "high"
    },
    {
      issue: "Platform features not working",
      solution: "Clear your browser cache or try a different browser",
      category: "technical",
      priority: "low"
    }
  ];

  const filteredIssues = commonIssues.filter(issue => {
    const matchesSearch = issue.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.solution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'schedule':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Support Center | Hawkly</title>
        <meta name="description" content="Get help with your security audits and platform usage. 24/7 support available." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Support Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get help with your security audits and platform usage. Our expert support team is here to assist you 24/7.
            </p>
          </div>

          {/* Emergency Banner */}
          <div className="mb-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-red-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900">Security Emergency?</h3>
                    <p className="text-red-800 text-sm">
                      If you have an active security incident or critical vulnerability, contact our emergency response team immediately.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Emergency Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Channels */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-primary mb-4">
                      {channel.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{channel.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center gap-2 text-xs">
                        {getStatusIcon(channel.status)}
                        <span>{channel.availability}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Response: {channel.responseTime}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="help" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="help">Help Articles</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              <TabsTrigger value="status">System Status</TabsTrigger>
            </TabsList>

            <TabsContent value="help" className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Browse Help Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {helpResources.map((resource, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="text-primary">
                            {resource.icon}
                          </div>
                          {resource.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {resource.articles.map((article, articleIndex) => (
                            <li key={articleIndex}>
                              <a 
                                href="#" 
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-between group"
                              >
                                {article}
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">Common Issues & Solutions</h3>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search issues..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select 
                    className="border rounded-md px-3 py-2 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="account">Account</option>
                    <option value="audits">Audits</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                {/* Issues List */}
                <div className="space-y-4">
                  {filteredIssues.map((issue, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{issue.issue}</h4>
                              <Badge className={getPriorityColor(issue.priority)}>
                                {issue.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{issue.solution}</p>
                          </div>
                          <HelpCircle className="h-5 w-5 text-gray-400 ml-4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredIssues.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
                    <p className="text-gray-600">Try different search terms or contact support directly</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">System Status</h3>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <h4 className="font-semibold text-green-900">All Systems Operational</h4>
                        <p className="text-sm text-green-800">All services are running smoothly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Status */}
                <div className="space-y-4">
                  {[
                    { service: "Web Platform", status: "operational" },
                    { service: "API Services", status: "operational" },
                    { service: "Authentication", status: "operational" },
                    { service: "Audit Marketplace", status: "operational" },
                    { service: "Payment Processing", status: "operational" },
                    { service: "Notifications", status: "operational" }
                  ].map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{service.service}</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600 capitalize">{service.status}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Still Need Help */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is ready to provide personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>
                    Contact Support
                  </Button>
                  <Button variant="outline">
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Support;
