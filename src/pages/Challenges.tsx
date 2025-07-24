import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Trophy, 
  Clock, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Lock,
  Zap,
  Shield,
  Code,
  Search
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';

const Challenges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Challenges' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Reentrancy Attack Detection',
      description: 'Identify and fix reentrancy vulnerabilities in this smart contract',
      difficulty: 'intermediate',
      category: 'Smart Contracts',
      points: 500,
      timeLimit: '45 minutes',
      participants: 1247,
      completionRate: 68,
      status: 'available',
      prerequisites: ['Solidity Basics', 'Security Fundamentals'],
      tags: ['reentrancy', 'solidity', 'vulnerabilities'],
      reward: '500 XP + NFT Badge'
    },
    {
      id: 2,
      title: 'Flash Loan Arbitrage Attack',
      description: 'Execute a flash loan attack simulation and propose defense mechanisms',
      difficulty: 'advanced',
      category: 'DeFi',
      points: 1000,
      timeLimit: '90 minutes',
      participants: 567,
      completionRate: 34,
      status: 'available',
      prerequisites: ['DeFi Protocols', 'Flash Loans', 'Advanced Security'],
      tags: ['flash-loans', 'defi', 'arbitrage'],
      reward: '1000 XP + Rare NFT'
    },
    {
      id: 3,
      title: 'Smart Contract Basics',
      description: 'Learn the fundamentals of smart contract security',
      difficulty: 'beginner',
      category: 'Fundamentals',
      points: 200,
      timeLimit: '30 minutes',
      participants: 2341,
      completionRate: 89,
      status: 'completed',
      prerequisites: [],
      tags: ['basics', 'smart-contracts', 'security'],
      reward: '200 XP + Certificate'
    },
    {
      id: 4,
      title: 'Multi-signature Wallet Security',
      description: 'Advanced multi-sig implementation and security analysis',
      difficulty: 'expert',
      category: 'Wallets',
      points: 1500,
      timeLimit: '120 minutes',
      participants: 234,
      completionRate: 23,
      status: 'locked',
      prerequisites: ['Advanced Cryptography', 'Wallet Security', 'Multi-sig Protocols'],
      tags: ['multisig', 'wallets', 'cryptography'],
      reward: '1500 XP + Legendary Badge'
    }
  ];

  const filteredChallenges = challenges.filter(challenge => 
    selectedCategory === 'all' || challenge.difficulty === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'completed':
        return 'text-blue-600';
      case 'locked':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'locked':
        return <Lock className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <StandardLayout
      title="Security Challenges | Hawkly"
      description="Practice and improve your security skills with hands-on challenges and competitions"
    >
      <AppContainer maxWidth="max-w-7xl" padding="px-4 py-8" elevation>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Challenges
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your skills, learn new techniques, and compete with other security experts 
            through hands-on challenges and competitions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm text-muted-foreground">Active Challenges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">15.2K</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">3,847</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">892K</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <div className={`flex items-center gap-1 ${getStatusColor(challenge.status)}`}>
                        {getStatusIcon(challenge.status)}
                        <span className="text-sm capitalize">{challenge.status}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{challenge.points} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{challenge.timeLimit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span>{challenge.participants} joined</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        <span>{challenge.completionRate}% complete</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>{challenge.completionRate}%</span>
                      </div>
                      <Progress value={challenge.completionRate} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Prerequisites:</div>
                      <div className="flex flex-wrap gap-1">
                        {challenge.prerequisites.length > 0 ? (
                          challenge.prerequisites.map((prereq) => (
                            <Badge key={prereq} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Tags:</div>
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium mb-1">Reward:</div>
                      <div className="text-sm text-muted-foreground">{challenge.reward}</div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={challenge.status === 'locked'}
                      variant={challenge.status === 'completed' ? 'outline' : 'default'}
                    >
                      {challenge.status === 'locked' && <Lock className="h-4 w-4 mr-2" />}
                      {challenge.status === 'completed' && <CheckCircle className="h-4 w-4 mr-2" />}
                      {challenge.status === 'available' && <Play className="h-4 w-4 mr-2" />}
                      {challenge.status === 'locked' ? 'Locked' : 
                       challenge.status === 'completed' ? 'Review Solution' : 'Start Challenge'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Challenge */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Weekly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-semibold">Cross-Chain Bridge Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze and secure a cross-chain bridge protocol
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Time left</span>
                      <span className="font-medium">3d 12h</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Reward</span>
                      <span className="font-medium">2000 XP</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Join Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Smart Contract Security', progress: 75, challenges: 12 },
                    { name: 'DeFi Security', progress: 45, challenges: 8 },
                    { name: 'NFT Security', progress: 20, challenges: 6 }
                  ].map((path) => (
                    <div key={path.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{path.name}</span>
                        <span>{path.challenges} challenges</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {path.progress}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'First Blood', description: 'Completed first challenge', icon: Target },
                    { title: 'Speed Demon', description: 'Completed challenge in under 10 minutes', icon: Zap },
                    { title: 'Bug Hunter', description: 'Found 10 vulnerabilities', icon: Search }
                  ].map((achievement) => (
                    <div key={achievement.title} className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <achievement.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppContainer>
    </StandardLayout>
  );
};

export default Challenges;
