
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  expectedDate?: string;
}

export function PlaceholderPage({ 
  title, 
  description, 
  icon, 
  features = [],
  expectedDate = "Q2 2025"
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title} | Hawkly</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Status Badge */}
          <Badge variant="secondary" className="mb-6">
            Coming Soon
          </Badge>
          
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <div className="text-primary">
              {icon}
            </div>
          </div>
          
          {/* Title and Description */}
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
          
          {/* Features */}
          {features.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">What's Coming</CardTitle>
                <CardDescription>Features being developed for this section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Expected Date */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Expected launch: <span className="font-medium">{expectedDate}</span>
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contact">
              <Button className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                Get Notified
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowRight className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Alternative Actions */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              In the meantime, explore our available features:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/marketplace">
                <Button variant="link" size="sm">Security Marketplace</Button>
              </Link>
              <Link to="/request-audit">
                <Button variant="link" size="sm">Request Audit</Button>
              </Link>
              <Link to="/web3-security">
                <Button variant="link" size="sm">Security Guide</Button>
              </Link>
              <Link to="/resources">
                <Button variant="link" size="sm">Resources</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
