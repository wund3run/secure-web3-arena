
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Search, Bug, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const PenetrationTesting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Penetration Testing | Hawkly</title>
        <meta name="description" content="Advanced security vulnerability testing services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Penetration Testing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced security testing to identify vulnerabilities before attackers do
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Vulnerability Assessment</CardTitle>
              <CardDescription>
                Systematic identification of security weaknesses in your systems
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Bug className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Exploit Testing</CardTitle>
              <CardDescription>
                Controlled testing to verify the impact of discovered vulnerabilities
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Security Hardening</CardTitle>
              <CardDescription>
                Recommendations to strengthen your security posture
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/request-audit">Request Penetration Test</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PenetrationTesting;
