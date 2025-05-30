
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  Award, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturesShowcase() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system matches your project with the perfect auditor based on expertise, availability, and budget.',
      benefits: ['Faster matching', 'Better compatibility', 'Higher success rates']
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Auditors',
      description: 'All auditors undergo rigorous verification including credentials, past work, and security expertise validation.',
      benefits: ['Proven track record', 'Industry certifications', 'Quality guarantee']
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Rapid Turnaround',
      description: 'Get matched with qualified auditors within 24 hours and start your security audit immediately.',
      benefits: ['24-hour matching', 'Quick start process', 'Milestone tracking']
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Transparent Progress',
      description: 'Track audit progress in real-time with detailed reports, communication tools, and milestone updates.',
      benefits: ['Real-time updates', 'Direct communication', 'Detailed reporting']
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Hawkly for Security Audits?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've streamlined the audit process to be faster, more reliable, and completely transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-card rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Get Your Audit in 3 Simple Steps
            </h3>
            <p className="text-muted-foreground">
              Our streamlined process gets you from request to audit completion faster than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Your Project',
                description: 'Tell us about your project, requirements, and timeline through our simple form.',
                action: 'Takes 5 minutes'
              },
              {
                step: '02',
                title: 'Get Matched',
                description: 'Our AI finds the perfect auditor match based on your specific needs and requirements.',
                action: 'Within 24 hours'
              },
              {
                step: '03',
                title: 'Start Your Audit',
                description: 'Connect with your auditor, track progress, and receive comprehensive security reports.',
                action: 'Real-time updates'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="text-sm font-medium text-primary">{step.action}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/request-audit">
                Start Your Security Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
