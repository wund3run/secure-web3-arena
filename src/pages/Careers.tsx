
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Rocket, Heart, Shield, ArrowRight, ExternalLink } from 'lucide-react';

const openPositions = [
  {
    title: "Senior Security Engineer",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    description: "Lead security audits and develop new security assessment methodologies for Web3 projects.",
    requirements: ["5+ years in smart contract security", "Experience with Solidity, Rust", "Previous audit experience"],
    urgent: true
  },
  {
    title: "Product Manager - Marketplace",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description: "Drive product strategy for our marketplace platform and enhance user experience.",
    requirements: ["3+ years product management", "Web3/blockchain knowledge", "Data-driven approach"],
    urgent: false
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Scale our infrastructure and ensure platform reliability as we grow.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines", "Security-first mindset"],
    urgent: false
  },
  {
    title: "Community Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Build and nurture our community of security experts and project owners.",
    requirements: ["Community building experience", "Web3 knowledge", "Excellent communication"],
    urgent: false
  }
];

const benefits = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Cutting-edge Security Work",
    description: "Work on the most innovative Web3 security challenges"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Remote-first Culture",
    description: "Work from anywhere with flexible hours"
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Growth Opportunities",
    description: "Learn and grow with a fast-scaling company"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Comprehensive Benefits",
    description: "Health, dental, vision, and equity compensation"
  }
];

export default function Careers() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us build the future of Web3 security. Join a team of passionate professionals 
              dedicated to making blockchain technology safer for everyone.
            </p>
          </div>

          {/* Company Culture */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Work at Hawkly?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4">{benefit.icon}</div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {position.title}
                          {position.urgent && <Badge variant="error">Urgent</Badge>}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button className="mt-4 sm:mt-0">
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Key Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Security First</h3>
                <p className="text-muted-foreground">
                  Everything we do is guided by our commitment to security excellence and protecting the Web3 ecosystem.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Innovation & Growth</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and approaches, constantly evolving to meet the changing needs of blockchain security.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Community Impact</h3>
                <p className="text-muted-foreground">
                  We believe in building not just a company, but a community that makes the entire Web3 space more secure.
                </p>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Hiring Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="font-semibold mb-2">Application</h3>
                <p className="text-sm text-muted-foreground">Submit your application through our careers portal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="font-semibold mb-2">Screening Call</h3>
                <p className="text-sm text-muted-foreground">Initial conversation with our talent team</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="font-semibold mb-2">Technical Interview</h3>
                <p className="text-sm text-muted-foreground">Role-specific technical assessment and discussion</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h3 className="font-semibold mb-2">Final Interview</h3>
                <p className="text-sm text-muted-foreground">Meet the team and discuss culture fit</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who share our passion for Web3 security. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button size="lg">
              Send General Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
