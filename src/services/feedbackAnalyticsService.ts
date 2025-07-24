import { supabase } from '../lib/utils';

/**
 * Update feedback analytics for an auditor
 */
export async function updateFeedbackAnalytics({ auditorId, rating, feedbackText }) {
  // Fetch current analytics
  const { data: current, error: fetchError } = await supabase
    .from('feedback_analytics')
    .select('*')
    .eq('auditor_id', auditorId)
    .single();
  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

  let newAverage = rating;
  let newCount = 1;
  let feedbacks = [feedbackText];
  if (current) {
    newCount = current.rating_count + 1;
    newAverage = ((current.average_rating * current.rating_count) + rating) / newCount;
    feedbacks = (current.data?.feedbacks || []).concat(feedbackText);
  }
  // Find most common feedback
  const freq = {};
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

  const { data, error } = await supabase
    .from('feedback_analytics')
    .upsert([upsertData], { onConflict: 'auditor_id' })
    .single();
  if (error) throw error;
  return data;
}

/**
 * Get feedback analytics for an auditor
 */
export async function getFeedbackAnalytics(auditorId) {
  const { data, error } = await supabase
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
export async function listFeedbackAnalytics({ minRating, from, to } = {}) {
  let query = supabase.from('feedback_analytics').select('*');
  if (minRating) query = query.gte('average_rating', minRating);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  query = query.order('average_rating', { ascending: false });
  const { data, error } = await query;
  if (error) throw error;
  return data;
} 