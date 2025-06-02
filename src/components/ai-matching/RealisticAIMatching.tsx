
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  Star, 
  DollarSign, 
  Clock, 
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Award
} from 'lucide-react';
import { AUDITOR_PROFILES } from '@/data/services';

interface MatchingCriteria {
  blockchain: string;
  projectType: string;
  budgetRange: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specificRequirements: string[];
}

interface AuditorMatch {
  auditor: typeof AUDITOR_PROFILES[0];
  matchScore: number;
  expertiseMatch: number;
  availabilityScore: number;
  budgetCompatibility: number;
  timelineMatch: number;
  reasons: string[];
}

export const RealisticAIMatching = () => {
  const [criteria, setCriteria] = useState<MatchingCriteria>({
    blockchain: '',
    projectType: '',
    budgetRange: [5000, 50000],
    timeline: '',
    complexity: 'medium',
    specificRequirements: [],
  });

  const [matches, setMatches] = useState<AuditorMatch[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateMatches = () => {
    setLoading(true);
    
    setTimeout(() => {
      const scoredMatches = AUDITOR_PROFILES.map(auditor => {
        // Calculate expertise match based on blockchain and specializations
        let expertiseMatch = 0;
        if (criteria.blockchain && auditor.blockchainExpertise.includes(criteria.blockchain)) {
          expertiseMatch += 0.4;
        }
        
        const projectTypeMap: Record<string, string[]> = {
          'defi': ['DeFi', 'Smart Contracts'],
          'nft': ['NFT Security', 'Marketplace Security'],
          'dao': ['DAO Security', 'Governance'],
          'bridge': ['Cross-Chain', 'Bridges'],
          'gaming': ['Gaming', 'NFT Security']
        };
        
        if (criteria.projectType && projectTypeMap[criteria.projectType]) {
          const relevantSpecs = projectTypeMap[criteria.projectType];
          const matchingSpecs = auditor.specializations.filter(spec => 
            relevantSpecs.some(relevant => spec.toLowerCase().includes(relevant.toLowerCase()))
          );
          expertiseMatch += (matchingSpecs.length / relevantSpecs.length) * 0.3;
        }
        
        expertiseMatch += Math.min(auditor.yearsExperience / 10, 0.3);

        // Calculate availability score
        const availabilityScore = auditor.availability === 'available' ? 
          (auditor.maxConcurrentAudits - auditor.currentAuditCount) / auditor.maxConcurrentAudits : 0.2;

        // Calculate budget compatibility
        const avgRate = (auditor.hourlyRateMin + auditor.hourlyRateMax) / 2;
        const estimatedCost = avgRate * 40; // Assuming 40 hours for base estimation
        const budgetCompatibility = estimatedCost <= criteria.budgetRange[1] ? 1.0 : 
          criteria.budgetRange[1] / estimatedCost;

        // Calculate timeline match
        const timelineScore = criteria.timeline === 'asap' ? 
          (auditor.responseTime === '1h' || auditor.responseTime === '2h' ? 1.0 : 0.7) :
          criteria.timeline === 'normal' ? 0.9 : 1.0;

        // Overall match score
        const matchScore = (
          expertiseMatch * 0.4 +
          availabilityScore * 0.25 +
          budgetCompatibility * 0.2 +
          timelineScore * 0.15
        );

        // Generate reasons for the match
        const reasons = [];
        if (expertiseMatch > 0.7) reasons.push('Strong expertise match');
        if (availabilityScore > 0.8) reasons.push('High availability');
        if (budgetCompatibility > 0.9) reasons.push('Budget compatible');
        if (auditor.averageRating >= 4.8) reasons.push('Top-rated auditor');
        if (auditor.totalAuditsCompleted > 100) reasons.push('Highly experienced');

        return {
          auditor,
          matchScore,
          expertiseMatch,
          availabilityScore,
          budgetCompatibility,
          timelineMatch: timelineScore,
          reasons
        };
      }).sort((a, b) => b.matchScore - a.matchScore);

      setMatches(scoredMatches.slice(0, 5));
      setLoading(false);
    }, 2000);
  };

  const handleRequirementAdd = (requirement: string) => {
    if (requirement && !criteria.specificRequirements.includes(requirement)) {
      setCriteria(prev => ({
        ...prev,
        specificRequirements: [...prev.specificRequirements, requirement],
      }));
    }
  };

  const handleRequirementRemove = (requirement: string) => {
    setCriteria(prev => ({
      ...prev,
      specificRequirements: prev.specificRequirements.filter(r => r !== requirement),
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Auditor Matching
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="blockchain">Blockchain</Label>
              <Select value={criteria.blockchain} onValueChange={(value) => setCriteria(prev => ({ ...prev, blockchain: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Solana">Solana</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Binance Smart Chain">Binance Smart Chain</SelectItem>
                  <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={criteria.projectType} onValueChange={(value) => setCriteria(prev => ({ ...prev, projectType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defi">DeFi Protocol</SelectItem>
                  <SelectItem value="nft">NFT Platform</SelectItem>
                  <SelectItem value="bridge">Cross-chain Bridge</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={criteria.timeline} onValueChange={(value) => setCriteria(prev => ({ ...prev, timeline: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP (1-2 weeks)</SelectItem>
                  <SelectItem value="normal">Normal (2-4 weeks)</SelectItem>
                  <SelectItem value="flexible">Flexible (4+ weeks)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complexity">Project Complexity</Label>
              <Select value={criteria.complexity} onValueChange={(value) => setCriteria(prev => ({ ...prev, complexity: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Simple contracts</SelectItem>
                  <SelectItem value="medium">Medium - Standard protocols</SelectItem>
                  <SelectItem value="high">High - Complex systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Budget Range: ${criteria.budgetRange[0].toLocaleString()} - ${criteria.budgetRange[1].toLocaleString()}</Label>
            <Slider
              value={criteria.budgetRange}
              onValueChange={(value) => setCriteria(prev => ({ ...prev, budgetRange: value as [number, number] }))}
              max={100000}
              min={1000}
              step={1000}
              className="w-full"
            />
          </div>

          <Button 
            onClick={calculateMatches} 
            className="w-full" 
            disabled={loading || !criteria.blockchain || !criteria.projectType}
          >
            {loading ? 'Analyzing...' : 'Find Best Matches'}
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Brain className="h-12 w-12 mx-auto text-blue-500 animate-pulse" />
              <h3 className="text-lg font-semibold">AI is analyzing your requirements...</h3>
              <Progress value={65} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Evaluating {AUDITOR_PROFILES.length} auditors based on expertise, availability, and compatibility
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {matches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top AI Matches ({matches.length} found)
          </h3>
          {matches.map((match, index) => (
            <Card key={match.auditor.id} className={`border-l-4 ${index === 0 ? 'border-l-yellow-500' : 'border-l-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold">{match.auditor.name}</h4>
                      {index === 0 && <Badge className="bg-yellow-500 text-white">Best Match</Badge>}
                      <Badge variant="secondary">
                        {Math.round(match.matchScore * 100)}% match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {match.auditor.bio}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {match.auditor.averageRating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        {match.auditor.totalAuditsCompleted} audits
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {match.auditor.yearsExperience} years
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {match.auditor.responseTime} response
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${match.auditor.hourlyRateMin}-${match.auditor.hourlyRateMax}/hr
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {match.auditor.availability === 'available' ? 'Available' : 'Busy'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.auditor.specializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Blockchain Experience:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.auditor.blockchainExpertise.map((blockchain) => (
                        <Badge key={blockchain} variant="secondary" className="text-xs">
                          {blockchain}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Why this is a good match:</p>
                    <div className="flex flex-wrap gap-2">
                      {match.reasons.map((reason) => (
                        <span key={reason} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">Expertise</div>
                      <div>{Math.round(match.expertiseMatch * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Availability</div>
                      <div>{Math.round(match.availabilityScore * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Budget</div>
                      <div>{Math.round(match.budgetCompatibility * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Timeline</div>
                      <div>{Math.round(match.timelineMatch * 100)}%</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">Contact Auditor</Button>
                    <Button size="sm" variant="outline">View Profile</Button>
                    <Button size="sm" variant="outline">Request Quote</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
