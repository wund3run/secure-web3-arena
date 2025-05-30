
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, DeFi Protocol',
      company: 'YieldFarm Pro',
      image: '/api/placeholder/40/40',
      rating: 5,
      content: 'Hawkly connected us with an exceptional auditor who identified critical vulnerabilities we missed. The platform made the entire process seamless and transparent.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Security Auditor',
      company: 'Independent',
      image: '/api/placeholder/40/40',
      rating: 5,
      content: 'As an auditor, Hawkly provides me with high-quality projects and clients. The AI matching system is incredibly accurate, and the escrow system gives everyone peace of mind.'
    },
    {
      name: 'Alex Thompson',
      role: 'Founder',
      company: 'NFT Marketplace',
      image: '/api/placeholder/40/40',
      rating: 5,
      content: 'The speed and quality of audits through Hawkly exceeded our expectations. We launched with confidence knowing our smart contracts were thoroughly vetted.'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Web3 Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied clients and auditors who have built successful partnerships through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
