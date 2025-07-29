
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Clock, 
  Users, 
  ArrowRight,
  MapPin,
  TrendingUp,
  Languages,
  Scale
} from 'lucide-react';

const GLOBAL_PRESENCE = [
  {
    region: "North America",
    auditors: "1,247",
    projects: "523",
    growth: "+67%",
    timeZone: "EST/PST",
    languages: ["English"],
    color: "text-blue-600"
  },
  {
    region: "Europe", 
    auditors: "892",
    projects: "341",
    growth: "+89%",
    timeZone: "CET/GMT",
    languages: ["English", "German", "French"],
    color: "text-green-600"
  },
  {
    region: "Asia Pacific",
    auditors: "654",
    projects: "287",
    growth: "+156%",
    timeZone: "JST/SGT",
    languages: ["English", "Chinese", "Japanese"],
    color: "text-purple-600"
  },
  {
    region: "Latin America",
    auditors: "312",
    projects: "143",
    growth: "+234%",
    timeZone: "BRT/ART",
    languages: ["English", "Spanish", "Portuguese"],
    color: "text-orange-600"
  }
];

const EXPANSION_BENEFITS = [
  {
    title: "24/7 Global Coverage",
    description: "Auditors available around the clock in every timezone",
    icon: Clock,
    stat: "Zero downtime"
  },
  {
    title: "Local Expertise",
    description: "Regional specialists who understand local regulations",
    icon: Users,
    stat: "47 countries"
  },
  {
    title: "Multi-Language Support",
    description: "Communication in your preferred language",
    icon: Languages,
    stat: "12 languages"
  },
  {
    title: "Regulatory Compliance",
    description: "Navigate local laws and compliance requirements",
    icon: Scale,
    stat: "100% compliant"
  }
];

export function GlobalExpansionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Globe className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Global Web3 Security Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Securing Web3 Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our global expansion strategy ensures expert security auditors are available 
            24/7 across all time zones, speaking your language and understanding your local requirements.
          </p>
        </div>

        {/* Global Presence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GLOBAL_PRESENCE.map((region, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <MapPin className={`h-5 w-5 ${region.color}`} />
                <div className={`text-sm font-bold ${region.color}`}>{region.growth}</div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{region.region}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Auditors:</span>
                  <span className="font-medium">{region.auditors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Projects:</span>
                  <span className="font-medium">{region.projects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Zone:</span>
                  <span className="font-medium">{region.timeZone}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {region.languages.map((lang, langIndex) => (
                  <div 
                    key={langIndex}
                    className="px-2 py-1 bg-muted rounded text-xs font-medium"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Expansion Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Global Scale Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPANSION_BENEFITS.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                <div className="text-lg font-bold text-primary">{benefit.stat}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Dominance Indicators */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Becoming the Global Standard</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our rapid global expansion and network effects are positioning Hawkly 
              as the de facto standard for Web3 security worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">156%</div>
              <div className="text-sm font-medium">Average regional growth</div>
              <div className="text-xs text-muted-foreground">Month over month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.8M+</div>
              <div className="text-sm font-medium">Lines of code secured</div>
              <div className="text-xs text-muted-foreground">Across all regions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98.7%</div>
              <div className="text-sm font-medium">Client satisfaction</div>
              <div className="text-xs text-muted-foreground">Global average</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <Link to="/marketplace" className="flex items-center">
                Find Local Auditors <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/service-provider-onboarding" className="flex items-center">
                Join Global Network <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
