
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Check, Shield, Zap, Crown, Sparkles, ArrowRight, 
  Clock, DollarSign, Target, Users, Star, Gift 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  PRICING_TIERS_2025, 
  AI_ENHANCED_PRICING, 
  DISCOUNTS_2025, 
  MARKET_COMPARISON_2025,
  PRICING_FEATURES_2025 
} from '@/data/pricing-data';

const Pricing2025 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Updated March 2025 - Revolutionary pricing & AI enhancement
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security Audits <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reimagined</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              70% more affordable than traditional firms. 80% faster delivery. 95% accuracy with AI enhancement. 
              The future of Web3 security is here.
            </p>
          </div>

          {/* Market Comparison */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Market Revolution</CardTitle>
                <CardDescription>How Hawkly transforms the security audit landscape</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Traditional Audit Firms
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-medium">{MARKET_COMPARISON_2025.traditionalFirms.avgCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Time:</span>
                        <span className="font-medium">{MARKET_COMPARISON_2025.traditionalFirms.avgTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-medium">{MARKET_COMPARISON_2025.traditionalFirms.accuracy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Hawkly Platform 2025
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-medium text-green-600">{MARKET_COMPARISON_2025.hawkly.avgCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Time:</span>
                        <span className="font-medium text-green-600">{MARKET_COMPARISON_2025.hawkly.avgTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-medium text-green-600">{MARKET_COMPARISON_2025.hawkly.accuracy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI-Enhanced Spotlight */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">AI-Enhanced Auditing</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{AI_ENHANCED_PRICING.name}</h2>
                  <p className="text-xl text-muted-foreground mb-4">{AI_ENHANCED_PRICING.description}</p>
                  <div className="text-4xl font-bold text-purple-600">{AI_ENHANCED_PRICING.price}</div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {AI_ENHANCED_PRICING.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Standard Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {PRICING_TIERS_2025.map((tier, index) => {
              const IconComponent = index === 0 ? Shield : index === 1 ? Zap : Crown;
              return (
                <Card key={index} className={`relative ${tier.popular ? 'border-blue-500 shadow-xl scale-105' : ''}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{tier.price}</div>
                      {tier.originalPrice !== tier.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          Previously {tier.originalPrice}
                        </div>
                      )}
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {tier.savings}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                    >
                      <Link to="/request-audit">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Platform Features */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Included with Every Audit</CardTitle>
                <CardDescription>Standard features that come with all our security audits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(PRICING_FEATURES_2025).map(([key, feature], index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Discounts Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Gift className="h-6 w-6 text-green-600" />
                  Available Discounts
                </CardTitle>
                <CardDescription>Save even more with our special pricing programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(DISCOUNTS_2025).map(([key, discount], index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {discount.discount}%
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{discount.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Security?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join over 1,000+ projects that have saved millions while getting faster, 
              more accurate security audits with our revolutionary platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/request-audit">
                  Start Your Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Get Custom Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing2025;
