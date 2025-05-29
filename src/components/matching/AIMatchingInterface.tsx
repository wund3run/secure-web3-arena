
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import { useRealTimeAuditMatching } from '@/hooks/useRealTimeAuditMatching';
import { RealTimeMessagingService } from '@/services/real-time-messaging-service';
import { LoadingState } from '@/components/ui/loading-state';

interface AIMatchingInterfaceProps {
  auditRequestId: string;
  onMatchAccepted?: () => void;
}

export function AIMatchingInterface({ auditRequestId, onMatchAccepted }: AIMatchingInterfaceProps) {
  const { matches, isMatching, matchingComplete, acceptMatch, requestNewMatches } = useRealTimeAuditMatching(auditRequestId);

  const handleAcceptMatch = async (auditorId: string) => {
    const success = await acceptMatch(auditorId);
    if (success) {
      // Create conversation
      await RealTimeMessagingService.createConversation(auditRequestId, auditorId);
      onMatchAccepted?.();
    }
  };

  const handleContactAuditor = async (auditorId: string) => {
    const conversation = await RealTimeMessagingService.createConversation(auditRequestId, auditorId);
    if (conversation) {
      // Navigate to conversation or open chat
      window.location.href = `/conversations/${conversation.id}`;
    }
  };

  if (isMatching) {
    return (
      <Card>
        <CardContent className="p-8">
          <LoadingState 
            message="Finding the perfect auditors for your project..." 
            fullPage={false}
            size="lg"
          />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Our AI is analyzing 500+ expert auditors to find the best matches
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            AI-Powered Auditor Matching
          </CardTitle>
          {matchingComplete && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Found {matches.length} qualified matches</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {matches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No matches found yet.</p>
              <Button onClick={requestNewMatches} variant="outline">
                Search Again
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {matches.map((match, index) => (
                <Card key={match.auditorId} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={match.auditorProfile.extended_profiles?.avatar_url} />
                          <AvatarFallback>
                            {match.auditorProfile.extended_profiles?.full_name?.charAt(0) || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">
                              {match.auditorProfile.extended_profiles?.full_name || 'Expert Auditor'}
                            </h3>
                            <Badge variant="secondary">
                              {Math.round(match.matchScore * 100)}% Match
                            </Badge>
                            {index === 0 && (
                              <Badge variant="default">Best Match</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>4.9</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{match.auditorProfile.response_time_hours}h response</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-4 w-4" />
                              <span>{match.auditorProfile.years_experience}+ years</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Why this is a great match:</p>
                            <ul className="text-sm text-muted-foreground">
                              {match.reasoning.map((reason, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {match.auditorProfile.blockchain_expertise?.slice(0, 3).map((blockchain: string) => (
                              <Badge key={blockchain} variant="outline" className="text-xs">
                                {blockchain}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => handleAcceptMatch(match.auditorId)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept Match
                        </Button>
                        <Button 
                          onClick={() => handleContactAuditor(match.auditorId)}
                          variant="outline" 
                          size="sm"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
