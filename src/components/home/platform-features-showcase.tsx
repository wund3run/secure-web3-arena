
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  Brain, 
  Users, 
  Monitor, 
  CheckCircle,
  TrendingUp,
  Globe
} from 'lucide-react';

const NEXT_GEN_FEATURES = [
  {
    title: "AI-Powered Auditor Matching",
    description: "Intelligent algorithm matches your project with the perfect security expert based on blockchain, complexity, and specialization.",
    icon: Brain,
    benefits: ["Instant expert identification", "Skill-based matching", "Optimal project fit"],
    competitive: "vs manual assignment taking days",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Real-Time Collaboration Hub",
    description: "Interactive dashboard for live communication, progress tracking, and instant feedback throughout the audit process.",
    icon: Monitor,
    benefits: ["Live progress tracking", "Instant messaging", "Document collaboration"],
    competitive: "vs email-only communication",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Smart Contract Escrow",
    description: "Blockchain-based payment protection ensuring secure, automated fund release tied to milestone completion.",
    icon: Shield,
    benefits: ["Trustless payments", "Automated releases", "Dispute resolution"],
    competitive: "vs traditional contracts",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Continuous Security Monitoring",
    description: "Post-audit monitoring system that alerts you to new vulnerabilities and security threats in real-time.",
    icon: TrendingUp,
    benefits: ["Ongoing protection", "Threat intelligence", "Proactive alerts"],
    competitive: "vs one-time audit reports",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    title: "Multi-Chain Expertise Network",
    description: "Global network of specialists covering 15+ blockchains, from Ethereum to emerging Layer 2 solutions.",
    icon: Globe,
    benefits: ["15+ blockchain support", "Specialized expertise", "Emerging tech coverage"],
    competitive: "vs 2-3 chain limitation",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50"
  },
  {
    title: "Speed-Optimized Workflow",
    description: "Streamlined processes and automation deliver audit results in days, not weeks or months.",
    icon: Zap,
    benefits: ["Sub-2 hour matching", "5-10 day completion", "Automated reporting"],
    competitive: "vs 2-4 week industry standard",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

const PLATFORM_BENEFITS = [
  {
    category: "For Project Owners",
    benefits: [
      "Get matched with expert auditors in under 2 hours",
      "Pay only when satisfied with audit quality",
      "Access to 15+ blockchain specialists",
      "Continuous post-audit security monitoring",
      "Transparent pricing with no hidden fees"
    ],
    cta: "Request Audit",
    ctaLink: "/request-audit",
    icon: Users
  },
  {
    category: "For Security Auditors",
    benefits: [
      "Join verified network of top security professionals",
      "Earn competitive rates with instant payments",
      "Access high-quality projects automatically",
      "Build reputation with transparent ratings",
      "Continuous skill development opportunities"
    ],
    cta: "Join Network",
    ctaLink: "/service-provider-onboarding",
    icon: Shield
  }
];

export function PlatformFeaturesShowcase() {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Zap className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Next-Generation Security Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technology That Sets Us Apart
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hawkly combines cutting-edge AI, blockchain technology, and expert human insight 
            to deliver security audits that are faster, more accurate, and more accessible than ever before.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {NEXT_GEN_FEATURES.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className={`p-3 rounded-lg ${feature.bgColor} w-fit mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                
                <div className="space-y-2 mb-4">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground italic border-t pt-3">
                  {feature.competitive}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PLATFORM_BENEFITS.map((section, index) => (
            <Card key={index} className="p-8 border-2 border-primary/10 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{section.category}</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                {section.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild className="w-full">
                <Link to={section.ctaLink} className="flex items-center justify-center">
                  {section.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Technology Stack Highlight */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Built for the Future of Web3</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Our platform leverages the latest in AI, blockchain, and security technology 
            to provide an audit experience that evolves with the rapidly changing Web3 landscape.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["AI Matching", "Smart Contracts", "Multi-Chain", "Real-Time Collab", "Continuous Monitoring"].map((tech, index) => (
              <div key={index} className="px-4 py-2 bg-background rounded-full text-sm font-medium shadow-sm">
                {tech}
              </div>
            ))}
          </div>
          <Button asChild size="lg" variant="outline">
            <Link to="/docs" className="flex items-center">
              Learn More About Our Technology <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
