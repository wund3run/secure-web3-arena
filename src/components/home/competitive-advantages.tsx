
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Zap, Shield, Clock, DollarSign } from 'lucide-react';

const COMPETITOR_COMPARISON = [
  {
    feature: "Response Time",
    hawkly: "< 2 hours",
    traditional: "3-7 days",
    competitors: {
      "Code4rena": "Contest-based (weeks)",
      "Spearbit": "3-5 days",
      "TechRate": "5-7 days"
    },
    hawklyBetter: true,
    icon: Clock
  },
  {
    feature: "Pricing Model",
    hawkly: "Transparent, fixed rates",
    traditional: "Hidden fees, variable",
    competitors: {
      "CodeHawks": "Contest-based, unpredictable",
      "Cantina": "Quote-based, opaque",
      "Secure3": "Enterprise pricing only"
    },
    hawklyBetter: true,
    icon: DollarSign
  },
  {
    feature: "Payment Security",
    hawkly: "Smart contract escrow",
    traditional: "Traditional contracts",
    competitors: {
      "Most platforms": "Traditional payment rails",
      "Web2 escrow": "Centralized systems",
      "Manual processes": "Trust-based"
    },
    hawklyBetter: true,
    icon: Shield
  },
  {
    feature: "AI-Powered Matching",
    hawkly: "Instant expert matching",
    traditional: "Manual assignment",
    competitors: {
      "All competitors": "Manual auditor selection",
      "Contest platforms": "Open competition only",
      "Traditional firms": "Internal assignment"
    },
    hawklyBetter: true,
    icon: Zap
  },
  {
    feature: "Multi-Chain Support",
    hawkly: "15+ blockchains",
    traditional: "Limited to 2-3",
    competitors: {
      "Code4rena": "Ethereum-focused",
      "CodeHawks": "Limited chains",
      "Traditional firms": "1-2 chains typically"
    },
    hawklyBetter: true,
    icon: Shield
  },
  {
    feature: "Real-time Collaboration",
    hawkly: "Live dashboard & chat",
    traditional: "Email updates",
    competitors: {
      "Most platforms": "Static reports only",
      "Traditional": "Email communication",
      "Contest platforms": "Forum-based only"
    },
    hawklyBetter: true,
    icon: Zap
  },
  {
    feature: "Post-Audit Support",
    hawkly: "30 days included",
    traditional: "Additional cost",
    competitors: {
      "Code4rena": "Limited follow-up",
      "Traditional firms": "Expensive retainers",
      "Contest platforms": "No ongoing support"
    },
    hawklyBetter: true,
    icon: Shield
  },
  {
    feature: "Continuous Monitoring",
    hawkly: "Ongoing security alerts",
    traditional: "One-time audit only",
    competitors: {
      "All competitors": "Point-in-time audits",
      "No platform": "Offers continuous monitoring",
      "Manual": "Expensive custom solutions"
    },
    hawklyBetter: true,
    icon: Zap
  }
];

const MARKET_ADVANTAGES = [
  {
    title: "Next-Generation Technology",
    description: "AI-powered matching and automated workflows vs manual processes",
    icon: Zap,
    color: "text-blue-600"
  },
  {
    title: "Web3-Native Security",
    description: "Smart contract escrow and blockchain-based reputation system",
    icon: Shield,
    color: "text-green-600"
  },
  {
    title: "Speed & Efficiency",
    description: "Sub-2 hour response times vs industry standard of days/weeks",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Transparent Economics",
    description: "Fixed pricing and clear fee structures vs hidden costs",
    icon: DollarSign,
    color: "text-purple-600"
  }
];

export function CompetitiveAdvantages() {
  return (
    <section className="py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Hawkly Leads the Market</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our next-generation platform outperforms traditional auditors and competitor platforms
          </p>
        </div>

        {/* Market Positioning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MARKET_ADVANTAGES.map((advantage, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all">
              <advantage.icon className={`h-10 w-10 ${advantage.color} mx-auto mb-4`} />
              <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
              <p className="text-sm text-muted-foreground">{advantage.description}</p>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Platform Comparison</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                {/* Header */}
                <div className="bg-muted/20 p-4 font-semibold border-b">Feature</div>
                <div className="bg-primary/10 p-4 font-semibold text-center border-b">Hawkly</div>
                <div className="bg-muted/20 p-4 font-semibold text-center border-b">Traditional Auditors</div>
                <div className="bg-muted/20 p-4 font-semibold text-center border-b">Competitor Platforms</div>

                {/* Comparison Rows */}
                {COMPETITOR_COMPARISON.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4 border-b font-medium flex items-center">
                      <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.feature}
                    </div>
                    <div className="p-4 border-b bg-primary/5 text-center flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium text-sm">{item.hawkly}</span>
                    </div>
                    <div className="p-4 border-b text-center flex items-center justify-center text-muted-foreground">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">{item.traditional}</span>
                    </div>
                    <div className="p-4 border-b text-center text-muted-foreground">
                      <div className="space-y-1">
                        {Object.entries(item.competitors).map(([platform, feature], idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium">{platform}:</span> {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Showcase */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Proven ROI for Web3 Projects</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how Hawkly delivers superior value compared to traditional audit approaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">67%</div>
              <div className="text-sm text-muted-foreground">Faster audit completion</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">43%</div>
              <div className="text-sm text-muted-foreground">Cost savings vs traditional firms</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Client satisfaction rate</div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
            <Link to="/request-audit" className="flex items-center">
              Experience the Hawkly Advantage <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Join 500+ projects that chose next-generation security
          </p>
        </div>
      </div>
    </section>
  );
}
