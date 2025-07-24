import React, { useState, useEffect } from 'react';
import StatusBadge from '../ui/StatusBadge';
import { useNotification } from '../../contexts/NotificationContext';
import ExportButton from '../ui/ExportButton';

export type DisputeStatus = 'open' | 'resolved' | 'rejected' | 'in review';

const statusColors: Record<DisputeStatus, string> = {
  open: 'bg-accent-cyan text-dark-900',
  resolved: 'bg-success text-dark-900',
  rejected: 'bg-error text-white',
  'in review': 'bg-warning text-dark-900',
};

interface Dispute {
  id: string;
  status: DisputeStatus;
  created_at: string;
  reason: string;
}

interface DisputeListProps {
  projectId: string;
  onViewDispute: (id: string) => void;
}

const DisputeList: React.FC<DisputeListProps> = ({ projectId, onViewDispute }) => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setError('');
    fetch(`/api/disputes?projectId=${encodeURIComponent(projectId)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setDisputes(data))
      .catch((err) => setError(err.message || 'Failed to load disputes'))
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleStatusChange = (disputeId, newStatus) => {
    // ...status change logic...
    notify({ type: 'success', message: `Dispute ${disputeId} marked as ${newStatus}` });
  };

  return (
    <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900">
      <h2 className="text-h2 text-accent-cyan mb-4">Disputes</h2>
      <div className="flex justify-end mb-2">
        <ExportButton type="csv" data={disputes} filename="disputes.csv" />
      </div>
      {loading ? (
        <div className="text-body text-muted">Loading disputes...</div>
      ) : error ? (
        <div className="text-error">{error}</div>
      ) : disputes.length === 0 ? (
        <div className="text-body text-muted">No disputes found.</div>
      ) : (
        <table className="w-full text-body bg-transparent">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="py-2 px-3 text-left">ID</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Reason</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d.id} className="hover:bg-dark-800 transition">
                <td className="py-2 px-3 font-mono">{d.id}</td>
                <td className="py-2 px-3">
                  <StatusBadge status={d.status} type="dispute" />
                </td>
                <td className="py-2 px-3">{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-3">{d.reason}</td>
                <td className="py-2 px-3">
                  <button className="btn-glass btn-accent text-xs" onClick={() => onViewDispute(d.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisputeList; 