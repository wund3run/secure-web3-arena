
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { AchievementsList } from "@/components/achievements/achievements-list";
import { Shield, Award, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Achievements = () => {
  const [activeTab, setActiveTab] = React.useState<string>("badges");

  // Mock data for user achievements progress
  const userProgress = {
    level: 4,
    totalXP: 1240,
    nextLevelXP: 1500,
    badges: 8,
    totalBadges: 15,
    rankings: {
      auditor: "#42",
      community: "#156",
      overall: "#217"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-primary/5">
      <Helmet>
        <title>Achievements & Badges | Hawkly</title>
        <meta name="description" content="Track your security achievements, badges, and auditor reputation on the Hawkly platform." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header section */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-8 w-8 text-web3-orange" />
              <h1 className="text-3xl md:text-4xl font-extrabold">Achievement Center</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your progress, earn badges by demonstrating excellence in security auditing, 
              vulnerability detection, and community participation.
            </p>
          </div>
          
          {/* User progress summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Auditor Level
                </CardTitle>
                <CardDescription>Based on audit quality and complexity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userProgress.level}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Current XP: {userProgress.totalXP}</span>
                    <span>Next level: {userProgress.nextLevelXP}</span>
                  </div>
                  <Progress 
                    value={(userProgress.totalXP / userProgress.nextLevelXP) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5 text-web3-orange" />
                  Badge Collection
                </CardTitle>
                <CardDescription>Achievements and specializations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userProgress.badges}/{userProgress.totalBadges}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Current badges: {userProgress.badges}</span>
                    <span>Total available: {userProgress.totalBadges}</span>
                  </div>
                  <Progress 
                    value={(userProgress.badges / userProgress.totalBadges) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Rankings
                </CardTitle>
                <CardDescription>Your position in the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Auditor Rank:</span>
                  <span className="font-semibold">{userProgress.rankings.auditor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Community:</span>
                  <span className="font-semibold">{userProgress.rankings.community}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Overall:</span>
                  <span className="font-semibold">{userProgress.rankings.overall}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different achievement categories */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="mt-6">
              <div className="grid grid-cols-1 gap-6 pb-12">
                <AchievementsList />
              </div>
            </TabsContent>
            
            <TabsContent value="milestones" className="mt-6">
              <div className="bg-card border rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Audit Milestones</h3>
                <p className="text-muted-foreground">Track your journey as you reach significant audit achievements.</p>
                
                <div className="mt-8 max-w-3xl mx-auto">
                  <div className="relative">
                    {/* Milestone timeline */}
                    <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-border"></div>
                    
                    {/* Milestone items */}
                    <div className="space-y-16 relative">
                      {[
                        { title: "First Audit", description: "Complete your first security audit", completed: true },
                        { title: "Critical Vulnerability", description: "Identify your first critical vulnerability", completed: true },
                        { title: "Five Audits", description: "Complete five security audits", completed: true },
                        { title: "Expert Recognition", description: "Receive expert recognition from peers", completed: false },
                        { title: "Ten Audits", description: "Complete ten security audits", completed: false },
                      ].map((milestone, index) => (
                        <div key={index} className={`relative ${index % 2 === 0 ? 'text-right mr-1/2 pr-8' : 'text-left ml-1/2 pl-8'}`}>
                          <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0 -translate-x-1/2' : 'left-0 translate-x-1/2'} -translate-y-1/2 h-6 w-6 rounded-full border-4 ${milestone.completed ? 'bg-primary border-primary/50' : 'bg-background border-border'}`}></div>
                          <h4 className="text-lg font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          {milestone.completed && <p className="text-xs text-primary mt-1">Completed</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="leaderboard" className="mt-6">
              <div className="bg-card border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Security Experts Leaderboard</h3>
                <p className="text-muted-foreground text-center mb-6">Top security experts ranked by audit quality, vulnerabilities found, and community impact.</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</th>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Auditor</th>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Level</th>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Audits</th>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Critical Findings</th>
                        <th className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">XP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {[
                        { rank: 1, name: "Alex Morgan", level: 9, audits: 42, criticals: 18, xp: 8750 },
                        { rank: 2, name: "Samantha Chen", level: 8, audits: 38, criticals: 15, xp: 7840 },
                        { rank: 3, name: "Marcus Johnson", level: 8, audits: 35, criticals: 14, xp: 7520 },
                        { rank: 4, name: "Elena Rodriguez", level: 7, audits: 31, criticals: 12, xp: 6950 },
                        { rank: 5, name: "Kai Nakamura", level: 7, audits: 29, criticals: 11, xp: 6720 },
                      ].map((auditor) => (
                        <tr key={auditor.rank} className="hover:bg-muted/50">
                          <td className="py-4 whitespace-nowrap">
                            <div className={`font-bold ${auditor.rank <= 3 ? 'text-primary' : ''}`}>{auditor.rank}</div>
                          </td>
                          <td className="py-4">
                            <div className="font-medium">{auditor.name}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{auditor.level}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{auditor.audits}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{auditor.criticals}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm font-medium">{auditor.xp.toLocaleString()}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <EnhancedFooter />
    </div>
  );
};

export default Achievements;
