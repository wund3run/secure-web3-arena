
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { AuditorDashboardWidgets } from './AuditorDashboardWidgets';
import { ProjectOwnerDashboardWidgets } from './ProjectOwnerDashboardWidgets';
import { AdminDashboardWidgets } from './AdminDashboardWidgets';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function AdaptiveDashboardLayout() {
  const { user, userProfile, getUserType } = useAuth();
  
  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Please sign in to view your dashboard</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const userType = getUserType();

  // Render role-specific dashboard widgets
  switch (userType) {
    case 'auditor':
      return <AuditorDashboardWidgets user={user} profile={userProfile} />;
    case 'project_owner':
      return <ProjectOwnerDashboardWidgets user={user} profile={userProfile} />;
    case 'admin':
      return <AdminDashboardWidgets user={user} profile={userProfile} />;
    default:
      return (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Complete your profile setup to access your personalized dashboard
              </p>
            </div>
          </CardContent>
        </Card>
      );
  }
}
