import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuditRequest } from '@/types/audit-request.types';

export class AuditService {
  // Get all audit requests for the current user
  static async getUserAuditRequests(userId: string): Promise<AuditRequest[]> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('client_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch audit requests:', error);
      toast.error('Failed to load audit requests');
      return [];
    }
  }

  // Get a specific audit request by ID
  static async getAuditRequest(id: string): Promise<AuditRequest | null> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch audit request:', error);
      return null;
    }
  }

  // Get all pending audit requests (for auditors)
  static async getPendingAuditRequests(): Promise<AuditRequest[]> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          profiles:client_id (
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch pending audit requests:', error);
      return [];
    }
  }

  // Update audit request status
  static async updateAuditStatus(id: string, status: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Audit status updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update audit status:', error);
      toast.error('Failed to update audit status');
      return false;
    }
  }

  // Assign auditor to audit request
  static async assignAuditor(auditId: string, auditorId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          assigned_auditor_id: auditorId,
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', auditId);

      if (error) throw error;
      
      toast.success('Auditor assigned successfully');
      return true;
    } catch (error) {
      console.error('Failed to assign auditor:', error);
      toast.error('Failed to assign auditor');
      return false;
    }
  }

  // Create or get chat room for audit request and auditor
  static async getOrCreateAuditChatRoom(auditRequestId: string, clientId: string, auditorId: string): Promise<string | null> {
    try {
      // Define a type for chat rooms to avoid deep type instantiation
      interface ChatRoom {
        id: string;
        name: string;
        type: string;
        audit_request_id: string;
        participants: string[];
        created_at: string;
        [key: string]: any;
      }
      
      // Check if chat room already exists
      // Use any to break the deep type instantiation, then manually type the result
      const chatRoomsResult = await (supabase as any)
        .from('chat_rooms')
        .select('*')
        .eq('type', 'audit')
        .eq('audit_request_id', auditRequestId)
        .contains('participants', [clientId, auditorId]);

      if (chatRoomsResult.error) throw chatRoomsResult.error;
      
      const existingRooms = chatRoomsResult.data as ChatRoom[] | null;
      if (existingRooms && existingRooms.length > 0) {
        return existingRooms[0].id;
      }

      // Create new chat room
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert({
          name: `Audit Chat: ${auditRequestId}`,
          type: 'audit',
          participants: [clientId, auditorId],
          audit_request_id: auditRequestId,
          metadata: { audit_request_id: auditRequestId, client_id: clientId, auditor_id: auditorId }
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Failed to create or get audit chat room:', error);
      toast.error('Failed to create chat room');
      return null;
    }
  }
}
