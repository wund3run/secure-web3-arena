
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export function useAdminAuth() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  const assignRole = async (userId: string, role: 'admin' | 'auditor' | 'project_owner' | 'general') => {
    if (!isAdmin) {
      toast.error('Unauthorized: Admin access required');
      return false;
    }

    try {
      // First, deactivate any existing roles for this user
      const { error: deactivateError } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', userId);

      if (deactivateError) {
        console.error('Error deactivating existing roles:', deactivateError);
      }

      // Then insert the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role,
          assigned_by: user?.id,
          is_active: true
        });

      if (insertError) throw insertError;

      // Log admin action
      await logAdminAction('assign_role', 'user', userId, { role });
      
      toast.success(`Role ${role} assigned successfully`);
      return true;
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast.error(error.message || 'Failed to assign role');
      return false;
    }
  };

  const logAdminAction = async (
    actionType: string, 
    targetType: string, 
    targetId: string, 
    details?: any
  ) => {
    if (!user || !isAdmin) return;

    try {
      await supabase
        .from('admin_actions')
        .insert({
          admin_id: user.id,
          action_type: actionType,
          target_type: targetType,
          target_id: targetId,
          details
        });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  return {
    isAdmin,
    loading,
    assignRole,
    logAdminAction
  };
}
