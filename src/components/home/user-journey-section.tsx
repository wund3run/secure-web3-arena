
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Code, Briefcase, Rocket, Search } from 'lucide-react';

const USER_TYPES = [
  {
    type: "Project Owner",
    subtitle: "Need Security Help?",
    description: "Whether you're a startup founder or technical lead, protect your Web3 project from vulnerabilities",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "AI-powered auditor matching in under 2 hours",
      "Smart contract escrow - pay only when satisfied",
      "Continuous monitoring after launch",
      "Support for 15+ blockchain ecosystems"
    ],
    cta: "Get Security Audit",
    ctaLink: "/request-audit",
    secondaryCta: "Browse Auditors",
    secondaryLink: "/marketplace"
  },
  {
    type: "Security Expert",
    subtitle: "Ready to Audit?",
    description: "Join our verified network of top security professionals and earn competitive rates",
    icon: Users,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Get matched with quality projects instantly",
      "Earn competitive rates with secure payments",
      "Build reputation in our transparent network",
      "Access cutting-edge audit tools and resources"
    ],
    cta: "Join Expert Network",
    ctaLink: "/service-provider-onboarding",
    secondaryCta: "View Opportunities",
    secondaryLink: "/marketplace"
  }
];

const QUICK_PATHS = [
  {
    title: "New to Web3 Security?",
    description: "Learn the basics and understand why security matters",
    icon: Rocket,
    link: "/docs",
    color: "text-purple-600"
  },
  {
    title: "Compare Solutions",
    description: "See how we stack up against competitors",
    icon: Search,
    link: "/competitive-advantages",
    color: "text-orange-600"
  },
  {
    title: "Enterprise Solutions",
    description: "Custom security solutions for large organizations",
    icon: Briefcase,
    link: "/contact",
    color: "text-cyan-600"
  }
];

export function UserJourneySection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you need security help or want to provide security expertise, 
            we've designed the perfect journey for you.
          </p>
        </div>

        {/* Main User Journeys */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {USER_TYPES.map((userType, index) => (
            <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/20 transition-all hover:shadow-xl group">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${userType.gradient}`}></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${userType.bgColor} mr-4`}>
                    <userType.icon className={`h-8 w-8 ${userType.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{userType.type}</h3>
                    <p className="text-muted-foreground">{userType.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{userType.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {userType.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button asChild className={`w-full bg-gradient-to-r ${userType.gradient} hover:opacity-90`}>
                    <Link to={userType.ctaLink} className="flex items-center justify-center">
                      {userType.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={userType.secondaryLink} className="flex items-center justify-center">
                      {userType.secondaryCta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Paths */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Not sure where to start?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUICK_PATHS.map((path, index) => (
            <Link key={index} to={path.link} className="group">
              <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <path.icon className={`h-8 w-8 ${path.color} mx-auto mb-3`} />
                  <h4 className="font-semibold mb-2">{path.title}</h4>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
