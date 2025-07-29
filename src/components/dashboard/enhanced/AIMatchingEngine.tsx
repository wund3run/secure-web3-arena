
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Users, Zap } from 'lucide-react';

export function AIMatchingEngine() {
  const matches = [
    {
      project: 'DeFi Lending Protocol',
      compatibility: 95,
      skills: ['DeFi', 'Lending', 'Solidity'],
      budget: '$15,000',
      timeline: '3 weeks'
    },
    {
      project: 'NFT Marketplace Audit',
      compatibility: 87,
      skills: ['NFT', 'Marketplace', 'ERC-721'],
      budget: '$8,000',
      timeline: '2 weeks'
    },
    {
      project: 'Cross-chain Bridge',
      compatibility: 82,
      skills: ['Cross-chain', 'Bridge', 'Security'],
      budget: '$25,000',
      timeline: '4 weeks'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Project Matching
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Target className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-700">3 New Matches</p>
              <p className="text-sm text-blue-600">High compatibility</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-green-700">12 Active Bids</p>
              <p className="text-sm text-green-600">Awaiting response</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Zap className="h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium text-purple-700">89% Success</p>
              <p className="text-sm text-purple-600">Match rate</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Recommended Projects</h4>
          {matches.map((match, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{match.project}</h5>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {match.compatibility}% match
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {match.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Budget: {match.budget}</span>
                <span>Timeline: {match.timeline}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Submit Proposal
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full" variant="outline">
          Update Matching Preferences
        </Button>
      </CardContent>
    </Card>
  );
}
