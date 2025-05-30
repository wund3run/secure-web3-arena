
import { useState, useCallback } from 'react';
import { sanitizeInput, sanitizeUrl, sanitizeFileName } from '@/components/security/InputSanitizer';
import { authRateLimiter } from '@/components/security/SecurityHeaders';
import { securityLogger } from '@/components/security/SecurityAuditLogger';
import { useAuth } from '@/contexts/auth/AuthContext';

interface SecureFormOptions {
  enableRateLimit?: boolean;
  rateLimitKey?: string;
  sanitizeInputs?: boolean;
  maxLength?: number;
}

export function useSecureForm<T extends Record<string, any>>(
  initialValues: T,
  options: SecureFormOptions = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const {
    enableRateLimit = false,
    rateLimitKey = 'default',
    sanitizeInputs = true,
    maxLength = 10000
  } = options;

  const setValue = useCallback((field: keyof T, value: any) => {
    let sanitizedValue = value;

    if (sanitizeInputs && typeof value === 'string') {
      // Apply appropriate sanitization based on field type
      if (field.toString().includes('url') || field.toString().includes('link')) {
        sanitizedValue = sanitizeUrl(value);
      } else if (field.toString().includes('file') || field.toString().includes('name')) {
        sanitizedValue = sanitizeFileName(value);
      } else {
        sanitizedValue = sanitizeInput(value);
      }

      // Check length limits
      if (sanitizedValue.length > maxLength) {
        setErrors(prev => ({
          ...prev,
          [field]: `Input too long. Maximum ${maxLength} characters allowed.`
        }));
        return;
      }

      // Clear error if value is valid
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }

    setValues(prev => ({ ...prev, [field]: sanitizedValue }));
  }, [sanitizeInputs, maxLength, errors]);

  const validateField = useCallback((field: keyof T, value: any): string | null => {
    // Basic validation rules
    if (field.toString().includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.toString().includes('password')) {
      if (value.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    if (field.toString().includes('url')) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return null;
  }, []);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.entries(values).forEach(([field, value]) => {
      const error = validateField(field as keyof T, value);
      if (error) {
        newErrors[field as keyof T] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void,
    onError?: (error: Error) => void
  ) => {
    try {
      // Check rate limiting
      if (enableRateLimit) {
        const identifier = user?.id || 'anonymous';
        if (authRateLimiter.isRateLimited(`${rateLimitKey}-${identifier}`)) {
          throw new Error('Too many attempts. Please try again later.');
        }
      }

      // Validate form
      if (!validate()) {
        throw new Error('Please fix the errors in the form');
      }

      setIsSubmitting(true);

      // Log security event for sensitive forms
      if (rateLimitKey.includes('auth') || rateLimitKey.includes('admin')) {
        await securityLogger.logSecurityEvent({
          event_type: 'form_submission',
          user_id: user?.id,
          details: { form_type: rateLimitKey, fields: Object.keys(values) },
          severity: 'low',
        });
      }

      await onSubmit(values);

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Log failed submission
      await securityLogger.logSecurityEvent({
        event_type: 'form_submission_error',
        user_id: user?.id,
        details: { 
          form_type: rateLimitKey, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        },
        severity: 'medium',
      });

      if (onError) {
        onError(error instanceof Error ? error : new Error('Unknown error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, enableRateLimit, rateLimitKey, user?.id]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    validate,
    handleSubmit,
    reset,
    setValues,
  };
}
