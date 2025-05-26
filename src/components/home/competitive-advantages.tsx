
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';

const COMPARISON_DATA = [
  {
    feature: "Response Time",
    hawkly: "< 2 hours",
    traditional: "3-7 days",
    hawklyBetter: true
  },
  {
    feature: "Pricing Model",
    hawkly: "Transparent, fixed",
    traditional: "Hidden fees, variable",
    hawklyBetter: true
  },
  {
    feature: "Auditor Vetting",
    hawkly: "AI + manual verification",
    traditional: "Self-reported credentials",
    hawklyBetter: true
  },
  {
    feature: "Payment Security",
    hawkly: "Smart contract escrow",
    traditional: "Traditional contracts",
    hawklyBetter: true
  },
  {
    feature: "Report Delivery",
    hawkly: "5-10 business days",
    traditional: "2-4 weeks",
    hawklyBetter: true
  },
  {
    feature: "Post-Audit Support",
    hawkly: "Included for 30 days",
    traditional: "Additional cost",
    hawklyBetter: true
  },
  {
    feature: "Multi-Chain Support",
    hawkly: "15+ blockchains",
    traditional: "Limited to 2-3",
    hawklyBetter: true
  },
  {
    feature: "Progress Tracking",
    hawkly: "Real-time dashboard",
    traditional: "Email updates",
    hawklyBetter: true
  }
];

export function CompetitiveAdvantages() {
  return (
    <section className="py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Hawkly Over Traditional Auditors?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our platform compares to traditional security audit services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Header */}
                <div className="bg-muted/20 p-4 font-semibold">Feature</div>
                <div className="bg-primary/10 p-4 font-semibold text-center">Hawkly</div>
                <div className="bg-muted/20 p-4 font-semibold text-center">Traditional Auditors</div>

                {/* Comparison Rows */}
                {COMPARISON_DATA.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4 border-t font-medium">{item.feature}</div>
                    <div className="p-4 border-t bg-primary/5 text-center flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium">{item.hawkly}</span>
                    </div>
                    <div className="p-4 border-t text-center flex items-center justify-center text-muted-foreground">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>{item.traditional}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/request-audit" className="flex items-center">
                Experience the Difference <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
