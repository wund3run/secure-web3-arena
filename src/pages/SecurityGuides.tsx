
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function SecurityGuides() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-6">Security Guides</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive security guides and best practices for Web3 development.
          </p>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We're working on comprehensive security guides covering smart contract best practices, 
                common vulnerabilities, and prevention strategies.
              </p>
              <Button asChild>
                <Link to="/resources">
                  Browse Resources
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
