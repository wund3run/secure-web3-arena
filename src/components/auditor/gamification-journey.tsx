
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Shield, Award, Star, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AchievementBadge, SmartContractProBadge, BugHunterBadge, FirstResponseBadge } from "@/components/achievements/achievement-badge";

interface AuditorProgress {
  level: string;
  points: number;
  nextLevelPoints: number;
  completedAudits: number;
  rank: number;
  recentAchievements: {
    id: string;
    name: string;
    description: string;
    earned: boolean;
    date?: string;
  }[];
}

interface GamificationJourneyProps {
  progress?: AuditorProgress;
  simplified?: boolean;
}

export function AuditorGamificationJourney({ 
  progress = {
    level: "Verified Auditor",
    points: 3200,
    nextLevelPoints: 5000,
    completedAudits: 24,
    rank: 42,
    recentAchievements: [
      {
        id: "smart-contract-pro",
        name: "Smart Contract Pro",
        description: "Completed 50+ smart contract audits",
        earned: false
      },
      {
        id: "bug-hunter",
        name: "Bug Hunter",
        description: "Found 100+ critical vulnerabilities",
        earned: true,
        date: "2023-04-15"
      }
    ]
  },
  simplified = false 
}: GamificationJourneyProps) {

  // Calculate progress percentage
  const progressPercentage = Math.min(100, (progress.points / progress.nextLevelPoints) * 100);
  
  // Render a simplified version for dashboard widgets
  if (simplified) {
    return (
      <Card className="hover:border-primary/40 transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Auditor Progress
            </span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Level {progress.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to next level</span>
              <span className="font-medium">{progress.points} / {progress.nextLevelPoints} points</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Completed Audits: {progress.completedAudits}</span>
              <span>Current Rank: #{progress.rank}</span>
            </div>
            <div className="pt-2">
              <Link to="/achievements">
                <Button variant="outline" size="sm" className="w-full">View Your Journey</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render the full gamification journey
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 border-primary/30">
          <CardHeader className="pb-3 bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Your Auditor Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{progress.level}</h3>
                <p className="text-sm text-muted-foreground">{progress.points} experience points</p>
              </div>
              <Badge className="bg-primary">{progress.rank > 10 ? `Top ${Math.round(progress.rank/10)*10}` : "Top 10"} Auditor</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Next level: Expert Auditor</span>
                <span>{progress.points} / {progress.nextLevelPoints}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress.nextLevelPoints - progress.points} more points needed
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-muted/60 px-3 py-2 rounded-md text-center">
                <div className="text-lg font-bold">{progress.completedAudits}</div>
                <div className="text-xs text-muted-foreground">Audits</div>
              </div>
              <div className="bg-muted/60 px-3 py-2 rounded-md text-center">
                <div className="text-lg font-bold">#{progress.rank}</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
              <div className="bg-muted/60 px-3 py-2 rounded-md text-center">
                <div className="text-lg font-bold">{progress.recentAchievements.filter(a => a.earned).length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {progress.recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3">
                {achievement.id === "smart-contract-pro" && (
                  <SmartContractProBadge size="sm" earned={achievement.earned} />
                )}
                {achievement.id === "bug-hunter" && (
                  <BugHunterBadge size="sm" earned={achievement.earned} />
                )}
                {!["smart-contract-pro", "bug-hunter"].includes(achievement.id) && (
                  <FirstResponseBadge size="sm" earned={achievement.earned} />
                )}
              </div>
            ))}
            
            <div className="pt-3 text-center">
              <Link to="/achievements">
                <Button variant="outline">View All Achievements</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
