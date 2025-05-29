
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Brain, Layers, Sparkles } from 'lucide-react';

interface MLMatchingVisualizationProps {
  matchResults: any[];
  insights: any;
}

export const MLMatchingVisualization: React.FC<MLMatchingVisualizationProps> = ({ 
  matchResults, 
  insights 
}) => {
  // Generate confidence score trend data
  const confidenceTrend = matchResults.map((match, index) => ({
    name: `Match ${index + 1}`,
    confidence: match.match_score * 100,
    technical: match.compatibility_breakdown.technical_fit * 100,
    availability: match.compatibility_breakdown.availability_score * 100
  }));

  // Generate radar chart data for top match
  const radarData = matchResults.length > 0 ? [
    {
      subject: 'Technical Fit',
      value: matchResults[0].compatibility_breakdown.technical_fit * 100,
      fullMark: 100
    },
    {
      subject: 'Availability',
      value: matchResults[0].compatibility_breakdown.availability_score * 100,
      fullMark: 100
    },
    {
      subject: 'Experience',
      value: matchResults[0].compatibility_breakdown.experience_match * 100,
      fullMark: 100
    },
    {
      subject: 'Budget',
      value: matchResults[0].compatibility_breakdown.budget_compatibility * 100,
      fullMark: 100
    },
    {
      subject: 'Quality',
      value: matchResults[0].compatibility_breakdown.quality_score * 100,
      fullMark: 100
    },
    {
      subject: 'Workload',
      value: matchResults[0].compatibility_breakdown.workload_feasibility * 100,
      fullMark: 100
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Confidence Score Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={confidenceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Overall Confidence"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="technical" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="Technical Fit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Top Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Compatibility"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            ML Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Neural Network Layers</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Input Layer</span>
                  <Badge variant="outline">256 nodes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hidden Layers</span>
                  <Badge variant="outline">3 x 128 nodes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Output Layer</span>
                  <Badge variant="outline">1 node</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="font-medium">Training Metrics</span>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Model Accuracy</span>
                    <span className="text-sm font-medium">94.7%</span>
                  </div>
                  <Progress value={94.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Precision</span>
                    <span className="text-sm font-medium">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Recall</span>
                    <span className="text-sm font-medium">88.9%</span>
                  </div>
                  <Progress value={88.9} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="font-medium">Feature Engineering</span>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Features Extracted:</span>
                  <span className="font-medium ml-2">47</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Dimensionality:</span>
                  <span className="font-medium ml-2">Reduced 80%</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Data Quality:</span>
                  <Badge variant="default" className="ml-2">Excellent</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
