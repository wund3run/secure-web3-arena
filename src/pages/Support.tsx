
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, BookOpen, MessageSquare, Mail, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Support() {
  const supportCategories = [
    {
      title: "Getting Started",
      description: "New to Hawkly? Learn the basics",
      icon: BookOpen,
      articles: [
        "How to request your first security audit",
        "Understanding audit pricing and timelines", 
        "Choosing the right auditor for your project",
        "Preparing your code for audit"
      ]
    },
    {
      title: "For Auditors",
      description: "Resources for security professionals",
      icon: CheckCircle,
      articles: [
        "Auditor onboarding process",
        "Best practices for audit reports",
        "Building your reputation on the platform",
        "Payment and earnings information"
      ]
    },
    {
      title: "Technical Support",
      description: "Platform and technical issues",
      icon: HelpCircle,
      articles: [
        "Platform troubleshooting guide",
        "API documentation and integration",
        "Account security and verification",
        "File upload and sharing guidelines"
      ]
    },
    {
      title: "Billing & Payments",
      description: "Payment and subscription help",
      icon: Mail,
      articles: [
        "Understanding audit payments",
        "Refund and cancellation policy",
        "Escrow service explained",
        "Payment methods and currencies"
      ]
    }
  ];

  return (
    <StandardLayout 
      title="Support Center" 
      description="Find answers to your questions and get help with our platform"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Search our knowledge base, browse frequently asked questions, or contact our support team directly.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles, guides, or FAQs..."
              className="pl-10 pr-4 py-3 text-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              Search
            </Button>
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {supportCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <category.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {category.articles.map((article, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a href="#" className="text-sm hover:text-primary transition-colors">
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  View All Articles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help from our support team
                </p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed guides and API documentation
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs">View Docs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Help Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "How to prepare your smart contract for audit",
              "Understanding audit report findings",
              "Setting up two-factor authentication",
              "How to choose the right security auditor",
              "Payment and billing FAQ",
              "Emergency audit procedures"
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm font-medium">{article}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 for security emergencies and during business hours for general inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/request-audit">Request Emergency Audit</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
