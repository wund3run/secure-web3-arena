
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, Check, ExternalLink, Info, Play } from "lucide-react";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";

interface DemoStep {
  id: string;
  title: string;
  description: string;
  technicalTerm?: {
    term: string;
    definition: string;
  };
  image?: string;
  explanationPoints: string[];
  businessImpact?: string;
}

const demoSteps: DemoStep[] = [
  {
    id: "step1",
    title: "Understanding Smart Contract Security",
    description: "Smart contracts are self-executing agreements with code that automatically enforces the terms. Security audits help ensure this code is safe.",
    technicalTerm: {
      term: "Smart Contract",
      definition: "A digital agreement that automatically executes when predefined conditions are met. Like a vending machine that works without human intervention."
    },
    explanationPoints: [
      "Smart contracts handle digital assets worth billions of dollars",
      "Once deployed, smart contracts cannot easily be changed",
      "Security flaws can lead to irreversible financial losses",
      "Audits identify vulnerabilities before real money is at risk"
    ],
    businessImpact: "A security audit is like insurance for your digital business, protecting your assets and user trust."
  },
  {
    id: "step2",
    title: "Common Security Vulnerabilities",
    description: "These are the most frequent issues found in Web3 projects and how auditors help protect against them.",
    technicalTerm: {
      term: "Reentrancy Attack",
      definition: "When a contract allows an external call before updating its state, potentially letting the caller withdraw funds multiple times. Similar to being allowed to take money from an ATM multiple times due to a timing glitch."
    },
    explanationPoints: [
      "Detecting unauthorized access to sensitive functions",
      "Preventing manipulation of price mechanisms",
      "Protecting against attacks that drain funds",
      "Ensuring secure handling of user deposits and withdrawals"
    ],
    businessImpact: "Each vulnerability fixed prevents potential financial losses and preserves your project's reputation."
  },
  {
    id: "step3",
    title: "The Audit Process Simplified",
    description: "How security audits work, explained in business terms rather than technical jargon.",
    technicalTerm: {
      term: "Static Analysis",
      definition: "Examining code without running it, similar to proofreading a legal document for logical errors and inconsistencies."
    },
    explanationPoints: [
      "Initial assessment to understand your project's goals and risks",
      "Comprehensive security review by expert auditors",
      "Clear reports that explain issues in business terms",
      "Guidance on implementing fixes and verification"
    ],
    businessImpact: "A thorough audit process minimizes your project's risk while maximizing security assurance."
  },
  {
    id: "step4",
    title: "Reading Audit Reports",
    description: "How to understand and act on security findings, even without technical expertise.",
    technicalTerm: {
      term: "Severity Levels",
      definition: "A rating system that indicates how dangerous a security issue is, similar to risk ratings in business insurance assessments."
    },
    explanationPoints: [
      "Critical findings represent immediate business risks",
      "High/medium findings should be addressed before launch",
      "Low findings represent minor issues or best practices",
      "Recommendations help improve overall security posture"
    ],
    businessImpact: "Understanding audit reports helps prioritize security fixes based on business risk, not just technical complexity."
  }
];

export function NonTechnicalAuditDemo() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showGlossary, setShowGlossary] = useState(false);
  
  const currentStep = demoSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Web3 Security for Non-Technical Stakeholders</CardTitle>
        <CardDescription>
          Understanding blockchain security audits without the technical complexity
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="space-y-2 sticky top-4">
              <h3 className="font-medium mb-3">Security Topics</h3>
              
              {demoSteps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => handleSelectStep(index)}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    currentStepIndex === index 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 
                      ${currentStepIndex === index ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      {index + 1}
                    </div>
                    <span className={currentStepIndex === index ? 'font-medium' : ''}>
                      {step.title}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full mt-2 bg-muted/50"
                  onClick={() => setShowGlossary(!showGlossary)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Security Glossary
                </Button>
              </div>
              
              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Full Demo
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 order-1 md:order-2">
            {showGlossary ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Security Glossary</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowGlossary(false)}>
                    Back to Demo
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {demoSteps.map(step => (
                    step.technicalTerm && (
                      <Card key={`glossary-${step.id}`}>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base">{step.technicalTerm.term}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-muted-foreground">{step.technicalTerm.definition}</p>
                        </CardContent>
                      </Card>
                    )
                  ))}
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Audit</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-muted-foreground">
                        A comprehensive security review of your project's code to identify vulnerabilities and ensure it works as intended. Think of it as a thorough inspection of a building's safety systems before occupancy.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Vulnerability</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-muted-foreground">
                        A security weakness that could be exploited to cause harm, such as unauthorized access or loss of funds. Similar to a flaw in a bank's security system that could allow theft.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mr-2">
                      {currentStepIndex + 1}
                    </div>
                    <h2 className="text-xl font-bold">{currentStep.title}</h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevious} 
                      disabled={currentStepIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={handleNext} 
                      disabled={currentStepIndex === demoSteps.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{currentStep.description}</p>
                
                {currentStep.technicalTerm && (
                  <Card className="bg-blue-50/50 border-blue-200">
                    <CardHeader className="py-3">
                      <div className="flex justify-between">
                        <CardTitle className="text-sm font-medium text-blue-800">Technical Term Explained</CardTitle>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-blue-600"
                          onClick={() => setShowGlossary(true)}
                        >
                          View Glossary
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="flex flex-col space-y-1">
                        <div className="font-medium">{currentStep.technicalTerm.term}</div>
                        <div className="text-sm text-muted-foreground">{currentStep.technicalTerm.definition}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="space-y-3">
                  <h3 className="font-medium">Key Points to Understand:</h3>
                  <ul className="space-y-2">
                    {currentStep.explanationPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {currentStep.businessImpact && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">Business Impact</h4>
                        <p className="text-amber-700 text-sm">{currentStep.businessImpact}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Learn more about {currentStep.title.toLowerCase()}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Part {currentStepIndex + 1} of {demoSteps.length}
        </div>
        <Button variant="link" size="sm" className="text-primary h-auto p-0">
          Request a personalized demo
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
