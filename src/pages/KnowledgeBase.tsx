
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Knowledge Base | Hawkly</title>
        <meta name="description" content="Comprehensive security documentation and guides" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive documentation, guides, and security best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Security Guides</CardTitle>
              <CardDescription>
                Step-by-step guides for implementing security best practices
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Complete API documentation and integration guides
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <HelpCircle className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>FAQs</CardTitle>
              <CardDescription>
                Answers to frequently asked questions about security
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="mr-4">
            <Link to="/resources">Browse Resources</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
