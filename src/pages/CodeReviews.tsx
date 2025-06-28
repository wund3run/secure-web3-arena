
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Eye, GitBranch, Users, FileText, Zap } from 'lucide-react';

export default function CodeReviews() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-secondary/10 px-4 py-2 rounded-full text-secondary mb-6">
            <Code className="h-5 w-5 mr-2" />
            <span className="font-medium">Expert Code Review</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Professional Code Reviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get expert feedback on your code quality, architecture, and best practices 
            from experienced Web3 developers and security professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">Request Code Review</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">Find Reviewers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Code Review Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive code analysis tailored to your project needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Security-Focused Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  In-depth security analysis identifying potential vulnerabilities 
                  and attack vectors in your smart contracts.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Reentrancy protection</li>
                  <li>• Access control validation</li>
                  <li>• Integer overflow checks</li>
                  <li>• Gas optimization</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GitBranch className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Architecture Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive evaluation of your project's structure, 
                  design patterns, and scalability considerations.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Design pattern analysis</li>
                  <li>• Code organization</li>
                  <li>• Modularity assessment</li>
                  <li>• Upgrade patterns</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Performance Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Optimization-focused analysis to improve gas efficiency 
                  and overall contract performance.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Gas optimization</li>
                  <li>• Storage efficiency</li>
                  <li>• Function optimization</li>
                  <li>• Deployment costs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Review Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our structured approach ensures thorough and actionable feedback
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { title: "Code Submission", desc: "Upload your code and specify review requirements" },
                { title: "Expert Assignment", desc: "Matched with qualified reviewers based on your tech stack" },
                { title: "Comprehensive Analysis", desc: "Line-by-line review with detailed feedback" },
                { title: "Interactive Discussion", desc: "Direct communication with reviewers for clarifications" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border rounded-lg p-8">
              <FileText className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Detailed Reports</h3>
              <p className="text-muted-foreground mb-6">
                Receive comprehensive reports with actionable recommendations, 
                code snippets, and best practice guidelines.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Line-by-line annotations</li>
                <li>• Severity classifications</li>
                <li>• Improvement suggestions</li>
                <li>• Best practice recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Improve Your Code Quality Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Get expert feedback and elevate your development practices
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/request-audit">Start Code Review</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
