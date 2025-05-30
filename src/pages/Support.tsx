
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, BookOpen, MessageSquare, Mail } from 'lucide-react';

const Support = () => {
  const supportCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Hawkly",
      icon: BookOpen,
      articles: 12
    },
    {
      title: "Audit Process",
      description: "Understanding how audits work",
      icon: HelpCircle,
      articles: 8
    },
    {
      title: "Payment & Billing",
      description: "Questions about payments and escrow",
      icon: MessageSquare,
      articles: 6
    }
  ];

  return (
    <StandardLayout
      title="Support Center"
      description="Get help and find answers to your questions"
      className="container py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to your questions or get in touch with our support team.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <category.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Badge variant="secondary">{category.articles} articles</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Contact Support</Button>
              <Button variant="outline">Live Chat</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default Support;
