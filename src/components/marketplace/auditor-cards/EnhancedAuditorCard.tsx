
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Clock, Shield, Award, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuditorCardProps {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  expertise: string[];
  blockchains: string[];
  completedAudits: number;
  responseTime: string;
  hourlyRate: {
    min: number;
    max: number;
  };
  isVerified: boolean;
  isPremium: boolean;
  description: string;
  availability: 'available' | 'busy' | 'unavailable';
  onContact: () => void;
  onRequestQuote: () => void;
}

export function EnhancedAuditorCard({
  id,
  name,
  avatar,
  rating,
  reviewCount,
  expertise,
  blockchains,
  completedAudits,
  responseTime,
  hourlyRate,
  isVerified,
  isPremium,
  description,
  availability,
  onContact,
  onRequestQuote
}: AuditorCardProps) {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(availability)}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{name}</h3>
                {isVerified && <Award className="h-4 w-4 text-blue-500" />}
                {isPremium && <Shield className="h-4 w-4 text-purple-500" />}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{rating}</span>
                  <span className="ml-1">({reviewCount} reviews)</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getAvailabilityColor(availability)} text-white`}>
                  {getAvailabilityText(availability)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-blue-500" />
              <span>{completedAudits} audits completed</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-green-500" />
              <span>{responseTime} response</span>
            </div>
          </div>

          <div className="text-sm">
            <span className="font-medium">${hourlyRate.min} - ${hourlyRate.max}/hour</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Expertise:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {expertise.slice(0, 3).map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{expertise.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-muted-foreground">Blockchains:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {blockchains.slice(0, 3).map(chain => (
                <Badge key={chain} variant="outline" className="text-xs">
                  {chain}
                </Badge>
              ))}
              {blockchains.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{blockchains.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onContact}
            className="flex-1"
            disabled={availability === 'unavailable'}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Contact
          </Button>
          <Button 
            size="sm" 
            onClick={onRequestQuote}
            className="flex-1"
            disabled={availability === 'unavailable'}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Request Quote
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to={`/auditor/${id}`}>
            View Full Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
