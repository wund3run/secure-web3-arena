
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Trophy, Target, Users, Clock, Star, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Challenges() {
  const activeChallenges = [
    {
      title: "Reentrancy Hunter",
      description: "Find and exploit reentrancy vulnerabilities in provided smart contracts.",
      difficulty: "Medium",
      reward: "500 HAWK",
      participants: 47,
      timeLeft: "5 days",
      category: "Smart Contract",
      isLocked: false
    },
    {
      title: "Oracle Manipulation Master",
      description: "Demonstrate price oracle manipulation techniques in a controlled environment.",
      difficulty: "Hard",
      reward: "1000 HAWK",
      participants: 23,
      timeLeft: "12 days",
      category: "DeFi",
      isLocked: false
    },
    {
      title: "Bridge Security Specialist",
      description: "Identify vulnerabilities in cross-chain bridge implementations.",
      difficulty: "Expert",
      reward: "2000 HAWK",
      participants: 8,
      timeLeft: "20 days",
      category: "Infrastructure",
      isLocked: true
    }
  ];

  const completedChallenges = [
    {
      title: "Flash Loan Attack Simulation",
      winner: "alice_security",
      reward: "750 HAWK",
      completedDate: "May 10, 2025"
    },
    {
      title: "NFT Marketplace Exploit",
      winner: "crypto_hunter",
      reward: "600 HAWK",
      completedDate: "May 3, 2025"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ContentPage
      title="Security Challenges"
      description="Test your skills with hands-on security challenges and earn rewards"
      className="px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Challenges</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Put your security skills to the test with real-world challenges. Earn rewards and build your reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Skill Building</h3>
            <p className="text-muted-foreground">
              Enhance your security expertise through practical challenges
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <Trophy className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-muted-foreground">
              Complete challenges to earn HAWK tokens and recognition
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Connect with other security professionals and learn together
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeChallenges.map((challenge, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="ml-2">
                      {challenge.category}
                    </Badge>
                  </div>
                  {challenge.isLocked && (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground mb-4">{challenge.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-primary" />
                    <span>{challenge.reward}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{challenge.timeLeft} left</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={challenge.isLocked}
                  variant={challenge.isLocked ? "outline" : "default"}
                >
                  {challenge.isLocked ? "Unlock Required" : "Start Challenge"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recently Completed</h2>
          <div className="bg-card rounded-lg border border-border/40">
            <div className="divide-y divide-border/40">
              {completedChallenges.map((challenge, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{challenge.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>Winner: {challenge.winner}</span>
                        <span className="mx-2">•</span>
                        <span>{challenge.completedDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">{challenge.reward}</div>
                      <div className="text-sm text-muted-foreground">Reward</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">How Challenges Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium mb-2">Getting Started</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Choose a challenge that matches your skill level</li>
                <li>Read the challenge description and requirements</li>
                <li>Submit your solution before the deadline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rewards & Recognition</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Earn HAWK tokens for successful completions</li>
                <li>Build your reputation score</li>
                <li>Get featured on the leaderboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
