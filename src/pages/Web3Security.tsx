
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, Lock, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Web3Security() {
  const securityServices = [
    {
      title: "Smart Contract Audits",
      description: "Comprehensive code review and vulnerability assessment",
      icon: <Shield className="h-6 w-6" />,
      features: ["Static Analysis", "Manual Review", "Gas Optimization", "Security Report"]
    },
    {
      title: "Penetration Testing",
      description: "Simulated attacks to identify potential security weaknesses",
      icon: <Lock className="h-6 w-6" />,
      features: ["Network Testing", "API Security", "Frontend Analysis", "Attack Simulation"]
    },
    {
      title: "Continuous Monitoring",
      description: "24/7 surveillance of your deployed smart contracts",
      icon: <Zap className="h-6 w-6" />,
      features: ["Real-time Alerts", "Threat Detection", "Performance Monitoring", "Incident Response"]
    }
  ];

  const commonVulnerabilities = [
    { name: "Reentrancy Attacks", severity: "Critical", count: "23%" },
    { name: "Integer Overflow/Underflow", severity: "High", count: "18%" },
    { name: "Access Control Issues", severity: "High", count: "15%" },
    { name: "Front-running", severity: "Medium", count: "12%" },
    { name: "Timestamp Dependence", severity: "Medium", count: "8%" }
  ];

  return (
    <StandardLayout 
      title="Web3 Security Services" 
      description="Comprehensive blockchain security solutions for DeFi, NFTs, and Web3 applications"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secure Your Web3 Future</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Protect your blockchain projects with comprehensive security audits, penetration testing, 
            and continuous monitoring from certified Web3 security experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Request Security Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/marketplace">
                Browse Security Experts
              </Link>
            </Button>
          </div>
        </div>

        {/* Security Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Security Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-primary mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Vulnerabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Common Web3 Vulnerabilities</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Most Frequently Found Security Issues
              </CardTitle>
              <CardDescription>
                Based on analysis of 2,500+ smart contract audits conducted through our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonVulnerabilities.map((vuln, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={vuln.severity === 'Critical' ? 'destructive' : vuln.severity === 'High' ? 'secondary' : 'outline'}>
                        {vuln.severity}
                      </Badge>
                      <span className="font-medium">{vuln.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Found in {vuln.count} of audits
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join 1,200+ Web3 projects that have protected over $350M in digital assets through our security marketplace.
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">500+ Security Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">15+ Blockchain Networks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm">99.8% Client Satisfaction</span>
            </div>
          </div>
          <Button asChild size="lg">
            <Link to="/request-audit">
              Start Your Security Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
