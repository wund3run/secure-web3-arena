
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Star, Zap, CheckCircle } from 'lucide-react';

const QUICK_ACTIONS = [
  {
    title: "Get Instant Quote",
    description: "See pricing for your project in under 60 seconds",
    icon: Zap,
    action: "Get Quote",
    link: "/request-audit",
    time: "1 min",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Browse Expert Profiles",
    description: "View verified auditors and their specializations", 
    icon: Star,
    action: "Browse Experts",
    link: "/marketplace",
    time: "3 min",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Start Free Consultation",
    description: "Speak with our security experts about your needs",
    icon: Shield,
    action: "Book Call",
    link: "/contact",
    time: "5 min",
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

const TRUST_SIGNALS = [
  "500+ successful audits completed",
  "98% client satisfaction rate", 
  "15+ blockchain ecosystems supported",
  "24/7 platform availability"
];

export function QuickStartSection() {
  return (
    <section className="py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No complex onboarding. No lengthy processes. Start securing your Web3 project today.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {QUICK_ACTIONS.map((action, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div className="text-xs bg-muted px-2 py-1 rounded-full">
                    {action.time}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{action.description}</p>
                
                <Button asChild className="w-full group-hover:shadow-md transition-all">
                  <Link to={action.link} className="flex items-center justify-center">
                    {action.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Join Hundreds of Successful Projects</h3>
            <p className="text-muted-foreground">
              See why leading Web3 projects choose Hawkly for their security needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_SIGNALS.map((signal, index) => (
              <div key={index} className="flex items-center justify-center bg-background/80 rounded-lg p-4">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm font-medium text-center">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Need immediate security help? Emergency audits available 24/7
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/contact" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Emergency Contact
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
