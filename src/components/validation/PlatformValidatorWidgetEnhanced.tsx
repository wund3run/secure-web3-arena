
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlatformValidator } from "@/utils/validation/hooks/usePlatformValidator";
import { validateAccessibility } from "@/utils/validation/validators/accessibility-validator";
import { ValidationIssue, StakeholderType } from "@/utils/validation/types";
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Eye,
  Smartphone,
  Zap,
  Shield,
  Target
} from "lucide-react";

interface PlatformValidatorWidgetEnhancedProps {
  stakeholderType?: StakeholderType;
  showDetailedView?: boolean;
  className?: string;
}

export function PlatformValidatorWidgetEnhanced({ 
  stakeholderType = 'developer',
  showDetailedView = false,
  className 
}: PlatformValidatorWidgetEnhancedProps) {
  const [a11yIssues, setA11yIssues] = useState<ValidationIssue[]>([]);
  const [isValidatingA11y, setIsValidatingA11y] = useState(false);
  
  const { 
    issues, 
    isValidating, 
    lastValidated, 
    runValidation 
  } = usePlatformValidator({ 
    stakeholderType,
    includePerformance: true,
    filterBySeverity: ['high', 'medium']
  });

  const runAccessibilityCheck = async () => {
    setIsValidatingA11y(true);
    try {
      const accessibilityIssues = validateAccessibility();
      setA11yIssues(accessibilityIssues);
    } catch (error) {
      console.error('Accessibility validation failed:', error);
    } finally {
      setIsValidatingA11y(false);
    }
  };

  const allIssues = [...issues, ...a11yIssues];
  const highIssues = allIssues.filter(issue => issue.severity === 'high');
  const mediumIssues = allIssues.filter(issue => issue.severity === 'medium');
  const lowIssues = allIssues.filter(issue => issue.severity === 'low');

  const getScoreByCategory = (type: string) => {
    const categoryIssues = allIssues.filter(issue => issue.type === type);
    const maxScore = 100;
    const deduction = categoryIssues.reduce((acc, issue) => {
      return acc + (issue.severity === 'high' ? 25 : issue.severity === 'medium' ? 10 : 5);
    }, 0);
    return Math.max(0, maxScore - deduction);
  };

  const overallScore = Math.round(
    (getScoreByCategory('ui') + 
     getScoreByCategory('accessibility') + 
     getScoreByCategory('performance') + 
     getScoreByCategory('seo')) / 4
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Platform Validator Enhanced
          </CardTitle>
          <Badge 
            variant={getScoreBadgeVariant(overallScore)}
            className="text-lg px-3 py-1"
          >
            {overallScore}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={runValidation} 
            disabled={isValidating}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isValidating ? 'animate-spin' : ''}`} />
            {isValidating ? 'Validating...' : 'Run Validation'}
          </Button>
          
          <Button 
            onClick={runAccessibilityCheck} 
            disabled={isValidatingA11y}
            size="sm"
            variant="outline"
          >
            <Shield className={`mr-2 h-4 w-4 ${isValidatingA11y ? 'animate-spin' : ''}`} />
            {isValidatingA11y ? 'Checking A11y...' : 'Check Accessibility'}
          </Button>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <Eye className="h-5 w-5 mx-auto mb-1 text-blue-600" />
            <div className={`text-sm font-medium ${getScoreColor(getScoreByCategory('ui'))}`}>
              UI: {getScoreByCategory('ui')}%
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <Shield className="h-5 w-5 mx-auto mb-1 text-green-600" />
            <div className={`text-sm font-medium ${getScoreColor(getScoreByCategory('accessibility'))}`}>
              A11y: {getScoreByCategory('accessibility')}%
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-600" />
            <div className={`text-sm font-medium ${getScoreColor(getScoreByCategory('performance'))}`}>
              Perf: {getScoreByCategory('performance')}%
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <Smartphone className="h-5 w-5 mx-auto mb-1 text-purple-600" />
            <div className={`text-sm font-medium ${getScoreColor(getScoreByCategory('seo'))}`}>
              SEO: {getScoreByCategory('seo')}%
            </div>
          </div>
        </div>

        {/* Issues Summary */}
        {allIssues.length > 0 ? (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Found {allIssues.length} issues: {highIssues.length} high, {mediumIssues.length} medium, {lowIssues.length} low priority
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              No validation issues found. Platform is ready for production!
            </AlertDescription>
          </Alert>
        )}

        {/* Detailed Issues View */}
        {showDetailedView && allIssues.length > 0 && (
          <Tabs defaultValue="high" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="high" className="text-red-600">
                High ({highIssues.length})
              </TabsTrigger>
              <TabsTrigger value="medium" className="text-yellow-600">
                Medium ({mediumIssues.length})
              </TabsTrigger>
              <TabsTrigger value="low" className="text-blue-600">
                Low ({lowIssues.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="high" className="space-y-2">
              {highIssues.map((issue, index) => (
                <div key={index} className="p-3 border rounded-lg bg-red-50 border-red-200">
                  <div className="font-medium text-red-900">{issue.description}</div>
                  <div className="text-sm text-red-700">{issue.location}</div>
                  {issue.suggestion && (
                    <div className="text-sm text-red-600 mt-1">{issue.suggestion}</div>
                  )}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="medium" className="space-y-2">
              {mediumIssues.map((issue, index) => (
                <div key={index} className="p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="font-medium text-yellow-900">{issue.description}</div>
                  <div className="text-sm text-yellow-700">{issue.location}</div>
                  {issue.suggestion && (
                    <div className="text-sm text-yellow-600 mt-1">{issue.suggestion}</div>
                  )}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="low" className="space-y-2">
              {lowIssues.map((issue, index) => (
                <div key={index} className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="font-medium text-blue-900">{issue.description}</div>
                  <div className="text-sm text-blue-700">{issue.location}</div>
                  {issue.suggestion && (
                    <div className="text-sm text-blue-600 mt-1">{issue.suggestion}</div>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}

        {lastValidated && (
          <div className="text-sm text-muted-foreground text-center">
            Last validated: {lastValidated.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
