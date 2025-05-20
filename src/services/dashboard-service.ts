
import { NavigateFunction } from "react-router-dom";

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    user_type?: 'auditor' | 'project_owner';
  };
}

interface UserProfile {
  id: string;
  user_id: string;
  user_type?: 'auditor' | 'project_owner';
  display_name?: string;
}

export class DashboardService {
  /**
   * Handles redirecting users to the appropriate dashboard based on their type and requested view
   */
  static handleDashboardRedirect(
    dashboardType: string,
    user: User,
    userProfile: UserProfile | null,
    navigate: NavigateFunction
  ) {
    const userType = userProfile?.user_type || user?.user_metadata?.user_type;
    
    // If dashboard type is specified but doesn't match user type, redirect to the correct one
    if (dashboardType) {
      // If auditor trying to access project dashboard or vice versa, redirect
      if (
        (dashboardType === 'auditor' && userType === 'project_owner') ||
        (dashboardType === 'project' && userType === 'auditor')
      ) {
        const correctDashboard = userType === 'auditor' ? 'auditor' : 'project';
        navigate(`/dashboard/${correctDashboard}`, { replace: true });
        return;
      }
    } else {
      // No dashboard type specified, redirect based on user type
      const correctDashboard = userType === 'auditor' ? 'auditor' : 'project';
      navigate(`/dashboard/${correctDashboard}`, { replace: true });
    }
  }
}
