
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  FileCheck, 
  Users, 
  Clock, 
  Wallet, 
  AlertTriangle, 
  BadgeCheck
} from "lucide-react";

interface TutorialStepProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  completed?: boolean;
}

const TutorialStep = ({ title, description, icon, completed = false }: TutorialStepProps) => {
  return (
    <div className={`p-4 border rounded-lg mb-4 ${completed ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
      <div className="flex items-start">
        <div className={`mr-4 rounded-full p-2 ${completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1 flex items-center">
            {title}
            {completed && <CheckCircle className="ml-2 h-4 w-4 text-primary" />}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
};

interface BuyerTutorialProps {
  onComplete: () => void;
  onClose: () => void;
}

export function BuyerTutorial({ onComplete, onClose }: BuyerTutorialProps) {
  const [activeTab, setActiveTab] = useState("choose-auditor");
  const [progress, setProgress] = useState({
    "choose-auditor": 0,
    "prepare-audit": 0,
    "review-report": 0
  });
  
  const incrementProgress = (tab: string) => {
    if (progress[tab as keyof typeof progress] < 100) {
      setProgress(prev => ({
        ...prev,
        [tab]: Math.min(prev[tab as keyof typeof progress] + 25, 100)
      }));
    }
  };
  
  const allCompleted = Object.values(progress).every(p => p === 100);
  
  // Security criteria for selecting an auditor
  const securityCriteria = [
    {
      title: "Verification Status",
      description: (
        <div>
          <p>Look for auditors with verified badges that indicate they've undergone Hawkly's verification process.</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-primary" /> 
            <span className="text-xs font-medium">Verified</span>
            <BadgeCheck className="h-4 w-4 text-secondary ml-4" /> 
            <span className="text-xs font-medium">Expert</span>
          </div>
        </div>
      ),
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Past Experience",
      description: (
        <div>
          <p>Review the auditor's history with similar projects and technologies. Look for experience with your specific blockchain platform and smart contract language.</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full">Solidity</span>
            <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">DeFi</span>
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full">NFT Projects</span>
          </div>
        </div>
      ),
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      title: "Reviews & Ratings",
      description: "Check testimonials from previous clients and the auditor's overall rating. Pay attention to detailed reviews that explain the audit process and outcomes.",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Response Time",
      description: "Consider how quickly the auditor responds to inquiries. Fast communication is crucial, especially when dealing with critical security vulnerabilities.",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Transparent Pricing",
      description: "Look for clear pricing structures. Be wary of quotes that seem too low, as quality security audits require time and expertise.",
      icon: <Wallet className="h-5 w-5" />
    }
  ];
  
  // Steps to prepare for an audit
  const preparationSteps = [
    {
      title: "Document Your Project",
      description: "Create comprehensive documentation including the purpose of your smart contracts, expected user interactions, and potential risk areas.",
      icon: <Book className="h-5 w-5" />
    },
    {
      title: "Define Scope",
      description: "Clearly outline which contracts, functions, and systems should be included in the audit. Be specific about areas of concern.",
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      title: "Clean Your Code",
      description: "Remove unnecessary comments, unused functions, and ensure your code follows best practices before submission.",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      title: "Provide Test Suite",
      description: "Include comprehensive tests that cover various scenarios and edge cases to help auditors understand expected behavior.",
      icon: <FileCheck className="h-5 w-5" />
    }
  ];
  
  // Guidance on reviewing audit reports
  const reviewGuidance = [
    {
      title: "Understand Severity Levels",
      description: (
        <div>
          <p>Learn how vulnerabilities are categorized by severity:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium">Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <span className="text-xs font-medium">High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <span className="text-xs font-medium">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-400"></div>
              <span className="text-xs font-medium">Low</span>
            </div>
          </div>
        </div>
      ),
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      title: "Prioritize Issues",
      description: "Focus on critical and high severity issues first. These pose the greatest risk to your project and users.",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      title: "Understand Root Causes",
      description: "Don't just fix the symptoms. Make sure you understand the underlying issues to prevent similar problems in the future.",
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      title: "Verify Fixes",
      description: "After implementing fixes, request a verification review to ensure that all issues have been properly resolved.",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Book className="h-5 w-5 mr-2 text-primary" />
          Smart Contract Audit Guide
        </CardTitle>
      </CardHeader>
      
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          // Increment progress when user changes tabs
          incrementProgress(value);
        }}
      >
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="choose-auditor" className="text-xs sm:text-sm">
              <Shield className="h-4 w-4 mr-1 hidden sm:inline" />
              Choosing an Auditor
            </TabsTrigger>
            <TabsTrigger value="prepare-audit" className="text-xs sm:text-sm">
              <FileCheck className="h-4 w-4 mr-1 hidden sm:inline" />
              Preparing for Audit
            </TabsTrigger>
            <TabsTrigger value="review-report" className="text-xs sm:text-sm">
              <Book className="h-4 w-4 mr-1 hidden sm:inline" />
              Reviewing Reports
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="choose-auditor" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">How to Choose the Right Security Auditor</h3>
                <p className="text-sm text-muted-foreground">
                  Selecting the right security auditor is crucial for the safety of your blockchain project. Here's what to look for:
                </p>
              </div>
              
              <div className="space-y-4">
                {securityCriteria.map((criteria, index) => (
                  <TutorialStep
                    key={index}
                    title={criteria.title}
                    description={criteria.description}
                    icon={criteria.icon}
                    completed={progress["choose-auditor"] >= (index + 1) * 25}
                  />
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["choose-auditor"]}% complete</span>
                </div>
                <Progress value={progress["choose-auditor"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prepare-audit" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">Preparing Your Project for Audit</h3>
                <p className="text-sm text-muted-foreground">
                  Proper preparation ensures a more effective and efficient audit process. Follow these steps:
                </p>
              </div>
              
              <div className="space-y-4">
                {preparationSteps.map((step, index) => (
                  <TutorialStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    completed={progress["prepare-audit"] >= (index + 1) * 25}
                  />
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["prepare-audit"]}% complete</span>
                </div>
                <Progress value={progress["prepare-audit"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="review-report" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">Understanding Audit Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Knowing how to interpret and act on audit findings is essential for improving your project's security:
                </p>
              </div>
              
              <div className="space-y-4">
                {reviewGuidance.map((guidance, index) => (
                  <TutorialStep
                    key={index}
                    title={guidance.title}
                    description={guidance.description}
                    icon={guidance.icon}
                    completed={progress["review-report"] >= (index + 1) * 25}
                  />
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["review-report"]}% complete</span>
                </div>
                <Progress value={progress["review-report"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <div>
            <Button 
              onClick={() => {
                incrementProgress(activeTab);
                if (allCompleted) {
                  onComplete();
                }
              }}
            >
              {!allCompleted ? "Mark Section Complete" : "Finish Tutorial"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
