
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, FileText, Video } from 'lucide-react';

const SupportPage = () => {
  return (
    <StandardLayout
      title="Support | Hawkly"
      description="Get help and support for Hawkly's Web3 security platform"
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
                <Video className="h-6 w-6 text-hawkly-primary" />
              </div>
              <h3 className="font-semibold mb-2">Video Call</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Schedule a consultation call
              </p>
              <Button size="sm" variant="outline" className="w-full">Book Call</Button>
            </CardContent>
          </Card>
        </div>

        {/* Common Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "How to submit an audit request",
                  "Understanding audit report findings", 
                  "Payment and billing questions",
                  "Technical integration support",
                  "Account management issues"
                ].map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded transition-colors cursor-pointer">
                    <span>{issue}</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>System Status</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    All Systems Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Response Time</span>
                  <span className="font-medium">< 2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support Hours</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Queue</span>
                  <span className="font-medium">3 tickets</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};

export default SupportPage;
