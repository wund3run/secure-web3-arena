import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  GraduationCap,
  Users,
  Target,
  TrendingUp,
  Star,
  Trophy,
  Medal,
  Award,
  BookOpen,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  User,
  UserCheck,
  UserPlus,
  MessageSquare,
  Video,
  Phone,
  Mail,
  FileText,
  Download,
  Upload,
  Filter,
  Search,
  Settings,
  Share2,
  Copy,
  Save,
  RefreshCw,
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  Square,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Hash,
  Percent,
  Timer,
  History,
  Bell,
  Globe,
  Building,
  Folder,
  FolderOpen,
  File,
  FilePlus,
  Image,
  Music,
  Archive,
  Inbox,
  Send,
  Reply,
  Forward,
  Flag,
  Tag,
  Bookmark,
  Heart,
  Link,
  ExternalLink,
  Zap,
  Lightbulb,
  Sparkles,
  Bot,
  Cpu,
  Network,
  Database,
  Lock,
  Unlock,
  ShieldQuestion,
  Shield,
  ShieldOff,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

interface Certification {
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

interface ExamDetails {
  duration: number; // minutes
  questions: number;
  passingScore: number;
  cost: number;
  format: 'online' | 'in-person' | 'hybrid';
  prerequisites: string[];
}

interface CareerPath {
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

interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'certification' | 'project' | 'experience';
  status: 'pending' | 'in-progress' | 'completed';
  targetDate?: Date;
  completedDate?: Date;
  impact: 'low' | 'medium' | 'high';
}

interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  experience: string;
}

interface Mentorship {
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

interface Mentor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  expertise: string[];
  experience: number;
  certifications: string[];
  rating: number;
  availability: string[];
  bio: string;
  hourlyRate: number;
}

interface MentorshipSession {
  id: string;
  date: Date;
  duration: number; // minutes
  topic: string;
  notes: string;
  actionItems: string[];
  rating?: number;
  feedback?: string;
}

