import { Trophy, Shield, Award, Star, BadgeCheck, Zap, Users, Target, TrendingUp, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample leaderboard data with enhanced profiles
const TOP_AUDITORS = [
  { 
    id: "1", 
    name: "Alex CryptoShield", 
    points: 7850, 
    level: "elite", 
    isVerified: true,
    rank: 1,
    badges: ["Smart Contract Pro", "Bug Hunter", "First Response"],
    auditCount: 147,
    criticalFinds: 23
  },
  { 
    id: "2", 
    name: "BlockSafe Security", 
    points: 7540, 
    level: "expert", 
    isVerified: true,
    rank: 2,
    badges: ["Vulnerability Master", "DApp Specialist"],
    auditCount: 132,
    criticalFinds: 19
  },
  { 
    id: "3", 
    name: "SecureLabs", 
    points: 6980, 
    level: "expert", 
    isVerified: true,
    rank: 3,
    badges: ["Protocol Expert", "Fast Responder"],
    auditCount: 98,
    criticalFinds: 15
  },
  { 
    id: "4", 
    name: "Web3Guard", 
    points: 5620, 
    level: "verified", 
    isVerified: true,
    rank: 4,
    badges: ["NFT Specialist", "Community Helper"],
    auditCount: 76,
    criticalFinds: 12
  },
  { 
    id: "5", 
    name: "DeFi Shield", 
    points: 4890, 
    level: "rising", 
    isVerified: false,
    rank: 5,
    badges: ["Rising Star"],
    auditCount: 45,
    criticalFinds: 8
  }
];

// Enhanced achievement badges with animated elements
const ACHIEVEMENT_CATEGORIES = [
  {
    title: "Security Mastery",
    badges: [
      {
        id: "1",
        name: "Smart Contract Pro",
        description: "Completed 50+ smart contract audits",
        icon: Shield,
        color: "from-purple-600 to-blue-600",
        rarity: "legendary"
      },
      {
        id: "2",
        name: "Bug Hunter",
        description: "Found 100+ critical vulnerabilities",
        icon: Zap,
        color: "from-orange-500 to-red-500",
        rarity: "epic"
      }
    ]
  },
  {
    title: "Community Impact",
    badges: [
      {
        id: "3",
        name: "First Response",
        description: "First to respond to critical security incidents",
        icon: Award,
        color: "from-green-500 to-teal-500",
        rarity: "rare"
      },
      {
        id: "4",
        name: "Mentor",
        description: "Guided 25+ junior auditors",
        icon: Users,
        color: "from-blue-500 to-indigo-500",
        rarity: "rare"
      }
    ]
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
    case 3: return <Award className="h-5 w-5 text-amber-600" />;
    default: return <Target className="h-4 w-4 text-muted-foreground" />;
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "elite": return "from-purple-600 to-pink-600";
    case "expert": return "from-blue-600 to-cyan-600";
    case "verified": return "from-green-600 to-teal-600";
    case "rising": return "from-orange-500 to-red-500";
    default: return "from-gray-600 to-gray-800";
  }
};

export function GamificationSection() {
  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/20 mb-6">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Gamified Security Platform</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">
              Compete, Learn, Excel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our competitive security ecosystem where expertise is rewarded, achievements unlock opportunities, 
            and every vulnerability found strengthens the Web3 community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Enhanced Leaderboard */}
          <div className="xl:col-span-8">
            <Card className="bg-card border shadow-sm overflow-hidden">
              <div className="p-6 bg-muted/30 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Security Champions</h3>
                      <p className="text-muted-foreground">Top performers this month</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    View All Rankings →
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {TOP_AUDITORS.map((auditor, index) => (
                  <div key={auditor.id} className="group relative">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-primary/20">
                      {/* Rank & Avatar */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getLevelColor(auditor.level)} flex items-center justify-center text-white font-bold text-lg`}>
                            {auditor.rank}
                          </div>
                          <div className="absolute -top-1 -right-1">
                            {getRankIcon(auditor.rank)}
                          </div>
                        </div>
                        
                        {/* Auditor Info */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-lg">{auditor.name}</span>
                            {auditor.isVerified && (
                              <BadgeCheck className="h-4 w-4 text-primary" />
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium`}>
                              {auditor.level.toUpperCase()}
                            </span>
                          </div>
                          
                          {/* Stats Row */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {auditor.auditCount} audits
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {auditor.criticalFinds} critical finds
                            </span>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex gap-1 mt-2">
                            {auditor.badges.slice(0, 2).map((badge) => (
                              <span key={badge} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                                {badge}
                              </span>
                            ))}
                            {auditor.badges.length > 2 && (
                              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                                +{auditor.badges.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Points & Progress */}
                        <div className="text-right min-w-[120px]">
                          <div className="font-bold text-xl text-primary">
                            {auditor.points.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">Security Points</div>
                          <Progress value={(auditor.points / 8000) * 100} className="h-2 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t bg-muted/10">
                <Button asChild className="w-full">
                  <Link to="/community">
                    Join the Competition →
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Achievements & Rewards */}
          <div className="xl:col-span-4 space-y-6">
            {/* Achievement Categories */}
            <Card className="bg-card border shadow-sm overflow-hidden">
              <div className="p-6 bg-muted/30 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Achievement System</h3>
                    <p className="text-sm text-muted-foreground">Unlock exclusive rewards</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {ACHIEVEMENT_CATEGORIES.map((category) => (
                  <div key={category.title}>
                    <h4 className="font-semibold mb-3 text-primary">{category.title}</h4>
                    <div className="space-y-3">
                      {category.badges.map((badge) => (
                        <div key={badge.id} className="group relative overflow-hidden rounded-lg border hover:border-primary/30 transition-all duration-300">
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${badge.color} shadow-lg`}>
                                <badge.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{badge.name}</span>
                                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                                    badge.rarity === 'legendary' ? 'bg-purple-500/20 text-purple-600' :
                                    badge.rarity === 'epic' ? 'bg-orange-500/20 text-orange-600' :
                                    'bg-blue-500/20 text-blue-600'
                                  }`}>
                                    {badge.rarity}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {badge.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Rewards Overview */}
            <Card className="bg-card border shadow-sm">
              <div className="p-6 bg-muted/30 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Exclusive Rewards</h3>
                    <p className="text-sm text-muted-foreground">Level up benefits</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "Crypto rewards for critical vulnerabilities", color: "text-green-600" },
                    { icon: Shield, text: "Premium security tool access", color: "text-blue-600" },
                    { icon: Crown, text: "Priority on high-value contracts", color: "text-purple-600" },
                    { icon: Users, text: "Exclusive community recognition", color: "text-orange-600" }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className={`p-2 rounded-lg bg-background shadow-sm ${reward.color}`}>
                        <reward.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{reward.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link to="/service-provider-onboarding">
                    Become a Security Auditor
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
