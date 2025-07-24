import React, { useEffect, useState } from 'react';
import { getDispute } from '../../services/disputeService';
import { DisputeStatus } from './DisputeList';

const statusColors: Record<DisputeStatus, string> = {
  open: 'bg-accent-cyan text-dark-900',
  resolved: 'bg-success text-dark-900',
  rejected: 'bg-error text-white',
  'in review': 'bg-warning text-dark-900',
};

interface TimelineEntry {
  date: string;
  status: DisputeStatus;
  note: string;
}

interface DisputeDetailProps {
  disputeId: string;
  onBack: () => void;
}

const DisputeDetail: React.FC<DisputeDetailProps> = ({ disputeId, onBack }) => {
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getDispute(disputeId)
      .then(setDispute)
      .catch((err) => setError(err.message || 'Failed to load dispute'))
      .finally(() => setLoading(false));
  }, [disputeId]);

  if (loading) {
    return <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900 max-w-xl mx-auto">Loading dispute...</div>;
  }
  if (error) {
    return <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900 max-w-xl mx-auto text-error">{error}</div>;
  }
  if (!dispute) {
    return null;
  }

  return (
    <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900 max-w-xl mx-auto">
      <button className="mb-4 btn-glass btn-secondary" onClick={onBack}>Back</button>
      <h2 className="text-h2 text-accent-purple mb-2">Dispute Details</h2>
      <div className="mb-2 font-mono text-xs text-muted">ID: {dispute.id}</div>
      <div className="mb-2">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${statusColors[dispute.status] || 'bg-muted text-white'}`}>{dispute.status}</span>
        <span className="ml-4 text-body text-muted">{new Date(dispute.created_at).toLocaleDateString()}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold text-body">Reason:</span> {dispute.reason}
      </div>
      {dispute.evidence_url && (
        <div className="mb-2">
          <span className="font-bold text-body">Evidence:</span> <a href={dispute.evidence_url} className="text-accent-cyan underline" target="_blank" rel="noopener noreferrer">View Evidence</a>
        </div>
      )}
      {dispute.resolution_notes && (
        <div className="mb-2">
          <span className="font-bold text-body">Resolution Notes:</span> {dispute.resolution_notes}
        </div>
      )}
      {/* Timeline: If available, show. Otherwise, skip. */}
      {dispute.timeline && dispute.timeline.length > 0 && (
        <div className="mt-4">
          <h3 className="text-h4 text-accent-cyan mb-2">Timeline</h3>
          <ul className="space-y-2">
            {dispute.timeline.map((t: TimelineEntry, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted">{t.date}</span>
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${statusColors[t.status] || 'bg-muted text-white'}`}>{t.status}</span>
                <span className="text-body text-muted">{t.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisputeDetail; 