// Security configuration and utilities
import { createClient } from '@supabase/supabase-js'

// Security configuration
export const SECURITY_CONFIG = {
  // Session management
  SESSION_TIMEOUT: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600') * 1000, // 1 hour
  SESSION_REFRESH_THRESHOLD: parseInt(import.meta.env.VITE_SESSION_REFRESH_THRESHOLD || '300') * 1000, // 5 minutes
  
  // Rate limiting
  RATE_LIMIT_REQUESTS: parseInt(import.meta.env.VITE_RATE_LIMIT_REQUESTS || '100'),
  RATE_LIMIT_WINDOW: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW || '60') * 1000, // 1 minute
  
  // Data security
  ENCRYPT_SENSITIVE_DATA: import.meta.env.VITE_ENCRYPT_SENSITIVE_DATA === 'true',
  AUDIT_LOGGING: import.meta.env.VITE_AUDIT_LOGGING === 'true',
  
  // Security mode
  SECURITY_MODE: import.meta.env.VITE_SECURITY_MODE || 'strict',
  FORCE_HTTPS: import.meta.env.VITE_FORCE_HTTPS === 'true',
}

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; windowStart: number }>()

// Security utilities
export class SecurityUtils {
  
  // Check rate limit for actions
  static checkRateLimit(action: string, userId?: string): boolean {
    const key = `${action}-${userId || 'anonymous'}`
    const now = Date.now()
    const existing = rateLimitStore.get(key)
    
    // Clean expired entries
    if (existing && now - existing.windowStart > SECURITY_CONFIG.RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(key)
    }
    
    const current = rateLimitStore.get(key) || { count: 0, windowStart: now }
    
    if (current.count >= SECURITY_CONFIG.RATE_LIMIT_REQUESTS) {
      return false // Rate limited
    }
    
    rateLimitStore.set(key, {
      count: current.count + 1,
      windowStart: current.windowStart
    })
    
    return true
  }
  
  // Sanitize user input
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .trim()
      .substring(0, 1000) // Limit length
  }
  
  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(email)
  }
  
  // Validate wallet address
  static isValidWalletAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
  
  // Log security events
  static async logSecurityEvent(
    supabase: any,
    event: {
      action: string
      details?: Record<string, any>
      severity?: 'low' | 'medium' | 'high'
    }
  ) {
    if (!SECURITY_CONFIG.AUDIT_LOGGING) return
    
    try {
      await supabase.from('security_audit_log').insert({
        action: event.action,
        new_values: event.details || {},
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.warn('Failed to log security event:', error)
    }
  }
  
  // Encrypt sensitive data (client-side)
  static async encryptSensitiveData(data: string): Promise<string> {
    if (!SECURITY_CONFIG.ENCRYPT_SENSITIVE_DATA) return data
    
    try {
      // Use Web Crypto API for client-side encryption
      const encoder = new TextEncoder()
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode('your-encryption-key-here'), // In production, derive from user context
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      )
      
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode(data)
      )
      
      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength)
      combined.set(iv)
      combined.set(new Uint8Array(encrypted), iv.length)
      
      return btoa(String.fromCharCode(...combined))
    } catch (error) {
      console.warn('Encryption failed:', error)
      return data
    }
  }
  
  // Validate session security
  static validateSession(session: any): boolean {
    if (!session?.expires_at) return false
    
    const expiresAt = new Date(session.expires_at).getTime()
    const now = Date.now()
    
    // Check if session is expired or about to expire
    return expiresAt > now + SECURITY_CONFIG.SESSION_REFRESH_THRESHOLD
  }
  
  // Secure form data before submission
  static secureFormData(formData: Record<string, any>): Record<string, any> {
    const secured: Record<string, any> = {}
    
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string') {
        secured[key] = this.sanitizeInput(value)
      } else {
        secured[key] = value
      }
    }
    
    return secured
  }
  
  // Check for suspicious activity patterns
  static detectSuspiciousActivity(actions: string[]): boolean {
    // Look for rapid repeated actions
    const actionCounts = actions.reduce((acc, action) => {
      acc[action] = (acc[action] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    // Flag if any action appears more than 10 times in recent history
    return Object.values(actionCounts).some(count => count > 10)
  }
}

// Secure Supabase client configuration
export function createSecureSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false // Prevent session hijacking via URL
    },
    global: {
      headers: {
        'X-Security-Mode': SECURITY_CONFIG.SECURITY_MODE
      }
    }
  })
}

// Content Security Policy headers
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Needed for Vite in dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://divymuaksqdgjsrlptct.supabase.co wss://divymuaksqdgjsrlptct.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
}

// Security middleware for API calls
export async function secureApiCall<T>(
  apiCall: () => Promise<T>,
  action: string,
  userId?: string
): Promise<T> {
  // Check rate limit
  if (!SecurityUtils.checkRateLimit(action, userId)) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }
  
  try {
    const result = await apiCall()
    
    // Log successful action
    if (SECURITY_CONFIG.AUDIT_LOGGING) {
      SecurityUtils.logSecurityEvent(createSecureSupabaseClient(), {
        action: `${action}_success`,
        severity: 'low'
      })
    }
    
    return result
  } catch (error) {
    // Log failed action
    if (SECURITY_CONFIG.AUDIT_LOGGING) {
      SecurityUtils.logSecurityEvent(createSecureSupabaseClient(), {
        action: `${action}_failed`,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
        severity: 'medium'
      })
    }
    
    throw error
  }
}
