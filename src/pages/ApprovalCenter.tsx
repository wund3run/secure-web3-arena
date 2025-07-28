// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const color = status === 'approved' ? 'bg-green-500' : status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500';
  return <span className={`px-2 py-1 rounded text-white text-xs ${color}`}>{status}</span>;
};

// Approval queue filter
const ApprovalQueueFilter = ({ filter, setFilter }: { filter: string, setFilter: (f: string) => void }) => (
  <div className="mb-4 flex gap-2">
    {['pending', 'approved', 'rejected'].map(f => (
      <button key={f} className={`px-3 py-1 rounded ${filter === f ? 'bg-[#a879ef] text-white' : 'bg-[#23283e] text-[#b2bfd4]'}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
    ))}
  </div>
);
import React, { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import { useNotification } from '@/contexts/NotificationContext.tsx';
import { HawklyCard } from "../components/ui/hawkly-components";
import { Table } from "../components/ui/table";
import { Button } from "../components/ui/button";
const Spinner = () => <div>Loading...</div>;

const ApprovalCenter: React.FC = () => {
  // Example: Notify on bulk approval (could be called after bulk action logic)
  const handleBulkApprove = async (ids: string[]) => {
    await supabase
      .from('approval_requests')
      .update({ status: 'approved' })
      .in('id', ids);
    setRequests(requests.filter(r => !ids.includes(r.id)));
    notify({
      title: 'Bulk Approval',
      message: `Approved ${ids.length} requests`,
      type: 'success'
    });
  };
  const [requests, setRequests] = useState<any[]>([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('approval_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setRequests(data || []);
      } catch (err: any) {
        setError("Failed to load approval requests");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    await supabase
      .from('approval_requests')
      .update({ status: 'approved' })
      .eq('id', id);
    setRequests(requests.filter(r => r.id !== id));
    notify({
      title: 'Request Approved',
      message: `Approval request ${id} approved`,
      type: 'success'
    });
  };

  const handleReject = async (id: string) => {
    await supabase
      .from('approval_requests')
      .update({ status: 'rejected' })
      .eq('id', id);
    setRequests(requests.filter(r => r.id !== id));
    notify({
      title: 'Request Rejected',
      message: `Approval request ${id} rejected`,
      type: 'error'
    });
  };

  return (
    <HawklyCard variant="highlighted" elevation="strong">
      <h2 className="text-xl font-bold mb-4">Approval Center</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : requests.length === 0 ? (
        <div>No approval requests.</div>
      ) : (
        <>
          <ApprovalQueueFilter filter={filter} setFilter={setFilter} />
          <Table>
            <thead>
              <tr>
                <th>Request</th>
                <th>Type</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.filter(r => r.status === filter).map((req) => (
                <tr key={req.id}>
                  <td>{req.name}</td>
                  <td>{req.type}</td>
                  <td><StatusBadge status={req.status} /></td>
                  <td>{new Date(req.created_at).toLocaleString()}</td>
                  <td>
                    {req.status === 'pending' && <>
                      <Button variant="default" size="sm" onClick={() => handleApprove(req.id)}>Approve</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReject(req.id)} className="ml-2">Reject</Button>
                    </>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </HawklyCard>
  );
};

export default ApprovalCenter;
