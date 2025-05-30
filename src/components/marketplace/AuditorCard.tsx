
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, DollarSign, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuditorCardProps {
  auditor: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
    reviewCount: number;
    hourlyRate: { min: number; max: number };
    experience: number;
    specializations: string[];
    availability: 'available' | 'busy' | 'unavailable';
    completedAudits: number;
    verified: boolean;
    responseTime: number; // hours
    bio: string;
  };
}

export const AuditorCard: React.FC<AuditorCardProps> = ({ auditor }) => {
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
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={auditor.avatar_url} alt={auditor.name} />
                <AvatarFallback>{auditor.name[0]}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(auditor.availability)}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{auditor.name}</h3>
                {auditor.verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{auditor.rating.toFixed(1)}</span>
                <span>({auditor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <Badge variant={auditor.availability === 'available' ? 'default' : 'secondary'}>
            {getAvailabilityText(auditor.availability)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{auditor.bio}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>${auditor.hourlyRate.min}-${auditor.hourlyRate.max}/hr</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>{auditor.responseTime}h response</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-600" />
            <span>{auditor.completedAudits} audits</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{auditor.experience}+ years</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Specializations</h4>
          <div className="flex flex-wrap gap-1">
            {auditor.specializations.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
            {auditor.specializations.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{auditor.specializations.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/auditors/${auditor.id}`}>View Profile</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link to={`/audit-request?auditor=${auditor.id}`}>Contact</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
