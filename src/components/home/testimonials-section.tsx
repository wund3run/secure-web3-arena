
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Thanks to Hawkly, our launch was seamless and secure.",
    author: "Project Owner",
    role: "DeFi Platform"
  },
  {
    quote: "Hawkly made it easy to find clients and get paid fast.",
    author: "Top Auditor",
    role: "Security Expert"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Quote className="h-8 w-8 text-primary mx-auto mb-4" />
                <blockquote className="text-lg mb-4 text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
                <footer>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
