
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, Award, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface SkillsAssessmentProps {
  skillCategory: string;
  onAssessmentComplete: (result: AssessmentResult) => void;
}

export interface AssessmentResult {
  category: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  timeSpent: number;
  completedAt: string;
}

export function SkillsAssessment({ skillCategory, onAssessmentComplete }: SkillsAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Sample questions - in real implementation, these would come from an API
  const getQuestionsForCategory = (category: string): Question[] => {
    const questions: Record<string, Question[]> = {
      'Smart Contract Security': [
        {
          id: '1',
          question: 'Which of the following is a common vulnerability in smart contracts?',
          options: [
            'SQL Injection',
            'Reentrancy Attack',
            'Cross-Site Scripting',
            'Buffer Overflow'
          ],
          correctAnswer: 1,
          category: 'Smart Contract Security',
          difficulty: 'beginner'
        },
        {
          id: '2',
          question: 'What is the purpose of the "checks-effects-interactions" pattern?',
          options: [
            'To optimize gas usage',
            'To prevent reentrancy attacks',
            'To improve code readability',
            'To handle errors gracefully'
          ],
          correctAnswer: 1,
          category: 'Smart Contract Security',
          difficulty: 'intermediate'
        },
        {
          id: '3',
          question: 'Which tool is commonly used for formal verification of smart contracts?',
          options: [
            'Truffle',
            'Hardhat',
            'Certora',
            'OpenZeppelin'
          ],
          correctAnswer: 2,
          category: 'Smart Contract Security',
          difficulty: 'advanced'
        },
        {
          id: '4',
          question: 'What does the "front-running" attack exploit?',
          options: [
            'Network latency',
            'Transaction ordering in the mempool',
            'Smart contract bugs',
            'Consensus mechanism flaws'
          ],
          correctAnswer: 1,
          category: 'Smart Contract Security',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          question: 'Which of the following is NOT a best practice for secure smart contract development?',
          options: [
            'Using the latest compiler version',
            'Implementing proper access controls',
            'Storing sensitive data on-chain',
            'Following the principle of least privilege'
          ],
          correctAnswer: 2,
          category: 'Smart Contract Security',
          difficulty: 'beginner'
        }
      ],
      'DeFi Security': [
        {
          id: '1',
          question: 'What is a flash loan attack?',
          options: [
            'A quick loan approval process',
            'An attack using uncollateralized loans within a single transaction',
            'A denial of service attack',
            'A phishing attack targeting DeFi users'
          ],
          correctAnswer: 1,
          category: 'DeFi Security',
          difficulty: 'intermediate'
        },
        {
          id: '2',
          question: 'Which mechanism is commonly used to prevent oracle manipulation?',
          options: [
            'Using a single price feed',
            'Time-weighted average prices (TWAP)',
            'Increasing transaction fees',
            'Manual price updates'
          ],
          correctAnswer: 1,
          category: 'DeFi Security',
          difficulty: 'advanced'
        }
      ]
    };

    return questions[category] || [];
  };

  const questions = getQuestionsForCategory(skillCategory);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer!
    };

    const correctAnswers = questions.reduce((count, question) => {
      return finalAnswers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);
    const timeSpent = Date.now() - startTime;

    let level: AssessmentResult['level'];
    if (score >= 90) level = 'expert';
    else if (score >= 75) level = 'advanced';
    else if (score >= 60) level = 'intermediate';
    else level = 'beginner';

    const result: AssessmentResult = {
      category: skillCategory,
      score,
      totalQuestions: questions.length,
      correctAnswers,
      level,
      timeSpent,
      completedAt: new Date().toISOString()
    };

    setIsCompleted(true);
    onAssessmentComplete(result);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-purple-600 bg-purple-100';
      case 'advanced': return 'text-blue-600 bg-blue-100';
      case 'intermediate': return 'text-green-600 bg-green-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Assessment questions for "{skillCategory}" are not available yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted) {
    const result = {
      category: skillCategory,
      score: Math.round((Object.keys(answers).length / questions.length) * 100),
      correctAnswers: Object.keys(answers).length,
      totalQuestions: questions.length,
      level: 'intermediate' as const,
      timeSpent: Date.now() - startTime,
      completedAt: new Date().toISOString()
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Assessment Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{result.score}%</div>
            <Badge className={getLevelColor(result.level)} variant="secondary">
              {result.level} Level
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{Math.round(result.timeSpent / 60000)}m</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Performance</span>
              <span>{result.score}%</span>
            </div>
            <Progress value={result.score} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {skillCategory} Assessment
          </div>
          <Badge variant="outline">
            {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {currentQuestion.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              Question {currentQuestionIndex + 1}
            </div>
          </div>

          <h3 className="text-lg font-medium">{currentQuestion.question}</h3>

          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button 
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  );
}
