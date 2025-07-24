import React, { useEffect, useState } from 'react';
import { getReceipt, generateReceiptPDF, emailReceipt } from '../../services/receiptService';
import ExportButton from '../ui/ExportButton';
import { useNotification } from '../../contexts/NotificationContext';
import StatusBadge from '../ui/StatusBadge';

type ReceiptStatus = 'paid' | 'pending' | 'refunded' | 'failed';

const statusColors: Record<ReceiptStatus, string> = {
  paid: 'bg-success text-dark-900',
  pending: 'bg-warning text-dark-900',
  refunded: 'bg-accent-cyan text-dark-900',
  failed: 'bg-error text-white',
};

interface ReceiptDetailModalProps {
  receiptId: string;
  onClose: () => void;
}

const ReceiptDetailModal: React.FC<ReceiptDetailModalProps> = ({ receiptId, onClose }) => {
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [success, setSuccess] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError('');
    getReceipt(receiptId)
      .then(setReceipt)
      .catch((err) => setError(err.message || 'Failed to load receipt'))
      .finally(() => setLoading(false));
  }, [receiptId]);

  const handleDownload = async () => {
    setDownloading(true);
    setSuccess('');
    try {
      const res = await generateReceiptPDF(receiptId);
      window.open(res.url, '_blank');
      setSuccess('PDF downloaded.');
      notify({ type: 'success', message: 'Receipt PDF downloaded.' });
    } catch (err: any) {
      setError(err.message || 'Failed to download PDF');
    }
    setDownloading(false);
  };

  const handleEmail = async () => {
    setEmailing(true);
    setSuccess('');
    try {
      // TODO: Use actual user email
      await emailReceipt(receiptId, 'user@example.com');
      setSuccess('Receipt emailed.');
    } catch (err: any) {
      setError(err.message || 'Failed to email receipt');
    }
    setEmailing(false);
  };

  if (loading) {
    return <div className="glass-card neon-border p-8 rounded-xl shadow-lg bg-dark-900 w-full max-w-md relative">Loading receipt...</div>;
  }
  if (error) {
    return <div className="glass-card neon-border p-8 rounded-xl shadow-lg bg-dark-900 w-full max-w-md relative text-error">{error}</div>;
  }
  if (!receipt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900 bg-opacity-80">
      <div className="glass-card neon-border p-8 rounded-xl shadow-lg bg-dark-900 w-full max-w-md relative">
        <button className="absolute top-2 right-2 btn-glass btn-secondary" onClick={onClose}>Close</button>
        <h2 className="text-h2 text-accent-purple mb-2">Receipt Details</h2>
        <div className="mb-2 font-mono text-xs text-muted">ID: {receipt.id}</div>
        <div className="mb-2 text-body">Date: {new Date(receipt.created_at).toLocaleDateString()}</div>
        <div className="mb-2 text-body">Amount: <span className="font-bold">${receipt.amount}</span></div>
        <div className="mb-2">
          <StatusBadge status={receipt.status} type="receipt" />
        </div>
        <div className="mb-4 text-body font-bold">{receipt.branding || 'Hawkly Web3 Security Audit Platform'}</div>
        <div className="mb-4 text-xs text-muted">{receipt.legal || 'This receipt is for your records. All payments are subject to our terms and conditions.'}</div>
        {success && <div className="text-success mb-2">{success}</div>}
        <div className="flex gap-4 mt-4">
          <button className="btn-glass btn-accent" onClick={handleDownload} disabled={downloading}>{downloading ? 'Downloading...' : 'Download PDF'}</button>
          <button className="btn-glass btn-cyan" onClick={handleEmail} disabled={emailing}>{emailing ? 'Emailing...' : 'Email Receipt'}</button>
        </div>
        <div className="flex gap-2 justify-end mb-2">
          <ExportButton type="pdf" filename={`receipt-${receipt.id}.pdf`} onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailModal; 