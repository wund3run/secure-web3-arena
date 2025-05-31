
import React from 'react';
import { AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedValidation, ValidationResult } from '@/utils/security/enhancedValidation';

interface ValidationMessageProps {
  type: 'error' | 'success' | 'warning' | 'security';
  message: string;
  className?: string;
}

export function ValidationMessage({ type, message, className }: ValidationMessageProps) {
  const baseClasses = "flex items-center gap-2 text-sm mt-1 animate-in fade-in duration-200";
  
  const typeClasses = {
    error: "text-red-600",
    success: "text-green-600", 
    warning: "text-yellow-600",
    security: "text-blue-600"
  };

  const Icon = type === 'error' ? AlertCircle : type === 'security' ? Shield : CheckCircle;
  
  return (
    <div className={cn(baseClasses, typeClasses[type], className)}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

interface SecureFormFieldWrapperProps {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  success?: string;
  warning?: string;
  description?: string;
  className?: string;
  validation?: ValidationResult;
}

export function SecureFormFieldWrapper({ 
  children, 
  label, 
  required, 
  error, 
  success, 
  warning,
  description, 
  className,
  validation 
}: SecureFormFieldWrapperProps) {
  const hasErrors = error || (validation && !validation.isValid);
  const hasSuccess = success || (validation && validation.isValid && validation.sanitizedValue);
  
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {children}
        {hasErrors && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
        {hasSuccess && !hasErrors && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {/* Display validation errors */}
      {validation && !validation.isValid && validation.errors.map((err, index) => (
        <ValidationMessage key={index} type="error" message={err} />
      ))}
      
      {/* Display custom error */}
      {error && <ValidationMessage type="error" message={error} />}
      
      {/* Display success message */}
      {hasSuccess && <ValidationMessage type="success" message="Input validated and sanitized" />}
      
      {/* Display warning */}
      {warning && <ValidationMessage type="warning" message={warning} />}
    </div>
  );
}

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationType?: 'email' | 'url' | 'text' | 'number';
  validationOptions?: any;
  onValidationChange?: (result: ValidationResult) => void;
}

export function SecureInput({ 
  validationType = 'text',
  validationOptions = {},
  onValidationChange,
  onChange,
  value,
  ...props 
}: SecureInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Perform validation based on type
    let validationResult: ValidationResult;
    
    switch (validationType) {
      case 'email':
        validationResult = EnhancedValidation.validateEmail(inputValue);
        break;
      case 'url':
        validationResult = EnhancedValidation.validateURL(inputValue, validationOptions.required);
        break;
      case 'number':
        validationResult = EnhancedValidation.validateNumber(inputValue, validationOptions);
        break;
      default:
        validationResult = EnhancedValidation.validateText(inputValue, validationOptions);
        break;
    }
    
    // Call validation change handler
    if (onValidationChange) {
      onValidationChange(validationResult);
    }
    
    // Call original onChange with sanitized value
    if (onChange) {
      const sanitizedEvent = {
        ...e,
        target: {
          ...e.target,
          value: validationResult.sanitizedValue || inputValue
        }
      };
      onChange(sanitizedEvent);
    }
  };
  
  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200 hover:border-primary/50 focus:border-primary hover:shadow-sm",
        props.className
      )}
    />
  );
}
