
import { Trophy, Shield, Award, Star, BadgeCheck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgeAward } from "@/components/ui/badge-award";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample leaderboard data
const TOP_AUDITORS = [
  { 
    id: "1", 
    name: "Alex CryptoShield", 
    points: 7850, 
    level: "expert", 
    isVerified: true,
    rank: 1,
    badges: ["Smart Contract Pro", "Bug Hunter", "First Response"]
  },
  { 
    id: "2", 
    name: "BlockSafe Security", 
    points: 7540, 
    level: "expert", 
    isVerified: true,
    rank: 2,
    badges: ["Vulnerability Master", "DApp Specialist"]
  },
  { 
    id: "3", 
    name: "SecureLabs", 
    points: 6980, 
    level: "expert", 
    isVerified: true,
    rank: 3,
    badges: ["Protocol Expert", "Fast Responder"]
  },
  { 
    id: "4", 
    name: "Web3Guard", 
    points: 5620, 
    level: "verified", 
    isVerified: true,
    rank: 4,
    badges: ["NFT Specialist", "Community Helper"]
  },
  { 
    id: "5", 
    name: "DeFi Shield", 
    points: 4890, 
    level: "rookie", 
    isVerified: false,
    rank: 5,
    badges: ["Rising Star"]
  }
];

// Sample achievement badges data
const BADGES = [
  {
    id: "1",
    name: "Smart Contract Pro",
    description: "Completed 50+ smart contract audits",
    icon: Shield,
    color: "text-web3-purple",
    bgColor: "bg-web3-purple/10",
    borderColor: "border-web3-purple/30"
  },
  {
    id: "2",
    name: "Bug Hunter",
    description: "Found 100+ critical vulnerabilities",
    icon: Zap,
    color: "text-web3-teal",
    bgColor: "bg-web3-teal/10",
    borderColor: "border-web3-teal/30"
  },
  {
    id: "3",
    name: "First Response",
    description: "First to respond to critical security incidents",
    icon: Award,
    color: "text-web3-orange",
    bgColor: "bg-web3-orange/10",
    borderColor: "border-web3-orange/30"
  }
];

export function GamificationSection() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            <span className="text-gradient">Gamified Security</span> Ecosystem
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn rewards, climb the leaderboard, and build your reputation in our competitive security marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Leaderboard section */}
          <div className="lg:col-span-7 bg-background rounded-xl shadow-lg border border-border/30 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-web3-purple/20 to-web3-teal/10 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-web3-orange" />
                  <h3 className="text-xl font-bold">Top Security Providers</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-sm">
                  View Full Leaderboard
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-border/10">
              {TOP_AUDITORS.map((auditor) => (
                <div key={auditor.id} className="p-4 hover:bg-background/80 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-web3-purple/10 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {auditor.rank}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-semibold">{auditor.name}</span>
                          {auditor.isVerified && (
                            <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
                          )}
                        </div>
                        <div className="flex mt-1 space-x-2">
                          {auditor.badges.slice(0, 2).map((badge) => (
                            <span key={badge} className="text-xs text-muted-foreground">
                              {badge}
                            </span>
                          ))}
                          {auditor.badges.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{auditor.badges.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{auditor.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Security Points</div>
                    </div>
                  </div>
                  <Progress value={auditor.points / 80} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements & badges section */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <Card className="border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-6 w-6 text-web3-orange" />
                  <h3 className="text-xl font-bold">Achievement Badges</h3>
                </div>
                
                <div className="space-y-4">
                  {BADGES.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`relative flex p-4 rounded-lg ${badge.bgColor} ${badge.borderColor} border`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-background/40 mr-4`}>
                        <badge.icon className={`h-5 w-5 ${badge.color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button asChild variant="outline" className="text-sm">
                    <Link to="/achievements">
                      View All Achievements
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-6 w-6 text-web3-orange" />
                  <h3 className="text-xl font-bold">Rewards & Benefits</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-web3-purple/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-web3-purple text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm">Earn crypto rewards for spotting vulnerabilities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-web3-purple/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-web3-purple text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm">Unlock exclusive access to premium security tools</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-web3-purple/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-web3-purple text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm">Gain priority access to high-value security contracts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-web3-purple/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-web3-purple text-xs font-bold">4</span>
                    </div>
                    <span className="text-sm">Build reputation in the Web3 security community</span>
                  </li>
                </ul>
                
                <div className="mt-6 text-center">
                  <Button variant="default" className="text-sm">
                    Join Security Network
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
