import type { 
  Certification, 
  CareerPath, 
  Mentorship, 
  SkillAssessment, 
  ProfessionalGoal 
} from './types';

export const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Certified Blockchain Security Professional',
    issuer: 'Blockchain Security Alliance',
    type: 'blockchain',
    level: 'advanced',
    status: 'completed',
    progress: 100,
    issueDate: new Date('2023-06-15'),
    credentialId: 'CBSP-2023-001',
    description: 'Advanced certification for blockchain security professionals',
    requirements: ['5+ years experience', 'Security background', 'Blockchain knowledge'],
    benefits: ['Industry recognition', 'Higher salary', 'Career advancement'],
    examDetails: {
      duration: 180,
      questions: 100,
      passingScore: 80,
      cost: 500,
      format: 'online',
      prerequisites: ['Basic security knowledge', 'Blockchain fundamentals']
    },
    renewalRequirements: ['Annual continuing education', 'Recertification exam every 3 years']
  },
  {
    id: '2',
    name: 'Smart Contract Security Auditor',
    issuer: 'Web3 Security Institute',
    type: 'audit',
    level: 'expert',
    status: 'in-progress',
    progress: 65,
    credentialId: 'SCSA-2024-002',
    description: 'Expert-level certification for smart contract auditing',
    requirements: ['3+ years auditing experience', 'Solidity proficiency', 'Security mindset'],
    benefits: ['Premium rates', 'High demand', 'Expert status'],
    examDetails: {
      duration: 240,
      questions: 150,
      passingScore: 85,
      cost: 750,
      format: 'hybrid',
      prerequisites: ['Intermediate Solidity', 'Security fundamentals']
    },
    renewalRequirements: ['Bi-annual assessments', 'Portfolio review']
  }
];

export const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Senior Smart Contract Auditor',
    description: 'Lead auditor role with team management responsibilities',
    level: 'senior',
    duration: '3-5 years',
    skills: ['Advanced Solidity', 'Team Leadership', 'Project Management'],
    certifications: ['CBSP', 'SCSA'],
    salary: { min: 120000, max: 180000, currency: 'USD', experience: '3-5 years' },
    requirements: ['5+ years experience', 'Leadership skills', 'Advanced certifications'],
    milestones: [
      {
        id: '1',
        title: 'Lead First Team Audit',
        description: 'Successfully lead a team of 3+ auditors',
        type: 'experience',
        status: 'completed',
        impact: 'high'
      }
    ],
    opportunities: ['Team Lead', 'Principal Auditor', 'Consulting']
  }
];

export const mockMentorships: Mentorship[] = [
  {
    id: '1',
    mentor: {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@example.com',
      avatar: '/avatars/sarah-chen.jpg',
      expertise: ['Smart Contract Security', 'DeFi Auditing', 'Zero-Knowledge Proofs'],
      experience: 8,
      certifications: ['CBSP', 'SCSA', 'PhD Computer Science'],
      availability: ['Monday 2-4 PM', 'Wednesday 10-12 AM'],
      bio: 'Leading expert in DeFi security with 8+ years experience',
      hourlyRate: 150
    },
    mentee: 'user123',
    status: 'active',
    startDate: new Date('2024-01-15'),
    goals: ['Improve DeFi auditing skills', 'Learn advanced techniques', 'Build portfolio'],
    sessions: [
      {
        id: '1',
        date: new Date('2024-02-01'),
        duration: 60,
        topic: 'DeFi Protocol Analysis',
        notes: 'Covered common vulnerabilities in DEX protocols',
        actionItems: ['Review Uniswap V3 code', 'Practice vulnerability identification'],
        rating: 5
      }
    ],
    progress: 75,
    rating: 5,
    feedback: ['Excellent mentor', 'Very knowledgeable', 'Great teaching style']
  }
];

export const mockSkillAssessments: SkillAssessment[] = [
  {
    id: '1',
    skill: 'Solidity Security',
    category: 'Programming',
    level: 'advanced',
    score: 85,
    lastAssessed: new Date('2024-01-15'),
    nextAssessment: new Date('2024-04-15'),
    improvement: 12,
    resources: ['Solidity Docs', 'Security Best Practices', 'Audit Reports']
  },
  {
    id: '2',
    skill: 'DeFi Protocol Analysis',
    category: 'Domain Knowledge',
    level: 'intermediate',
    score: 72,
    lastAssessed: new Date('2024-01-20'),
    nextAssessment: new Date('2024-04-20'),
    improvement: 8,
    resources: ['DeFi Protocol Whitepapers', 'Audit Reports', 'Research Papers']
  }
];

export const mockProfessionalGoals: ProfessionalGoal[] = [
  {
    id: '1',
    title: 'Become Principal Auditor',
    description: 'Achieve principal level within 2 years',
    category: 'career',
    targetDate: new Date('2026-01-01'),
    status: 'in-progress',
    progress: 60,
    priority: 'high',
    milestones: [
      {
        id: '1',
        title: 'Complete Advanced Certification',
        description: 'Obtain SCSA certification',
        targetDate: new Date('2024-06-01'),
        status: 'in-progress'
      },
      {
        id: '2',
        title: 'Lead 10+ Audits',
        description: 'Successfully lead 10 major audits',
        targetDate: new Date('2025-06-01'),
        status: 'pending'
      }
    ]
  }
]; 