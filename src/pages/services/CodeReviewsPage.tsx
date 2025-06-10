
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Shield, CheckCircle, Clock, Users, Star } from 'lucide-react';

const CodeReviewsPage = () => {
  return (
    <StandardLayout
      title="Code Reviews | Hawkly"
      description="Expert code analysis and review services for Web3 projects"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Code className="h-4 w-4 mr-2" />
              Expert Code Analysis
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Professional Code Reviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive code analysis from experienced Web3 developers and security experts
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-hawkly-primary" />
                Security Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In-depth security analysis to identify vulnerabilities and potential attack vectors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ensure your code follows industry standards and Web3 development best practices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Fast Turnaround
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get detailed feedback within 24-48 hours for most code review requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Service Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Basic Review</CardTitle>
              <div className="text-2xl font-bold">$299</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Up to 500 lines of code
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Security vulnerability scan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Best practices assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Detailed report
                </li>
              </ul>
              <Button className="w-full">Select Basic</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-hawkly-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Professional Review</CardTitle>
                <Badge className="bg-hawkly-primary">Popular</Badge>
              </div>
              <div className="text-2xl font-bold">$599</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Up to 2,000 lines of code
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Comprehensive security audit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Performance optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  1-hour consultation call
                </li>
              </ul>
              <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                Select Professional
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enterprise Review</CardTitle>
              <div className="text-2xl font-bold">$1,299</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Unlimited lines of code
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multi-reviewer team
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Architecture review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Ongoing support
                </li>
              </ul>
              <Button className="w-full" variant="outline">Select Enterprise</Button>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              What Our Clients Say
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Excellent code review service. Found critical issues we missed and provided clear guidance on fixes."
                </p>
                <p className="font-medium">- DeFi Protocol Team</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Professional, thorough, and delivered on time. Will definitely use again for future projects."
                </p>
                <p className="font-medium">- NFT Marketplace</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default CodeReviewsPage;
