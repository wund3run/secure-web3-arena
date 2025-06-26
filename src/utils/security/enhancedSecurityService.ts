
import { supabase } from '@/integrations/supabase/client';
import { auditLogger } from './AuditLogger';

interface RateLimitEntry {
  count: number;
  lastReset: number;
  blocked: boolean;
  blockUntil?: number;
}

export class EnhancedSecurityService {
  private static rateLimitMap = new Map<string, RateLimitEntry>();
  private static suspiciousActivityThreshold = 10;
  private static blockDuration = 15 * 60 * 1000; // 15 minutes

  // Enhanced rate limiting with progressive blocking
  static checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.rateLimitMap.get(key) || { count: 0, lastReset: now, blocked: false };

    // Check if currently blocked
    if (entry.blocked && entry.blockUntil && now < entry.blockUntil) {
      return false;
    }

    // Reset if window expired
    if (now - entry.lastReset > windowMs) {
      entry.count = 0;
      entry.lastReset = now;
      entry.blocked = false;
      delete entry.blockUntil;
    }

    entry.count++;

    // Block if threshold exceeded
    if (entry.count > maxAttempts) {
      entry.blocked = true;
      entry.blockUntil = now + this.blockDuration;
      
      this.logSecurityEvent(
        'RATE_LIMIT_EXCEEDED',
        `Rate limit exceeded for ${key}`,
        { key, attempts: entry.count, blocked: true }
      );
      
      return false;
    }

    this.rateLimitMap.set(key, entry);
    return true;
  }

  // Enhanced suspicious activity detection
  static detectSuspiciousActivity(input: string, context?: string): boolean {
    const suspiciousPatterns = [
      /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bDROP\b)/i,
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/i,
      /data:text\/html/i,
      /vbscript:/i,
      /on\w+\s*=/i,
      /\\x[0-9a-f]{2}/i,
      /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/
    ];

    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(input));
    
    if (isSuspicious) {
      this.logSecurityEvent(
        'SUSPICIOUS_INPUT_DETECTED',
        'Potentially malicious input detected',
        { input: input.substring(0, 100), context, patterns: 'multiple' }
      );
    }

    return isSuspicious;
  }

  // Enhanced security event logging
  static async logSecurityEvent(
    eventType: string,
    description: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const enhancedMetadata = {
        ...metadata,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer
      };

      // Log to audit logger
      await auditLogger.log(
        eventType,
        description,
        enhancedMetadata,
        'high',
        user?.id
      );

      // Log to database if user is authenticated
      if (user) {
        const { error } = await (supabase.rpc as any)('log_security_event', {
          p_user_id: user.id,
          p_event_type: eventType,
          p_event_description: description,
          p_metadata: enhancedMetadata
        });

        if (error) {
          console.error('Failed to log security event to database:', error);
        }
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Session security validation
  static async validateSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        return false;
      }

      // Check if session is close to expiring (within 5 minutes)
      const expiresAt = new Date(session.expires_at! * 1000);
      const now = new Date();
      const fiveMinutes = 5 * 60 * 1000;

      if (expiresAt.getTime() - now.getTime() < fiveMinutes) {
        // Attempt to refresh session
        const { data: { session: refreshedSession }, error: refreshError } = 
          await supabase.auth.refreshSession();
        
        if (refreshError || !refreshedSession) {
          this.logSecurityEvent(
            'SESSION_REFRESH_FAILED',
            'Failed to refresh expiring session',
            { error: refreshError?.message }
          );
          return false;
        }
      }

      return true;
    } catch (error) {
      this.logSecurityEvent(
        'SESSION_VALIDATION_ERROR',
        'Error during session validation',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      );
      return false;
    }
  }

  // Clear blocked IPs/keys (admin function)
  static clearRateLimit(key: string): void {
    this.rateLimitMap.delete(key);
  }

  // Get current rate limit status
  static getRateLimitStatus(key: string): RateLimitEntry | null {
    return this.rateLimitMap.get(key) || null;
  }
}
