
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, BookOpen, Code, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tutorials | Hawkly</title>
        <meta name="description" content="Step-by-step security tutorials and guides" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn security best practices with our step-by-step tutorials
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <PlayCircle className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Interactive video lessons covering security fundamentals
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Code className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Practical code examples and implementation guides
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/resources">Browse All Tutorials</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
