import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { RaiseDisputeModal } from './RaiseDisputeModal';
import { NotificationContext } from '@/contexts/NotificationContext';

export interface Dispute {
  id: string;
  type: string;
  projectName: string;
  status: string;
  raised_by: string;
  against: string;
  created_at: string;
}

export const DisputeList: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { notify } = React.useContext(NotificationContext);

  useEffect(() => {
    const fetchDisputes = async () => {
      setLoading(true);
      try {
        // For admin, fetch all; for user, fetch by project/user
        const res = await fetch('/api/disputes' + (isAdmin ? '' : `?userId=${user.id}`));
        const data = await res.json();
        setDisputes(data);
      } catch (err) {
        notify('Failed to load disputes', 'error');
      }
      setLoading(false);
    };
    fetchDisputes();
  }, [user, isAdmin, notify]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-h2">Disputes</h2>
        <Button onClick={() => setShowModal(true)}>Raise Dispute</Button>
      </div>
      {showModal && <RaiseDisputeModal onClose={() => setShowModal(false)} />}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Type</th>
              <th>Project</th>
              <th>Status</th>
              <th>Raised By</th>
              <th>Against</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : disputes.length === 0 ? (
              <tr>
                <td colSpan={7}>No disputes found.</td>
              </tr>
            ) : (
              disputes.map((d) => (
                <tr key={d.id}>
                  <td>{d.type}</td>
                  <td>{d.projectName}</td>
                  <td>
                    <StatusBadge status={d.status} />
                  </td>
                  <td>{d.raised_by}</td>
                  <td>{d.against}</td>
                  <td>{new Date(d.created_at).toLocaleString()}</td>
                  <td>
                    <Button variant="outline" size="sm" onClick={() => {/* open detail view */}}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 