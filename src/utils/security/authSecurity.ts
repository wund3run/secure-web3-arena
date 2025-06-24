
import { SecurityService } from './securityService';
import { supabase } from '@/integrations/supabase/client';

export class AuthSecurity {
  // Enhanced sign in with security logging
  static async secureSignIn(email: string, password: string): Promise<any> {
    const rateLimitKey = `signin_${email}`;
    
    // Check rate limiting
    if (!SecurityService.checkRateLimit(rateLimitKey, 5, 300000)) { // 5 attempts per 5 minutes
      await SecurityService.logSecurityEvent(
        'SIGNIN_RATE_LIMIT_EXCEEDED',
        'Sign in rate limit exceeded',
        { email }
      );
      throw new Error('Too many sign in attempts. Please wait before trying again.');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        await SecurityService.logSecurityEvent(
          'SIGNIN_FAILED',
          'Sign in attempt failed',
          { email, error: error.message }
        );
        throw error;
      }

      await SecurityService.logSecurityEvent(
        'SIGNIN_SUCCESS',
        'User signed in successfully',
        { email, userId: data.user?.id }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Enhanced sign up with security validation
  static async secureSignUp(email: string, password: string, fullName: string, userType: string): Promise<any> {
    const rateLimitKey = `signup_${email}`;
    
    // Check rate limiting
    if (!SecurityService.checkRateLimit(rateLimitKey, 3, 600000)) { // 3 attempts per 10 minutes
      await SecurityService.logSecurityEvent(
        'SIGNUP_RATE_LIMIT_EXCEEDED',
        'Sign up rate limit exceeded',
        { email }
      );
      throw new Error('Too many sign up attempts. Please wait before trying again.');
    }

    // Validate input
    if (SecurityService.detectSuspiciousActivity(fullName) || 
        SecurityService.detectSuspiciousActivity(email)) {
      await SecurityService.logSecurityEvent(
        'SIGNUP_SUSPICIOUS_INPUT',
        'Suspicious input detected during sign up',
        { email, fullName }
      );
      throw new Error('Invalid input detected.');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
          },
        },
      });

      if (error) {
        await SecurityService.logSecurityEvent(
          'SIGNUP_FAILED',
          'Sign up attempt failed',
          { email, error: error.message }
        );
        throw error;
      }

      await SecurityService.logSecurityEvent(
        'SIGNUP_SUCCESS',
        'User signed up successfully',
        { email, userId: data.user?.id }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Secure password reset
  static async securePasswordReset(email: string): Promise<void> {
    const rateLimitKey = `reset_${email}`;
    
    // Check rate limiting
    if (!SecurityService.checkRateLimit(rateLimitKey, 3, 3600000)) { // 3 attempts per hour
      await SecurityService.logSecurityEvent(
        'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
        'Password reset rate limit exceeded',
        { email }
      );
      throw new Error('Too many password reset attempts. Please wait before trying again.');
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });

      if (error) {
        await SecurityService.logSecurityEvent(
          'PASSWORD_RESET_FAILED',
          'Password reset attempt failed',
          { email, error: error.message }
        );
        throw error;
      }

      await SecurityService.logSecurityEvent(
        'PASSWORD_RESET_REQUESTED',
        'Password reset requested',
        { email }
      );
    } catch (error) {
      throw error;
    }
  }

  // Validate session security
  static async validateSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        return false;
      }

      // Check if session is expired
      const now = Math.floor(Date.now() / 1000);
      if (session.expires_at && session.expires_at < now) {
        await SecurityService.logSecurityEvent(
          'SESSION_EXPIRED',
          'Session expired',
          { userId: session.user.id }
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }
}
