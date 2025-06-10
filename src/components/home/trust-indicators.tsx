
import React from 'react';
import { Shield, Award, Users, CheckCircle, Star, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TRUST_METRICS = [
  { value: '500+', label: 'Security Audits Completed', icon: Shield },
  { value: '50+', label: 'Verified Expert Auditors', icon: Users },
  { value: '99.9%', label: 'Vulnerability Detection Rate', icon: CheckCircle },
  { value: '4.9/5', label: 'Average Client Rating', icon: Star }
];

const CERTIFICATIONS = [
  { name: 'SOC 2 Type II', icon: Award },
  { name: 'ISO 27001', icon: Shield },
  { name: 'GDPR Compliant', icon: Globe }
];

const TESTIMONIALS = [
  {
    quote: "Hawkly's auditors found critical vulnerabilities we missed. Saved our project from potential exploits.",
    author: "Sarah Chen",
    role: "CTO, DeFi Protocol",
    rating: 5
  },
  {
    quote: "The quality of audits and speed of delivery exceeded our expectations. Highly recommended.",
    author: "Marcus Rodriguez", 
    role: "Founder, NFT Marketplace",
    rating: 5
  }
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        {/* Trust Metrics */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Trusted by Leading Web3 Projects</h2>
          <p className="text-muted-foreground">Join hundreds of projects that trust Hawkly with their security</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {TRUST_METRICS.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="bg-card border">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
                <cert.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
