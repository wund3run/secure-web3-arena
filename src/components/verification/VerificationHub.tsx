
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Github, 
  Award, 
  Upload, 
  CheckCircle, 
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { GitHubVerification } from './GitHubVerification';
import { SkillsAssessment, AssessmentResult } from './SkillsAssessment';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface VerificationHubProps {
  userId: string;
}

export function VerificationHub({ userId }: VerificationHubProps) {
  const { userProfile } = useAuth();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [completedVerifications, setCompletedVerifications] = useState<any[]>([]);
  const [completedAssessments, setCompletedAssessments] = useState<AssessmentResult[]>([]);

  const skillCategories = [
    'Smart Contract Security',
    'DeFi Security', 
    'Web3 Penetration Testing',
    'Blockchain Forensics',
    'Cryptography',
    'Consensus Mechanisms'
  ];

  const handleGitHubVerification = (data: any) => {
    setCompletedVerifications(prev => [...prev, { type: 'github', ...data }]);
    toast.success('GitHub verification completed!');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setCompletedAssessments(prev => [...prev, result]);
    setActiveAssessment(null);
    toast.success(`${result.category} assessment completed! Score: ${result.score}%`);
  };

  const getVerificationProgress = () => {
    const totalSteps = 4; // GitHub, Skills, Certifications, Portfolio
    let completed = 0;
    
    if (completedVerifications.some(v => v.type === 'github')) completed++;
    if (completedAssessments.length > 0) completed++;
    // Add other verification checks here
    
    return Math.round((completed / totalSteps) * 100);
  };

  const getTrustScore = () => {
    let score = 0;
    
    // Base score for profile completion
    if (userProfile?.full_name) score += 10;
    if (userProfile?.bio) score += 10;
    
    // GitHub verification
    if (completedVerifications.some(v => v.type === 'github')) score += 30;
    
    // Skills assessments
    const avgAssessmentScore = completedAssessments.length > 0 
      ? completedAssessments.reduce((sum, a) => sum + a.score, 0) / completedAssessments.length
      : 0;
    score += Math.round(avgAssessmentScore * 0.4);
    
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      {/* Trust Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Trust & Verification Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{getTrustScore()}</div>
              <div className="text-sm text-muted-foreground">Trust Score</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= getTrustScore() / 20
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{getVerificationProgress()}%</div>
              <div className="text-sm text-muted-foreground">Verification Complete</div>
              <Badge variant="outline" className="mt-1">
                {Math.round(getVerificationProgress() / 25)} of 4 steps
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{completedAssessments.length}</div>
              <div className="text-sm text-muted-foreground">Skills Verified</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-xs">Assessments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Tabs */}
      <Tabs defaultValue="github" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Certificates
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="github">
          <GitHubVerification 
            userId={userId}
            onVerificationComplete={handleGitHubVerification}
          />
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-6">
            {activeAssessment ? (
              <SkillsAssessment
                skillCategory={activeAssessment}
                onAssessmentComplete={handleAssessmentComplete}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Verify your expertise by taking skill assessments in various security domains.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillCategories.map((category) => {
                      const completed = completedAssessments.find(a => a.category === category);
                      return (
                        <div key={category} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{category}</h4>
                            {completed ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {completed.score}%
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                Not taken
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant={completed ? "outline" : "default"}
                            size="sm"
                            onClick={() => setActiveAssessment(category)}
                            className="w-full"
                          >
                            {completed ? 'Retake Assessment' : 'Take Assessment'}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>Professional Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Upload Your Certifications</h3>
                <p className="text-muted-foreground mb-4">
                  Add your professional security certifications to boost your credibility
                </p>
                <Button>Upload Certificates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Showcase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Showcase Your Work</h3>
                <p className="text-muted-foreground mb-4">
                  Display your past audit reports and security findings (anonymized)
                </p>
                <Button>Add Portfolio Items</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
