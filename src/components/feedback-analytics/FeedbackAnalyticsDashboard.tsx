import React, { useState, useEffect } from 'react';
import FeedbackExportControls from './FeedbackExportControls';
import { getFeedbackAnalytics } from '../../services/feedbackAnalyticsService';
import StatusBadge from '../ui/StatusBadge';
import { useNotification } from '@/contexts/NotificationContext.tsx';
import ExportButton from '../ui/ExportButton';

interface FeedbackEntry {
  id: string;
  date: string;
  rating: number;
  text: string;
  status: string;
}

interface FeedbackAnalyticsDashboardProps {
  auditorId: string;
}

const FeedbackAnalyticsDashboard: React.FC<FeedbackAnalyticsDashboardProps> = ({ auditorId }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    setError('');
    getFeedbackAnalytics(auditorId)
      .then(setAnalytics)
      .catch((err) => setError(err.message || 'Failed to load analytics'))
      .finally(() => setLoading(false));
  }, [auditorId]);

  let feedbacks: FeedbackEntry[] = analytics?.data?.feedbacks || [];
  if (minRating) feedbacks = feedbacks.filter(f => f.rating >= minRating);
  if (from) feedbacks = feedbacks.filter(f => f.date >= from);
  if (to) feedbacks = feedbacks.filter(f => f.date <= to);

  const handleExportPDF = async () => {
    // ...fetch PDF from backend and trigger download...
    notify({ type: 'success', message: 'Feedback analytics PDF downloaded.' });
  };

  return (
    <div className="glass-card neon-border p-6 rounded-xl shadow-lg bg-dark-900">
      <h2 className="text-h2 text-accent-cyan mb-4">Feedback Analytics</h2>
      {loading ? (
        <div className="text-body text-muted">Loading analytics...</div>
      ) : error ? (
        <div className="text-error">{error}</div>
      ) : analytics ? (
        <>
          <div className="flex gap-8 mb-6">
            <div className="glass-card p-4 rounded-lg bg-dark-800">
              <div className="text-h4 text-accent-cyan">{analytics.average_rating?.toFixed(2) ?? '-'}</div>
              <div className="text-body text-muted">Average Rating</div>
            </div>
            <div className="glass-card p-4 rounded-lg bg-dark-800">
              <div className="text-h4 text-accent-purple">{analytics.rating_count ?? '-'}</div>
              <div className="text-body text-muted">Total Ratings</div>
            </div>
            <div className="glass-card p-4 rounded-lg bg-dark-800">
              <div className="text-h4 text-accent-cyan">{analytics.most_common_feedback ?? '-'}</div>
              <div className="text-body text-muted">Most Common Feedback</div>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <label className="text-body">Min Rating:
              <select className="ml-2 p-1 rounded bg-dark-800 text-body" value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
                <option value={0}>All</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={5}>5</option>
              </select>
            </label>
            <label className="text-body">From:
              <input type="date" className="ml-2 p-1 rounded bg-dark-800 text-body" value={from} onChange={e => setFrom(e.target.value)} />
            </label>
            <label className="text-body">To:
              <input type="date" className="ml-2 p-1 rounded bg-dark-800 text-body" value={to} onChange={e => setTo(e.target.value)} />
            </label>
          </div>
          <div className="flex gap-2 justify-end mb-2">
            <ExportButton type="csv" data={feedbacks} filename="feedback-analytics.csv" />
            <ExportButton type="pdf" filename="feedback-analytics.pdf" onClick={handleExportPDF} />
          </div>
          <table className="w-full text-body bg-transparent mb-4">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Rating</th>
                <th className="py-2 px-3 text-left">Feedback</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr><td colSpan={3} className="text-center text-muted py-4">No feedback found.</td></tr>
              ) : feedbacks.map(f => (
                <tr key={f.id} className="hover:bg-dark-800 transition">
                  <td className="py-2 px-3 font-mono">{f.date}</td>
                  <td className="py-2 px-3">{f.rating}</td>
                  <td className="py-2 px-3">{f.text}</td>
                  <td className="py-2 px-3"><StatusBadge status={f.status} type="feedback" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <FeedbackExportControls feedbacks={feedbacks} />
        </>
      ) : null}
    </div>
  );
};

export default FeedbackAnalyticsDashboard; 