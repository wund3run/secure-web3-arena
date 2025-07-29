import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Search, 
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Send,
  Headphones
} from 'lucide-react';

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: 'Available 24/7',
      responseTime: 'Immediate',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: Mail,
      availability: 'Always open',
      responseTime: 'Within 4 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      icon: Phone,
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: 'Call Now'
    },
    {
      title: 'Documentation',
      description: 'Browse our comprehensive help articles',
      icon: FileText,
      availability: 'Always available',
      responseTime: 'Self-service',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: 'Browse Docs'
    }
  ];

  const commonIssues = [
    {
      title: 'How to request a security audit?',
      category: 'Getting Started',
      views: '2.3k',
      helpful: 95
    },
    {
      title: 'Understanding audit reports',
      category: 'Audits',
      views: '1.8k',
      helpful: 92
    },
    {
      title: 'Payment and billing questions',
      category: 'Billing',
      views: '1.5k',
      helpful: 88
    },
    {
      title: 'Connecting your wallet',
      category: 'Technical',
      views: '1.2k',
      helpful: 90
    },
    {
      title: 'Choosing the right auditor',
      category: 'Marketplace',
      views: '1.1k',
      helpful: 94
    }
  ];

  const ticketStatus = [
    {
      id: '#12345',
      subject: 'Audit report clarification needed',
      status: 'Open',
      priority: 'High',
      created: '2 hours ago',
      lastUpdate: '30 minutes ago'
    },
    {
      id: '#12344',
      subject: 'Payment processing issue',
      status: 'In Progress',
      priority: 'Medium',
      created: '1 day ago',
      lastUpdate: '4 hours ago'
    },
    {
      id: '#12343',
      subject: 'Feature request - API access',
      status: 'Resolved',
      priority: 'Low',
      created: '3 days ago',
      lastUpdate: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get help with our platform, services, and technical support. We're here to help you succeed.
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, guides, or common issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="help" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="help">Get Help</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="help" className="mt-6">
            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {supportOptions.map((option, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${option.bgColor} border-0`}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <option.icon className={`h-8 w-8 ${option.color}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                      <div className="space-y-1 text-xs text-gray-500 mb-4">
                        <p>{option.availability}</p>
                        <p>Response: {option.responseTime}</p>
                      </div>
                      <Button className="w-full" variant="outline">
                        {option.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Common Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Common Issues & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{issue.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <Badge variant="outline">{issue.category}</Badge>
                          <span>{issue.views} views</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {issue.helpful}% helpful
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hawkly-primary"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="audit">Audit Questions</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <Textarea 
                      placeholder="Please provide as much detail as possible..."
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-hawkly-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-600">support@hawkly.app</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-hawkly-primary" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-hawkly-primary" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-gray-600">Available 24/7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-hawkly-primary" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-600">Critical Security Issues</p>
                        <p className="text-sm text-gray-600 mb-3">
                          For urgent security matters that require immediate attention.
                        </p>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          <Phone className="h-4 w-4 mr-2" />
                          Emergency Hotline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Support Tickets</CardTitle>
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketStatus.map((ticket, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">Ticket {ticket.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline" className={`${getPriorityColor(ticket.priority)} border-current`}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Created {ticket.created}</span>
                        <span>Last updated {ticket.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Getting Started Guide <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">API Documentation <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Security Best Practices <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Troubleshooting Guide <ExternalLink className="h-4 w-4" /></a></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Platform Overview <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Requesting an Audit <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Understanding Reports <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Payment Process <ExternalLink className="h-4 w-4" /></a></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Security Checklist <Download className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Audit Templates <Download className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Integration Guide <Download className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Mobile App <Download className="h-4 w-4" /></a></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Headphones className="h-12 w-12 mx-auto mb-4 text-hawkly-primary" />
              <h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our support team is standing by to help you with any questions or issues.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductionLayout>
  );
};

export default SupportPage;
