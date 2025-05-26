
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Globe, 
  Zap, 
  Star, 
  ArrowRight,
  Network,
  Rocket,
  Award
} from 'lucide-react';

const NETWORK_STATS = [
  {
    metric: "2,847",
    label: "Active Auditors",
    growth: "+127% this month",
    icon: Users,
    color: "text-blue-600"
  },
  {
    metric: "1,234",
    label: "Projects Secured",
    growth: "+89% this month", 
    icon: Award,
    color: "text-green-600"
  },
  {
    metric: "15+",
    label: "Blockchain Networks",
    growth: "New chains weekly",
    icon: Network,
    color: "text-purple-600"
  },
  {
    metric: "47",
    label: "Countries Served",
    growth: "+12 new regions",
    icon: Globe,
    color: "text-orange-600"
  }
];

const GROWTH_INITIATIVES = [
  {
    title: "Auditor Acquisition Blitz",
    description: "Join our elite network and earn 40% higher rates than competitors",
    action: "Become an Auditor",
    link: "/service-provider-onboarding",
    icon: Rocket,
    badge: "40% Higher Rates",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Free Security Assessment", 
    description: "Get instant project evaluation and security recommendations",
    action: "Get Free Assessment",
    link: "/request-audit",
    icon: Star,
    badge: "100% Free",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Partner Integration Program",
    description: "Integrate Hawkly into your development workflow",
    action: "Explore Integrations",
    link: "/docs",
    icon: Zap,
    badge: "API Ready",
    color: "from-purple-500 to-violet-500"
  }
];

export function NetworkEffectsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Fastest Growing Web3 Security Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Scaling at Lightning Speed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our network effects are accelerating exponentially. More auditors means better matches, 
            faster turnarounds, and competitive pricing for everyone.
          </p>
        </div>

        {/* Live Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {NETWORK_STATS.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all border-2 hover:border-primary/20">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.metric}</div>
              <div className="text-sm font-medium text-foreground mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.growth}</div>
            </Card>
          ))}
        </div>

        {/* Growth Initiatives */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Join the Growth Revolution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GROWTH_INITIATIVES.map((initiative, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/20 transition-all hover:shadow-xl group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${initiative.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <initiative.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      {initiative.badge}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2">{initiative.title}</h4>
                  <p className="text-muted-foreground text-sm mb-6">{initiative.description}</p>
                  
                  <Button asChild className={`w-full bg-gradient-to-r ${initiative.color} hover:opacity-90`}>
                    <Link to={initiative.link} className="flex items-center justify-center">
                      {initiative.action} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Effects CTA */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">The Network Effect is Real</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Every new auditor makes the platform better for projects. Every new project 
            creates opportunities for auditors. Join the fastest-growing security ecosystem in Web3.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <Link to="/marketplace" className="flex items-center">
                Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact" className="flex items-center">
                Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
