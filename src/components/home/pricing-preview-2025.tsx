
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Zap, Crown, Sparkles } from 'lucide-react';
import { PRICING_TIERS_2025, AI_ENHANCED_PRICING } from '@/data/pricing-data';

export function PricingPreview2025() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Updated for 2025 - More affordable, faster delivery
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary pricing that's 70% more affordable than traditional audit firms, 
            with faster delivery and higher accuracy through AI enhancement.
          </p>
        </div>

        {/* AI-Enhanced Option Highlight */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{AI_ENHANCED_PRICING.name}</h3>
                    <p className="text-muted-foreground">{AI_ENHANCED_PRICING.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{AI_ENHANCED_PRICING.price}</div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {AI_ENHANCED_PRICING.badge}
                  </Badge>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {AI_ENHANCED_PRICING.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Standard Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_TIERS_2025.map((tier, index) => {
            const IconComponent = index === 0 ? Shield : index === 1 ? Zap : Crown;
            return (
              <Card 
                key={index} 
                className={`relative ${tier.popular ? 'border-blue-500 shadow-xl scale-105 bg-gradient-to-b from-blue-50 to-white' : 'border hover:shadow-lg transition-shadow'}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-primary">{tier.price}</div>
                      {tier.originalPrice !== tier.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          Previously {tier.originalPrice}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{tier.description}</p>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {tier.savings}
                    </Badge>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                  >
                    <Link to="/request-audit">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Market Comparison */}
        <div className="text-center mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <h3 className="text-xl font-bold mb-4">Why Choose Hawkly in 2025?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">70% Less Cost</div>
                <div className="text-sm text-muted-foreground">vs traditional audit firms</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">80% Faster</div>
                <div className="text-sm text-muted-foreground">1-2 weeks vs 6-12 weeks</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">95% Accuracy</div>
                <div className="text-sm text-muted-foreground">with AI-enhanced detection</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/pricing" className="flex items-center">
              View Detailed Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
