
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Users } from 'lucide-react';

const ChallengesPage = () => {
  return (
    <StandardLayout
      title="Security Challenges | Hawkly"
      description="Test your Web3 security skills with challenges and competitions"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Challenges
          </h1>
          <p className="text-xl text-muted-foreground">
            Test and improve your Web3 security skills with real-world challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Reentrancy Attack Challenge",
              description: "Find and exploit a reentrancy vulnerability in this smart contract",
              difficulty: "Intermediate",
              participants: 142,
              timeLimit: "2 hours",
              reward: "500 HAWK tokens",
              status: "active"
            },
            {
              title: "DeFi Flash Loan Exploit",
              description: "Identify how to exploit this DeFi protocol using flash loans",
              difficulty: "Advanced",
              participants: 67,
              timeLimit: "4 hours",
              reward: "1000 HAWK tokens",
              status: "active"
            },
            {
              title: "NFT Metadata Manipulation",
              description: "Discover vulnerabilities in NFT metadata handling",
              difficulty: "Beginner",
              participants: 234,
              timeLimit: "1 hour",
              reward: "250 HAWK tokens",
              status: "completed"
            }
          ].map((challenge, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={
                      challenge.difficulty === 'Beginner' ? 'secondary' :
                      challenge.difficulty === 'Intermediate' ? 'default' : 'destructive'
                    }
                  >
                    {challenge.difficulty}
                  </Badge>
                  <Badge 
                    variant={challenge.status === 'active' ? 'default' : 'outline'}
                    className={challenge.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {challenge.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{challenge.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Participants</span>
                    </div>
                    <span className="font-medium">{challenge.participants}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Time Limit</span>
                    </div>
                    <span className="font-medium">{challenge.timeLimit}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-muted-foreground">Reward</span>
                    </div>
                    <span className="font-medium text-hawkly-primary">{challenge.reward}</span>
                  </div>
                </div>
                
                <Button className="w-full" disabled={challenge.status === 'completed'}>
                  {challenge.status === 'active' ? 'Start Challenge' : 'View Results'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <Trophy className="h-12 w-12 text-hawkly-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Weekly Challenge Championship</h2>
            <p className="text-muted-foreground mb-6">
              Compete with the best security experts and win exclusive rewards. New challenges every Monday!
            </p>
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              Join Championship
            </Button>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default ChallengesPage;
