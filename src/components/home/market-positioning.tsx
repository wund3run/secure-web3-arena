
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Shield, Clock, Star, TrendingUp } from 'lucide-react';

const POSITIONING_STATS = [
  {
    metric: "2x",
    description: "Faster than Code4rena contests",
    detail: "Average 3-5 days vs 2-4 weeks",
    icon: Clock,
    color: "text-blue-600"
  },
  {
    metric: "50%",
    description: "More cost-effective than Spearbit",
    detail: "Transparent pricing vs enterprise quotes",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    metric: "15+",
    description: "Blockchains supported",
    detail: "vs 2-3 for most competitors",
    icon: Shield,
    color: "text-purple-600"
  },
  {
    metric: "98%",
    description: "Audit accuracy rate",
    detail: "AI-powered quality assurance",
    icon: Star,
    color: "text-orange-600"
  }
];

const MARKET_DIFFERENTIATORS = [
  {
    title: "SaaS-First Approach",
    description: "Modern software platform vs outdated processes",
    benefits: ["Automated workflows", "Real-time tracking", "Scalable infrastructure"],
    icon: Zap
  },
  {
    title: "Community-Driven Network",
    description: "Global auditor marketplace vs limited internal teams",
    benefits: ["Diverse expertise", "Competitive pricing", "Quality ratings"],
    icon: Users
  },
  {
    title: "Web3-Native Security",
    description: "Blockchain-based escrow vs traditional contracts",
    benefits: ["Trustless payments", "Transparent disputes", "Decentralized reputation"],
    icon: Shield
  }
];

export function MarketPositioning() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Star className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Market Leader in Web3 Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beyond Traditional Audit Firms
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hawkly represents the next evolution in Web3 security - combining cutting-edge technology 
            with a global network of expert auditors to deliver unmatched speed, quality, and value.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {POSITIONING_STATS.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all border-2 hover:border-primary/20">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold mb-2">{stat.metric}</div>
              <div className="font-medium text-foreground mb-2">{stat.description}</div>
              <div className="text-sm text-muted-foreground">{stat.detail}</div>
            </Card>
          ))}
        </div>

        {/* Market Differentiators */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Sets Hawkly Apart</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MARKET_DIFFERENTIATORS.map((diff, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <diff.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold">{diff.title}</h4>
                </div>
                <p className="text-muted-foreground mb-4">{diff.description}</p>
                <ul className="space-y-2">
                  {diff.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitive Positioning */}
        <div className="bg-card rounded-xl p-8 border-2 border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">The Hawkly Advantage</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While competitors focus on either speed or quality, Hawkly delivers both through 
              innovative technology and a carefully curated network of security experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Traditional Platforms</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
                  Slow, manual processes
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
                  Opaque pricing models
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
                  Limited blockchain support
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
                  Static, one-time audits
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Hawkly Platform</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  AI-powered automation
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  Transparent, fixed pricing
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  Multi-chain expertise
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  Continuous monitoring
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <Link to="/competitive-advantages" className="flex items-center">
                See Detailed Comparison <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
