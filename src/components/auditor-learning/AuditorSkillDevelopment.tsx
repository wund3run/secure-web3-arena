import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Target, 
  Users, 
  Brain,
  Clock,
  CheckCircle,
  Play,
  Star,
  Zap,
  GraduationCap,
  Trophy,
  Lightbulb,
  Code,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface Skill {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
  estimatedHours: number;
  completedHours: number;
  resources: LearningResource[];
}

interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'tutorial' | 'certification' | 'practice' | 'mentorship';
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  completed: boolean;
  url?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  duration: number; // in weeks
  skills: string[];
  progress: number;
  completed: boolean;
}

export function AuditorSkillDevelopment() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>([]);

  useEffect(() => {
    initializeSkillData();
    generateLearningPaths();
  }, []);

  const initializeSkillData = () => {
    const skills: Skill[] = [
      {
        id: '1',
        name: 'Smart Contract Security',
        category: 'Core Security',
        currentLevel: 3,
        targetLevel: 5,
        progress: 60,
        importance: 'critical',
        estimatedHours: 80,
        completedHours: 48,
        resources: [
          {
            id: 'r1',
            title: 'Advanced Solidity Security',
            type: 'course',
            duration: 20,
            difficulty: 'advanced',
            rating: 4.8,
            completed: false
          },
          {
            id: 'r2',
            title: 'DeFi Protocol Analysis',
            type: 'tutorial',
            duration: 15,
            difficulty: 'intermediate',
            rating: 4.6,
            completed: true
          }
        ]
      },
      {
        id: '2',
        name: 'AI-Assisted Auditing',
        category: 'Emerging Tech',
        currentLevel: 2,
        targetLevel: 4,
        progress: 40,
        importance: 'high',
        estimatedHours: 60,
        completedHours: 24,
        resources: [
          {
            id: 'r3',
            title: 'AI Tools for Security',
            type: 'course',
            duration: 25,
            difficulty: 'intermediate',
            rating: 4.7,
            completed: false
          }
        ]
      },
      {
        id: '3',
        name: 'Cross-Chain Security',
        category: 'Specialized',
        currentLevel: 1,
        targetLevel: 3,
        progress: 25,
        importance: 'medium',
        estimatedHours: 40,
        completedHours: 10,
        resources: []
      }
    ];
    setCurrentSkills(skills);
  };

  const generateLearningPaths = () => {
    const paths: LearningPath[] = [
      {
        id: 'lp1',
        title: 'Senior Security Auditor',
        description: 'Advanced path for experienced auditors to reach senior level',
        targetRole: 'Senior Auditor',
        duration: 12,
        skills: ['Smart Contract Security', 'AI-Assisted Auditing', 'Cross-Chain Security'],
        progress: 45,
        completed: false
      },
      {
        id: 'lp2',
        title: 'DeFi Security Specialist',
        description: 'Specialized path for DeFi protocol security experts',
        targetRole: 'DeFi Specialist',
        duration: 8,
        skills: ['Smart Contract Security', 'DeFi Protocols', 'Yield Farming Security'],
        progress: 70,
        completed: false
      }
    ];
    setLearningPaths(paths);
  };

  const startLearning = (resourceId: string) => {
    toast.success('Starting learning session...');
    // Navigate to learning resource
  };

  const completeSkill = (skillId: string) => {
    setCurrentSkills(prev => 
      prev.map(skill => 
        skill.id === skillId 
          ? { ...skill, currentLevel: skill.targetLevel, progress: 100 }
          : skill
      )
    );
    toast.success('Skill completed!');
  };

  const getSkillImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skill Development Center</h1>
          <p className="text-muted-foreground">
            Personalized learning paths to advance your security auditing career
          </p>
        </div>
        <Button>
          <Brain className="h-4 w-4 mr-2" />
          AI Learning Assistant
        </Button>
      </div>

      {/* AI-Powered Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-sm">Next Priority</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Focus on AI-Assisted Auditing to increase efficiency by 35%
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-sm">Market Demand</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Cross-chain security skills in high demand (+40% projects)
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <h4 className="font-medium text-sm">Quick Win</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Complete DeFi Protocol Analysis to unlock 15 new projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">68%</div>
                  <p className="text-sm text-muted-foreground">Career Advancement</p>
                  <Progress value={68} className="mt-4" />
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Skills Mastered</span>
                    <span>12/18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certifications</span>
                    <span>5/8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Hours</span>
                    <span>142/200</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Current Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">AI-Assisted Auditing</h4>
                      <p className="text-xs text-muted-foreground">Advanced Course</p>
                    </div>
                    <Badge variant="secondary">40%</Badge>
                  </div>
                  <Progress value={40} className="h-2" />
                  <Button size="sm" className="w-full">
                    <Play className="h-3 w-3 mr-2" />
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">DeFi Security Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Top 10% Auditor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">50 Audits Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentSkills.map((skill) => (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    <Badge className={getSkillImportanceColor(skill.importance)}>
                      {skill.importance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Level: </span>
                        <span>{skill.currentLevel}/{skill.targetLevel}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hours: </span>
                        <span>{skill.completedHours}/{skill.estimatedHours}h</span>
                      </div>
                    </div>

                    {skill.resources.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Learning Resources</h4>
                        <div className="space-y-2">
                          {skill.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div className="flex-1">
                                <h5 className="text-sm font-medium">{resource.title}</h5>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className={getDifficultyColor(resource.difficulty)}>
                                    {resource.difficulty}
                                  </span>
                                  <span>•</span>
                                  <span>{resource.duration}h</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span>{resource.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={resource.completed ? "outline" : "default"}
                                onClick={() => startLearning(resource.id)}
                              >
                                {resource.completed ? <CheckCircle className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <BookOpen className="h-3 w-3 mr-2" />
                        Start Learning
                      </Button>
                      {skill.progress >= 100 && (
                        <Button size="sm" variant="outline" onClick={() => completeSkill(skill.id)}>
                          <Award className="h-3 w-3 mr-2" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge variant={path.completed ? "default" : "secondary"}>
                      {path.completed ? "Completed" : `${path.progress}%`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Target Role: </span>
                        <span>{path.targetRole}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span>{path.duration} weeks</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" disabled={path.completed}>
                      {path.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Path
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Course Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Course Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Structured learning courses for skill development
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Skill Assessments
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Certifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Practice Labs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Practice Labs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Hands-on practice with real-world scenarios
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Smart Contract Labs
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Challenges
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Penetration Testing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mentorship */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mentorship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with experienced auditors for guidance
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Find Mentor
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Peer Learning
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}