
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";

interface UserProfile {
  user_type?: string;
  [key: string]: any;
}

export class DashboardService {
  /**
   * Gets the appropriate dashboard route based on user role
   */
  static getDashboardRouteForUser(user: User | null, userProfile: UserProfile | null): string {
    if (!user) return '/auth';
    
    // Determine user type from profile or metadata
    const userType = userProfile?.user_type || user?.user_metadata?.user_type || 'project_owner';
    
    // Return the appropriate dashboard route
    return userType === 'auditor' ? '/dashboard/auditor' : '/dashboard/project';
  }
  
  /**
   * Checks if user has access to the specified dashboard type
   */
  static canAccessDashboard(dashboardType: string, user: User | null, userProfile: UserProfile | null): boolean {
    if (!user) return false;
    
    const userType = userProfile?.user_type || user?.user_metadata?.user_type || 'project_owner';
    
    if (dashboardType === 'auditor' && userType !== 'auditor') {
      return false;
    }
    
    if (dashboardType === 'project' && userType !== 'project_owner') {
      return false;
    }
    
    return true;
  }
  
  /**
   * Handle redirect based on user role and current path
   */
  static handleDashboardRedirect(
    dashboardType: string, 
    user: User | null, 
    userProfile: UserProfile | null,
    navigate: NavigateFunction
  ): void {
    if (!user) {
      toast.error("Authentication required");
      navigate('/auth');
      return;
    }
    
    // For base dashboard path, redirect to appropriate dashboard
    if (!dashboardType || dashboardType === '') {
      const redirectPath = this.getDashboardRouteForUser(user, userProfile);
      navigate(redirectPath);
      return;
    }
    
    // Check access and redirect if necessary
    if (!this.canAccessDashboard(dashboardType, user, userProfile)) {
      toast.error("Access denied: You don't have permission for this dashboard");
      navigate(this.getDashboardRouteForUser(user, userProfile));
    }
  }
}
