import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Star, 
  Clock, 
  DollarSign, 
  Target,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useAIMatching, MatchingScore } from '@/hooks/useAIMatching';
import { toast } from 'sonner';
import { AuditService } from '@/services/auditService';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface IntelligentMatchingDashboardProps {
  auditRequestId: string;
  onSelectAuditor?: (auditorId: string) => void;
}

export const IntelligentMatchingDashboard: React.FC<IntelligentMatchingDashboardProps> = ({
  auditRequestId,
  onSelectAuditor,
}) => {
  const { loading, matchingResults, calculateMatchingScore, getMatchingResults } = useAIMatching();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedAuditor, setSelectedAuditor] = useState<string | null>(null);
  const [loadingSelection, setLoadingSelection] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get existing results first, then calculate if none exist
    getMatchingResults(auditRequestId).then(results => {
      if (results.length === 0) {
        calculateMatchingScore(auditRequestId);
      }
    });
  }, [auditRequestId, getMatchingResults, calculateMatchingScore]);

  const handleSelectAuditor = async (auditorId: string) => {
    setLoadingSelection(true);
    try {
    setSelectedAuditor(auditorId);
    onSelectAuditor?.(auditorId);
      // Assign auditor to audit request
      const assigned = await AuditService.assignAuditor(auditRequestId, auditorId);
      if (!assigned) throw new Error('Failed to assign auditor');
      // Create or get chat room
      const chatRoomId = await AuditService.getOrCreateAuditChatRoom(auditRequestId, user?.id, auditorId);
      if (!chatRoomId) throw new Error('Failed to create chat room');
      setChatRoomId(chatRoomId);
      toast.success('Auditor selected and chat room created!');
      // Notify auditor
      await supabase.from('notifications').insert({
        user_id: auditorId,
        title: 'You have been selected for an audit',
        message: `A project owner has selected you for audit request ${auditRequestId}. Join the chat to get started.`,
        type: 'info',
        metadata: { audit_request_id: auditRequestId, chat_room_id: chatRoomId }
      });
      // Optionally, auto-navigate:
      // navigate(`/chat/${chatRoomId}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to select auditor and create chat room');
    } finally {
      setLoadingSelection(false);
    }
  };

  const handleRecalculate = () => {
    calculateMatchingScore(auditRequestId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.6) return 'Good';
    if (score >= 0.4) return 'Fair';
    return 'Poor';
  };

  const renderScoreBreakdown = (score: MatchingScore) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-500" />
          <span className="text-sm">Expertise Match</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={score.expertise_match * 100} className="w-16 h-2" />
          <span className="text-sm font-medium">{Math.round(score.expertise_match * 100)}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-sm">Availability</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={score.availability_score * 100} className="w-16 h-2" />
          <span className="text-sm font-medium">{Math.round(score.availability_score * 100)}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-purple-500" />
          <span className="text-sm">Budget Fit</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={score.budget_compatibility * 100} className="w-16 h-2" />
          <span className="text-sm font-medium">{Math.round(score.budget_compatibility * 100)}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-orange-500" />
          <span className="text-sm">Timeline</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={score.timeline_feasibility * 100} className="w-16 h-2" />
          <span className="text-sm font-medium">{Math.round(score.timeline_feasibility * 100)}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-red-500" />
          <span className="text-sm">Reputation</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={score.reputation_weight * 100} className="w-16 h-2" />
          <span className="text-sm font-medium">{Math.round(score.reputation_weight * 100)}%</span>
        </div>
      </div>
    </div>
  );

  const renderAuditorCard = (score: MatchingScore) => (
    <Card key={score.auditor_id} className="relative">
      {score.compatibility_score >= 0.8 && (
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="bg-green-600">
            Top Match
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {score.auditor_profile?.full_name.split(' ').map(n => n[0]).join('') || 'AU'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{score.auditor_profile?.full_name || 'Anonymous Auditor'}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">
                    {score.auditor_profile?.average_rating || 4.5}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {score.auditor_profile?.total_audits_completed || 0} audits
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(score.compatibility_score)}`}>
              {Math.round(score.compatibility_score * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">
              {getScoreLabel(score.compatibility_score)} Match
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {score.auditor_profile?.bio || 'Experienced blockchain security auditor with proven track record.'}
        </p>

        <div className="flex flex-wrap gap-1">
          {score.auditor_profile?.blockchain_expertise.slice(0, 3).map((blockchain) => (
            <Badge key={blockchain} variant="secondary" className="text-xs">
              {blockchain}
            </Badge>
          ))}
          {(score.auditor_profile?.blockchain_expertise.length || 0) > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{(score.auditor_profile?.blockchain_expertise.length || 0) - 3} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <span className="ml-1 font-medium">
              {score.auditor_profile?.years_experience || 0} years
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Rate:</span>
            <span className="ml-1 font-medium">
              ${score.auditor_profile?.hourly_rate_min || 0}-${score.auditor_profile?.hourly_rate_max || 0}/hr
            </span>
          </div>
        </div>

        <Separator />

        {renderScoreBreakdown(score)}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {/* Open messaging */}}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => handleSelectAuditor(score.auditor_id)}
            disabled={selectedAuditor === score.auditor_id || loadingSelection}
          >
            {selectedAuditor === score.auditor_id ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Selected
              </>
            ) : (
              'Select Auditor'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Auditor Matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Our AI has analyzed {matchingResults.length} auditors based on expertise, availability, budget, and timeline compatibility.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleRecalculate}
              disabled={loading}
            >
              {loading ? 'Calculating...' : 'Recalculate Matches'}
            </Button>
          </div>

          {matchingResults.length > 0 && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">
                Found {matchingResults.length} Compatible Auditors
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Top match: {Math.round(matchingResults[0]?.compatibility_score * 100 || 0)}% compatibility
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matchingResults.map(renderAuditorCard)}
        </div>
      )}

      {!loading && matchingResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
            <p className="text-muted-foreground">
              No auditors are currently available that match your requirements. Try adjusting your budget or timeline.
            </p>
          </CardContent>
        </Card>
      )}

      {chatRoomId && (
        <Button onClick={() => navigate(`/chat/${chatRoomId}`)} className="mt-4">Go to Chat</Button>
      )}
    </div>
  );
};
