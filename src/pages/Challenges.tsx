
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Target, ArrowRight, ChevronRight, Star, Award, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Challenges() {
  const activeChallenges = [
    {
      id: 1,
      title: "Find the Reentrancy",
      description: "Identify and fix the reentrancy vulnerability in this DeFi lending protocol.",
      difficulty: "Medium",
      participants: 145,
      rewards: "2,500 USD + NFT Badge",
      daysLeft: 7,
      progress: 42,
      category: "Smart Contract"
    },
    {
      id: 2,
      title: "MEV Protection Challenge",
      description: "Design a solution to protect a DEX against maximal extractable value exploitation.",
      difficulty: "Hard",
      participants: 89,
      rewards: "5,000 USD + Exclusive Access",
      daysLeft: 12,
      progress: 28,
      category: "DeFi"
    },
    {
      id: 3,
      title: "ZK Circuit Audit",
      description: "Audit this zero-knowledge proof circuit implementation and identify vulnerabilities.",
      difficulty: "Expert",
      participants: 56,
      rewards: "7,500 USD + Employment Opportunity",
      daysLeft: 18,
      progress: 15,
      category: "Zero Knowledge"
    }
  ];

  const completedChallenges = [
    {
      id: 4,
      title: "Bridge Exploit Prevention",
      description: "Identify potential exploit vectors in a cross-chain bridge implementation.",
      difficulty: "Hard",
      participants: 203,
      winners: ["Alex J.", "Sarah A.", "Michael Z."],
      totalPrize: "10,000 USD",
      category: "Bridges"
    },
    {
      id: 5,
      title: "NFT Metadata Security",
      description: "Find and fix vulnerabilities in NFT metadata handling and storage.",
      difficulty: "Medium",
      participants: 178,
      winners: ["Elena R.", "David W."],
      totalPrize: "3,500 USD",
      category: "NFT"
    }
  ];

  return (
    <ContentPage
      title="Security Challenges"
      description="Participate in Web3 security challenges, competitions, and bug bounties to test and improve your skills."
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
          <Trophy className="mr-3 h-8 w-8 text-amber-500" /> Security Challenges
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Test your security skills, compete with peers, and earn rewards by participating in our Web3 security challenges.
        </p>
      </div>

      <Tabs defaultValue="active" className="mb-12">
        <TabsList className="grid grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 gap-6">
            {activeChallenges.map(challenge => (
              <Card key={challenge.id} className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">{challenge.category}</Badge>
                      <CardTitle className="text-xl mb-1">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {challenge.difficulty}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" /> Time Remaining
                      </div>
                      <div className="font-semibold">{challenge.daysLeft} days</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" /> Participants
                      </div>
                      <div className="font-semibold">{challenge.participants}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <Trophy className="h-3.5 w-3.5 mr-1" /> Rewards
                      </div>
                      <div className="font-semibold">{challenge.rewards}</div>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Challenge Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1.5" /> View Participants
                  </Button>
                  <Button>
                    Enter Challenge <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedChallenges.map(challenge => (
              <Card key={challenge.id} className="hover:shadow-md transition-all">
                <CardHeader>
                  <Badge variant="outline">{challenge.category}</Badge>
                  <CardTitle className="text-lg mb-1">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" /> Participants
                      </div>
                      <div className="font-semibold">{challenge.participants}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <Trophy className="h-3.5 w-3.5 mr-1" /> Total Prize
                      </div>
                      <div className="font-semibold">{challenge.totalPrize}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Winners</div>
                    <div className="flex items-center gap-2">
                      {challenge.winners.map((winner, i) => (
                        <div key={i} className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs mr-1">
                            {i === 0 ? <Trophy className="h-3 w-3 text-amber-500" /> : <Star className="h-3 w-3 text-primary" />}
                          </div>
                          <span className="text-sm">{winner}</span>
                          {i < challenge.winners.length - 1 && <span className="mx-1 text-muted-foreground">•</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Challenge Results <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" size="lg">View All Past Challenges</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                New security challenges are currently being prepared by our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Tuned for New Challenges</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Our team is designing new and exciting security challenges. 
                  Subscribe to notifications to be the first to know when new challenges are posted.
                </p>
                <Button>
                  <Bell className="mr-2 h-4 w-4" />
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* How It Works Section */}
      <section className="bg-card rounded-lg border border-border/40 p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-primary" /> How Security Challenges Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background p-6 rounded-lg border border-border/40">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Choose a Challenge</h3>
            <p className="text-sm text-muted-foreground">
              Browse active challenges and select one that matches your skills and interests. Each challenge has clear objectives and rewards.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg border border-border/40">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Work on Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Analyze the code, identify vulnerabilities, and prepare your solution or report according to the challenge requirements.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg border border-border/40">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Submit and Earn</h3>
            <p className="text-sm text-muted-foreground">
              Submit your solution before the deadline. Winners receive rewards, recognition, and sometimes employment opportunities.
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Benefits of Participating</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Skill Development</h3>
              <p className="text-muted-foreground">
                Challenge yourself with real-world security scenarios and improve your skills through practical experience.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Rewards & Recognition</h3>
              <p className="text-muted-foreground">
                Earn financial rewards, NFT badges, and build your reputation in the Web3 security community.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Networking Opportunities</h3>
              <p className="text-muted-foreground">
                Connect with other security professionals and potential employers in the blockchain space.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <BriefcaseIcon className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Career Advancement</h3>
              <p className="text-muted-foreground">
                Top performers often receive employment opportunities from leading Web3 companies and protocols.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}

function Bell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
