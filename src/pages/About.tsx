
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Target, Award, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Securing the Future of Web3
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Hawkly is the leading Web3 security marketplace, connecting innovative projects 
              with world-class security experts to build a safer decentralized future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/marketplace">Explore Platform</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that security should never be an afterthought in Web3 development. 
                Our mission is to make professional security auditing accessible, efficient, 
                and reliable for projects of all sizes.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                By connecting talented security professionals with innovative Web3 projects, 
                we're building an ecosystem where security is built-in from day one, not bolted on as an afterthought.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm text-muted-foreground">Security Experts</div>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-8">
              <Shield className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Security First</h3>
              <p className="text-muted-foreground">
                Every audit on our platform follows rigorous standards and best practices. 
                Our security experts are vetted professionals with proven track records 
                in identifying and mitigating Web3 vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in security auditing, 
                  continuously improving our processes and methodologies.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We foster a collaborative ecosystem where security experts 
                  and developers work together to build safer Web3 applications.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Trust</h3>
                <p className="text-muted-foreground">
                  Transparency and reliability are at the core of our platform. 
                  We build trust through consistent delivery and open communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to Web3 security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Chen",
                role: "CEO & Co-Founder",
                bio: "Former security researcher with 10+ years in blockchain security"
              },
              {
                name: "Sarah Johnson",
                role: "CTO & Co-Founder", 
                bio: "Smart contract security expert and former DeFi protocol lead"
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Security",
                bio: "Certified ethical hacker with extensive Web3 audit experience"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in building the Web3 security ecosystem
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { year: "2023", title: "Founded", desc: "Hawkly was founded with the vision of democratizing Web3 security" },
                { year: "2024", title: "Platform Launch", desc: "Launched our marketplace connecting auditors with projects" },
                { year: "2024", title: "100+ Audits", desc: "Reached our first major milestone of completed security audits" },
                { year: "2025", title: "Global Expansion", desc: "Expanding our network of security experts worldwide" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Help us build a more secure Web3 ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/careers">View Careers</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/service-provider-onboarding">
                Become an Auditor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
