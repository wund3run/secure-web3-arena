
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, HelpCircle, Shield } from "lucide-react";
import { cn } from '@/lib/utils';

export interface RiskCategory {
  name: string;
  score: number;
  maxScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low' | 'none';
  description?: string;
}

export interface SecurityScorecardProps {
  projectName: string;
  overallScore: number;
  categories: RiskCategory[];
  lastUpdated?: string;
  className?: string;
}

const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'critical': return 'bg-red-500 text-white';
    case 'high': return 'bg-orange-500 text-white';
    case 'medium': return 'bg-yellow-500 text-black';
    case 'low': return 'bg-green-500 text-white';
    case 'none': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical':
    case 'high':
      return <AlertTriangle className="h-4 w-4" />;
    case 'medium':
      return <HelpCircle className="h-4 w-4" />;
    case 'low':
    case 'none':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

export function SecurityRiskScorecard({ 
  projectName, 
  overallScore, 
  categories,
  lastUpdated,
  className
}: SecurityScorecardProps) {
  // Calculate the risk level based on overall score
  const getOverallRiskLevel = () => {
    if (overallScore < 40) return 'critical';
    if (overallScore < 60) return 'high';
    if (overallScore < 80) return 'medium';
    if (overallScore < 95) return 'low';
    return 'none';
  };
  
  const riskLevel = getOverallRiskLevel();
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-muted/50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">{projectName} Security Scorecard</CardTitle>
            <CardDescription>
              {lastUpdated ? `Last updated: ${lastUpdated}` : 'Security risk assessment'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Overall Risk:</span>
            <Badge className={cn("capitalize", getRiskColor(riskLevel))}>
              {getRiskIcon(riskLevel)}
              <span className="ml-1">{riskLevel}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Overall Security Score</h3>
          <span className="text-2xl font-bold">{overallScore}/100</span>
        </div>
        
        <div className="h-4 relative w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full",
              overallScore < 40 ? "bg-red-500" :
              overallScore < 60 ? "bg-orange-500" :
              overallScore < 80 ? "bg-yellow-500" :
              "bg-green-500"
            )}
            style={{ width: `${overallScore}%` }}
          />
        </div>
        
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Risk Categories</h3>
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{category.name}</span>
                  <Badge className={cn("capitalize", getRiskColor(category.riskLevel))}>
                    {getRiskIcon(category.riskLevel)}
                    <span className="ml-1">{category.riskLevel}</span>
                  </Badge>
                </div>
                <span className="font-medium">{category.score}/{category.maxScore}</span>
              </div>
              
              <Progress 
                value={(category.score / category.maxScore) * 100} 
                className="h-2"
              />
              
              {category.description && (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 px-6 py-4 text-sm text-muted-foreground">
        Scores are calculated based on automated testing and expert review. Detailed reports are available in your dashboard.
      </CardFooter>
    </Card>
  );
}
