
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, Globe, Award, TrendingUp, Lock, Zap } from 'lucide-react';
import { SEOOptimization } from '@/components/seo/SEOOptimization';

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hawkly",
    "description": "Leading Web3 security platform providing expert audits and security services",
    "url": "https://hawkly.app",
    "logo": "https://hawkly.app/hawkly-logo.svg",
    "founder": [
      {
        "@type": "Person",
        "name": "Sarah Chen"
      },
      {
        "@type": "Person", 
        "name": "Alex Rodriguez"
      }
    ],
    "sameAs": [
      "https://twitter.com/hawkly_security",
      "https://github.com/hawkly",
      "https://discord.gg/D63cfVxa"
    ]
  };

  return (
    <>
      <SEOOptimization
        title="About Hawkly | Leading Web3 Security Platform"
        description="Learn about Hawkly's mission to secure the Web3 ecosystem through expert security audits, cutting-edge tools, and a community of security professionals."
        type="website"
        canonicalUrl="/about"
        structuredData={structuredData}
      />
      
      <StandardLayout
        title="About Hawkly | Leading Web3 Security Platform"
        description="Learn about Hawkly's mission to secure the Web3 ecosystem through expert security audits and services"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Securing Web3 Since 2023
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-hawkly-gradient mb-6">
              About Hawkly
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the future of Web3 security through expert audits, 
              cutting-edge AI tools, and a global community of security professionals.
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
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Through our platform, we connect projects with world-class security experts, 
                providing comprehensive audits, tools, and resources that help build a safer Web3 ecosystem.
              </p>
              <div className="flex gap-4">
                <Button className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Get Started
                </Button>
                <Button variant="outline">
                  View Our Services
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-hawkly-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Projects Secured</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-hawkly-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Security Experts</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-hawkly-primary mb-2">$2B+</div>
                  <div className="text-muted-foreground">Value Protected</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
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
                  description: "Security is not negotiable. We maintain the highest standards in everything we do.",
                  color: "text-green-500"
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Our strength comes from our community of experts and the projects we serve.",
                  color: "text-blue-500"
                },
                {
                  icon: Globe,
                  title: "Global Impact",
                  description: "Building a secure foundation for the global adoption of Web3 technologies.",
                  color: "text-purple-500"
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "Continuous improvement and pursuit of excellence in security practices.",
                  color: "text-yellow-500"
                }
              ].map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "CEO & Co-Founder",
                  bio: "Former security lead at ConsenSys with 10+ years in blockchain security. Expert in smart contract auditing and Web3 security architecture.",
                  expertise: ["Smart Contract Security", "Team Leadership", "Product Strategy"]
                },
                {
                  name: "Alex Rodriguez",
                  role: "CTO & Co-Founder", 
                  bio: "Security researcher and former Google engineer with expertise in cryptography and distributed systems security.",
                  expertise: ["Cryptography", "System Architecture", "AI Security"]
                },
                {
                  name: "Dr. Emily Watson",
                  role: "Head of Security Research",
                  bio: "PhD in Computer Science, published researcher in blockchain security vulnerabilities with 50+ peer-reviewed papers.",
                  expertise: ["Security Research", "Formal Verification", "Academia Relations"]
                }
              ].map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-hawkly-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-hawkly-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-hawkly-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology & Innovation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Technology & Innovation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced AI algorithms for automated vulnerability detection and code analysis.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Lock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Zero-Knowledge Audits</h3>
                  <p className="text-muted-foreground text-sm">
                    Innovative privacy-preserving audit techniques that protect your code.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Continuous Monitoring</h3>
                  <p className="text-muted-foreground text-sm">
                    Real-time security monitoring and threat detection for deployed contracts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a security expert looking to make an impact or a project seeking protection, 
                join us in building a more secure Web3 future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Start Your Security Journey
                </Button>
                <Button size="lg" variant="outline">
                  Explore Career Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    </>
  );
};

export default AboutPage;
