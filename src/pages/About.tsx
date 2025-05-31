
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <StandardLayout 
      title="About Hawkly" 
      description="Leading Web3 security marketplace connecting projects with expert auditors"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Securing the Future of Web3</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hawkly is the premier marketplace connecting Web3 projects with top security experts. 
            Founded in 2024, we've protected over $350M in digital assets through comprehensive security audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Security First</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous vetting process ensures only top-tier security experts join our platform
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Network</h3>
              <p className="text-sm text-muted-foreground">
                500+ verified security professionals from leading audit firms and research institutions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                Supporting projects across 15+ blockchains with 24/7 security coverage
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                2,500+ successful audits with 12,800+ vulnerabilities discovered and fixed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/marketplace">
              Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
