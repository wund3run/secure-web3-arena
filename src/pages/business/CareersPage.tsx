
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';

const CareersPage = () => {
  return (
    <StandardLayout
      title="Careers | Hawkly"
      description="Join the Hawkly team and help secure the future of Web3"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of Web3 security. We're looking for talented individuals 
            passionate about making the decentralized web safer for everyone.
          </p>
        </div>

        {/* Open Positions */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Open Positions</h2>
          
          {[
            {
              title: "Senior Security Engineer",
              department: "Engineering",
              type: "Full-time",
              location: "Remote / San Francisco",
              description: "Lead security audits and develop automated security tools for smart contracts."
            },
            {
              title: "Product Manager - Security Tools",
              department: "Product",
              type: "Full-time", 
              location: "Remote / New York",
              description: "Drive product strategy for our security analysis and audit tools."
            },
            {
              title: "DevRel Engineer",
              department: "Developer Relations",
              type: "Full-time",
              location: "Remote",
              description: "Build relationships with the Web3 developer community and create educational content."
            },
            {
              title: "Security Researcher",
              department: "Research",
              type: "Contract",
              location: "Remote",
              description: "Research emerging threats and vulnerabilities in Web3 protocols."
            }
          ].map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏠 Remote First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Work from anywhere with flexible hours and optional office access.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚀 Equity Package</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Meaningful equity stake in the future of Web3 security.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏥 Health Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Comprehensive health, dental, and vision coverage.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📚 Learning Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Annual budget for conferences, courses, and professional development.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🌴 Unlimited PTO</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Take the time you need to recharge and maintain work-life balance.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔧 Top Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Latest MacBook Pro, monitors, and whatever tools you need to excel.</p>
            </CardContent>
          </Card>
        </div>

        {/* Culture */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're a team of passionate builders, security experts, and Web3 enthusiasts. 
              We believe in transparency, continuous learning, and making a real impact on the future of the internet.
            </p>
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              Learn More About Our Culture
            </Button>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default CareersPage;
