
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Save, BarChart } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

interface AssessmentResult {
  score: number;
  maxScore: number;
  percentage: number;
  recommendations: string[];
}

const assessmentQuestions: Question[] = [
  {
    id: "technical_background",
    text: "What is your level of technical knowledge in blockchain and smart contracts?",
    options: [
      { id: "none", text: "No technical background", value: 0 },
      { id: "basic", text: "Basic understanding of blockchain concepts", value: 1 },
      { id: "moderate", text: "Moderate understanding of smart contracts", value: 2 },
      { id: "advanced", text: "Advanced developer with Web3 experience", value: 3 }
    ]
  },
  {
    id: "security_understanding",
    text: "How familiar are you with security vulnerabilities in Web3 projects?",
    options: [
      { id: "none", text: "Not familiar at all", value: 0 },
      { id: "basic", text: "Basic awareness of common attacks", value: 1 },
      { id: "moderate", text: "Understand most common vulnerabilities", value: 2 },
      { id: "advanced", text: "Deep knowledge of security risks and mitigations", value: 3 }
    ]
  },
  {
    id: "audit_experience",
    text: "Have you worked with security auditors before?",
    options: [
      { id: "none", text: "Never", value: 0 },
      { id: "limited", text: "Once or twice", value: 1 },
      { id: "moderate", text: "Several times", value: 2 },
      { id: "extensive", text: "Regularly work with auditors", value: 3 }
    ]
  },
  {
    id: "technical_documentation",
    text: "How comfortable are you reading technical documentation?",
    options: [
      { id: "not", text: "Not comfortable at all", value: 0 },
      { id: "somewhat", text: "Somewhat comfortable", value: 1 },
      { id: "very", text: "Very comfortable", value: 2 },
      { id: "expert", text: "Expert level - I write documentation myself", value: 3 }
    ]
  },
  {
    id: "code_understanding",
    text: "Can you understand or review code snippets?",
    options: [
      { id: "no", text: "No, I don't read code", value: 0 },
      { id: "basic", text: "I can understand basic logic", value: 1 },
      { id: "moderate", text: "I understand most programming concepts", value: 2 },
      { id: "yes", text: "Yes, I'm proficient in multiple languages", value: 3 }
    ]
  }
];

const getRecommendations = (score: number): string[] => {
  const percentage = (score / 15) * 100;
  
  if (percentage <= 33) {
    return [
      "We recommend using our guided simplification tools",
      "Schedule a free consultation with our customer success team",
      "Watch our 'Security Basics for Non-Technical Users' tutorial series",
      "Use the simplified audit report view by default"
    ];
  } else if (percentage <= 66) {
    return [
      "Consider our intermediate learning resources",
      "Enable simplified technical explanations in reports",
      "Join our monthly Web3 security basics webinar",
      "Explore the interactive security glossary"
    ];
  } else {
    return [
      "You're well-equipped to understand technical reports",
      "Consider enabling advanced report views",
      "You may benefit from our technical deep-dive webinars",
      "Check out our developer documentation for integration options"
    ];
  }
};

export function AccessibilitySelfAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / assessmentQuestions.length) * 100;
  
  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = assessmentQuestions.length * 3; // Maximum score possible
    
    // Calculate score based on selected options
    assessmentQuestions.forEach(question => {
      const answerId = answers[question.id];
      if (answerId) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          totalScore += option.value;
        }
      }
    });
    
    const percentage = (totalScore / maxScore) * 100;
    
    setResults({
      score: totalScore,
      maxScore,
      percentage,
      recommendations: getRecommendations(totalScore)
    });
    
    setShowResults(true);
  };
  
  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };
  
  const savePreferences = () => {
    // This would save user preferences to their profile
    // For example, showing simplified explanations for technical terms
    // Here we just show a notification
    
    // In a real implementation, this would integrate with the user's profile settings
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Security Experience Self-Assessment</CardTitle>
        <CardDescription>
          This assessment helps us tailor the platform experience to your technical background
        </CardDescription>
        
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>{showResults ? "Results" : `Question ${currentQuestionIndex + 1} of ${assessmentQuestions.length}`}</span>
            <span>Expert</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {!showResults ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
            
            <RadioGroup 
              value={answers[currentQuestion.id] || ""} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map(option => (
                <div key={option.id} className="flex items-center space-x-3 rounded-md border p-3 hover:bg-muted/50">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                <BarChart className="h-16 w-16 text-primary/80" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                  {Math.round(results!.percentage)}%
                </span>
              </div>
              
              <h3 className="text-xl font-bold mt-2">Your Technical Proficiency</h3>
              <p className="text-muted-foreground">
                {results!.percentage <= 33 
                  ? "You might benefit from simplified technical explanations" 
                  : results!.percentage <= 66 
                    ? "You have a moderate understanding of technical concepts" 
                    : "You have strong technical knowledge"}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Recommended Settings</h4>
              <ul className="space-y-2">
                {results?.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mr-2 mt-0.5 flex-shrink-0">
                      {i + 1}
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        {showResults ? (
          <>
            <Button variant="outline" onClick={restartAssessment}>
              Retake Assessment
            </Button>
            <Button onClick={savePreferences}>
              <Save className="mr-2 h-4 w-4" />
              Apply Recommendations
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
              {currentQuestionIndex < assessmentQuestions.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
