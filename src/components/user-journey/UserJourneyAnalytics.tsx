
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  ArrowRight,
  Star,
  MessageSquare
} from 'lucide-react';

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  completionRate: number;
  averageTime: string;
  commonIssues: string[];
  improvements: string[];
}

interface UserJourneyData {
  auditor: JourneyStage[];
  projectOwner: JourneyStage[];
}

export function UserJourneyAnalytics() {
  const [journeyData, setJourneyData] = useState<UserJourneyData>({
    auditor: [
      {
        id: 'discovery',
        name: 'Platform Discovery',
        description: 'User discovers Hawkly through marketing or referrals',
        completionRate: 85,
        averageTime: '2-5 minutes',
        commonIssues: ['Unclear value proposition', 'Complex navigation'],
        improvements: ['Simplified landing page', 'Clear CTAs']
      },
      {
        id: 'registration',
        name: 'Account Registration',
        description: 'Creates account and completes basic profile',
        completionRate: 92,
        averageTime: '5-10 minutes',
        commonIssues: ['Email verification delays', 'Form complexity'],
        improvements: ['Streamlined forms', 'Social login options']
      },
      {
        id: 'profile-setup',
        name: 'Professional Profile Setup',
        description: 'Completes detailed auditor profile with skills and experience',
        completionRate: 78,
        averageTime: '15-30 minutes',
        commonIssues: ['Too many required fields', 'Unclear skill categories'],
        improvements: ['Progressive disclosure', 'Smart suggestions']
      },
      {
        id: 'verification',
        name: 'Verification Process',
        description: 'Submits documents and undergoes platform verification',
        completionRate: 89,
        averageTime: '2-5 days',
        commonIssues: ['Document upload issues', 'Verification delays'],
        improvements: ['Better file handling', 'Status transparency']
      },
      {
        id: 'first-project',
        name: 'First Project Engagement',
        description: 'Receives and responds to first project opportunity',
        completionRate: 73,
        averageTime: '1-3 days',
        commonIssues: ['Project details unclear', 'Communication barriers'],
        improvements: ['Enhanced project briefs', 'Chat integration']
      },
      {
        id: 'project-execution',
        name: 'Project Execution',
        description: 'Completes audit work and deliverables',
        completionRate: 95,
        averageTime: '7-21 days',
        commonIssues: ['Scope creep', 'Timeline pressure'],
        improvements: ['Better milestone tracking', 'Scope management tools']
      }
    ],
    projectOwner: [
      {
        id: 'discovery',
        name: 'Platform Discovery',
        description: 'Discovers Hawkly for security audit needs',
        completionRate: 88,
        averageTime: '3-7 minutes',
        commonIssues: ['Trust concerns', 'Pricing transparency'],
        improvements: ['Testimonials', 'Clear pricing']
      },
      {
        id: 'registration',
        name: 'Account Creation',
        description: 'Signs up and provides basic project information',
        completionRate: 94,
        averageTime: '3-8 minutes',
        commonIssues: ['Technical jargon', 'Complex onboarding'],
        improvements: ['Simplified language', 'Guided setup']
      },
      {
        id: 'project-submission',
        name: 'Project Submission',
        description: 'Submits detailed project requirements for audit',
        completionRate: 81,
        averageTime: '10-20 minutes',
        commonIssues: ['Unclear requirements', 'Technical complexity'],
        improvements: ['Smart form assistance', 'Examples provided']
      },
      {
        id: 'auditor-matching',
        name: 'Auditor Matching',
        description: 'Reviews and selects from matched auditors',
        completionRate: 87,
        averageTime: '2-4 hours',
        commonIssues: ['Limited auditor info', 'Comparison difficulty'],
        improvements: ['Enhanced profiles', 'Comparison tools']
      },
      {
        id: 'project-initiation',
        name: 'Project Initiation',
        description: 'Finalizes agreement and starts audit process',
        completionRate: 91,
        averageTime: '1-2 days',
        commonIssues: ['Contract complexity', 'Payment setup'],
        improvements: ['Simplified contracts', 'Streamlined payments']
      },
      {
        id: 'audit-completion',
        name: 'Audit Completion',
        description: 'Reviews deliverables and provides feedback',
        completionRate: 93,
        averageTime: '2-3 days',
        commonIssues: ['Report complexity', 'Follow-up questions'],
        improvements: ['Executive summaries', 'Q&A sessions']
      }
    ]
  });

  const [selectedUserType, setSelectedUserType] = useState<'auditor' | 'projectOwner'>('auditor');

  const calculateOverallSuccess = (stages: JourneyStage[]) => {
    return stages.reduce((acc, stage) => acc + stage.completionRate, 0) / stages.length;
  };

  const getStageColor = (completionRate: number) => {
    if (completionRate >= 90) return 'bg-green-500';
    if (completionRate >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Journey Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of user paths through the Hawkly platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedUserType === 'auditor' ? 'default' : 'outline'}
            onClick={() => setSelectedUserType('auditor')}
          >
            Auditor Journey
          </Button>
          <Button
            variant={selectedUserType === 'projectOwner' ? 'default' : 'outline'}
            onClick={() => setSelectedUserType('projectOwner')}
          >
            Project Owner Journey
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Success Rate</p>
                <p className="text-2xl font-bold">
                  {calculateOverallSuccess(journeyData[selectedUserType]).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Completion Time</p>
                <p className="text-2xl font-bold">
                  {selectedUserType === 'auditor' ? '3-7 days' : '2-5 days'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">
                  {selectedUserType === 'auditor' ? '73%' : '81%'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction Score</p>
                <p className="text-2xl font-bold">4.6/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Stages */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedUserType === 'auditor' ? 'Auditor' : 'Project Owner'} Journey Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {journeyData[selectedUserType].map((stage, index) => (
              <div key={stage.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${getStageColor(stage.completionRate)}`} />
                  {index < journeyData[selectedUserType].length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{stage.name}</h3>
                    <Badge variant="outline">{stage.completionRate}% completion</Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{stage.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Average Time</h4>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{stage.averageTime}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Common Issues</h4>
                      <div className="space-y-1">
                        {stage.commonIssues.map((issue, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-muted-foreground">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Improvements</h4>
                      <div className="space-y-1">
                        {stage.improvements.map((improvement, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={stage.completionRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">High Priority</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Improve first project engagement (73%)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Simplify profile setup process (78%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Medium Priority</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Enhance auditor matching process</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Improve project submission flow</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
