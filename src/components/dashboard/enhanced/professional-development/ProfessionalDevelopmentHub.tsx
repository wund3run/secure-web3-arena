
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen, 
  Target, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  trending: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: 'earned' | 'in-progress' | 'available';
  validUntil?: string;
  creditsRequired?: number;
  currentCredits?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: number;
  completed: number;
  skills: string[];
}

const mockSkills: Skill[] = [
  { name: 'Solidity', level: 85, category: 'Programming', trending: false },
  { name: 'DeFi Protocols', level: 92, category: 'Domain', trending: true },
  { name: 'Smart Contract Security', level: 88, category: 'Security', trending: false },
  { name: 'Layer 2 Solutions', level: 65, category: 'Infrastructure', trending: true },
  { name: 'Cross-Chain Security', level: 45, category: 'Security', trending: true },
  { name: 'Gas Optimization', level: 78, category: 'Optimization', trending: false }
];

const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Certified Blockchain Security Professional',
    issuer: 'EC-Council',
    status: 'earned',
    validUntil: '2025-12-31'
  },
  {
    id: '2',
    name: 'ConsenSys Smart Contract Security',
    issuer: 'ConsenSys Academy',
    status: 'in-progress',
    creditsRequired: 40,
    currentCredits: 25
  },
  {
    id: '3',
    name: 'Ethereum Foundation Developer',
    issuer: 'Ethereum Foundation',
    status: 'available'
  }
];

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Advanced DeFi Security Patterns',
    description: 'Master complex DeFi security vulnerabilities and prevention techniques',
    duration: '6 weeks',
    difficulty: 'advanced',
    modules: 8,
    completed: 3,
    skills: ['DeFi', 'Flash Loans', 'MEV', 'Arbitrage']
  },
  {
    id: '2',
    title: 'Cross-Chain Bridge Security',
    description: 'Learn to audit cross-chain protocols and bridge implementations',
    duration: '4 weeks',
    difficulty: 'intermediate',
    modules: 6,
    completed: 0,
    skills: ['Cross-Chain', 'Bridge', 'Consensus', 'Validators']
  },
  {
    id: '3',
    title: 'Layer 2 Scaling Solutions',
    description: 'Understand L2 security models and audit considerations',
    duration: '5 weeks',
    difficulty: 'intermediate',
    modules: 7,
    completed: 1,
    skills: ['L2', 'Rollups', 'State Channels', 'Sidechains']
  }
];

export function ProfessionalDevelopmentHub() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'advanced': return 'destructive';
      case 'intermediate': return 'secondary';
      case 'beginner': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Professional Development
          </h2>
          <p className="text-muted-foreground">Enhance your skills and advance your security expertise</p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Browse All Courses
        </Button>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skill Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        {skill.trending && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <span className={`font-bold ${getSkillColor(skill.level)}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <div className="text-xs text-muted-foreground">{skill.category}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Assessments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">DeFi Security Assessment</div>
                    <div className="text-sm text-muted-foreground">Quarterly review</div>
                  </div>
                  <Badge variant="outline">In 5 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Smart Contract Audit Skills</div>
                    <div className="text-sm text-muted-foreground">Annual certification</div>
                  </div>
                  <Badge variant="outline">In 2 weeks</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  Schedule Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCertifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Award className="h-5 w-5 text-primary" />
                    <Badge variant={
                      cert.status === 'earned' ? 'default' : 
                      cert.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {cert.status === 'earned' ? 'Earned' : 
                       cert.status === 'in-progress' ? 'In Progress' : 'Available'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </CardHeader>
                <CardContent>
                  {cert.status === 'earned' && cert.validUntil && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Valid until: </span>
                      <span className="font-medium">{cert.validUntil}</span>
                    </div>
                  )}
                  {cert.status === 'in-progress' && cert.creditsRequired && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{cert.currentCredits}/{cert.creditsRequired} credits</span>
                      </div>
                      <Progress value={(cert.currentCredits! / cert.creditsRequired) * 100} />
                    </div>
                  )}
                  <Button className="w-full mt-4" size="sm">
                    {cert.status === 'earned' ? 'View Certificate' : 
                     cert.status === 'in-progress' ? 'Continue' : 'Start Certification'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockLearningPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={getDifficultyColor(path.difficulty) as any}>
                      {path.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </div>
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{path.completed}/{path.modules} modules</span>
                    </div>
                    <Progress value={(path.completed / path.modules) * 100} />
                  </div>

                  <Button className="w-full">
                    {path.completed > 0 ? 'Continue Learning' : 'Start Path'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Find a Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect with experienced security auditors to accelerate your growth
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">Senior DeFi Security Expert</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>4.9 rating • 50+ mentees</span>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Alex Rodriguez</div>
                      <div className="text-sm text-muted-foreground">Cross-Chain Security Specialist</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>4.8 rating • 35+ mentees</span>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Become a Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share your expertise and help the next generation of security auditors
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>5+ years experience required</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>50+ completed audits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>4.5+ platform rating</span>
                  </div>
                </div>
                <Button className="w-full">Apply to Mentor</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
