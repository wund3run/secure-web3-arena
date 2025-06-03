
import React from "react";
import { StandardLayout } from "@/components/layout/StandardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, Bug, Users, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Marketplace() {
  const services = [
    {
      title: "Smart Contract Audits",
      description: "Comprehensive security audits for smart contracts across all major blockchains",
      price: "Starting from ₹2,08,250",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      features: ["Manual code review", "Automated testing", "Detailed report", "Post-audit support"]
    },
    {
      title: "Code Reviews",
      description: "Expert code analysis and security recommendations for your Web3 project",
      price: "Starting from ₹83,300",
      icon: <Code className="h-6 w-6 text-green-500" />,
      features: ["Line-by-line analysis", "Best practices", "Optimization tips", "Documentation review"]
    },
    {
      title: "Penetration Testing",
      description: "Advanced security testing to identify vulnerabilities in your application",
      price: "Starting from ₹2,91,550",
      icon: <Bug className="h-6 w-6 text-red-500" />,
      features: ["Real-world attacks", "Infrastructure testing", "Exploit development", "Remediation guide"]
    }
  ];

  const stats = [
    { label: "Security Experts", value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: "Projects Secured", value: "2,000+", icon: <Shield className="h-5 w-5" /> },
    { label: "Average Rating", value: "4.9", icon: <Star className="h-5 w-5" /> },
    { label: "Success Rate", value: "99.8%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <StandardLayout
      title="Security Marketplace"
      description="Browse verified Web3 security experts and audit services - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Verified Experts</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with verified Web3 security experts for comprehensive audit services. 
            Protect your blockchain assets with industry-leading security expertise.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  {service.icon}
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/request-audit">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of projects that trust our security experts. Get started with a comprehensive 
            security audit today and protect your blockchain assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Request Security Audit
              </Button>
            </Link>
            <Link to="/pricing-inr">
              <Button size="lg" variant="outline">
                View Pricing (INR)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
