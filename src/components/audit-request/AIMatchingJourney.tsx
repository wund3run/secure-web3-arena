
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, CheckCircle, Clock, Users, Zap, ArrowRight } from 'lucide-react';
import type { AuditFormData } from '@/types/audit-request.types';

interface AIMatchingJourneyProps {
  formData: AuditFormData;
  onProceed: () => void;
}

const matchingSteps = [
  { 
    title: 'Analyzing Requirements', 
    description: 'Processing your project specifications and requirements',
    duration: 2000,
    icon: <Bot className="h-5 w-5" />
  },
  { 
    title: 'Finding Experts', 
    description: 'Searching our network of verified security auditors',
    duration: 3000,
    icon: <Users className="h-5 w-5" />
  },
  { 
    title: 'Matching Profiles', 
    description: 'Calculating compatibility scores based on expertise',
    duration: 2500,
    icon: <Zap className="h-5 w-5" />
  },
  { 
    title: 'Ranking Results', 
    description: 'Prioritizing auditors by fit and availability',
    duration: 1500,
    icon: <CheckCircle className="h-5 w-5" />
  }
];

const AIMatchingJourney: React.FC<AIMatchingJourneyProps> = ({ formData, onProceed }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < matchingSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(((currentStep + 1) / matchingSteps.length) * 100);
      }, matchingSteps[currentStep]?.duration || 2000);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentStep]);

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Matching in Progress</h2>
        <p className="text-muted-foreground">
          Our advanced AI is analyzing your project to find the perfect auditing team
        </p>
      </div>

      {/* Progress Animation */}
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              <Bot className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">Analyzing Your Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="space-y-3">
            {matchingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  index < currentStep ? 'text-green-600' : 
                  index === currentStep ? 'text-primary' : 
                  'text-muted-foreground'
                }`}
              >
                <div className={`flex-shrink-0 ${
                  index < currentStep ? 'text-green-600' : 
                  index === currentStep ? 'text-primary animate-pulse' : 
                  'text-muted-foreground'
                }`}>
                  {index < currentStep ? <CheckCircle className="h-5 w-5" /> : step.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm opacity-70">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Summary */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Project Summary</CardTitle>
          <CardDescription>What we're matching based on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground">Blockchain</div>
              <Badge variant="secondary">{formData.blockchain}</Badge>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Scope</div>
              <div>{formData.auditScope}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Timeline</div>
              <div>{formData.deadline}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Budget</div>
              <div>{formData.budget}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Preview */}
      {isComplete && (
        <Card className="max-w-lg mx-auto border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Matching Complete!</CardTitle>
            <CardDescription className="text-green-700">
              Found 8 qualified auditors perfect for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Perfect Matches</span>
                <Badge variant="default">3 auditors</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Good Matches</span>
                <Badge variant="secondary">5 auditors</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg. Response Time</span>
                <span className="text-sm">4 hours</span>
              </div>
            </div>
            
            <Button onClick={onProceed} className="w-full" size="lg">
              View Matching Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Real-time availability checking</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>Skills and expertise matching</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Reputation-based ranking</span>
        </div>
      </div>
    </div>
  );
};

export default AIMatchingJourney;
