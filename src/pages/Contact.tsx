
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <StandardLayout 
      title="Contact Us" 
      description="Get in touch with our Web3 security experts - Available 24/7"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Our Security Experts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about Web3 security? Need help with your audit request? 
            Our team of experts is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input id="subject" placeholder="Security audit inquiry" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your security needs or questions..."
                  rows={6}
                  required 
                />
              </div>
              <Button className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our security team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-muted-foreground">join@hawkly.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-muted-foreground">Available 24/7</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Security Support</p>
                    <p className="text-sm text-muted-foreground">24/7 Emergency Response</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday: 9AM - 6PM PST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/request-audit">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Security Audit
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/support">
                    <Mail className="mr-2 h-4 w-4" />
                    Visit Support Center
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/docs">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you start an audit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most audits can begin within 24-48 hours of your request. Emergency audits 
                  can start within 2-4 hours for critical security issues.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What types of projects do you audit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We audit all types of Web3 projects including DeFi protocols, NFT marketplaces, 
                  DAOs, bridges, and Layer 2 solutions across multiple blockchains.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much does a security audit cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Audit costs vary based on project complexity and scope. Most audits range from 
                  $5,000 to $50,000. Contact us for a personalized quote.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide ongoing security support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer ongoing security monitoring, incident response, and regular 
                  security assessments to keep your project protected long-term.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
