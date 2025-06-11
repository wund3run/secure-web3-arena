
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Mail, Phone, Clock, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  return (
    <StandardLayout
      title="Support Center | Hawkly"
      description="Get help and support for Hawkly's Web3 security audit platform. Contact our team for assistance with audits, technical issues, and platform features."
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            How can we help?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the support you need to secure your Web3 project successfully
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-hawkly-primary" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get instant help from our support team
              </p>
              <Button size="sm" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-hawkly-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Send us a detailed message
              </p>
              <Button size="sm" variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-hawkly-primary" />
              </div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse our comprehensive guides
              </p>
              <Button size="sm" variant="outline" className="w-full">View Docs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-hawkly-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Speak directly with our team
              </p>
              <Button size="sm" variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@hawkly.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">Within 4 hours</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <Link to="/faq">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      FAQ
                    </Button>
                  </Link>
                  <Link to="/security-guides">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Security Guides
                    </Button>
                  </Link>
                  <Link to="/knowledge-base">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Knowledge Base
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Support</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and our support team will get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select support category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audit-inquiry">Audit Inquiry</SelectItem>
                      <SelectItem value="technical-issue">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="account">Account Support</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide detailed information about your issue or question"
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Support Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Support Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to use Hawkly platform
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>

              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Audit Process</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Understand our security audit workflow
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>

              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Integrate with Hawkly's API
                </p>
                <Button variant="outline" size="sm">View Docs</Button>
              </div>

              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our security community
                </p>
                <Link to="/forum">
                  <Button variant="outline" size="sm">Join Now</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default SupportPage;
