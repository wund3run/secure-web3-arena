
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, FileText, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CodeReviews() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Code Reviews</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert code reviews to improve quality, security, and maintainability. 
              Get feedback from experienced developers and security experts.
            </p>
          </div>

          {/* Service Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Smart Contract Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive review of smart contract code focusing on security, gas optimization, and best practices.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Security vulnerability assessment</li>
                  <li>• Gas optimization recommendations</li>
                  <li>• Code quality improvements</li>
                  <li>• Best practices guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Peer Code Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Collaborative code review process with experienced developers providing detailed feedback.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Line-by-line feedback</li>
                  <li>• Architecture recommendations</li>
                  <li>• Performance optimizations</li>
                  <li>• Documentation improvements</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process Section */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Review Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Submit Code</h3>
                <p className="text-sm text-muted-foreground">Upload your code or provide repository access</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Expert Review</h3>
                <p className="text-sm text-muted-foreground">Experienced reviewer analyzes your code</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Detailed Feedback</h3>
                <p className="text-sm text-muted-foreground">Receive comprehensive review report</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Implement</h3>
                <p className="text-sm text-muted-foreground">Apply recommendations and improvements</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">What Developers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The code review was incredibly thorough. They caught several security issues I missed and provided excellent optimization suggestions."
                  </p>
                  <p className="font-semibold">- Sarah Chen, DeFi Developer</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Fast turnaround and detailed feedback. The reviewer understood our codebase quickly and provided actionable improvements."
                  </p>
                  <p className="font-semibold">- Alex Rodriguez, Smart Contract Engineer</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Code?</h2>
            <p className="text-muted-foreground mb-6">
              Get expert feedback and enhance your code quality today
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Request Review <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Find Reviewers</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
