
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
  CheckCircle
} from 'lucide-react';
import { useAIMatching } from '@/hooks/useAIMatching';
import { toast } from '@/components/ui/use-toast';

export const AIMatchingInterface = () => {
  const [criteria, setCriteria] = useState({
    blockchain: '',
    project_type: '',
    budget_range: [5000, 50000] as [number, number],
    timeline: '',
    complexity: 'medium' as 'low' | 'medium' | 'high',
    specific_requirements: [] as string[],
  });

  const { loading, matchingResults, calculateMatchingScore } = useAIMatching();

  const handleFindMatches = async () => {
    const mockAuditRequestId = 'demo-audit-request';
    try {
      await calculateMatchingScore(mockAuditRequestId);
      toast({
        title: "Analysis Started",
        description: "Your requirements are being analyzed for the best matches.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequirementAdd = (requirement: string) => {
    if (requirement && !criteria.specific_requirements.includes(requirement)) {
      setCriteria(prev => ({
        ...prev,
        specific_requirements: [...prev.specific_requirements, requirement],
      }));
      toast({
        title: "Requirement Added",
        description: `${requirement} has been added.`,
      });
    }
  };

  const handleRequirementRemove = (requirement: string) => {
    setCriteria(prev => ({
      ...prev,
      specific_requirements: prev.specific_requirements.filter(r => r !== requirement),
    }));
    toast({
      title: "Requirement Removed",
      description: `${requirement} has been removed.`,
    });
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
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="binance-smart-chain">Binance Smart Chain</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type</Label>
              <Select value={criteria.project_type} onValueChange={(value) => setCriteria(prev => ({ ...prev, project_type: value }))}>
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
            <Label>Budget Range: ${criteria.budget_range[0].toLocaleString()} - ${criteria.budget_range[1].toLocaleString()}</Label>
            <Slider
              value={criteria.budget_range}
              onValueChange={(value) => setCriteria(prev => ({ ...prev, budget_range: value as [number, number] }))}
              max={100000}
              min={1000}
              step={1000}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Specific Requirements</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {criteria.specific_requirements.map((req) => (
                <Badge key={req} variant="secondary" className="cursor-pointer" onClick={() => handleRequirementRemove(req)}>
                  {req} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add requirement (e.g., 'Formal verification')"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleRequirementAdd(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>

          <Button onClick={handleFindMatches} className="w-full" disabled={loading || !criteria.blockchain || !criteria.project_type}>
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
                Evaluating auditor profiles, expertise, availability, and past performance
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {matchingResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">AI Match Results</h3>
          {matchingResults.map((result) => (
            <Card key={result.auditor_id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      {result.auditor_profile?.full_name || 'Anonymous Auditor'}
                      <Badge className="bg-blue-500">
                        {Math.round(result.compatibility_score * 100)}% match
                      </Badge>
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {result.auditor_profile?.average_rating || 4.5}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        {result.auditor_profile?.total_audits_completed || 0} audits
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {result.auditor_profile?.years_experience || 0} years exp
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${result.auditor_profile?.hourly_rate_min || 0}-${result.auditor_profile?.hourly_rate_max || 0}/hr
                    </p>
                    <p className="text-sm text-muted-foreground">Estimated rate</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {result.auditor_profile?.blockchain_expertise?.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Match Details:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Expertise:</span>
                        <span>{Math.round(result.expertise_match * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span>{Math.round(result.availability_score * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget Fit:</span>
                        <span>{Math.round(result.budget_compatibility * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline:</span>
                        <span>{Math.round(result.timeline_feasibility * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm">View Profile</Button>
                    <Button size="sm" variant="outline">Send Message</Button>
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
