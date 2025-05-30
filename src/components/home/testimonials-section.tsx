
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at DeFiProtocol',
      avatar: '/placeholder-avatar-1.jpg',
      rating: 5,
      text: "Hawkly connected us with an exceptional auditor who found critical vulnerabilities we missed. The process was seamless and the communication was outstanding.",
      project: 'DeFi Lending Protocol',
      auditValue: '$2.5M Protected'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder at NFTMarket',
      avatar: '/placeholder-avatar-2.jpg', 
      rating: 5,
      text: "The AI matching system found us the perfect auditor for our NFT marketplace. Completed ahead of schedule with comprehensive documentation.",
      project: 'NFT Marketplace',
      auditValue: '$1.8M Protected'
    },
    {
      name: 'Elena Kovač',
      role: 'Lead Developer at GameDAO',
      avatar: '/placeholder-avatar-3.jpg',
      rating: 5,
      text: "Professional, thorough, and fast. The auditor's expertise in gaming smart contracts was exactly what we needed. Highly recommend Hawkly.",
      project: 'Gaming DAO Platform',
      auditValue: '$3.2M Protected'
    },
    {
      name: 'James Thompson',
      role: 'Security Lead at CrossChain',
      avatar: '/placeholder-avatar-4.jpg',
      rating: 5,
      text: "As someone in security myself, I was impressed by the quality of auditors and the platform's transparency. Great experience overall.",
      project: 'Cross-Chain Bridge',
      auditValue: '$5.1M Protected'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Web3 Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about their experience with Hawkly's security audit platform.
          </p>
          
          {/* Overall Stats */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">4.9/5 Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Projects Secured</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/20 mb-2" />
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.project}
                  </Badge>
                  <div className="text-xs font-medium text-green-600">
                    {testimonial.auditValue}
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
