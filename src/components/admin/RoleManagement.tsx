
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/auth/useAdminAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserCog, Shield, User, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role?: 'admin' | 'auditor' | 'project_owner' | 'general';
  assigned_at?: string;
}

export function RoleManagement() {
  const { isAdmin, assignRole, logAdminAction } = useAdminAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchUsersWithRoles();
    }
  }, [isAdmin]);

  const fetchUsersWithRoles = async () => {
    try {
      // First fetch all users from auth
      const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;

      // Then fetch extended profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('extended_profiles')
        .select('id, full_name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Fetch user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, assigned_at')
        .eq('is_active', true);

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }

      // Combine the data
      const usersWithRoles: UserWithRole[] = authUsers?.map(authUser => {
        const profile = profiles?.find(p => p.id === authUser.id);
        const roleData = userRoles?.find(r => r.user_id === authUser.id);
        
        return {
          id: authUser.id,
          email: authUser.email || 'Unknown',
          full_name: profile?.full_name,
          role: roleData?.role || 'general',
          assigned_at: roleData?.assigned_at
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    const success = await assignRole(userId, newRole as any);
    if (success) {
      await fetchUsersWithRoles();
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'auditor': return <Shield className="h-4 w-4" />;
      case 'project_owner': return <UserCog className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'auditor': return 'default';
      case 'project_owner': return 'secondary';
      default: return 'outline';
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Admin access required to manage user roles.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          User Role Management
        </CardTitle>
        <CardDescription>
          Assign and manage user roles across the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name || 'Unnamed User'}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role || 'general')} className="flex items-center gap-1 w-fit">
                      {getRoleIcon(user.role || 'general')}
                      {user.role || 'general'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.assigned_at ? new Date(user.assigned_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role || 'general'}
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="project_owner">Project Owner</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
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
