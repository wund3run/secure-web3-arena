export interface Certification {
  id: string;
  name: string;
  issuer: string;
  type: 'security' | 'blockchain' | 'development' | 'audit' | 'compliance';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  progress: number;
  issueDate?: Date;
  expiryDate?: Date;
  credentialId: string;
  description: string;
  requirements: string[];
  benefits: string[];
  examDetails: ExamDetails;
  renewalRequirements: string[];
}

export interface ExamDetails {
  duration: number; // minutes
  questions: number;
  passingScore: number;
  cost: number;
  format: 'online' | 'in-person' | 'hybrid';
  prerequisites: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  level: 'junior' | 'mid-level' | 'senior' | 'lead' | 'principal';
  duration: string;
  skills: string[];
  certifications: string[];
  salary: SalaryRange;
  requirements: string[];
  milestones: CareerMilestone[];
  opportunities: string[];
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'certification' | 'project' | 'experience';
  status: 'pending' | 'in-progress' | 'completed';
  targetDate?: Date;
  completedDate?: Date;
  impact: 'low' | 'medium' | 'high';
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  experience: string;
}

export interface Mentorship {
  id: string;
  mentor: Mentor;
  mentee: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  goals: string[];
  sessions: MentorshipSession[];
  progress: number;
  rating?: number;
  feedback: string[];
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  expertise: string[];
  experience: number;
  certifications: string[];
  availability: string[];
  bio: string;
  hourlyRate: number;
}

export interface MentorshipSession {
  id: string;
  date: Date;
  duration: number; // minutes
  topic: string;
  notes: string;
  actionItems: string[];
  rating?: number;
  feedback?: string;
}

export interface SkillAssessment {
  id: string;
  skill: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number;
  lastAssessed: Date;
  nextAssessment: Date;
  improvement: number;
  resources: string[];
}

export interface ProfessionalGoal {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'skill' | 'certification' | 'income' | 'network';
  targetDate: Date;
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  progress: number;
  milestones: GoalMilestone[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface GoalMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  completedDate?: Date;
} 