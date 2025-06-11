
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const auditFeatures = [
  {
    title: "Smart Contract Analysis",
    description: "Comprehensive review of contract logic, vulnerabilities, and gas optimization",
    icon: Shield
  },
  {
    title: "Automated Testing",
    description: "Extensive test suite including edge cases and exploit scenarios",
    icon: CheckCircle
  },
  {
    title: "Real-time Monitoring",
    description: "Continuous monitoring for new vulnerabilities post-deployment",
    icon: Clock
  },
  {
    title: "Expert Review",
    description: "Manual review by certified Web3 security professionals",
    icon: Users
  }
];

const auditPackages = [
  {
    name: "Basic Audit",
    price: "$2,500",
    duration: "3-5 days",
    features: ["Contract review", "Basic testing", "Security report", "1 revision"],
    recommended: false
  },
  {
    name: "Comprehensive Audit",
    price: "$5,000",
    duration: "7-10 days", 
    features: ["Full contract analysis", "Automated + manual testing", "Detailed report", "Gas optimization", "2 revisions"],
    recommended: true
  },
  {
    name: "Enterprise Audit",
    price: "Custom",
    duration: "2-4 weeks",
    features: ["Multi-contract review", "Custom test scenarios", "Ongoing monitoring", "Priority support", "Unlimited revisions"],
    recommended: false
  }
];

export default function SecurityAudits() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Security First</Badge>
          <h1 className="text-4xl font-bold mb-6">Smart Contract Security Audits</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Protect your Web3 project with comprehensive security audits from certified experts. 
            Identify vulnerabilities before they become exploits.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/request-audit">
                Request Audit <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/marketplace">Browse Auditors</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {auditFeatures.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Audit Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auditPackages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.recommended ? 'ring-2 ring-primary' : ''}`}>
                {pkg.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <p className="text-muted-foreground">{pkg.duration}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={pkg.recommended ? "default" : "outline"} asChild>
                    <Link to="/request-audit">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Our Audit Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Submit Request", desc: "Provide contract details and requirements" },
              { step: "2", title: "Expert Matching", desc: "Get matched with certified auditors" },
              { step: "3", title: "Security Review", desc: "Comprehensive analysis and testing" },
              { step: "4", title: "Report Delivery", desc: "Detailed findings and recommendations" }
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