interface SkillAssessment {
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

interface ProfessionalGoal {
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

interface GoalMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  status: 'pending' | 'completed';
  completedDate?: Date;
}

export function ProfessionalGrowthTools() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [skillAssessments, setSkillAssessments] = useState<SkillAssessment[]>([]);
  const [professionalGoals, setProfessionalGoals] = useState<ProfessionalGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    initializeProfessionalGrowth();
  }, []);

  const initializeProfessionalGrowth = () => {
    // Mock Certifications
    const mockCertifications: Certification[] = [
      {
        id: 'cert-001',
        name: 'Certified Smart Contract Security Auditor (CS2A)',
        issuer: 'Hawkly Security Institute',
        type: 'audit',
        level: 'advanced',
        status: 'in-progress',
        progress: 75,
        issueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
        credentialId: 'CS2A-2024-001',
        description: 'Advanced certification for smart contract security auditing',
        requirements: [
          '3+ years of blockchain development experience',
          'Completion of prerequisite courses',
          'Pass practical examination',
          'Submit audit portfolio'
        ],
        benefits: [
          'Industry recognition',
          'Higher earning potential',
          'Access to exclusive projects',
          'Professional network access'
        ],
        examDetails: {
          duration: 240,
          questions: 100,
          passingScore: 80,
          cost: 1500,
          format: 'online',
          prerequisites: ['Solidity Fundamentals', 'Security Basics']
        },
        renewalRequirements: [
          'Complete 40 CPE credits annually',
          'Submit 5 audit reports',
          'Pass renewal examination'
        ]
      },
      {
        id: 'cert-002',
        name: 'Blockchain Security Professional (BSP)',
        issuer: 'Blockchain Security Council',
        type: 'security',
        level: 'intermediate',
        status: 'completed',
        progress: 100,
        issueDate: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000),
        credentialId: 'BSP-2023-045',
        description: 'Comprehensive blockchain security certification',
        requirements: [
          '2+ years of security experience',
          'Blockchain fundamentals',
          'Security assessment skills'
        ],
        benefits: [
          'Security expertise validation',
          'Career advancement',
          'Industry credibility'
        ],
        examDetails: {
          duration: 180,
          questions: 75,
          passingScore: 75,
          cost: 1200,
          format: 'hybrid',
          prerequisites: ['Security Fundamentals']
        },
        renewalRequirements: [
          '30 CPE credits annually',
          'Security conference attendance'
        ]
      }
    ];

    // Mock Career Paths
    const mockCareerPaths: CareerPath[] = [
      {
        id: 'path-001',
        title: 'Senior Security Auditor',
        description: 'Advanced career path for experienced security auditors',
        level: 'senior',
        duration: '3-5 years',
        skills: ['Advanced Solidity', 'Security Analysis', 'Team Leadership', 'Client Management'],
        certifications: ['CS2A', 'BSP', 'CISSP'],
        salary: {
          min: 120000,
          max: 180000,
          currency: 'USD',
          experience: '5-8 years'
        },
        requirements: [
          '5+ years of security auditing experience',
          'Advanced certifications',
          'Leadership experience',
          'Portfolio of successful audits'
        ],
        milestones: [
          {
            id: 'milestone-001',
            title: 'Complete CS2A Certification',
            description: 'Obtain advanced smart contract auditor certification',
            type: 'certification',
            status: 'in-progress',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            impact: 'high'
          },
          {
            id: 'milestone-002',
            title: 'Lead 10+ Audit Projects',
            description: 'Successfully lead multiple audit projects',
            type: 'experience',
            status: 'pending',
            targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            impact: 'high'
          }
        ],
        opportunities: [
          'Lead auditor positions',
          'Consulting opportunities',
          'Training and mentorship roles',
          'Industry speaking engagements'
        ]
      }
    ];

    // Mock Mentorships
    const mockMentorships: Mentorship[] = [
      {
        id: 'mentor-001',
        mentor: {
          id: 'mentor-001',
          name: 'Dr. Sarah Chen',
          email: 'sarah.chen@hawkly.com',
          avatar: '/avatars/sarah.jpg',
          expertise: ['Smart Contract Security', 'DeFi Auditing', 'Zero-Knowledge Proofs'],
          experience: 12,
          certifications: ['CS2A', 'PhD Computer Science', 'CISSP'],
          rating: 4.9,
          availability: ['Monday', 'Wednesday', 'Friday'],
          bio: 'Leading expert in blockchain security with 12+ years of experience',
          hourlyRate: 200
        },
        mentee: 'user-001',
        status: 'active',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        goals: [
          'Improve smart contract analysis skills',
          'Develop audit methodology',
          'Build professional network'
        ],
        sessions: [
          {
            id: 'session-001',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            duration: 60,
            topic: 'Advanced Reentrancy Detection',
            notes: 'Discussed advanced techniques for detecting reentrancy vulnerabilities',
            actionItems: ['Practice with provided examples', 'Review OpenZeppelin patterns'],
            rating: 5,
            feedback: 'Excellent session with practical examples'
          }
        ],
        progress: 60,
        feedback: ['Very knowledgeable mentor', 'Great practical insights']
      }
    ];

    // Mock Skill Assessments
    const mockSkillAssessments: SkillAssessment[] = [
      {
        id: 'skill-001',
        skill: 'Solidity Security Analysis',
        category: 'Blockchain Security',
        level: 'advanced',
        score: 87,
        lastAssessed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        improvement: 12,
        resources: [
          'Advanced Solidity Security Course',
          'Practical Audit Examples',
          'Security Best Practices Guide'
        ]
      },
      {
        id: 'skill-002',
        skill: 'Penetration Testing',
        category: 'Security Testing',
        level: 'intermediate',
        score: 72,
        lastAssessed: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        improvement: 8,
        resources: [
          'Penetration Testing Fundamentals',
          'Web3 Security Tools',
          'Vulnerability Assessment Guide'
        ]
      }
    ];

    // Mock Professional Goals
    const mockProfessionalGoals: ProfessionalGoal[] = [
      {
        id: 'goal-001',
        title: 'Achieve Senior Auditor Position',
        description: 'Advance to senior security auditor role within 18 months',
        category: 'career',
        targetDate: new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000),
        status: 'in-progress',
        progress: 45,
        priority: 'high',
        milestones: [
          {
            id: 'goal-milestone-001',
            title: 'Complete CS2A Certification',
            description: 'Obtain advanced certification',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            status: 'pending'
          },
          {
            id: 'goal-milestone-002',
            title: 'Lead 5 Audit Projects',
            description: 'Successfully lead multiple projects',
            targetDate: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
            status: 'pending'
          }
        ]
      }
    ];

    setCertifications(mockCertifications);
    setCareerPaths(mockCareerPaths);
    setMentorships(mockMentorships);
    setSkillAssessments(mockSkillAssessments);
    setProfessionalGoals(mockProfessionalGoals);
    setSelectedCertification(mockCertifications[0]);
    setSelectedCareerPath(mockCareerPaths[0]);
    setIsLoading(false);
  };

  const startCertification = (certificationId: string) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === certificationId 
        ? { ...cert, status: 'in-progress', progress: 10 }
        : cert
    ));
    toast.success('Certification started successfully');
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setProfessionalGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress }
        : goal
    ));
  };

  const scheduleMentorshipSession = (mentorshipId: string) => {
    const newSession: MentorshipSession = {
      id: `session-${Date.now()}`,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      duration: 60,
      topic: 'Career Development Discussion',
      notes: '',
      actionItems: []
    };

    setMentorships(prev => prev.map(mentorship => 
      mentorship.id === mentorshipId 
        ? { ...mentorship, sessions: [...mentorship.sessions, newSession] }
        : mentorship
    ));
    toast.success('Mentorship session scheduled');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-purple-600 bg-purple-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      case 'intermediate': return 'text-orange-600 bg-orange-100';
      case 'beginner': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">Loading Professional Growth Tools</h3>
          <p className="text-muted-foreground">Initializing career development features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Professional Growth Tools</h1>
              <p className="text-muted-foreground">Certification tracking, career development, and professional advancement</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Set Goal
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="career-paths">Career Paths</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{certifications.length}</div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{mentorships.length}</div>
                    <div className="text-sm text-muted-foreground">Mentorships</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{professionalGoals.length}</div>
                    <div className="text-sm text-muted-foreground">Active Goals</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{skillAssessments.length}</div>
                    <div className="text-sm text-muted-foreground">Skills Tracked</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.filter(cert => cert.status === 'completed').slice(0, 3).map((cert) => (
                      <div key={cert.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div className="flex-1">
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                        </div>
                        <Badge className={getLevelColor(cert.level)}>
                          {cert.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Career Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerPaths.map((path) => (
                      <div key={path.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{path.title}</span>
                          <Badge className={getLevelColor(path.level)}>
                            {path.level}
                          </Badge>
                        </div>
                        <Progress value={path.milestones.filter(m => m.status === 'completed').length / path.milestones.length * 100} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{path.milestones.filter(m => m.status === 'completed').length}/{path.milestones.length} milestones</span>
                          <span>${path.salary.min.toLocaleString()} - ${path.salary.max.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <Card 
                  key={certification.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCertification(certification)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{certification.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{certification.issuer}</p>
                      </div>
                      <Badge className={getStatusColor(certification.status)}>
                        {certification.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getLevelColor(certification.level)}>
                          {certification.level}
                        </Badge>
                        <Badge variant="outline">{certification.type}</Badge>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{certification.progress}%</span>
                        </div>
                        <Progress value={certification.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Cost: ${certification.examDetails.cost}</span>
                        <span>{certification.examDetails.duration} min</span>
                      </div>

                      <div className="flex space-x-2">
                        {certification.status === 'not-started' ? (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              startCertification(certification.id);
                            }}
                          >
                            Start
                          </Button>
                        ) : (
                          <Button size="sm" className="flex-1">
                            Continue
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="career-paths" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Career Development Paths</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Path
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careerPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge className={getLevelColor(path.level)}>
                        {path.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">{path.duration}</div>
                        </div>
                        <div>
                          <div className="font-medium">Salary Range</div>
                          <div className="text-muted-foreground">
                            ${path.salary.min.toLocaleString()} - ${path.salary.max.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Required Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {path.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{path.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Milestones</div>
                        <div className="space-y-2">
                          {path.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <div className="font-medium text-sm">{milestone.title}</div>
                                <div className="text-xs text-muted-foreground">{milestone.description}</div>
                              </div>
                              <Badge className={getStatusColor(milestone.status)}>
                                {milestone.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          Follow Path
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Mentorship Programs</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Find Mentor
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mentorships.map((mentorship) => (
                <Card key={mentorship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{mentorship.mentor.name.charAt(0)}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{mentorship.mentor.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{mentorship.mentor.expertise.join(', ')}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(mentorship.status)}>
                        {mentorship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Experience</div>
                          <div className="text-muted-foreground">{mentorship.mentor.experience} years</div>
                        </div>
                        <div>
                          <div className="font-medium">Rating</div>
                          <div className="text-muted-foreground">{mentorship.mentor.rating}/5.0</div>
                        </div>
                        <div>
                          <div className="font-medium">Rate</div>
                          <div className="text-muted-foreground">${mentorship.mentor.hourlyRate}/hr</div>
                        </div>
                        <div>
                          <div className="font-medium">Progress</div>
                          <div className="text-muted-foreground">{mentorship.progress}%</div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Goals</div>
                        <div className="space-y-1">
                          {mentorship.goals.map((goal, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Target className="h-4 w-4 text-blue-500" />
                              <span>{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Recent Sessions</div>
                        <div className="space-y-2">
                          {mentorship.sessions.slice(0, 2).map((session) => (
                            <div key={session.id} className="p-2 border rounded text-sm">
                              <div className="font-medium">{session.topic}</div>
                              <div className="text-muted-foreground">
                                {session.date.toLocaleDateString()} - {session.duration} min
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => scheduleMentorshipSession(mentorship.id)}
                        >
                          Schedule Session
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Skill Assessments</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Take Assessment
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skillAssessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{assessment.skill}</CardTitle>
                        <p className="text-sm text-muted-foreground">{assessment.category}</p>
                      </div>
                      <Badge className={getLevelColor(assessment.level)}>
                        {assessment.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Score</span>
                          <span>{assessment.score}/100</span>
                        </div>
                        <Progress value={assessment.score} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Improvement</div>
                          <div className="text-green-600">+{assessment.improvement}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Next Assessment</div>
                          <div className="text-muted-foreground">{assessment.nextAssessment.toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Recommended Resources</div>
                        <div className="space-y-1">
                          {assessment.resources.slice(0, 2).map((resource, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <BookOpen className="h-4 w-4 text-blue-500" />
                              <span>{resource}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          Retake Assessment
                        </Button>
                        <Button size="sm" variant="outline">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Professional Goals</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Set New Goal
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {professionalGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Target Date</div>
                          <div className="text-muted-foreground">{goal.targetDate.toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="font-medium">Category</div>
                          <div className="text-muted-foreground">{goal.category}</div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Milestones</div>
                        <div className="space-y-2">
                          {goal.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <div className="font-medium text-sm">{milestone.title}</div>
                                <div className="text-xs text-muted-foreground">{milestone.description}</div>
                              </div>
                              <Badge className={getStatusColor(milestone.status)}>
                                {milestone.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 10, 100))}
                        >
                          Update Progress
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 