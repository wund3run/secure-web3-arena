
import { useState, useEffect } from 'react';
import { AIMatchingService, MatchingResult } from '@/services/ai-matching-service';
import { useAuth } from '@/contexts/auth';

export function useRealTimeAuditMatching(auditRequestId?: string) {
  const [matches, setMatches] = useState<MatchingResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!auditRequestId || !user) return;

    const performMatching = async () => {
      setIsMatching(true);
      try {
        const results = await AIMatchingService.findBestMatches(auditRequestId, 5);
        setMatches(results);
        setMatchingComplete(true);
      } catch (error) {
        console.error('Matching failed:', error);
      } finally {
        setIsMatching(false);
      }
    };

    // Start matching immediately for new requests
    performMatching();
  }, [auditRequestId, user]);

  const acceptMatch = async (auditorId: string): Promise<boolean> => {
    if (!auditRequestId) return false;
    
    try {
      const success = await AIMatchingService.autoAssignBestMatch(auditRequestId);
      if (success) {
        setMatchingComplete(true);
      }
      return success;
    } catch (error) {
      console.error('Failed to accept match:', error);
      return false;
    }
  };

  const requestNewMatches = async (): Promise<void> => {
    if (!auditRequestId) return;
    
    setIsMatching(true);
    setMatchingComplete(false);
    
    try {
      const results = await AIMatchingService.findBestMatches(auditRequestId, 5);
      setMatches(results);
      setMatchingComplete(true);
    } catch (error) {
      console.error('Failed to get new matches:', error);
    } finally {
      setIsMatching(false);
    }
  };

  return {
    matches,
    isMatching,
    matchingComplete,
    acceptMatch,
    requestNewMatches
  };
}
