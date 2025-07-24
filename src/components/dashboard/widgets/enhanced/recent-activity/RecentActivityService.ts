
import { supabase } from '@/integrations/supabase/client';

export interface RecentActivity {
  id: string;
  type: 'message' | 'audit_update' | 'payment' | 'milestone' | 'proposal';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

export async function fetchRecentActivity(userId: string): Promise<RecentActivity[]> {
  try {
    const activities: RecentActivity[] = [];

    // Fetch recent messages - using basic query without join since relation doesn't exist
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('receiver_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (messages) {
      // Get unique sender IDs and fetch their profiles
      const senderIds = [...new Set(messages.map(msg => msg.sender_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', senderIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      messages.forEach(message => {
        const senderProfile = profileMap.get(message.sender_id);
        activities.push({
          id: message.id,
          type: 'message',
          title: 'New Message',
          description: message.content.substring(0, 100) + (message.content.length > 100 ? '...' : ''),
          timestamp: message.created_at,
          user_name: senderProfile?.full_name || 'Unknown User',
          avatar_url: senderProfile?.avatar_url,
        });
      });
    }

    // Fetch recent audit updates
    const { data: auditUpdates } = await supabase
      .from('audit_status_updates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (auditUpdates) {
      auditUpdates.forEach(update => {
        activities.push({
          id: update.id,
          type: 'audit_update',
          title: update.title,
          description: update.message || 'Audit status updated',
          timestamp: update.created_at,
        });
      });
    }

    // Fetch recent payment transactions
    const { data: payments } = await supabase
      .from('payment_transactions')
      .select('*')
      .or(`client_id.eq.${userId},auditor_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(3);

    if (payments) {
      payments.forEach(payment => {
        activities.push({
          id: payment.id,
          type: 'payment',
          title: 'Payment Update',
          description: `Payment ${payment.status}: $${payment.amount}`,
          timestamp: payment.created_at,
        });
      });
    }

    // Fetch recent milestone completions
    const { data: milestones } = await supabase
      .from('audit_milestones')
      .select('*, audit_requests!inner(client_id)')
      .eq('audit_requests.client_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(3);

    if (milestones) {
      milestones.forEach(milestone => {
        activities.push({
          id: milestone.id,
          type: 'milestone',
          title: 'Milestone Completed',
          description: `"${milestone.title}" has been completed`,
          timestamp: milestone.completed_at || milestone.updated_at,
        });
      });
    }

    // Sort all activities by timestamp and return top 10
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}
