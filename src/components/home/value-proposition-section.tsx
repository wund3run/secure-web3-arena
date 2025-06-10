
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Shield, DollarSign, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "10x Faster",
    description: "Get audit results in days, not months",
    metric: "Average 7 days vs 70 days traditional",
    color: "text-primary-600"
  },
  {
    icon: DollarSign,
    title: "50% Lower Cost",
    description: "Pay only for what you need with milestone-based pricing",
    metric: "Starting from $2,500 vs $50,000+",
    color: "text-success-600"
  },
  {
    icon: Shield,
    title: "Expert Network",
    description: "Access 500+ verified security professionals",
    metric: "95% client satisfaction rate",
    color: "text-secondary-600"
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description: "Smart matching connects you to the right expert",
    metric: "< 2 hours to match",
    color: "text-warning-600"
  }
];

const comparisons = [
  {
    feature: "Time to Start",
    traditional: "4-8 weeks",
    hawkly: "< 2 hours",
    improvement: true
  },
  {
    feature: "Cost Range",
    traditional: "$50k - $200k+",
    hawkly: "$2.5k - $25k",
    improvement: true
  },
  {
    feature: "Audit Duration",
    traditional: "8-16 weeks",
    hawkly: "1-3 weeks",
    improvement: true
  },
  {
    feature: "Expert Matching",
    traditional: "Manual & Limited",
    hawkly: "AI-Powered",
    improvement: true
  },
  {
    feature: "Payment Security",
    traditional: "Upfront Payment",
    hawkly: "Escrow Protection",
    improvement: true
  }
];

export function ValuePropositionSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-primary-50/30">
      <div className="modern-container">
        {/* Benefits Grid */}
        <div className="section-header">
          <Badge variant="secondary" className="mb-4 bg-primary-100 text-primary-700 border-primary-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Why Choose Hawkly
          </Badge>
          <h2 className="section-title text-neutral-900">
            The Smart Way to Secure Web3
          </h2>
          <p className="section-subtitle text-neutral-600">
            Traditional audit firms are slow and expensive. We've built a better way using AI, blockchain technology, and the world's top security experts.
          </p>

          <div className="grid-features">
            {benefits.map((benefit, index) => (
              <Card key={index} className="modern-card modern-card-hover text-center bg-white border-neutral-200">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-neutral-50 border-2 border-neutral-200 flex items-center justify-center mb-4 ${benefit.color}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-900">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 mb-3">{benefit.description}</p>
                  <Badge variant="outline" className="text-xs bg-neutral-50 text-neutral-700 border-neutral-300">
                    {benefit.metric}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Hawkly vs Traditional Audit Firms</h3>
            <p className="text-neutral-600">See how we stack up against the old way of doing security audits</p>
          </div>

          <Card className="modern-card overflow-hidden bg-white border-neutral-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left p-4 font-medium text-neutral-900">Feature</th>
                      <th className="text-center p-4 font-medium text-neutral-700">Traditional Firms</th>
                      <th className="text-center p-4 font-medium text-primary-700">Hawkly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((comparison, index) => (
                      <tr key={index} className="border-t border-neutral-100">
                        <td className="p-4 font-medium text-neutral-900">{comparison.feature}</td>
                        <td className="p-4 text-center text-neutral-600">{comparison.traditional}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-medium text-primary-700">{comparison.hawkly}</span>
                            {comparison.improvement && (
                              <CheckCircle className="h-4 w-4 text-success-500" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
