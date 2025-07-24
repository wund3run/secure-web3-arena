import type { Certification, CareerPath, Mentorship, SkillAssessment, ProfessionalGoal } from './types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'not-started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getLevelColor = (level: string) => {
  switch (level) {
    case 'expert':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'advanced':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const calculateProgress = (completed: number, total: number) => {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

export const getDaysUntil = (targetDate: Date) => {
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isOverdue = (targetDate: Date) => {
  return getDaysUntil(targetDate) < 0;
};

export const getCertificationProgress = (certification: Certification) => {
  return certification.progress;
};

export const getMentorshipProgress = (mentorship: Mentorship) => {
  return mentorship.progress;
};

export const getGoalProgress = (goal: ProfessionalGoal) => {
  return goal.progress;
};

export const getSkillLevel = (assessment: SkillAssessment) => {
  if (assessment.score >= 90) return 'expert';
  if (assessment.score >= 75) return 'advanced';
  if (assessment.score >= 60) return 'intermediate';
  return 'beginner';
}; 