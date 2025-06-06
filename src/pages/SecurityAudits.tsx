
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityAudits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Security Audits | Hawkly</title>
        <meta name="description" content="Comprehensive smart contract security audits by verified experts" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Audits</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive smart contract security audits by verified blockchain security experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Comprehensive Analysis</CardTitle>
              <CardDescription>
                Deep analysis of your smart contracts to identify vulnerabilities and security risks
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Expert Verification</CardTitle>
              <CardDescription>
                All audits conducted by certified security professionals with proven track records
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Fast Turnaround</CardTitle>
              <CardDescription>
                Get your audit results quickly without compromising on quality or thoroughness
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="mr-4">
            <Link to="/request-audit">Request Security Audit</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/marketplace">Browse Auditors</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudits;
