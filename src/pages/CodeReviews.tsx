
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, CheckCircle, Clock, Users, FileText, ArrowRight, Eye, Bug, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeReviews = () => {
  const reviewTypes = [
    {
      title: "Quick Code Review",
      description: "Fast turnaround code review for small contracts or specific functions",
      duration: "24-48 hours",
      price: "Starting at $500",
      features: ["Code Quality Assessment", "Best Practices Check", "Gas Optimization Tips", "Security Overview"],
      popular: false
    },
    {
      title: "Comprehensive Review",
      description: "In-depth code review covering architecture, security, and optimization",
      duration: "3-5 days", 
      price: "Starting at $2,000",
      features: ["Architecture Review", "Security Analysis", "Performance Optimization", "Documentation Review"],
      popular: true
    },
    {
      title: "Pre-Audit Review",
      description: "Thorough code review to prepare for formal security audit",
      duration: "5-7 days",
      price: "Starting at $3,500", 
      features: ["Security Hardening", "Audit Preparation", "Risk Assessment", "Remediation Guidance"],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Expert Code Analysis",
      description: "Get your code reviewed by seasoned Web3 developers with years of experience"
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Bug Prevention",
      description: "Identify potential issues before they become costly vulnerabilities in production"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Optimize gas usage and improve contract efficiency with expert recommendations"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Reports",
      description: "Receive comprehensive reports with actionable feedback and improvement suggestions"
    }
  ];

  return (
    <StandardLayout
      title="Code Reviews"
      description="Professional Web3 code reviews by expert developers - March 2025"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Expert Code Reviews for Web3 Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get your smart contracts and Web3 applications reviewed by experienced developers. 
            Improve code quality, identify issues early, and optimize performance before deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Code className="mr-2 h-5 w-5" />
                Request Code Review
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse Reviewers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1,856</div>
            <div className="text-sm text-muted-foreground">Code Reviews Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4,200+</div>
            <div className="text-sm text-muted-foreground">Issues Identified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2.1</div>
            <div className="text-sm text-muted-foreground">Days Avg. Turnaround</div>
          </div>
        </div>

        {/* Review Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Review Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewTypes.map((review, index) => (
              <Card key={index} className={`relative ${review.popular ? 'border-primary shadow-lg' : ''}`}>
                {review.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    {review.title}
                  </CardTitle>
                  <CardDescription>{review.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{review.price}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {review.duration}
                    </div>
                    <ul className="space-y-2">
                      {review.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={review.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Code Reviews?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {benefit.icon}
                    </div>
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Supported Technologies & Frameworks</CardTitle>
            <CardDescription>
              Our expert reviewers are proficient in the latest Web3 technologies as of March 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {["Solidity", "Vyper", "Rust", "Move", "Cairo", "TypeScript", "Hardhat", "Foundry", "Truffle", "Anchor", "CosmWasm", "Ink!"].map((tech) => (
                <div key={tech} className="text-center p-3 border rounded-lg">
                  <div className="font-medium text-sm">{tech}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Code?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get expert feedback on your code and build better, more secure Web3 applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg">
                Start Code Review
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline">
                View Review Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default CodeReviews;
