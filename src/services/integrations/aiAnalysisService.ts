
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    try {
      console.log('Starting AI code analysis...', request.analysisType);
      
      // Call Supabase Edge Function for AI analysis
      const { data, error } = await supabase.functions.invoke('ai-code-analysis', {
        body: request
      });

      if (error) throw error;

      toast.success('Code analysis completed successfully');
      return data as AIAnalysisResult;
    } catch (error) {
      console.error('Error in AI code analysis:', error);
      toast.error('Failed to analyze code with AI');
      return null;
    }
  }

  static async generateAuditReport(auditId: string, findings: any[]): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-audit-report', {
        body: { auditId, findings }
      });

      if (error) throw error;

      return data.reportContent;
    } catch (error) {
      console.error('Error generating audit report:', error);
      toast.error('Failed to generate audit report');
      return null;
    }
  }

  static async detectAnomalies(contractData: any): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('detect-anomalies', {
        body: { contractData }
      });

      if (error) throw error;

      return data.anomalies || [];
    } catch (error) {
      console.error('Error detecting anomalies:', error);
      return [];
    }
  }
}
