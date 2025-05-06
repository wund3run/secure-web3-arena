
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface ReputationLevelProps {
  level: string;
  points: number;
  requirements: string[];
  benefits: string[];
  current?: boolean;
  achieved?: boolean;
}

const ReputationLevel = ({ level, points, requirements, benefits, current, achieved }: ReputationLevelProps) => {
  return (
    <Card className={`border ${current ? 'border-primary' : achieved ? 'border-secondary/40' : 'border-border/40'}`}>
      <CardHeader className={`pb-2 ${current ? 'bg-primary/5' : achieved ? 'bg-secondary/5' : ''}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {level}
            {current && <Badge className="ml-2 bg-primary">Current</Badge>}
            {achieved && !current && <Badge className="ml-2 bg-secondary">Achieved</Badge>}
          </CardTitle>
          <span className="text-sm font-semibold">{points} points</span>
        </div>
        <CardDescription>{current ? "Your current reputation level" : achieved ? "Level achieved" : "Next level to achieve"}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            Requirements
          </h4>
          <ul className="text-sm space-y-1">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-primary text-xs">{index + 1}</span>
                </span>
                <span className="text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Benefits
          </h4>
          <ul className="text-sm space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-secondary text-xs">{index + 1}</span>
                </span>
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export function ReputationSystem() {
  // Sample user reputation data
  const userReputation = {
    points: 3200,
    level: "Verified Auditor",
    nextLevelPoints: 5000,
    achievements: 7,
    totalAchievements: 15,
  };
  
  const reputationLevels = [
    {
      level: "Rookie Auditor",
      points: 1000,
      requirements: [
        "Complete 5 security assessments",
        "Maintain 4.0+ rating",
        "Pass basic verification"
      ],
      benefits: [
        "Access to marketplace listings",
        "Basic profile badge",
        "Community forum access"
      ],
      achieved: true
    },
    {
      level: "Verified Auditor",
      points: 3000,
      requirements: [
        "Complete 20 security assessments",
        "Maintain 4.5+ rating",
        "Find 5+ critical vulnerabilities"
      ],
      benefits: [
        "Enhanced visibility in search",
        "Verified badge on profile",
        "Access to specialized projects"
      ],
      current: true,
      achieved: true
    },
    {
      level: "Expert Auditor",
      points: 5000,
      requirements: [
        "Complete 50 security assessments",
        "Maintain 4.7+ rating",
        "Community recognition awards"
      ],
      benefits: [
        "Featured placement in marketplace",
        "Expert badge on profile",
        "Early access to high-value projects"
      ]
    },
    {
      level: "Elite Security Specialist",
      points: 10000,
      requirements: [
        "Complete 100+ security assessments",
        "Maintain 4.8+ rating",
        "Recognized industry contributions"
      ],
      benefits: [
        "Elite badge and recognition",
        "Priority access to premium clients",
        "Revenue share opportunities"
      ]
    }
  ];

  // Calculate progress percentage to next level
  const currentLevelIndex = reputationLevels.findIndex(level => level.current);
  const currentLevel = reputationLevels[currentLevelIndex];
  const nextLevel = reputationLevels[currentLevelIndex + 1];
  
  const progressToNextLevel = ((userReputation.points - currentLevel.points) / 
    (nextLevel.points - currentLevel.points)) * 100;

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Reputation-Based Ecosystem</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Build your reputation, unlock achievements, and gain access to exclusive benefits
        </p>
      </div>
      
      <Card className="border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Your Reputation</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary">{userReputation.level}</Badge>
                    <span className="text-sm text-muted-foreground">{userReputation.points} points</span>
                  </div>
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to {nextLevel.level}</span>
                  <span>{userReputation.points} / {nextLevel.points}</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(nextLevel.points - userReputation.points)} more points needed
                </p>
              </div>
            </div>
            
            <div className="border-t md:border-t-0 md:border-l border-border/30 pt-4 md:pt-0 md:pl-6 flex-1">
              <div className="space-y-4">
                <h3 className="font-bold">Recent Achievements</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-secondary/10 h-10 w-10 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Bug Hunter</div>
                    <div className="text-xs text-muted-foreground">
                      Found 25+ critical vulnerabilities
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-web3-orange/10 h-10 w-10 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-web3-orange" />
                  </div>
                  <div>
                    <div className="font-medium">Fast Responder</div>
                    <div className="text-xs text-muted-foreground">
                      Responded to 50+ security incidents within 4 hours
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/achievements">
                      View All Achievements ({userReputation.achievements}/{userReputation.totalAchievements})
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reputationLevels.map((level, index) => (
          <ReputationLevel key={index} {...level} />
        ))}
      </div>
    </div>
  );
}
