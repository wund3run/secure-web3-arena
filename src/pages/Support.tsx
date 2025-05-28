
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Headphones, MessageSquare, Clock, CheckCircle, AlertTriangle,
  Phone, Mail, MapPin, Globe, Zap, Shield, Users, FileText,
  Search, ArrowRight, Bot, Video, BookOpen, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    category: '',
    priority: '',
    subject: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSupportForm(prev => ({ ...prev, [field]: value }));
  };

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      icon: <MessageSquare className="h-6 w-6" />,
      action: "Start Chat",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Email Support",
      description: "Detailed assistance for complex issues",
      availability: "24/7",
      responseTime: "< 4 hours",
      icon: <Mail className="h-6 w-6" />,
      action: "Send Email",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Video Call Support",
      description: "Screen sharing for technical assistance",
      availability: "9 AM - 9 PM UTC",
      responseTime: "Same day",
      icon: <Video className="h-6 w-6" />,
      action: "Schedule Call",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Emergency Hotline",
      description: "Critical security incidents",
      availability: "24/7",
      responseTime: "< 15 minutes",
      icon: <Phone className="h-6 w-6" />,
      action: "Call Now",
      color: "bg-red-50 text-red-700 border-red-200"
    }
  ];

  const supportCategories = [
    {
      title: "Technical Issues",
      description: "Platform bugs, API problems, integration help",
      icon: <Zap className="h-5 w-5" />,
      avgResolution: "2-4 hours",
      articles: 23
    },
    {
      title: "Security Questions",
      description: "Audit process, vulnerability reports, security best practices",
      icon: <Shield className="h-5 w-5" />,
      avgResolution: "1-2 hours",
      articles: 31
    },
    {
      title: "Billing & Payments",
      description: "Invoices, payment methods, refunds, plan changes",
      icon: <FileText className="h-5 w-5" />,
      avgResolution: "1 hour",
      articles: 18
    },
    {
      title: "Account Management",
      description: "Profile settings, permissions, team management",
      icon: <Users className="h-5 w-5" />,
      avgResolution: "30 minutes",
      articles: 15
    }
  ];

  const quickActions = [
    {
      title: "Check System Status",
      description: "View current platform status and known issues",
      icon: <CheckCircle className="h-5 w-5" />,
      href: "/status"
    },
    {
      title: "Download Audit Report",
      description: "Access your completed security audit reports",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard"
    },
    {
      title: "Update Payment Method",
      description: "Manage your billing information and payment methods",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard/billing"
    },
    {
      title: "View Audit Progress",
      description: "Track the status of your ongoing security audits",
      icon: <Clock className="h-5 w-5" />,
      href: "/dashboard/audits"
    }
  ];

  const supportStats = [
    { label: "Avg Response Time", value: "< 2 hours", trend: "↓ 23%" },
    { label: "Resolution Rate", value: "98.5%", trend: "↑ 2.1%" },
    { label: "Customer Satisfaction", value: "4.9/5", trend: "↑ 0.3" },
    { label: "24/7 Availability", value: "99.9%", trend: "↑ 0.1%" }
  ];

  return (
    <ContentPage
      title="Customer Support"
      description="Get expert help with technical issues, security questions, billing inquiries, and platform guidance. Our 24/7 support team is here to assist you."
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Headphones className="h-4 w-4" />
            24/7 Support Available - Average response time under 2 hours
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Customer <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our expert support team is ready to help you with any questions about security audits, 
            platform features, billing, or technical issues. Get the assistance you need, when you need it.
          </p>
        </div>

        {/* Support Stats */}
        <div className="bg-gradient-to-r from-slate-50 to-green-50 rounded-2xl p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            {supportStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="categories">Help Categories</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            {/* Support Channels */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportChannels.map((channel, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all cursor-pointer border ${channel.color}`}>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2">
                      {channel.icon}
                    </div>
                    <CardTitle className="text-lg">{channel.title}</CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Available: {channel.availability}</div>
                      <div className="text-sm text-muted-foreground">Response: {channel.responseTime}</div>
                    </div>
                    <Button size="sm" className="w-full">
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <CardDescription>
                  Describe your issue in detail and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      placeholder="Your full name"
                      value={supportForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      value={supportForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={supportForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="security">Security Questions</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={supportForm.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    placeholder="Brief description of your issue"
                    value={supportForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you expected to happen."
                    rows={6}
                    value={supportForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <Button className="w-full">
                  Submit Support Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {supportCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Avg Resolution:</span>
                      <Badge variant="outline">{category.avgResolution}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Help Articles:</span>
                      <span className="font-medium">{category.articles} available</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Articles <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                        {action.icon}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-green-600 transition-colors">
                          <Link to={action.href}>{action.title}</Link>
                        </CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={action.href}>
                        Go to {action.title} <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    FAQ
                  </CardTitle>
                  <CardDescription>
                    Answers to the most common questions about our platform and services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/faq">
                      Browse FAQ <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Documentation
                  </CardTitle>
                  <CardDescription>
                    Comprehensive guides, API docs, and technical resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/docs">
                      View Docs <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Community Forum
                  </CardTitle>
                  <CardDescription>
                    Connect with other users and get help from the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/forum">
                      Join Forum <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Security Emergency?
            </CardTitle>
            <CardDescription className="text-red-700">
              If you've discovered a critical security vulnerability or are experiencing an active security incident
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="mr-2 h-4 w-4" />
                Emergency Hotline: +1-800-HAWKLY-SEC
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <Mail className="mr-2 h-4 w-4" />
                security@hawkly.com
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Additional Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Mail className="h-8 w-8 text-blue-600 mx-auto" />
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">support@hawkly.com</p>
              <p className="text-muted-foreground">billing@hawkly.com</p>
            </div>
            <div className="space-y-2">
              <Phone className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-HAWK</p>
              <p className="text-muted-foreground">Available 24/7</p>
            </div>
            <div className="space-y-2">
              <Globe className="h-8 w-8 text-purple-600 mx-auto" />
              <h3 className="font-semibold">Global Support</h3>
              <p className="text-muted-foreground">Multiple time zones</p>
              <p className="text-muted-foreground">15+ languages supported</p>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Support;
