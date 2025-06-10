
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <StandardLayout
      title="About Hawkly | Leading Web3 Security Platform"
      description="Learn about Hawkly's mission to secure the Web3 ecosystem through expert security audits and services"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Securing Web3
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-hawkly-gradient mb-6">
            About Hawkly
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the future of Web3 security through expert audits, 
            cutting-edge tools, and a community of security professionals.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              To make Web3 secure, accessible, and trustworthy for everyone. We believe that security 
              should not be an afterthought but a fundamental building block of the decentralized future.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Through our platform, we connect projects with world-class security experts, 
              providing comprehensive audits, tools, and resources that help build a safer Web3 ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hawkly-primary mb-2">500+</div>
                <div className="text-muted-foreground">Projects Secured</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hawkly-primary mb-2">150+</div>
                <div className="text-muted-foreground">Security Experts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hawkly-primary mb-2">$2B+</div>
                <div className="text-muted-foreground">Value Protected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-hawkly-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Security First",
                description: "Security is not negotiable. We maintain the highest standards in everything we do."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Our strength comes from our community of experts and the projects we serve."
              },
              {
                icon: Globe,
                title: "Global Impact",
                description: "Building a secure foundation for the global adoption of Web3 technologies."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Continuous improvement and pursuit of excellence in security practices."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-hawkly-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                bio: "Former security lead at ConsenSys with 10+ years in blockchain security."
              },
              {
                name: "Alex Rodriguez",
                role: "CTO & Co-Founder",
                bio: "Security researcher and former Google engineer with expertise in cryptography."
              },
              {
                name: "Dr. Emily Watson",
                role: "Head of Security",
                bio: "PhD in Computer Science, published researcher in blockchain security vulnerabilities."
              }
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-hawkly-primary/10 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-hawkly-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a security expert or a project looking for protection, 
              join us in building a more secure Web3 future.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-hawkly-primary hover:bg-hawkly-primary/90 text-white px-8 py-3 rounded-lg font-medium">
                Get Started
              </button>
              <button className="border border-hawkly-primary text-hawkly-primary hover:bg-hawkly-primary/10 px-8 py-3 rounded-lg font-medium">
                Learn More
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default AboutPage;
