
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';

interface AuditorCardProps {
  auditor: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    expertise: string[];
    blockchain: string[];
    hourlyRate: number;
    availability: string;
    completedAudits: number;
    experience: number;
    location: string;
    responseTime: string;
    bio: string;
    verified: boolean;
  };
}

export function AuditorCard({ auditor }: AuditorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={auditor.avatar} alt={auditor.name} />
              <AvatarFallback>{auditor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {auditor.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-500 bg-white rounded-full" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{auditor.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {auditor.location}
                </div>
              </div>
              <Badge 
                variant={auditor.availability === 'Available' ? 'default' : 'secondary'}
                className={auditor.availability === 'Available' ? 'bg-green-100 text-green-800' : ''}
              >
                {auditor.availability}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{auditor.rating}</span>
                <span className="text-sm text-muted-foreground">({auditor.reviewCount})</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ${auditor.hourlyRate}/hr
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{auditor.bio}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Expertise</h4>
            <div className="flex flex-wrap gap-1">
              {auditor.expertise.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Blockchain</h4>
            <div className="flex flex-wrap gap-1">
              {auditor.blockchain.map((chain, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {chain}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="h-3 w-3 text-primary" />
              <span className="text-sm font-medium">{auditor.completedAudits}</span>
            </div>
            <div className="text-xs text-muted-foreground">Audits</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-primary" />
              <span className="text-sm font-medium">{auditor.responseTime}</span>
            </div>
            <div className="text-xs text-muted-foreground">Response</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium mb-1">{auditor.experience}+ years</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button className="flex-1">View Profile</Button>
          <Button variant="outline" className="flex-1">Contact</Button>
        </div>
      </CardContent>
    </Card>
  );
}
