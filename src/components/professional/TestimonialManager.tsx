
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, CheckCircle, Shield, Zap, Award } from 'lucide-react';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
  projectType: string;
  auditValue: string;
  vulnerabilitiesFound: number;
  timeToComplete: string;
  verified: boolean;
  tags: string[];
}

const professionalTestimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'CTO & Co-founder',
    company: 'DeFiVault Protocol',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'The audit was exceptionally thorough. The team identified 3 critical vulnerabilities that could have resulted in significant fund loss. Their detailed report and remediation guidance saved our protocol and gave our investors confidence.',
    projectType: 'Smart Contract Audit',
    auditValue: '$25,000',
    vulnerabilitiesFound: 7,
    timeToComplete: '6 days',
    verified: true,
    tags: ['DeFi', 'Solidity', 'Critical Issues Found']
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Lead Developer',
    company: 'NFT Marketplace Inc',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'Outstanding professionalism and technical expertise. The auditors not only found security issues but also provided gas optimization suggestions that reduced our deployment costs by 40%. Highly recommended for any serious Web3 project.',
    projectType: 'dApp Security Review',
    auditValue: '$18,500',
    vulnerabilitiesFound: 5,
    timeToComplete: '8 days',
    verified: true,
    tags: ['NFT', 'Gas Optimization', 'Frontend Security']
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Blockchain Architect',
    company: 'CrossChain Bridge Co',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'The most comprehensive audit we\'ve ever received. The team went beyond the scope to test edge cases and provided detailed documentation. Their expertise in cross-chain protocols was evident throughout the process.',
    projectType: 'Bridge Protocol Audit',
    auditValue: '$45,000',
    vulnerabilitiesFound: 12,
    timeToComplete: '14 days',
    verified: true,
    tags: ['Cross-chain', 'Bridge Security', 'Complex Protocol']
  },
  {
    id: '4',
    name: 'Emma Thompson',
    role: 'Security Lead',
    company: 'GameFi Studios',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'Exceptional attention to detail and clear communication throughout. The audit helped us launch with confidence and our community appreciated the transparency. The ongoing monitoring service is also invaluable.',
    projectType: 'GameFi Platform Audit',
    auditValue: '$32,000',
    vulnerabilitiesFound: 8,
    timeToComplete: '10 days',
    verified: true,
    tags: ['GameFi', 'Token Economics', 'Community Focused']
  },
  {
    id: '5',
    name: 'David Park',
    role: 'Founder & CEO',
    company: 'Yield Protocol',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'The emergency audit service saved our launch. When we discovered potential issues 48 hours before mainnet, Hawkly\'s team worked around the clock to complete a comprehensive review. Professional and reliable.',
    projectType: 'Emergency Audit',
    auditValue: '$15,000',
    vulnerabilitiesFound: 4,
    timeToComplete: '2 days',
    verified: true,
    tags: ['Emergency Response', 'Yield Farming', 'Time Critical']
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    role: 'Product Manager',
    company: 'DAO Governance Platform',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    testimonial: 'The governance-focused audit was exactly what we needed. The team understood the complexities of DAO mechanics and provided insights that improved both security and user experience. Outstanding service.',
    projectType: 'DAO Governance Audit',
    auditValue: '$28,000',
    vulnerabilitiesFound: 6,
    timeToComplete: '12 days',
    verified: true,
    tags: ['DAO', 'Governance', 'Community Security']
  }
];

export function TestimonialManager() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getProjectIcon = (projectType: string) => {
    if (projectType.includes('Emergency')) return <Zap className="h-4 w-4 text-orange-500" />;
    if (projectType.includes('Bridge')) return <Shield className="h-4 w-4 text-blue-500" />;
    if (projectType.includes('DAO')) return <Award className="h-4 w-4 text-purple-500" />;
    return <Shield className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real testimonials from Web3 projects that have secured their protocols with our professional audit services.
          Every testimonial is verified and represents actual client experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            {testimonial.verified && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">{renderStars(testimonial.rating)}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getProjectIcon(testimonial.projectType)}
                  <span>{testimonial.projectType}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-4 w-4 text-muted-foreground opacity-30 -translate-x-1 -translate-y-1" />
                <blockquote className="pl-3 text-sm italic leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="font-semibold text-green-600">{testimonial.vulnerabilitiesFound}</div>
                  <div className="text-muted-foreground">Issues Found</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="font-semibold text-blue-600">{testimonial.timeToComplete}</div>
                  <div className="text-muted-foreground">Completion</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {testimonial.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Project Value</span>
                  <span className="font-semibold text-primary">{testimonial.auditValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="inline-block p-6 bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Audits Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">$50M+</div>
              <div className="text-sm text-muted-foreground">Assets Secured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
