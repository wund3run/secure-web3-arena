
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Code, FileText, GitBranch, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeReviews = () => {
  const reviewTypes = [
    {
      title: "Smart Contract Code Review",
      description: "Comprehensive line-by-line review of smart contract code for security vulnerabilities and best practices",
      features: ["Manual code analysis", "Security pattern verification", "Gas optimization review", "Best practices assessment"],
      price: "Starting at $2,500",
      duration: "2-4 days"
    },
    {
      title: "DeFi Protocol Review",
      description: "Specialized review for DeFi protocols focusing on economic models and token mechanics",
      features: ["Tokenomics analysis", "Liquidity mechanism review", "Governance structure assessment", "Economic model validation"],
      price: "Starting at $5,000",
      duration: "3-7 days"
    },
    {
      title: "Full Repository Audit",
      description: "Complete codebase review including infrastructure, deployment scripts, and documentation",
      features: ["Complete repository scan", "Infrastructure review", "Deployment security", "Documentation audit"],
      price: "Starting at $8,000",
      duration: "1-2 weeks"
    }
  ];

  return (
    <StandardLayout
      title="Code Reviews"
      description="Professional code review services for Web3 projects - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Expert Code Analysis</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Code Reviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get expert code analysis from verified security professionals. Our reviewers have 
            analyzed over 10,000 smart contracts and identified critical vulnerabilities.
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

        {/* Review Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviewTypes.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
                  <div className="text-sm text-muted-foreground">Duration: {review.duration}</div>
                  <ul className="space-y-2">
                    {review.features.map((feature, idx) => (
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

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready for Expert Code Review?</h2>
          <p className="text-muted-foreground mb-6">
            Join 800+ projects that have improved their code quality with our expert reviews.
          </p>
          <Link to="/request-audit">
            <Button size="lg">Start Code Review</Button>
          </Link>
        </div>
      </div>
    </StandardLayout>
  );
};

export default CodeReviews;
