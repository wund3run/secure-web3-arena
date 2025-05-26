
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Trophy, Star, Shield, Target, Award, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Achievements() {
  const achievementCategories = [
    {
      name: "Audit Mastery",
      icon: Shield,
      description: "Complete audits and build expertise",
      achievements: [
        {
          title: "First Audit",
          description: "Complete your first security audit",
          icon: "🎯",
          rarity: "Common",
          unlocked: true,
          progress: 100
        },
        {
          title: "Audit Veteran",
          description: "Complete 10 security audits",
          icon: "⭐",
          rarity: "Uncommon",
          unlocked: true,
          progress: 100
        },
        {
          title: "Security Expert",
          description: "Complete 50 security audits",
          icon: "🏆",
          rarity: "Rare",
          unlocked: false,
          progress: 78
        }
      ]
    },
    {
      name: "Community Recognition",
      icon: Star,
      description: "Earn recognition from the community",
      achievements: [
        {
          title: "Rising Star",
          description: "Achieve 4.5+ average rating across 5 audits",
          icon: "🌟",
          rarity: "Uncommon",
          unlocked: true,
          progress: 100
        },
        {
          title: "Community Hero",
          description: "Help 25+ developers through forum contributions",
          icon: "🦸",
          rarity: "Rare",
          unlocked: false,
          progress: 32
        },
        {
          title: "Legendary Auditor",
          description: "Maintain 4.9+ rating across 25+ audits",
          icon: "👑",
          rarity: "Legendary",
          unlocked: false,
          progress: 15
        }
      ]
    },
    {
      name: "Vulnerability Hunter",
      icon: Target,
      description: "Discover and report security vulnerabilities",
      achievements: [
        {
          title: "Bug Hunter",
          description: "Find your first critical vulnerability",
          icon: "🔍",
          rarity: "Common",
          unlocked: true,
          progress: 100
        },
        {
          title: "Vulnerability Specialist",
          description: "Discover 10 high-severity vulnerabilities",
          icon: "🚨",
          rarity: "Rare",
          unlocked: false,
          progress: 60
        },
        {
          title: "Security Researcher",
          description: "Publish a security research paper",
          icon: "📚",
          rarity: "Epic",
          unlocked: false,
          progress: 0
        }
      ]
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800";
      case "Uncommon": return "bg-green-100 text-green-800";
      case "Rare": return "bg-blue-100 text-blue-800";
      case "Epic": return "bg-purple-100 text-purple-800";
      case "Legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ContentPage
      title="Achievements"
      description="Track your progress and unlock achievements as you build your security expertise"
      className="px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Achievements</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Track your progress and unlock achievements as you build your security expertise on Hawkly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <div className="text-3xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Achievements Unlocked</div>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <div className="text-3xl font-bold text-secondary">2,450</div>
            <div className="text-sm text-muted-foreground">Achievement Points</div>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
            <div className="text-3xl font-bold text-primary">7</div>
            <div className="text-sm text-muted-foreground">Rare Achievements</div>
          </div>
        </div>

        <div className="space-y-8">
          {achievementCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.achievements.map((achievement, achievementIndex) => (
                  <div
                    key={achievementIndex}
                    className={`bg-card rounded-lg p-6 border transition-all ${
                      achievement.unlocked
                        ? "border-border/40 hover:shadow-md"
                        : "border-border/20 opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex items-center">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                        {!achievement.unlocked && (
                          <Lock className="h-4 w-4 text-muted-foreground ml-2" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>

                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}

                    {achievement.unlocked && (
                      <div className="flex items-center text-green-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Unlocked</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Achievement System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium mb-2">How to Earn Achievements</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Complete security audits and maintain high ratings</li>
                <li>Participate in community discussions and help others</li>
                <li>Discover vulnerabilities and contribute to security research</li>
                <li>Take on challenges and demonstrate expertise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Achievement Benefits</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Showcase your expertise to potential clients</li>
                <li>Unlock exclusive features and opportunities</li>
                <li>Gain recognition in the security community</li>
                <li>Earn achievement points and rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
