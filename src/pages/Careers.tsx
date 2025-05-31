
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Security Engineer",
      department: "Security",
      location: "Remote",
      type: "Full-time",
      description: "Lead security initiatives and develop advanced security tools for Web3 platforms."
    },
    {
      title: "Product Manager - Security",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time", 
      description: "Drive product strategy for our security marketplace and auditor tools."
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Build and engage our community of security experts and Web3 developers."
    }
  ];

  return (
    <StandardLayout 
      title="Careers" 
      description="Join our mission to secure the future of Web3"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of Web3 security. We're looking for passionate individuals 
            who want to make a meaningful impact in blockchain security.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {openPositions.map((position, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{position.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{position.department}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {position.type}
                    </span>
                  </div>
                  <Button>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Don't see a position that fits? We're always looking for talented people.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
