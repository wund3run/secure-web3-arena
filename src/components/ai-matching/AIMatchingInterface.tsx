
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Filter, Star } from 'lucide-react';
import { useAdvancedMatching } from '@/hooks/useAdvancedMatching';
import { toast } from 'sonner';

interface AuditorProfile {
  name: string;
  experience_years: number;
  expertise: string[];
  rating: number;
}

interface MatchingResult {
  auditor_profile: AuditorProfile;
  ml_confidence_score: number;
}

export const AIMatchingInterface: React.FC = () => {
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState([1000, 10000]);
  const [timeline, setTimeline] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  
  const { isProcessing, mlResults, runAdvancedMatching, generateMatchingReport } = useAdvancedMatching();

  const handleSearch = async () => {
    if (!projectType || !timeline) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const criteria = {
        technical_requirements: techStack,
        project_complexity: projectType as 'low' | 'medium' | 'high',
        budget_range: budget as [number, number],
        timeline_urgency: timeline as 'low' | 'normal' | 'high',
        quality_threshold: 0.8,
        past_performance_weight: 0.3,
        availability_weight: 0.2,
        cost_weight: 0.5,
      };

      await runAdvancedMatching(criteria);
      toast.success('AI matching completed successfully!');
    } catch (error) {
      toast.error('Failed to run AI matching');
    }
  };

  const generateReport = () => {
    if (mlResults.length === 0) {
      toast.error('No results to generate report from');
      return;
    }

    const report = generateMatchingReport(mlResults);
    toast.success(`Report generated: ${(report as any)?.summary?.recommendation || 'Generated successfully'}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Auditor Matching
          </CardTitle>
          <CardDescription>
            Use advanced machine learning to find the perfect security auditor for your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Complexity</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Complexity</SelectItem>
                  <SelectItem value="medium">Medium Complexity</SelectItem>
                  <SelectItem value="high">High Complexity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline Urgency</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Flexible (4+ weeks)</SelectItem>
                  <SelectItem value="normal">Standard (2-4 weeks)</SelectItem>
                  <SelectItem value="high">Urgent (&lt; 2 weeks)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={isProcessing} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              {isProcessing ? 'Processing...' : 'Find Matches'}
            </Button>
            <Button onClick={generateReport} variant="outline" disabled={mlResults.length === 0}>
              <Filter className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {mlResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI Match Results</CardTitle>
            <CardDescription>
              Found {mlResults.length} potential matches based on your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mlResults.map((result, index) => {
                const typedResult = result as MatchingResult;
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{typedResult.auditor_profile?.name || 'Unknown Auditor'}</h3>
                        <p className="text-sm text-muted-foreground">
                          {typedResult.auditor_profile?.experience_years || 0} years experience
                        </p>
                        <div className="flex gap-1 mt-2">
                          {(typedResult.auditor_profile?.expertise || []).map((skill: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{typedResult.auditor_profile?.rating || 0}</span>
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {Math.round((typedResult.ml_confidence_score || 0) * 100)}% Match
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
