import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  Brain, 
  Users, 
  MessageSquare, 
  Search, 
  Filter, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Sparkles,
  Book,
  FileText,
  Code,
  Shield,
  AlertTriangle,
  Zap,
  ArrowRight,
  ArrowLeft,
  Plus,
  Edit3,
  Share2,
  Bookmark,
  Download,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Trophy,
  Medal,
  Crown,
  GraduationCap,
  School,
  Library,
  Database,
  Network,
  Globe,
  MapPin,
  Calendar,
  Timer,
  History,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Hash,
  DollarSign,
  Percent
} from 'lucide-react';
import { toast } from 'sonner';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // in hours
  modules: LearningModule[];
  progress: number;
  isEnrolled: boolean;
  category: string;
  tags: string[];
  instructor: string;
  rating: number;
  enrolledCount: number;
  lastUpdated: Date;
  featured?: boolean;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'project' | 'reading';
  duration: number; // in minutes
  isCompleted: boolean;
  isLocked: boolean;
  content: string;
  resources: string[];
  quiz?: Quiz;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface VulnerabilityEntry {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  codeExample: string;
  fixExample: string;
  realWorldCases: string[];
  tags: string[];
  upvotes: number;
  downvotes: number;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

interface KnowledgeShare {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'question' | 'answer' | 'tutorial' | 'case-study';
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  createdAt: Date;
  isResolved: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  upvotes: number;
  createdAt: Date;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completedPaths: string[];
  currentPath?: string;
  certifications: string[];
  points: number;
  rank: string;
  badges: string[];
  joinDate: Date;
}

export function SmartLearningPlatform() {
  const [activeTab, setActiveTab] = useState('learning-paths');
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<VulnerabilityEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityEntry[]>([]);
  const [knowledgeShares, setKnowledgeShares] = useState<KnowledgeShare[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializePlatform();
  }, []);

  const initializePlatform = () => {
    // Mock user profile
    const mockUser: UserProfile = {
      id: 'user-001',
      name: 'Alice Smith',
      email: 'alice@example.com',
      skillLevel: 'intermediate',
      completedPaths: ['path-001'],
      currentPath: 'path-002',
      certifications: ['Web3 Security Fundamentals', 'Smart Contract Auditing'],
      points: 2847,
      rank: 'Security Expert',
      badges: ['First Audit', 'Quick Learner', 'Community Helper'],
      joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    };

    // Mock learning paths
    const mockPaths: LearningPath[] = [
      {
        id: 'path-001',
        title: 'Web3 Security Fundamentals',
        description: 'Master the basics of blockchain security and smart contract vulnerabilities',
        difficulty: 'beginner',
        duration: 20,
        progress: 100,
        isEnrolled: true,
        category: 'fundamentals',
        tags: ['blockchain', 'smart-contracts', 'security-basics'],
        instructor: 'Dr. Sarah Chen',
        rating: 4.8,
        enrolledCount: 1247,
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        modules: [
          {
            id: 'mod-001',
            title: 'Introduction to Blockchain Security',
            description: 'Understanding the security landscape of blockchain technology',
            type: 'video',
            duration: 45,
            isCompleted: true,
            isLocked: false,
            content: 'video-url',
            resources: ['blockchain-security-guide.pdf', 'security-checklist.md']
          },
          {
            id: 'mod-002',
            title: 'Smart Contract Vulnerabilities',
            description: 'Common vulnerabilities in smart contracts and how to identify them',
            type: 'interactive',
            duration: 60,
            isCompleted: true,
            isLocked: false,
            content: 'interactive-lab',
            resources: ['vulnerability-examples.sol', 'detection-tools.md']
          }
        ]
      },
      {
        id: 'path-002',
        title: 'Advanced Smart Contract Auditing',
        description: 'Deep dive into advanced auditing techniques and tools',
        difficulty: 'advanced',
        duration: 35,
        progress: 65,
        isEnrolled: true,
        category: 'auditing',
        tags: ['auditing', 'advanced', 'tools'],
        instructor: 'Prof. Michael Rodriguez',
        rating: 4.9,
        enrolledCount: 892,
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        featured: true,
        modules: [
          {
            id: 'mod-003',
            title: 'Static Analysis with Slither',
            description: 'Using Slither for automated vulnerability detection',
            type: 'project',
            duration: 90,
            isCompleted: true,
            isLocked: false,
            content: 'project-instructions',
            resources: ['slither-config.yaml', 'sample-contracts/']
          },
          {
            id: 'mod-004',
            title: 'Dynamic Analysis with Mythril',
            description: 'Symbolic execution and dynamic analysis techniques',
            type: 'interactive',
            duration: 75,
            isCompleted: false,
            isLocked: false,
            content: 'mythril-lab',
            resources: ['mythril-examples/', 'analysis-report-template.md']
          }
        ]
      }
    ];

    // Mock vulnerabilities
    const mockVulnerabilities: VulnerabilityEntry[] = [
      {
        id: 'vuln-001',
        title: 'Reentrancy Attack',
        description: 'A vulnerability where external calls can re-enter the contract before state changes',
        severity: 'critical',
        category: 'reentrancy',
        codeExample: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    balances[msg.sender] -= amount; // State change after external call
}`,
        fixExample: `function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount; // State change first
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}`,
        realWorldCases: ['The DAO Hack (2016)', 'bZx Protocol Exploit (2020)'],
        tags: ['reentrancy', 'critical', 'state-management'],
        upvotes: 156,
        downvotes: 3,
        author: 'Dr. Sarah Chen',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    ];

    // Mock knowledge shares
    const mockKnowledgeShares: KnowledgeShare[] = [
      {
        id: 'ks-001',
        title: 'Best practices for DeFi protocol security',
        content: 'I\'ve been auditing DeFi protocols for 2 years and here are the key security practices...',
        author: 'Bob Johnson',
        type: 'tutorial',
        tags: ['defi', 'security', 'best-practices'],
        upvotes: 89,
        downvotes: 2,
        comments: [
          {
            id: 'comment-001',
            author: 'Carol Davis',
            content: 'Great insights! I would also add circuit breakers as a critical component.',
            upvotes: 12,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          }
        ],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isResolved: true
      }
    ];

    setUserProfile(mockUser);
    setLearningPaths(mockPaths);
    setVulnerabilities(mockVulnerabilities);
    setKnowledgeShares(mockKnowledgeShares);
    setIsLoading(false);
  };

  const enrollInPath = (pathId: string) => {
    setLearningPaths(prev => 
      prev.map(path => 
        path.id === pathId 
          ? { ...path, isEnrolled: true, progress: 0 }
          : path
      )
    );
    toast.success('Successfully enrolled in learning path!');
  };

  const completeModule = (pathId: string, moduleId: string) => {
    setLearningPaths(prev => 
      prev.map(path => 
        path.id === pathId 
          ? {
              ...path,
              modules: path.modules.map(module =>
                module.id === moduleId
                  ? { ...module, isCompleted: true }
                  : module
              ),
              progress: calculatePathProgress(path.modules.map(module =>
                module.id === moduleId
                  ? { ...module, isCompleted: true }
                  : module
              ))
            }
          : path
      )
    );
    toast.success('Module completed!');
  };

  const calculatePathProgress = (modules: LearningModule[]) => {
    const completed = modules.filter(m => m.isCompleted).length;
    return Math.round((completed / modules.length) * 100);
  };

  const upvoteVulnerability = (vulnId: string) => {
    setVulnerabilities(prev =>
      prev.map(vuln =>
        vuln.id === vulnId
          ? { ...vuln, upvotes: vuln.upvotes + 1 }
          : vuln
      )
    );
  };

  const addKnowledgeShare = (title: string, content: string, type: KnowledgeShare['type']) => {
    const newShare: KnowledgeShare = {
      id: `ks-${Date.now()}`,
      title,
      content,
      author: userProfile?.name || 'Anonymous',
      type,
      tags: [],
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date(),
      isResolved: false
    };
    setKnowledgeShares(prev => [newShare, ...prev]);
    toast.success('Knowledge shared successfully!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-blue-600 bg-blue-100';
      case 'advanced': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'info': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">Loading Learning Platform</h3>
          <p className="text-muted-foreground">Preparing your personalized experience...</p>
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
              <h1 className="text-3xl font-bold">Smart Learning Platform</h1>
              <p className="text-muted-foreground">Personalized learning paths for Web3 security experts</p>
            </div>
            {userProfile && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{userProfile.name}</p>
                  <p className="text-sm text-muted-foreground">{userProfile.rank}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{userProfile.points} pts</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learning-paths" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning Paths</span>
            </TabsTrigger>
            <TabsTrigger value="vulnerability-db" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Vulnerability DB</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge-sharing" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Knowledge Sharing</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>My Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning-paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="relative">
                  {path.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {path.duration}h
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{path.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Instructor: {path.instructor}</span>
                        <span>{path.enrolledCount} enrolled</span>
                      </div>

                      <div className="flex space-x-2">
                        {path.isEnrolled ? (
                          <Button 
                            className="flex-1"
                            onClick={() => setSelectedPath(path)}
                          >
                            Continue Learning
                          </Button>
                        ) : (
                          <Button 
                            className="flex-1"
                            onClick={() => enrollInPath(path.id)}
                          >
                            Enroll Now
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vulnerability-db" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search vulnerabilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <Card 
                    key={vuln.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedVulnerability(vuln)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{vuln.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{vuln.description}</p>
                        </div>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{vuln.category}</Badge>
                          <span className="text-sm text-muted-foreground">by {vuln.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              upvoteVulnerability(vuln.id);
                            }}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {vuln.upvotes}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedVulnerability && (
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle>Vulnerability Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Vulnerable Code</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {selectedVulnerability.codeExample}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Secure Implementation</h4>
                      <pre className="bg-green-50 p-3 rounded text-sm overflow-x-auto border border-green-200">
                        {selectedVulnerability.fixExample}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Real-World Cases</h4>
                      <ul className="space-y-1">
                        {selectedVulnerability.realWorldCases.map((case_, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {case_}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Examples
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="knowledge-sharing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Community Knowledge</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Share Knowledge
              </Button>
            </div>

            <div className="space-y-4">
              {knowledgeShares.map((share) => (
                <Card key={share.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{share.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{share.type}</Badge>
                          <span className="text-sm text-muted-foreground">by {share.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {share.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {share.upvotes}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {share.comments.length}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{share.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {share.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {userProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userProfile.points}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userProfile.certifications.length}</div>
                      <div className="text-sm text-muted-foreground">Certifications</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Target className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userProfile.completedPaths.length}</div>
                      <div className="text-sm text-muted-foreground">Completed Paths</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Crown className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                      <div className="text-lg font-bold">{userProfile.rank}</div>
                      <div className="text-sm text-muted-foreground">Current Rank</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfile?.badges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Medal className="h-6 w-6 text-yellow-500" />
                        <div>
                          <div className="font-medium">{badge}</div>
                          <div className="text-sm text-muted-foreground">Achievement unlocked</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Progress</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly Goal</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-muted-foreground">Hours This Week</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-sm text-muted-foreground">Modules Completed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 