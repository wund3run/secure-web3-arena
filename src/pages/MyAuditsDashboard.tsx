import React, { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth/AuthContext.tsx';
import { useNotification } from '@/contexts/NotificationContext.tsx';
import { HawklyCard } from "../components/ui/hawkly-components";
import { Table } from "../components/ui/table";
import { Button } from "../components/ui/button";
const Spinner = () => <div>Loading...</div>;

const MyAuditsDashboard: React.FC = () => {
  // Example: Notify on audit creation (could be called after audit creation logic)
  const handleAuditCreated = (audit: any) => {
    notify({
      title: 'Audit Created',
      message: `Audit ${audit.name} created successfully`,
      type: 'success'
    });
  };

  // Example: Notify on collaboration invite (could be called after invite logic)
  const handleCollaborationInvite = (audit: any, invitee: string) => {
    notify({
      title: 'Collaboration Invite Sent',
      message: `Invite sent to ${invitee} for audit ${audit.name}`,
      type: 'info'
    });
  };
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchAudits() {
      setLoading(true);
      setError(null);
      try {
        if (!user?.id) return;
        const { data, error } = await supabase
          .from('audit_requests')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setAudits(data || []);
      } catch (err: any) {
        setError("Failed to load audits");
      } finally {
        setLoading(false);
      }
    }
    fetchAudits();
  }, [user]);

  const handleViewAudit = (audit: any) => {
    notify({
      title: 'Audit Viewed',
      message: `You viewed audit: ${audit.name}`,
      type: 'info'
    });
    window.location.href = `/audit/${audit.id}`;
  };

  return (
    <HawklyCard variant="interactive" elevation="strong">
      <h2 className="text-xl font-bold mb-4">My Audits Dashboard</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : audits.length === 0 ? (
        <div>No audits found.</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Audit Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr key={audit.id}>
                <td>{audit.name}</td>
                <td>{audit.status}</td>
                <td>{new Date(audit.created_at).toLocaleString()}</td>
                <td>
                  <Button variant="secondary" size="sm" onClick={() => handleViewAudit(audit)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </HawklyCard>
  );
};

export default MyAuditsDashboard;
