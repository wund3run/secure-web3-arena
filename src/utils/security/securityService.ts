
import { supabase } from '@/integrations/supabase/client';
import { auditLogger } from './AuditLogger';

export class SecurityService {
  // Rate limiting storage
  private static rateLimitMap = new Map<string, { count: number; lastReset: number }>();

  // Check rate limit for an action
  static checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.rateLimitMap.get(key);

    if (!entry || now - entry.lastReset > windowMs) {
      this.rateLimitMap.set(key, { count: 1, lastReset: now });
      return true;
    }

    if (entry.count >= maxAttempts) {
      return false;
    }

    entry.count++;
    return true;
  }

  // Log security event to database
  static async logSecurityEvent(
    eventType: string,
    description: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Log to local audit logger
      await auditLogger.log(
        eventType,
        description,
        metadata,
        'high',
        user?.id
      );

      // Log to database via RPC
      if (user) {
        await supabase.rpc('log_security_event', {
          p_user_id: user.id,
          p_event_type: eventType,
          p_event_description: description,
          p_metadata: metadata
        });
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Validate file upload security
  static validateFileUpload(file: File): { isValid: boolean; error?: string } {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/json',
      'application/zip'
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB
    const dangerousExtensions = /\.(exe|bat|cmd|scr|pif|jar|com|dll|sh|ps1)$/i;

    if (file.size > maxSize) {
      return { isValid: false, error: 'File too large (max 10MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'File type not allowed' };
    }

    if (dangerousExtensions.test(file.name)) {
      return { isValid: false, error: 'File extension not allowed' };
    }

    // Check for null bytes in filename
    if (file.name.includes('\0')) {
      return { isValid: false, error: 'Invalid filename' };
    }

    return { isValid: true };
  }

  // Validate redirect URL to prevent open redirects
  static validateRedirectUrl(url: string, allowedDomains: string[]): boolean {
    try {
      const urlObj = new URL(url);
      
      // Only allow HTTPS (except localhost for development)
      if (urlObj.protocol !== 'https:' && !url.includes('localhost')) {
        return false;
      }

      // Check if domain is in allowed list
      return allowedDomains.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  }

  // Check for suspicious patterns in user input
  static detectSuspiciousActivity(input: string): boolean {
    const suspiciousPatterns = [
      /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bDROP\b)/i, // SQL injection
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // XSS
      /javascript:/i, // JavaScript protocol
      /data:/i, // Data protocol
      /vbscript:/i, // VBScript protocol
      /on\w+\s*=/i, // Event handlers
    ];

    return suspiciousPatterns.some(pattern => pattern.test(input));
  }

  // Generate secure random token
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    
    return result;
  }

  // Hash sensitive data for comparison
  static async hashSensitiveData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
