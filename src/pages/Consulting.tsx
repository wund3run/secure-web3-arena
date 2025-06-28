
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Lightbulb, TrendingUp, Shield, CheckCircle, MessageSquare } from 'lucide-react';

export default function Consulting() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 mb-6">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Expert Security Consulting</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Security Consulting Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Strategic security guidance from industry experts to help you build secure, 
            scalable Web3 applications from the ground up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">Find Consultants</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Consulting Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security consulting tailored to your project needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Security Architecture Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive evaluation of your security architecture and 
                  recommendations for improvement.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Architecture assessment</li>
                  <li>• Threat modeling</li>
                  <li>• Security design patterns</li>
                  <li>• Risk analysis</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Security Strategy Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Develop comprehensive security strategies aligned with 
                  your business objectives and regulatory requirements.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Security roadmap development</li>
                  <li>• Compliance planning</li>
                  <li>• Risk management strategies</li>
                  <li>• Incident response planning</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Security Team Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upskill your development team with Web3 security best practices 
                  and secure coding techniques.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Developer training programs</li>
                  <li>• Security workshops</li>
                  <li>• Best practice documentation</li>
                  <li>• Ongoing mentorship</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Consulting Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our structured approach ensures actionable insights and measurable results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { title: "Discovery & Assessment", desc: "Understand your current security posture and challenges" },
                { title: "Strategic Planning", desc: "Develop tailored security strategies and roadmaps" },
                { title: "Implementation Support", desc: "Guide implementation of recommended security measures" },
                { title: "Ongoing Partnership", desc: "Continuous support and strategic guidance" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
              <MessageSquare className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Personalized Approach</h3>
              <p className="text-muted-foreground mb-6">
                Every consulting engagement is tailored to your specific needs, 
                industry requirements, and organizational goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">1-on-1 expert consultations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Customized deliverables</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Flexible engagement models</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Ongoing strategic support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Areas of Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our consultants bring deep expertise across the Web3 ecosystem
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "DeFi Protocols", "NFT Platforms", "DAOs & Governance", "Layer 2 Solutions",
              "Cross-chain Bridges", "Yield Farming", "Staking Protocols", "GameFi Applications"
            ].map((area, index) => (
              <div key={index} className="text-center p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get strategic security guidance from industry experts
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
