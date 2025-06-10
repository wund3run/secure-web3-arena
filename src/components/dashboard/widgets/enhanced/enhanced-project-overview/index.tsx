
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedDashboardWidget } from '../../EnhancedDashboardWidget';
import { ProjectOverviewContent } from './ProjectOverviewContent';
import { BarChart3 } from 'lucide-react';

interface EnhancedProjectOverviewProps {
  userId: string;
}

export function EnhancedProjectOverview({ userId }: EnhancedProjectOverviewProps) {
  const { data: projects, isLoading, error, refetch } = useQuery({
    queryKey: ['projects-overview', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_audits (
            id,
            status,
            severity_level,
            created_at
          )
        `)
        .eq('client_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return (
    <EnhancedDashboardWidget
      title="Projects Overview"
      description="Track your security audit projects and their status"
      icon={BarChart3}
      loading={isLoading}
      error={error as Error}
      onRetry={() => refetch()}
      variant="default"
    >
      <ProjectOverviewContent projects={projects || []} />
    </EnhancedDashboardWidget>
  );
}
