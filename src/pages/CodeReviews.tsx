
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Code, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeReviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Code Reviews | Hawkly</title>
        <meta name="description" content="Expert code analysis and review services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Code Reviews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get expert feedback on your code quality, security, and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Code className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Code Quality Analysis</CardTitle>
              <CardDescription>
                Detailed review of code structure, readability, and maintainability
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Eye className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Security Review</CardTitle>
              <CardDescription>
                Identify potential security vulnerabilities and suggest improvements
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/request-audit">Request Code Review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeReviews;
