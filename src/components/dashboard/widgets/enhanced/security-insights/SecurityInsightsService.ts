
import { supabase } from '@/integrations/supabase/client';

export interface SecurityData {
  averageScore: number;
  vulnerabilitiesFixed: number;
  securityTrend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  recentFindings: Array<{
    severity: string;
    count: number;
  }>;
}

export async function fetchSecurityInsights(userId: string): Promise<SecurityData> {
  try {
    const { data, error } = await supabase
      .from('audit_requests')
      .select('id, security_score')
      .eq('client_id', userId)
      .not('security_score', 'is', null);

    if (error) throw error;

    const scores = data?.map(d => d.security_score).filter(Boolean) || [];
    const averageScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // Fetch audit findings for vulnerability count
    const auditRequestIds = data?.map(req => req.id) || [];
    
    let findingsData = [];
    if (auditRequestIds.length > 0) {
      const { data: findings, error: findingsError } = await supabase
        .from('audit_findings')
        .select('severity, status')
        .in('audit_request_id', auditRequestIds);

      if (findingsError) {
        console.error('Error fetching findings:', findingsError);
      } else {
        findingsData = findings || [];
      }
    }

    const vulnerabilitiesFixed = findingsData.filter(f => f.status === 'fixed').length || 0;

    // Mock trend calculation - in real app, compare with previous period
    const securityTrend: 'up' | 'down' | 'stable' = averageScore > 75 ? 'up' : averageScore < 50 ? 'down' : 'stable';
    const riskLevel: 'low' | 'medium' | 'high' = averageScore > 80 ? 'low' : averageScore > 60 ? 'medium' : 'high';

    // Process findings by severity
    const findingsBySeverity = findingsData.reduce((acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      averageScore,
      vulnerabilitiesFixed,
      securityTrend,
      riskLevel,
      recentFindings: [
        { severity: 'critical', count: findingsBySeverity.critical || 0 },
        { severity: 'high', count: findingsBySeverity.high || 0 },
        { severity: 'medium', count: findingsBySeverity.medium || 0 },
        { severity: 'low', count: findingsBySeverity.low || 0 }
      ]
    };
  } catch (error) {
    console.error('Error fetching security insights:', error);
    throw error;
  }
}
