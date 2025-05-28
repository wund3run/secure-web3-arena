
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export class PlatformService {
  // Dashboard statistics
  static async getDashboardStats(userId: string, userType: string) {
    try {
      const stats: any = {};

      if (userType === 'project_owner') {
        // Get client-specific stats
        const { data: auditRequests } = await supabase
          .from('audit_requests')
          .select('id, status')
          .eq('client_id', userId);

        // Mock payment data since payments table doesn't exist in types yet
        const mockPayments = [
          { amount: 1500, status: 'completed' },
          { amount: 2500, status: 'completed' }
        ];

        stats.totalRequests = auditRequests?.length || 0;
        stats.activeRequests = auditRequests?.filter(r => r.status === 'pending' || r.status === 'in_progress').length || 0;
        stats.totalSpent = mockPayments.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      } else if (userType === 'auditor') {
        // Mock proposal data since proposals table doesn't exist in types yet
        const mockProposals = [
          { id: '1', status: 'pending' },
          { id: '2', status: 'accepted' }
        ];

        const { data: completedAudits } = await supabase
          .from('audit_requests')
          .select('id')
          .eq('status', 'completed');

        // Mock earnings data
        const mockEarnings = [
          { amount: 3000, status: 'completed' },
          { amount: 4500, status: 'completed' }
        ];

        stats.totalProposals = mockProposals.length || 0;
        stats.activeProposals = mockProposals.filter(p => p.status === 'pending').length || 0;
        stats.completedAudits = completedAudits?.length || 0;
        stats.totalEarnings = mockEarnings.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      }

      return stats;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      return {};
    }
  }

  // Search functionality
  static async searchPlatform(query: string, filters?: {
    type?: 'services' | 'auditors' | 'requests';
    category?: string;
    blockchain?: string;
  }) {
    try {
      const results: any = {
        services: [],
        auditors: [],
        requests: []
      };

      if (!filters?.type || filters.type === 'services') {
        const { data: services } = await supabase
          .from('services')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(10);
        
        results.services = services || [];
      }

      if (!filters?.type || filters.type === 'auditors') {
        const { data: auditors } = await supabase
          .from('profiles')
          .select('*')
          .or(`full_name.ilike.%${query}%`)
          .limit(10);
        
        results.auditors = auditors || [];
      }

      if (!filters?.type || filters.type === 'requests') {
        const { data: requests } = await supabase
          .from('audit_requests')
          .select('*')
          .or(`project_name.ilike.%${query}%,project_description.ilike.%${query}%`)
          .eq('status', 'pending')
          .limit(10);
        
        results.requests = requests || [];
      }

      return results;
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Search failed');
      return { services: [], auditors: [], requests: [] };
    }
  }

  // Matching algorithm for audit requests and auditors
  static async getMatchingAuditors(auditRequestId: string) {
    try {
      const { data: auditRequest } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditRequestId)
        .single();

      if (!auditRequest) return [];

      const { data: auditors } = await supabase
        .from('profiles')
        .select('*');

      // Simple matching based on available data
      const matchedAuditors = auditors?.filter(auditor => {
        // For now, just return all auditors since specializations field doesn't exist in current schema
        return true;
      }) || [];

      // Sort by a simple metric (could be reputation when available)
      return matchedAuditors.sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''));
    } catch (error) {
      console.error('Failed to match auditors:', error);
      return [];
    }
  }

  // Platform analytics
  static async getPlatformAnalytics() {
    try {
      const [
        { count: totalUsers },
        { count: totalServices },
        { count: totalAuditRequests },
        { count: completedAudits }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('audit_requests').select('*', { count: 'exact', head: true }),
        supabase.from('audit_requests').select('*', { count: 'exact', head: true }).eq('status', 'completed')
      ]);

      return {
        totalUsers: totalUsers || 0,
        totalServices: totalServices || 0,
        totalAuditRequests: totalAuditRequests || 0,
        completedAudits: completedAudits || 0,
        successRate: totalAuditRequests ? ((completedAudits || 0) / totalAuditRequests * 100).toFixed(1) : '0'
      };
    } catch (error) {
      console.error('Failed to fetch platform analytics:', error);
      return {
        totalUsers: 0,
        totalServices: 0,
        totalAuditRequests: 0,
        completedAudits: 0,
        successRate: '0'
      };
    }
  }
}
