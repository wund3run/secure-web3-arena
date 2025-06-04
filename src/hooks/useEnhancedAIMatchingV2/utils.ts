
import { AuditorProfile, EnhancedMatchingCriteria } from './types';

export const calculateBlockchainExpertiseScore = (auditor: AuditorProfile, criteria: EnhancedMatchingCriteria): number => {
  return auditor.blockchain_expertise.includes(criteria.blockchain) ? 1 : 0.3;
};

export const calculateSkillMatchScore = (auditor: AuditorProfile, criteria: EnhancedMatchingCriteria): number => {
  const matchingSkills = auditor.expertise.filter(skill => 
    criteria.specific_requirements.some(req => 
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
  return matchingSkills.length / Math.max(criteria.specific_requirements.length, 1);
};

export const mapComplexityToScore = (complexity: string): number => {
  const mapping = { low: 0.3, medium: 0.6, high: 1.0 };
  return mapping[complexity as keyof typeof mapping] || 0.5;
};

export const calculateTimelineUrgency = (timeline: string): number => {
  // Parse timeline and convert to urgency score
  if (timeline.includes('week')) return 1.0;
  if (timeline.includes('month')) return 0.6;
  return 0.3;
};

export const mapBlockchainToScore = (blockchain: string): number => {
  // Map blockchain types to numeric scores
  const mapping: Record<string, number> = {
    ethereum: 0.9,
    solana: 0.8,
    polygon: 0.7,
    arbitrum: 0.6,
    optimism: 0.5
  };
  return mapping[blockchain.toLowerCase()] || 0.5;
};

export const mapExperienceToScore = (experience: string): number => {
  const mapping = { junior: 0.3, mid: 0.5, senior: 0.8, expert: 1.0 };
  return mapping[experience as keyof typeof mapping] || 0.5;
};
