import { supabase } from '@/integrations/supabase/client';

export interface EngagementOffer {
  id: string;
  audit_request_id: string;
  auditor_id: string;
  client_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  terms: any;
  created_at: string;
  updated_at: string;
}

export class EngagementOfferService {
  static async createOffer(auditRequestId: string, auditorId: string, clientId: string, terms: any): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .insert({
        audit_request_id: auditRequestId,
        auditor_id: auditorId,
        client_id: clientId,
        status: 'pending',
        terms,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async getOffersForAudit(auditRequestId: string): Promise<EngagementOffer[]> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .select('*')
      .eq('audit_request_id', auditRequestId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async updateOfferStatus(offerId: string, status: 'pending' | 'accepted' | 'rejected'): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .update({ status })
      .eq('id', offerId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async getOfferById(offerId: string): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .select('*')
      .eq('id', offerId)
      .single();
    if (error) throw error;
    return data;
  }

  static async getLatestOfferForAudit(auditRequestId: string, auditorId: string): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .select('*')
      .eq('audit_request_id', auditRequestId)
      .eq('auditor_id', auditorId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error) return null;
    return data;
  }

  static async acceptOrRejectOffer(offerId: string, status: 'accepted' | 'rejected'): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .update({ status })
      .eq('id', offerId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /**
   * Create a counter-offer for an engagement offer.
   * @param auditRequestId
   * @param auditorId
   * @param clientId
   * @param terms
   * @param parentOfferId (optional)
   */
  static async createCounterOffer(auditRequestId: string, auditorId: string, clientId: string, terms: any, parentOfferId?: string): Promise<EngagementOffer | null> {
    const { data, error } = await supabase
      .from('engagement_offers')
      .insert([
        {
          audit_request_id: auditRequestId,
          auditor_id: auditorId,
          client_id: clientId,
          terms,
          status: 'pending',
          parent_offer_id: parentOfferId || null,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export default EngagementOfferService; 