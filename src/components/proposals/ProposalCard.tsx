
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface ProposalCardProps {
  proposal: {
    id: string;
    auditorName: string;
    auditorAvatar?: string;
    rating: number;
    completedAudits: number;
    message: string;
    estimatedHours: number;
    hourlyRate: number;
    totalCost: number;
    timeline: string;
    deliverables: string[];
    status: 'pending' | 'accepted' | 'rejected';
  };
  onAccept: (proposalId: string) => void;
  onReject: (proposalId: string) => void;
  onViewProfile: (auditorId: string) => void;
  showActions?: boolean;
}

export function ProposalCard({
  proposal,
  onAccept,
  onReject,
  onViewProfile,
  showActions = true
}: ProposalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={proposal.auditorAvatar} />
              <AvatarFallback>
                {proposal.auditorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{proposal.auditorName}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{proposal.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {proposal.completedAudits} audits completed
                </span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(proposal.status)} variant="secondary">
            {proposal.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{proposal.message}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{proposal.estimatedHours}h</p>
              <p className="text-xs text-muted-foreground">Estimated time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">${proposal.hourlyRate}/hr</p>
              <p className="text-xs text-muted-foreground">Hourly rate</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">${proposal.totalCost}</p>
              <p className="text-xs text-muted-foreground">Total cost</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Timeline: {proposal.timeline}</h4>
          <div className="space-y-1">
            <p className="text-sm font-medium">Deliverables:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {proposal.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showActions && proposal.status === 'pending' && (
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={() => onAccept(proposal.id)}
              className="flex-1"
            >
              Accept Proposal
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onReject(proposal.id)}
              className="flex-1"
            >
              Decline
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onViewProfile(proposal.id)}
            >
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
