
/**
 * Admin authentication utilities
 * Provides secure access control for admin features
 */

export const adminAuth = {
  /**
   * Check if current user has admin access
   */
  isAdminAuthenticated(): boolean {
    return localStorage.getItem("adminAuthenticated") === "true";
  },

  /**
   * Get admin user info
   */
  getAdminUser(): string | null {
    return localStorage.getItem("adminUser");
  },

  /**
   * Check if current session is valid (within 24 hours)
   */
  isSessionValid(): boolean {
    const loginTime = localStorage.getItem("adminLoginTime");
    if (!loginTime) return false;

    const sessionDuration = Date.now() - parseInt(loginTime);
    const sessionHours = sessionDuration / (1000 * 60 * 60);
    
    return sessionHours <= 24;
  },

  /**
   * Logout admin user
   */
  logout(): void {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoginTime");
  },

  /**
   * Check if user should have access to admin features
   */
  hasAdminAccess(): boolean {
    return this.isAdminAuthenticated() && this.isSessionValid();
  }
};
