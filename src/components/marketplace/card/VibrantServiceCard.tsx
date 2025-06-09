
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Shield, Eye, ArrowRight, Award, CheckCircle } from 'lucide-react';

interface VibrantServiceCardProps {
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  features: string[];
  image?: string;
  verified?: boolean;
  featured?: boolean;
}

export function VibrantServiceCard({
  title,
  provider,
  rating,
  reviews,
  price,
  category,
  features,
  image,
  verified = false,
  featured = false
}: VibrantServiceCardProps) {
  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'smart contract audit':
        return 'from-brand-primary to-brand-primary-light';
      case 'security review':
        return 'from-brand-secondary to-brand-secondary-light';
      case 'penetration testing':
        return 'from-brand-accent to-brand-accent-light';
      default:
        return 'from-brand-primary to-brand-secondary';
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
      featured 
        ? 'border-2 border-brand-primary shadow-[0_0_30px_rgba(138,115,226,0.2)]' 
        : 'border border-gray-200 hover:border-brand-primary/50'
    }`}>
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="brand-badge">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <CardHeader className="relative">
        {/* Provider info with brand styling */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryGradient(category)} flex items-center justify-center text-white font-bold text-lg`}>
            {provider.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{provider}</h3>
              {verified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        
        {/* Service title */}
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors duration-300">
          {title}
        </h4>
        
        {/* Category badge */}
        <Badge className={`w-fit bg-gradient-to-r ${getCategoryGradient(category)} text-white border-0`}>
          <Shield className="h-3 w-3 mr-1" />
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Features list */}
        <div className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">{price}</div>
            <div className="text-sm text-gray-500">Starting price</div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="brand-hover-effect">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" className="brand-button-primary group/btn">
              View Details
              <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-primary/20 rounded-lg transition-all duration-300 pointer-events-none" />
    </Card>
  );
}
