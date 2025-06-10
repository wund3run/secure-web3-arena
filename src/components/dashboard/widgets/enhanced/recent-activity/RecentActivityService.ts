
import { supabase } from '@/integrations/supabase/client';

export interface ActivityItem {
  id: string;
  type: 'audit_created' | 'audit_updated' | 'message_received' | 'report_generated';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

export async function fetchRecentActivity(userId: string): Promise<ActivityItem[]> {
  try {
    // Fetch recent audit activities
    const { data: auditData, error: auditError } = await supabase
      .from('audit_requests')
      .select('id, project_name, status, created_at, updated_at')
      .eq('client_id', userId)
      .order('updated_at', { ascending: false })
      .limit(10);

    if (auditError) throw auditError;

    const activities: ActivityItem[] = [];

    // Convert audit data to activities
    auditData?.forEach(audit => {
      activities.push({
        id: `audit-${audit.id}`,
        type: 'audit_created',
        title: 'Audit Request Created',
        description: audit.project_name || 'New audit request',
        timestamp: audit.created_at,
        metadata: { auditId: audit.id, status: audit.status }
      });

      if (audit.updated_at !== audit.created_at) {
        activities.push({
          id: `audit-updated-${audit.id}`,
          type: 'audit_updated',
          title: 'Audit Updated',
          description: `Status changed for "${audit.project_name}"`,
          timestamp: audit.updated_at,
          metadata: { auditId: audit.id, status: audit.status }
        });
      }
    });

    // Sort by timestamp and limit to recent activities
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
}
