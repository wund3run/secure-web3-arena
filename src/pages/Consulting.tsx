
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lightbulb, TrendingUp, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consulting = () => {
  const consultingServices = [
    {
      title: "Security Architecture Consulting",
      description: "Design secure Web3 architectures from the ground up with expert guidance",
      features: ["Architecture design review", "Security framework development", "Threat modeling", "Best practices implementation"],
      price: "Starting at $10,000",
      duration: "2-4 weeks"
    },
    {
      title: "Incident Response & Forensics",
      description: "Emergency response for security incidents and post-incident analysis",
      features: ["24/7 emergency response", "Forensic analysis", "Damage assessment", "Recovery planning"],
      price: "Starting at $15,000",
      duration: "1-3 weeks"
    },
    {
      title: "Compliance & Regulatory Guidance",
      description: "Navigate complex regulatory requirements for Web3 projects",
      features: ["Regulatory compliance assessment", "Policy development", "Audit preparation", "Legal requirement mapping"],
      price: "Starting at $12,000",
      duration: "3-6 weeks"
    }
  ];

  return (
    <StandardLayout
      title="Security Consulting"
      description="Expert Web3 security consulting services - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Expert Advisory</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Web3 Security Consulting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get strategic security guidance from industry experts. Our consultants have advised 
            500+ Web3 projects and helped secure over $2B in digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Users className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse Consultants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Consulting Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {consultingServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                  <div className="text-sm text-muted-foreground">Duration: {service.duration}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
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

        {/* Why Choose Our Consulting */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Consulting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground">
                  Our consultants have successfully guided 500+ Web3 projects from concept to secure deployment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Industry Expertise</h3>
                <p className="text-muted-foreground">
                  Deep knowledge across DeFi, NFTs, DAOs, and emerging Web3 technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready for Expert Guidance?</h2>
          <p className="text-muted-foreground mb-6">
            Get personalized security consulting for your Web3 project.
          </p>
          <Link to="/contact">
            <Button size="lg">Schedule Consultation</Button>
          </Link>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Consulting;
