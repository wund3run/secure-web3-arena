
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Trophy, Star, TrendingUp, Award, Medal, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Leaderboard() {
  const topAuditors = [
    {
      rank: 1,
      name: "alice_security",
      score: 9850,
      auditsCompleted: 47,
      avgRating: 4.9,
      specialties: ["DeFi", "Smart Contracts"],
      badge: "Expert",
      monthlyGrowth: 15
    },
    {
      rank: 2,
      name: "crypto_hunter",
      score: 9420,
      auditsCompleted: 38,
      avgRating: 4.8,
      specialties: ["NFT", "Infrastructure"],
      badge: "Professional",
      monthlyGrowth: 12
    },
    {
      rank: 3,
      name: "security_master",
      score: 9180,
      auditsCompleted: 42,
      avgRating: 4.7,
      specialties: ["Cross-Chain", "DeFi"],
      badge: "Expert",
      monthlyGrowth: 8
    }
  ];

  const topProjects = [
    {
      rank: 1,
      name: "DeFiProtocol",
      auditsCompleted: 12,
      avgRating: 4.9,
      totalValueSecured: "$45M",
      category: "DeFi"
    },
    {
      rank: 2,
      name: "NFTMarketplace",
      auditsCompleted: 8,
      avgRating: 4.8,
      totalValueSecured: "$28M",
      category: "NFT"
    },
    {
      rank: 3,
      name: "BridgeNetwork",
      auditsCompleted: 6,
      avgRating: 4.7,
      totalValueSecured: "$67M",
      category: "Infrastructure"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Expert": return "bg-purple-100 text-purple-800";
      case "Professional": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ContentPage
      title="Security Leaderboard"
      description="Top-performing security auditors and projects on the Hawkly platform"
      className="px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Leaderboard</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover the top-performing security auditors and most active projects on Hawkly.
          </p>
        </div>

        <Tabs defaultValue="auditors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="auditors">Top Auditors</TabsTrigger>
            <TabsTrigger value="projects">Top Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="auditors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Top Reputation</h3>
                <p className="text-muted-foreground">
                  Auditors ranked by community ratings and feedback
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Most Active</h3>
                <p className="text-muted-foreground">
                  Professionals with the highest audit completion rates
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border/40 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Rising Stars</h3>
                <p className="text-muted-foreground">
                  Auditors showing the fastest growth and improvement
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {topAuditors.map((auditor) => (
                <div key={auditor.rank} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(auditor.rank)}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{auditor.name}</h3>
                          <Badge className={getBadgeColor(auditor.badge)}>
                            {auditor.badge}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {auditor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-primary">{auditor.score}</div>
                            <div className="text-muted-foreground">Score</div>
                          </div>
                          <div>
                            <div className="font-medium">{auditor.auditsCompleted}</div>
                            <div className="text-muted-foreground">Audits</div>
                          </div>
                          <div>
                            <div className="font-medium flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              {auditor.avgRating}
                            </div>
                            <div className="text-muted-foreground">Rating</div>
                          </div>
                          <div>
                            <div className="font-medium text-green-600">+{auditor.monthlyGrowth}%</div>
                            <div className="text-muted-foreground">Growth</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
              {topProjects.map((project) => (
                <div key={project.rank} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(project.rank)}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{project.name}</h3>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="font-medium">{project.auditsCompleted}</div>
                            <div className="text-muted-foreground">Audits</div>
                          </div>
                          <div>
                            <div className="font-medium flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              {project.avgRating}
                            </div>
                            <div className="text-muted-foreground">Rating</div>
                          </div>
                          <div>
                            <div className="font-medium text-primary">{project.totalValueSecured}</div>
                            <div className="text-muted-foreground">Value Secured</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-primary/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">How Rankings Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium mb-2">Auditor Rankings</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Based on completed audits, client ratings, and community feedback</li>
                <li>Weighted by audit complexity and value secured</li>
                <li>Updated in real-time as audits are completed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Project Rankings</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Ranked by total value secured and audit frequency</li>
                <li>Considers audit quality and remediation response</li>
                <li>Showcases commitment to security best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
