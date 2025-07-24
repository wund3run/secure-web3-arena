import { supabase } from '../lib/utils';

/**
 * Get all receipts for a user
 */
export async function getReceiptsByUser(userId) {
  const { data, error } = await supabase
    .from('payment_receipts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Get a single receipt by ID
 */
export async function getReceipt(receiptId) {
  const { data, error } = await supabase
    .from('payment_receipts')
    .select('*')
    .eq('id', receiptId)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Generate a PDF for a receipt (stub)
 */
export async function generateReceiptPDF(receiptId, options = {}) {
  // TODO: Implement PDF generation with branding, legal text, and details
  // This is a stub for now
  return { url: `/api/receipts/${receiptId}/pdf` };
}

/**
 * Email a receipt to a user (stub)
 */
export async function emailReceipt(receiptId, toEmail) {
  // TODO: Implement email sending logic
  // This is a stub for now
  return { success: true };
}

/**
 * List receipts with optional filters (date range, status)
 */
export async function listReceipts({ from, to, status } = {}) {
  let query = supabase.from('payment_receipts').select('*');
  if (status) query = query.eq('status', status);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  query = query.order('created_at', { ascending: false });
  const { data, error } = await query;
  if (error) throw error;
  return data;
} 