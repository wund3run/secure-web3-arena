
import { supabase } from '@/integrations/supabase/client';
import { Logger } from '../logging/logger';

export class DatabaseRelationshipManager {
  private static async ensureExtendedProfile(userId: string) {
    try {
      // Check if extended profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('extended_profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (!existingProfile) {
        // Create extended profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('extended_profiles')
          .insert({
            id: userId,
            verification_status: 'pending'
          });

        if (insertError) {
          Logger.error('Failed to create extended profile', {
            metadata: { userId, error: insertError.message }
          }, 'database');
          throw insertError;
        }
      }

      return true;
    } catch (error) {
      Logger.error('Extended profile relationship error', {
        metadata: { userId, error: error instanceof Error ? error.message : 'Unknown error' }
      }, 'database');
      return false;
    }
  }

  static async getAuditorWithProfile(auditorId: string) {
    await this.ensureExtendedProfile(auditorId);
    
    const { data, error } = await supabase
      .from('auditor_profiles')
      .select(`
        *,
        extended_profiles!inner(
          full_name,
          display_name,
          bio,
          avatar_url,
          verification_status,
          skills,
          specializations
        )
      `)
      .eq('user_id', auditorId)
      .single();

    if (error) {
      Logger.error('Failed to fetch auditor with profile', {
        metadata: { auditorId, error: error.message }
      }, 'database');
    }

    return { data, error };
  }

  static async getAuditRequestWithRelations(requestId: string) {
    const { data, error } = await supabase
      .from('audit_requests')
      .select(`
        *,
        extended_profiles!audit_requests_client_id_fkey(
          full_name,
          display_name,
          avatar_url
        ),
        assigned_auditor:extended_profiles!audit_requests_assigned_auditor_id_fkey(
          full_name,
          display_name,
          avatar_url
        ),
        audit_milestones(*),
        audit_findings(*)
      `)
      .eq('id', requestId)
      .single();

    if (error) {
      Logger.error('Failed to fetch audit request with relations', {
        metadata: { requestId, error: error.message }
      }, 'database');
    }

    return { data, error };
  }

  static async createAuditRequestWithProfile(clientId: string, requestData: any) {
    await this.ensureExtendedProfile(clientId);
    
    const { data, error } = await supabase
      .from('audit_requests')
      .insert({
        ...requestData,
        client_id: clientId
      })
      .select()
      .single();

    if (error) {
      Logger.error('Failed to create audit request', {
        metadata: { clientId, error: error.message }
      }, 'database');
    }

    return { data, error };
  }
}
