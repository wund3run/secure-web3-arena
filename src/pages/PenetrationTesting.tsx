
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, Bug, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PenetrationTesting = () => {
  const testingTypes = [
    {
      title: "Smart Contract Penetration Testing",
      description: "Comprehensive security testing using automated tools and manual exploitation techniques",
      features: ["Automated vulnerability scanning", "Manual exploit development", "Reentrancy testing", "Access control verification"],
      price: "Starting at $7,500",
      duration: "1-2 weeks"
    },
    {
      title: "DeFi Protocol Stress Testing",
      description: "Advanced testing for DeFi protocols including flash loan attacks and economic exploits",
      features: ["Flash loan attack simulation", "MEV attack testing", "Oracle manipulation tests", "Economic model stress testing"],
      price: "Starting at $15,000",
      duration: "2-3 weeks"
    },
    {
      title: "Full Infrastructure Testing",
      description: "Complete security assessment of Web3 infrastructure and deployment environments",
      features: ["Network penetration testing", "Cloud security assessment", "API security testing", "Frontend security analysis"],
      price: "Starting at $20,000",
      duration: "3-4 weeks"
    }
  ];

  return (
    <StandardLayout
      title="Penetration Testing"
      description="Advanced Web3 penetration testing services - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Advanced Security Testing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Web3 Penetration Testing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Advanced security testing using real-world attack scenarios. Our ethical hackers 
            have identified critical vulnerabilities and prevented millions in potential losses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Target className="mr-2 h-5 w-5" />
                Request Penetration Test
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse Security Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Testing Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testingTypes.map((test, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-red-500" />
                  {test.title}
                </CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">{test.price}</div>
                  <div className="text-sm text-muted-foreground">Duration: {test.duration}</div>
                  <ul className="space-y-2">
                    {test.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testing Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Testing Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Reconnaissance", description: "Information gathering and attack surface mapping" },
              { step: 2, title: "Vulnerability Discovery", description: "Automated and manual vulnerability identification" },
              { step: 3, title: "Exploitation", description: "Proof-of-concept development and impact assessment" },
              { step: 4, title: "Reporting", description: "Detailed findings with remediation recommendations" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Secure Your Protocol Before Hackers Do</h2>
          <p className="text-muted-foreground mb-6">
            Don't wait for an attack. Get comprehensive penetration testing from ethical hackers.
          </p>
          <Link to="/request-audit">
            <Button size="lg" className="bg-red-500 hover:bg-red-600">Start Security Test</Button>
          </Link>
        </div>
      </div>
    </StandardLayout>
  );
};

export default PenetrationTesting;
