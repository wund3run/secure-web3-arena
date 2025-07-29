import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, AlertCircle, MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';

export interface StatusUpdate {
  id: string;
  status_type: string;
  title: string;
  message: string;
  created_at: string;
  user_id?: string;
  metadata?: any;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
    role?: string;
  };
}

interface RequestStatusTrackerProps {
  statusUpdates: StatusUpdate[];
}

const statusStyles: Record<string, string> = {
  approved: 'border-green-500',
  completed: 'border-green-500',
  rejected: 'border-red-500',
  needs_info: 'border-yellow-500',
  in_progress: 'border-blue-500',
  progress: 'border-blue-500',
  pending: 'border-gray-400',
  default: 'border-gray-300',
};

const iconBgStyles: Record<string, string> = {
  approved: 'bg-green-100',
  completed: 'bg-green-100',
  rejected: 'bg-red-100',
  needs_info: 'bg-yellow-100',
  in_progress: 'bg-blue-100',
  progress: 'bg-blue-100',
  pending: 'bg-gray-200',
  default: 'bg-gray-200',
};

const getStatusIcon = (statusType: string, isSystem: boolean) => {
  if (isSystem) {
    return <User className="h-4 w-4 text-gray-400" aria-label="System" />;
  }
  switch (statusType) {
    case 'approved':
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" aria-label="Approved" />;
    case 'rejected':
      return <AlertCircle className="h-4 w-4 text-red-600" aria-label="Rejected" />;
    case 'needs_info':
      return <MessageCircle className="h-4 w-4 text-yellow-600" aria-label="Needs Info" />;
    case 'in_progress':
    case 'progress':
      return <Clock className="h-4 w-4 text-blue-600" aria-label="In Progress" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-gray-400" aria-label="Pending" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" aria-label="Status" />;
  }
};

const importantBg: Record<string, string> = {
  rejected: 'bg-red-50',
  needs_info: 'bg-yellow-50',
};

export const RequestStatusTracker: React.FC<RequestStatusTrackerProps> = ({ statusUpdates }) => {
  // Filtering state
  const [statusFilter, setStatusFilter] = useState('');
  const [reviewerFilter, setReviewerFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Unique status types and reviewers for dropdowns
  const statusTypes = Array.from(new Set(statusUpdates.map(u => u.status_type)));
  const reviewers = Array.from(new Set(statusUpdates.map(u => u.profiles?.full_name || u.metadata?.reviewer_name).filter(Boolean)));

  // Filtering logic
  let filtered = statusUpdates;
  if (statusFilter) filtered = filtered.filter(u => u.status_type === statusFilter);
  if (reviewerFilter) filtered = filtered.filter(u => (u.profiles?.full_name || u.metadata?.reviewer_name) === reviewerFilter);
  if (dateFrom) filtered = filtered.filter(u => new Date(u.created_at) >= new Date(dateFrom));
  if (dateTo) filtered = filtered.filter(u => new Date(u.created_at) <= new Date(dateTo));

  // Collapsible logic
  const COLLAPSE_LIMIT = 3;
  const collapsed = !showAll && filtered.length > COLLAPSE_LIMIT ? filtered.slice(0, COLLAPSE_LIMIT) : filtered;

  if (!statusUpdates || statusUpdates.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No status updates yet. Your project is awaiting review.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Status Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filter UI */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <select className="border rounded px-2 py-1 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status">
            <option value="">All Statuses</option>
            {statusTypes.map(type => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
          <select className="border rounded px-2 py-1 text-sm" value={reviewerFilter} onChange={e => setReviewerFilter(e.target.value)} aria-label="Filter by reviewer">
            <option value="">All Reviewers</option>
            {reviewers.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <input type="date" className="border rounded px-2 py-1 text-sm" value={dateFrom} onChange={e => setDateFrom(e.target.value)} aria-label="From date" />
          <input type="date" className="border rounded px-2 py-1 text-sm" value={dateTo} onChange={e => setDateTo(e.target.value)} aria-label="To date" />
        </div>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {collapsed.map((update, idx) => {
            const borderColor = statusStyles[update.status_type] || statusStyles.default;
            const iconBg = iconBgStyles[update.status_type] || iconBgStyles.default;
            const isSystem = update.metadata?.source === 'system';
            const bgImportant = importantBg[update.status_type] || '';
            return (
              <li
                key={update.id}
                className={`mb-10 ml-6 pl-2 ${borderColor} ${bgImportant}`}
                style={{ borderLeftWidth: 4 }}
              >
                <span
                  className={`flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full ring-8 ring-white dark:ring-gray-900 ${iconBg} border border-gray-300`}
                >
                  {getStatusIcon(update.status_type, isSystem)}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                    {update.title || update.status_type}
                  </h3>
                  <time className="block text-xs text-gray-500 dark:text-gray-400" dateTime={update.created_at}>
                    {format(new Date(update.created_at), 'PPP p')}
                  </time>
                </div>
                {update.message && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{update.message}</p>
                )}
                {(update.profiles?.full_name || update.metadata?.reviewer_name) && (
                  <div className="flex items-center gap-2 mt-1">
                    {update.profiles?.avatar_url && (
                      <img
                        src={update.profiles.avatar_url}
                        alt={update.profiles.full_name || 'Reviewer'}
                        className="w-5 h-5 rounded-full border"
                      />
                    )}
                    <span className="text-xs text-gray-500">
                      By {update.profiles?.full_name || update.metadata?.reviewer_name}
                      {update.profiles?.role && (
                        <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-gray-100 border text-gray-600">
                          {update.profiles.role}
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {idx < collapsed.length - 1 && <Separator className="my-4" />}
              </li>
            );
          })}
        </ol>
        {/* Collapsible control */}
        {filtered.length > COLLAPSE_LIMIT && (
          <button
            className="mt-4 text-blue-600 text-sm underline"
            onClick={() => setShowAll(v => !v)}
            aria-expanded={showAll}
          >
            {showAll ? 'Show Less' : `Show All (${filtered.length})`}
          </button>
        )}
      </CardContent>
    </Card>
  );
};
