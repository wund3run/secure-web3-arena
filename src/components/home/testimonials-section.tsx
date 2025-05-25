
import React from 'react';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "Hawkly connected us with top-tier security experts who identified critical vulnerabilities before our mainnet launch. The process was seamless and professional.",
      author: "Sarah Chen",
      role: "CTO, DeFi Protocol",
      company: "AquaSwap",
      rating: 5,
      avatar: "SC"
    },
    {
      content: "The audit quality exceeded our expectations. The detailed report and remediation guidance helped us strengthen our smart contract security significantly.",
      author: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "ChainVault",
      rating: 5,
      avatar: "MR"
    },
    {
      content: "Fast, reliable, and thorough. Hawkly's auditors caught issues that could have cost us millions. Highly recommend for any Web3 project.",
      author: "Emily Foster",
      role: "Founder",
      company: "TokenBridge",
      rating: 5,
      avatar: "EF"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from the projects that have successfully secured their smart contracts through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-primary mb-4" />
              </div>
              
              <blockquote className="text-muted-foreground mb-6">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {testimonial.avatar}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
