import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  FileCode,
  TrendingUp,
  Shield
} from 'lucide-react';
import { AIAnalysisService, CodeAnalysisRequest, AIAnalysisResult } from '@/services/integrations/aiAnalysisService';
import { toast } from 'sonner';

export const AICodeAnalysisWidget = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'solidity' | 'vyper' | 'rust' | 'javascript'>('solidity');
  const [analysisType, setAnalysisType] = useState<'security' | 'gas' | 'compliance' | 'full'>('full');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to analyze');
      return;
    }

    setLoading(true);
    try {
      const request: CodeAnalysisRequest = {
        code,
        language,
        analysisType
      };

      const analysisResult = await AIAnalysisService.analyzeCode(request);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Code Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={language} onValueChange={(value: unknown) => {
                if (typeof value === 'string' && ['solidity', 'vyper', 'rust', 'javascript'].includes(value)) {
                  setLanguage(value as 'solidity' | 'vyper' | 'rust' | 'javascript');
                }
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solidity">Solidity</SelectItem>
                  <SelectItem value="vyper">Vyper</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Analysis Type</label>
              <Select value={analysisType} onValueChange={(value: unknown) => {
                if (typeof value === 'string' && ['security', 'gas', 'compliance', 'full'].includes(value)) {
                  setAnalysisType(value as 'security' | 'gas' | 'compliance' | 'full');
                }
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Analysis</SelectItem>
                  <SelectItem value="security">Security Only</SelectItem>
                  <SelectItem value="gas">Gas Optimization</SelectItem>
                  <SelectItem value="compliance">Compliance Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Code</label>
            <Textarea
              placeholder="Paste your smart contract code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !code.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Code...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{result.securityScore}/100</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                  <Progress value={result.securityScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{result.summary.totalIssues}</div>
                  <div className="text-sm text-muted-foreground">Total Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.summary.criticalIssues}</div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getRatingColor(result.summary.overallRating)}`}>
                    {result.summary.overallRating}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vulnerabilities */}
          {result.vulnerabilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Security Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{vuln.title}</h4>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                          <Badge variant="outline">{vuln.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vuln.confidence}% confidence
                      </div>
                    </div>
                    
                    {vuln.location.line && (
                      <div className="text-sm">
                        <span className="font-medium">Location: </span>
                        Line {vuln.location.line}
                        {vuln.location.file && ` in ${vuln.location.file}`}
                      </div>
                    )}
                    
                    <div className="bg-muted p-3 rounded text-sm">
                      <span className="font-medium">Recommendation: </span>
                      {vuln.recommendation}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Gas Optimizations */}
          {result.gasOptimizations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Gas Optimizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.gasOptimizations.map((opt, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{opt.function}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600">
                          -{opt.estimatedSavings} gas
                        </Badge>
                        <Badge variant="outline">{opt.difficulty}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{opt.suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Compliance */}
          {result.complianceChecks.violations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-blue-500" />
                  Compliance Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.complianceChecks.violations.map((violation, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{violation.standard}</h4>
                      <Badge className={getSeverityColor(violation.severity)}>
                        {violation.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{violation.violation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
