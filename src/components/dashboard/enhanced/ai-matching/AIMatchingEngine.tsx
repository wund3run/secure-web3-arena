
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Star, 
  Clock, 
  DollarSign,
  Users,
  Zap,
  Filter
} from 'lucide-react';

interface ProjectMatch {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  matchScore: number;
  skills: string[];
  blockchain: string;
  urgency: 'low' | 'medium' | 'high';
}

const mockMatches: ProjectMatch[] = [
  {
    id: '1',
    title: 'DeFi Yield Farming Protocol Audit',
    description: 'Comprehensive audit of a new yield farming protocol with multiple liquidity pools and staking mechanisms.',
    budget: 25000,
    timeline: '3-4 weeks',
    complexity: 'high',
    matchScore: 94,
    skills: ['DeFi', 'Solidity', 'Yield Farming', 'AMM'],
    blockchain: 'Ethereum',
    urgency: 'high'
  },
  {
    id: '2',
    title: 'NFT Marketplace Security Review',
    description: 'Security assessment of an NFT marketplace with custom royalty mechanisms and batch operations.',
    budget: 15000,
    timeline: '2-3 weeks',
    complexity: 'medium',
    matchScore: 87,
    skills: ['NFT', 'Marketplace', 'ERC-721', 'Royalties'],
    blockchain: 'Polygon',
    urgency: 'medium'
  },
  {
    id: '3',
    title: 'Cross-Chain Bridge Protocol',
    description: 'Multi-chain bridge protocol requiring expertise in cross-chain security patterns.',
    budget: 35000,
    timeline: '4-6 weeks',
    complexity: 'high',
    matchScore: 91,
    skills: ['Cross-Chain', 'Bridge', 'Multi-Sig', 'Consensus'],
    blockchain: 'Multi-Chain',
    urgency: 'high'
  }
];

export function AIMatchingEngine() {
  const [preferences, setPreferences] = useState({
    minBudget: 10000,
    maxProjects: 3,
    preferredTimeline: '2-4 weeks',
    skillFocus: 'DeFi',
    availability: 'full-time'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runMatching = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Matching Engine
          </h2>
          <p className="text-muted-foreground">Intelligent project matching based on your expertise and preferences</p>
        </div>
        <Button onClick={runMatching} disabled={isAnalyzing}>
          <Target className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Run Matching'}
        </Button>
      </div>

      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analyzing market opportunities...</span>
                <span className="text-sm text-muted-foreground">67%</span>
              </div>
              <Progress value={67} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preferences Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Matching Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="minBudget">Minimum Budget ($)</Label>
              <Input
                id="minBudget"
                type="number"
                value={preferences.minBudget}
                onChange={(e) => setPreferences(prev => ({ ...prev, minBudget: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <Label htmlFor="maxProjects">Max Concurrent Projects</Label>
              <Input
                id="maxProjects"
                type="number"
                value={preferences.maxProjects}
                onChange={(e) => setPreferences(prev => ({ ...prev, maxProjects: Number(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="skillFocus">Primary Skill Focus</Label>
              <Input
                id="skillFocus"
                value={preferences.skillFocus}
                onChange={(e) => setPreferences(prev => ({ ...prev, skillFocus: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <Input
                id="timeline"
                value={preferences.preferredTimeline}
                onChange={(e) => setPreferences(prev => ({ ...prev, preferredTimeline: e.target.value }))}
              />
            </div>

            <Button className="w-full" onClick={runMatching}>
              Update Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Matching Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recommended Projects</h3>
            <Badge variant="secondary">{mockMatches.length} matches found</Badge>
          </div>

          {mockMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{match.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{match.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-lg">{match.matchScore}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {match.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>${match.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{match.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={getComplexityColor(match.complexity) as any}>
                        {match.complexity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={getUrgencyColor(match.urgency) as any}>
                        {match.urgency} priority
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {match.blockchain} • Posted 2 hours ago
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <div className="text-sm text-muted-foreground">DeFi Project Demand</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$28K</div>
              <div className="text-sm text-muted-foreground">Average Rate (Your Skills)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3 days</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm text-muted-foreground">Match Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
