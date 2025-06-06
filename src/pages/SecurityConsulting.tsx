
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityConsulting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Security Consulting | Hawkly</title>
        <meta name="description" content="Strategic security guidance and planning services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Consulting</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strategic security guidance to build robust and secure blockchain applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>Security Strategy</CardTitle>
              <CardDescription>
                Develop comprehensive security strategies tailored to your project needs
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>
                Implementation of industry-leading security practices and frameworks
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/request-audit">Request Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityConsulting;
