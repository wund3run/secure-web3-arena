
import { toast } from 'sonner';

export class EnhancedNotifications {
  // Authentication notifications
  static auth = {
    signInSuccess: (name?: string) => 
      toast.success('Welcome back!', { 
        description: name ? `Welcome back, ${name}` : 'You have successfully signed in',
        duration: 4000 
      }),
    
    signUpSuccess: () => 
      toast.success('Account created!', { 
        description: 'Welcome to Hawkly. Please check your email to verify your account.',
        duration: 6000 
      }),
    
    signOutSuccess: () => 
      toast.success('Signed out', { 
        description: 'You have been successfully signed out',
        duration: 3000 
      }),
    
    resetEmailSent: (email: string) => 
      toast.success('Password reset email sent', { 
        description: `Check your inbox at ${email}`,
        duration: 6000 
      }),
    
    passwordUpdated: () => 
      toast.success('Password updated', { 
        description: 'Your password has been successfully updated',
        duration: 4000 
      }),
    
    authError: (message: string) => 
      toast.error('Authentication failed', { 
        description: message,
        duration: 5000 
      })
  };

  // Loading states
  static loading = {
    start: (message: string) => 
      toast.loading(message, { duration: Infinity }),
    
    update: (toastId: string | number, message: string) => 
      toast.loading(message, { id: toastId }),
    
    success: (toastId: string | number, message: string, description?: string) => 
      toast.success(message, { id: toastId, description }),
    
    error: (toastId: string | number, message: string, description?: string) => 
      toast.error(message, { id: toastId, description })
  };

  // Data operations
  static data = {
    saved: (entityName: string) => 
      toast.success('Saved successfully', { 
        description: `${entityName} has been saved`,
        duration: 3000 
      }),
    
    deleted: (entityName: string) => 
      toast.success('Deleted successfully', { 
        description: `${entityName} has been deleted`,
        duration: 3000 
      }),
    
    loadError: (entityName: string) => 
      toast.error('Failed to load', { 
        description: `Unable to load ${entityName}. Please try again.`,
        duration: 5000 
      }),
    
    saveError: (entityName: string) => 
      toast.error('Failed to save', { 
        description: `Unable to save ${entityName}. Please try again.`,
        duration: 5000 
      })
  };

  // Security-specific notifications
  static security = {
    auditRequested: (projectName: string) => 
      toast.success('Audit request submitted', { 
        description: `Security audit for "${projectName}" has been submitted`,
        duration: 5000 
      }),
    
    vulnerabilityFound: (severity: 'low' | 'medium' | 'high' | 'critical') => 
      toast.warning('Vulnerability detected', { 
        description: `A ${severity} severity issue has been found`,
        duration: 6000 
      }),
    
    auditCompleted: (projectName: string) => 
      toast.success('Audit completed', { 
        description: `Security audit for "${projectName}" is complete`,
        duration: 5000 
      }),
    
    accessDenied: () => 
      toast.error('Access denied', { 
        description: 'You do not have permission to access this resource',
        duration: 4000 
      })
  };

  // System notifications
  static system = {
    maintenanceMode: () => 
      toast.info('Maintenance scheduled', { 
        description: 'System maintenance will begin shortly',
        duration: 8000 
      }),
    
    connectionLost: () => 
      toast.error('Connection lost', { 
        description: 'Please check your internet connection',
        duration: 6000 
      }),
    
    connectionRestored: () => 
      toast.success('Connection restored', { 
        description: 'You are back online',
        duration: 3000 
      })
  };

  // Generic helpers
  static success = (message: string, description?: string, duration = 4000) => 
    toast.success(message, { description, duration });
  
  static error = (message: string, description?: string, duration = 5000) => 
    toast.error(message, { description, duration });
  
  static info = (message: string, description?: string, duration = 4000) => 
    toast.info(message, { description, duration });
  
  static warning = (message: string, description?: string, duration = 5000) => 
    toast.warning(message, { description, duration });
}
