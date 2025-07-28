import React, { useState } from 'react';

interface RaiseDisputeModalProps {
  projectId: string;
  raisedById: string;
  againstId: string;
  onClose?: () => void;
  onDisputeRaised?: () => void;
}

const RaiseDisputeModal: React.FC<RaiseDisputeModalProps> = ({ projectId, raisedById, againstId, onClose, onDisputeRaised }) => {
  const [reason, setReason] = useState('');
  const [evidence, setEvidence] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidence(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!reason.trim()) {
      setError('Reason is required.');
      return;
    }
    setSubmitting(true);
    try {
      // TODO: Upload evidence file and get URL (stub for now)
      let evidenceUrl = '';
      if (evidence) {
        // Implement file upload logic here
        evidenceUrl = 'uploaded-file-url';
      }
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          against: againstId,
          type: 'payment', // or 'audit', allow selection if needed
          description: reason,
          evidenceUrl,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(true);
      setTimeout(() => {
        setSubmitting(false);
        if (onClose) onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit dispute');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900 bg-opacity-80">
      <form className="glass-card neon-border p-8 rounded-xl shadow-lg bg-dark-900 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-h2 text-accent-cyan mb-4">Raise a Dispute</h2>
        <label className="block mb-2 text-body font-bold">Reason</label>
        <textarea
          className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 text-body mb-4 focus:ring-2 focus:ring-accent-cyan"
          value={reason}
          onChange={e => setReason(e.target.value)}
          rows={4}
          required
        />
        <label className="block mb-2 text-body font-bold">Evidence (optional)</label>
        <input
          type="file"
          className="mb-4 text-body"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        {error && <div className="text-error mb-2">{error}</div>}
        {success && <div className="text-success mb-2">Dispute submitted successfully!</div>}
        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn-glass btn-accent" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
          <button type="button" className="btn-glass btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RaiseDisputeModal; 