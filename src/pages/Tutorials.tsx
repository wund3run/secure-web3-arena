
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, ArrowRight } from 'lucide-react';

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Video className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-6">Video Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Step-by-step video tutorials for security auditing and Web3 development.
          </p>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We're creating comprehensive video tutorials covering platform usage, 
                security best practices, and audit methodologies.
              </p>
              <Button asChild>
                <Link to="/resources">
                  Explore Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
