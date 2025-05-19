
/**
 * Utility functions for the accessibility report
 */

// Calculate overall score (0-100) based on issue severity
export const calculateScore = (
  highSeverityCount: number,
  mediumSeverityCount: number,
  lowSeverityCount: number
): number => {
  const penalty = highSeverityCount * 10 + mediumSeverityCount * 3 + lowSeverityCount * 1;
  return Math.max(0, Math.min(100, 100 - penalty));
};

// Get score grade and color based on the score
export const getScoreDetails = (score: number): { grade: string; color: string } => {
  if (score >= 90) return { grade: 'A', color: 'text-green-500' };
  if (score >= 80) return { grade: 'B', color: 'text-emerald-500' };
  if (score >= 70) return { grade: 'C', color: 'text-yellow-500' };
  if (score >= 60) return { grade: 'D', color: 'text-orange-500' };
  return { grade: 'F', color: 'text-red-500' };
};
