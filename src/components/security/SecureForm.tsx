
import React, { useState, useCallback } from 'react';
import { SecurityService } from '@/utils/security/securityService';
import { ProductionValidation } from '@/utils/validation/productionValidation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
  rateLimitKey?: string;
  maxAttempts?: number;
  windowMs?: number;
  validateData?: (data: any) => { isValid: boolean; errors: string[]; sanitizedData?: any };
  className?: string;
}

export function SecureForm({
  children,
  onSubmit,
  rateLimitKey,
  maxAttempts = 5,
  windowMs = 60000, // 1 minute
  validateData,
  className = ''
}: SecureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setRateLimitExceeded(false);

    // Check rate limiting
    if (rateLimitKey) {
      const canProceed = SecurityService.checkRateLimit(rateLimitKey, maxAttempts, windowMs);
      if (!canProceed) {
        setRateLimitExceeded(true);
        await SecurityService.logSecurityEvent(
          'RATE_LIMIT_EXCEEDED',
          `Rate limit exceeded for ${rateLimitKey}`,
          { key: rateLimitKey, maxAttempts, windowMs }
        );
        return;
      }
    }

    try {
      setIsSubmitting(true);

      // Extract form data
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      // Validate data if validator provided
      if (validateData) {
        const validation = validateData(data);
        if (!validation.isValid) {
          setError(validation.errors.join(', '));
          return;
        }
        
        // Use sanitized data
        if (validation.sanitizedData) {
          Object.assign(data, validation.sanitizedData);
        }
      }

      // Check for suspicious activity
      const inputString = JSON.stringify(data);
      if (SecurityService.detectSuspiciousActivity(inputString)) {
        await SecurityService.logSecurityEvent(
          'SUSPICIOUS_INPUT_DETECTED',
          'Suspicious input pattern detected in form submission',
          { formData: data, rateLimitKey }
        );
        setError('Invalid input detected. Please check your data and try again.');
        return;
      }

      // Submit form
      await onSubmit(data);

      // Log successful submission
      await SecurityService.logSecurityEvent(
        'FORM_SUBMISSION_SUCCESS',
        'Secure form submitted successfully',
        { rateLimitKey }
      );

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      // Log error
      await SecurityService.logSecurityEvent(
        'FORM_SUBMISSION_ERROR',
        'Form submission failed',
        { error: errorMessage, rateLimitKey }
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, rateLimitKey, maxAttempts, windowMs, validateData]);

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {rateLimitExceeded && (
        <Alert variant="error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Too many attempts. Please wait a moment before trying again.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Shield className="h-4 w-4" />
        <span>This form is protected by security validation</span>
      </div>

      {children}

      {isSubmitting && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
    </form>
  );
}
