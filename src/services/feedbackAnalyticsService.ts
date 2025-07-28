import { supabase } from '../integrations/supabase/client';

/**
 * Update feedback analytics for an auditor
 */
export async function updateFeedbackAnalytics({ auditorId, rating, feedbackText }: { auditorId: string; rating: number; feedbackText: string }) {
  // Fetch current analytics
  const { data: current, error: fetchError } = await (supabase as any)
    .from('feedback_analytics')
    .select('*')
    .eq('auditor_id', auditorId)
    .single();
  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

  let newAverage: number = rating;
  let newCount: number = 1;
  let feedbacks: string[] = [feedbackText];
  if (current) {
    newCount = Number((current as any).rating_count) + 1;
    newAverage = ((Number((current as any).average_rating) * Number((current as any).rating_count)) + rating) / newCount;
    feedbacks = (Array.isArray((current as any).data?.feedbacks) ? (current as any).data.feedbacks : []).concat(feedbackText);
  }
  // Find most common feedback
  const freq: Record<string, number> = {};
  for (const f of feedbacks) freq[f] = (freq[f] || 0) + 1;
  const mostCommonFeedback = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  const upsertData = {
    auditor_id: auditorId,
    average_rating: newAverage,
    rating_count: newCount,
    most_common_feedback: mostCommonFeedback,
    data: { feedbacks },
    updated_at: new Date().toISOString(),
  };
  if (!current) upsertData['created_at'] = new Date().toISOString();

  const { data, error } = await (supabase as any)
    .from('feedback_analytics')
    .upsert([upsertData], { onConflict: 'auditor_id' })
    .single();
  if (error) throw error;
  return data;
}

/**
 * Get feedback analytics for an auditor
 */
export async function getFeedbackAnalytics(auditorId: string): Promise<any> {
  const { data, error } = await (supabase as any)
    .from('feedback_analytics')
    .select('*')
    .eq('auditor_id', auditorId)
    .single();
  if (error) throw error;
  return data;
}

/**
 * List feedback analytics with optional filters (minRating, date range)
 */
export async function listFeedbackAnalytics({ minRating, from, to }: { minRating?: number; from?: string; to?: string } = {}): Promise<any[]> {
  let query = (supabase as any).from('feedback_analytics').select('*');
  if (typeof minRating === 'number') query = query.gte('average_rating', minRating);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  query = query.order('average_rating', { ascending: false });
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
