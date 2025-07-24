import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const PaymentReceipts = ({ userId }) => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('payment_receipts')
        .select('*')
        .or(`payer_id.eq.${userId},payee_id.eq.${userId}`)
        .order('date', { ascending: false });
      setReceipts(data || []);
      setLoading(false);
    };
    fetchReceipts();
  }, [userId]);

  if (loading) return <div>Loading receipts...</div>;
  if (receipts.length === 0) return <div>No receipts available yet.</div>;

  return (
    <div>
      <h3>Payment Receipts</h3>
      <ul>
        {receipts.map(r => (
          <li key={r.id} style={{ marginBottom: 16 }}>
            <strong>{r.type}</strong> | ${r.amount} | {new Date(r.date).toLocaleDateString()} | {r.details?.projectName || ''}
            {r.receipt_url && (
              <a href={r.receipt_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 12 }}>
                Download PDF
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentReceipts; 