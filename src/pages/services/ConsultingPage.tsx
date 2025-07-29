
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lightbulb, TrendingUp, CheckCircle, Clock, Award } from 'lucide-react';

const ConsultingPage = () => {
  return (
    <StandardLayout
      title="Security Consulting | Hawkly"
      description="Strategic security guidance and expert consulting for Web3 projects"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Lightbulb className="h-4 w-4 mr-2" />
              Strategic Security Guidance
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Web3 Security Consulting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert guidance to build secure, scalable Web3 applications from the ground up
          </p>
        </div>

        {/* Service Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-hawkly-primary" />
                Architecture Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive review of your Web3 architecture to identify security gaps and optimization opportunities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Security Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Develop comprehensive security strategies aligned with your business goals and risk tolerance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                Compliance Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Navigate regulatory requirements and implement compliance frameworks for your Web3 project
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Consulting Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Consulting Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">1</span>
                </div>
                <h3 className="font-medium">Discovery</h3>
                <p className="text-sm text-muted-foreground">Understanding your project, goals, and current security posture</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">2</span>
                </div>
                <h3 className="font-medium">Assessment</h3>
                <p className="text-sm text-muted-foreground">Comprehensive analysis of risks and vulnerabilities</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">3</span>
                </div>
                <h3 className="font-medium">Strategy</h3>
                <p className="text-sm text-muted-foreground">Developing tailored security strategies and roadmaps</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">4</span>
                </div>
                <h3 className="font-medium">Implementation</h3>
                <p className="text-sm text-muted-foreground">Guidance and support during strategy implementation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consulting Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Security Assessment</CardTitle>
              <div className="text-2xl font-bold">$4,999</div>
              <div className="text-sm text-muted-foreground">One-time engagement</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  2-week security assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Detailed security report
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Remediation roadmap
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Executive presentation
                </li>
              </ul>
              <Button className="w-full">Start Assessment</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-hawkly-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ongoing Advisory</CardTitle>
                <Badge className="bg-hawkly-primary">Popular</Badge>
              </div>
              <div className="text-2xl font-bold">$15,000</div>
              <div className="text-sm text-muted-foreground">Per month</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Monthly strategy sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Continuous threat monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Team training & workshops
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Priority support access
                </li>
              </ul>
              <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                Start Advisory
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enterprise Program</CardTitle>
              <div className="text-2xl font-bold">Custom</div>
              <div className="text-sm text-muted-foreground">Tailored engagement</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Dedicated security team
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Custom security framework
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Compliance management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  24/7 support coverage
                </li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>

        {/* Expert Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Expert Consultants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-hawkly-primary" />
                </div>
                <h3 className="font-medium">Security Architects</h3>
                <p className="text-sm text-muted-foreground">
                  10+ years of experience in Web3 security architecture and threat modeling
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-hawkly-primary" />
                </div>
                <h3 className="font-medium">Compliance Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Deep knowledge of regulatory frameworks and compliance requirements
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-hawkly-primary" />
                </div>
                <h3 className="font-medium">Strategy Advisors</h3>
                <p className="text-sm text-muted-foreground">
                  Business-focused security leaders with proven track records
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Security Strategy?</h2>
            <p className="text-muted-foreground mb-6">
              Work with our expert consultants to build a comprehensive security framework for your Web3 project.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                Download Case Studies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default ConsultingPage;
