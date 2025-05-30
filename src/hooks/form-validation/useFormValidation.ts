
import { useState, useCallback } from 'react';
import { isValidEmail, isValidUrl, meetsMinLength, isNotEmpty } from '@/utils/formValidation';
import { EnhancedToastSystem } from '@/components/ui/enhanced-toast-system';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  schema: ValidationSchema
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = schema[name];
    if (!rule) return null;

    // Required validation
    if (rule.required && !isNotEmpty(value)) {
      return `${name} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!isNotEmpty(value) && !rule.required) {
      return null;
    }

    // Min length validation
    if (rule.minLength && !meetsMinLength(value, rule.minLength)) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name} must be no more than ${rule.maxLength} characters`;
    }

    // Email validation
    if (rule.email && !isValidEmail(value)) {
      return `Please enter a valid email address`;
    }

    // URL validation
    if (rule.url && !isValidUrl(value)) {
      return `Please enter a valid URL`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [schema]);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(schema).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    if (!isValid) {
      EnhancedToastSystem.formValidationError();
    }
    
    return isValid;
  }, [data, schema, validateField]);

  const setValue = useCallback((name: string, value: any) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, data[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [data, validateField]);

  const handleSubmit = useCallback(async (
    onSubmit: (data: T) => Promise<void> | void
  ) => {
    setIsSubmitting(true);
    
    try {
      const isValid = validateAll();
      if (!isValid) {
        return false;
      }

      await onSubmit(data);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      EnhancedToastSystem.error(
        "Submission Failed",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [data, validateAll]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateAll,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}
