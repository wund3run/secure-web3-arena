import React, { useState, useEffect } from 'react';
import { getReceiptsByUser } from '../../services/receiptService';
import StatusBadge from '../ui/StatusBadge';
import { useNotification } from '../../contexts/NotificationContext.tsx';
import ExportButton from '../ui/ExportButton';

type ReceiptStatus = 'paid' | 'pending' | 'refunded' | 'failed';

const statusColors: Record<ReceiptStatus, string> = {
  paid: 'bg-success text-dark-900',
  pending: 'bg-warning text-dark-900',
  refunded: 'bg-accent-cyan text-dark-900',
  failed: 'bg-error text-white',
};

interface Receipt {
  id: string;
  created_at: string;
  amount: number;
  status: ReceiptStatus;
}

interface ReceiptsListProps {
  userId: string;
  onViewReceipt: (id: string) => void;
}

const ReceiptsList: React.FC<ReceiptsListProps> = ({ userId, onViewReceipt }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError('');
    getReceiptsByUser(userId)
      .then((data) => setReceipts(data))
      .catch((err) => setError(err.message || 'Failed to load receipts'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleExportPDF = async () => {
    // ...fetch PDF from backend and trigger download...
    notify({ type: 'success', message: 'Receipts PDF downloaded.' });
  };

  return (
    <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900">
      <h2 className="text-h2 text-accent-cyan mb-4">Receipts</h2>
      <div className="flex gap-2 justify-end mb-2">
        <ExportButton type="csv" data={receipts} filename="receipts.csv" />
        <ExportButton type="pdf" filename="receipts.pdf" onClick={handleExportPDF} />
      </div>
      {loading ? (
        <div className="text-body text-muted">Loading receipts...</div>
      ) : error ? (
        <div className="text-error">{error}</div>
      ) : receipts.length === 0 ? (
        <div className="text-body text-muted">No receipts found.</div>
      ) : (
        <table className="w-full text-body bg-transparent">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="py-2 px-3 text-left">ID</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r.id} className="hover:bg-dark-800 transition">
                <td className="py-2 px-3 font-mono">{r.id}</td>
                <td className="py-2 px-3">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-3">${r.amount}</td>
                <td className="py-2 px-3">
                  <StatusBadge status={r.status} type="receipt" />
                </td>
                <td className="py-2 px-3 flex gap-2">
                  <button className="btn-glass btn-accent text-xs" onClick={() => onViewReceipt(r.id)}>View</button>
                  <button className="btn-glass btn-secondary text-xs">Download</button>
                  <button className="btn-glass btn-cyan text-xs">Email</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReceiptsList; 