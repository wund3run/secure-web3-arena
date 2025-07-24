import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { withErrorHandling } from '@/utils/apiErrorHandler';

export interface CodeAnalysisRequest {
  code: string;
  language: 'solidity' | 'vyper' | 'rust' | 'javascript';
  analysisType: 'security' | 'gas' | 'compliance' | 'full';
}

export interface AIAnalysisResult {
  securityScore: number;
  vulnerabilities: Array<{
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    category: string;
    title: string;
    description: string;
    location: {
      file?: string;
      line?: number;
      column?: number;
    };
    recommendation: string;
    confidence: number;
  }>;
  gasOptimizations: Array<{
    function: string;
    suggestion: string;
    estimatedSavings: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  complianceChecks: {
    standards: string[];
    violations: Array<{
      standard: string;
      violation: string;
      severity: string;
    }>;
  };
  summary: {
    totalIssues: number;
    criticalIssues: number;
    gasOptimizationPotential: number;
    overallRating: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

export class AIAnalysisService {
  static async analyzeCode(request: CodeAnalysisRequest): Promise<AIAnalysisResult | null> {
    return withErrorHandling(async () => {
      console.log('Starting AI code analysis...', request.analysisType);
      const { data, error } = await supabase.functions.invoke('ai-code-analysis', {
        body: request
      });
      if (error) throw error;
      toast.success('Code analysis completed successfully');
      return data as AIAnalysisResult;
    }, {
      customMessage: 'Failed to analyze code with AI',
      context: 'AIAnalysisService',
      retryable: true
    });
  }

  static async generateAuditReport(auditId: string, findings: unknown[]): Promise<string | null> {
    return withErrorHandling(async () => {
      const { data, error } = await supabase.functions.invoke('generate-audit-report', {
        body: { auditId, findings }
      });
      if (error) throw error;
      return data.reportContent;
    }, {
      customMessage: 'Failed to generate audit report',
      context: 'AIAnalysisService',
      retryable: true
    });
  }

  static async detectAnomalies(contractData: unknown): Promise<unknown[]> {
    return withErrorHandling(async () => {
      const { data, error } = await supabase.functions.invoke('detect-anomalies', {
        body: { contractData }
      });
      if (error) throw error;
      return data.anomalies || [];
    }, {
      customMessage: 'Failed to detect anomalies',
      context: 'AIAnalysisService',
      retryable: true
    });
  }
}
