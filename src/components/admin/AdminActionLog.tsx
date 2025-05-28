import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";
import { Activity, User, Shield, FileText } from "lucide-react";

interface AdminAction {
  id: string;
  admin_id: string;
  admin_name: string;
  action_type: string;
  target_type: string;
  target_id: string;
  details: any;
  created_at: string;
}

export function AdminActionLog() {
  const { isAdmin } = useAdminAuth();
  const [actions, setActions] = useState<AdminAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminActions();
    }
  }, [isAdmin]);

  const fetchAdminActions = async () => {
    try {
      setIsLoading(true);
      
      // Fetch admin actions first
      const { data: adminActions, error: actionsError } = await supabase
        .from('admin_actions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (actionsError) throw actionsError;

      if (!adminActions || adminActions.length === 0) {
        setActions([]);
        return;
      }

      // Get unique admin IDs
      const adminIds = [...new Set(adminActions.map(action => action.admin_id))];
      
      // Fetch admin profiles separately
      const { data: profiles, error: profilesError } = await supabase
        .from('extended_profiles')
        .select('id, full_name')
        .in('id', adminIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Combine the data
      const transformedActions: AdminAction[] = adminActions.map(action => {
        const profile = profiles?.find(p => p.id === action.admin_id);
        return {
          id: action.id,
          admin_id: action.admin_id,
          admin_name: profile?.full_name || 'Unknown Admin',
          action_type: action.action_type,
          target_type: action.target_type,
          target_id: action.target_id,
          details: action.details,
          created_at: action.created_at
        };
      });

      setActions(transformedActions);
    } catch (error: any) {
      console.error('Error fetching admin actions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'assign_role':
        return <User className="h-4 w-4" />;
      case 'approve_service':
      case 'reject_service':
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActionBadgeVariant = (actionType: string) => {
    switch (actionType) {
      case 'approve_service':
      case 'assign_role':
        return 'default';
      case 'reject_service':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatActionDescription = (action: AdminAction) => {
    switch (action.action_type) {
      case 'assign_role':
        return `Assigned role "${action.details?.role}" to user`;
      case 'approve_service':
        return 'Approved service submission';
      case 'reject_service':
        return 'Rejected service submission';
      default:
        return action.action_type.replace(/_/g, ' ');
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Admin access required to view action logs.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Admin Action Log
        </CardTitle>
        <CardDescription>
          Audit trail of all administrative actions performed on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : actions.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-2 text-lg font-medium">No admin actions recorded</p>
            <p className="text-sm text-muted-foreground">
              Administrative actions will appear here once performed.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(action.action_type)}
                      <Badge variant={getActionBadgeVariant(action.action_type)}>
                        {formatActionDescription(action)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{action.admin_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{action.target_type}</div>
                      <div className="text-muted-foreground text-xs">
                        {action.target_id.substring(0, 8)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(action.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {action.details && Object.keys(action.details).length > 0 ? (
                        <pre className="text-xs bg-muted p-1 rounded max-w-xs overflow-auto">
                          {JSON.stringify(action.details, null, 2)}
                        </pre>
                      ) : (
                        'No additional details'
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
