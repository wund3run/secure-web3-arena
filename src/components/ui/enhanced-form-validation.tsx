
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationMessageProps {
  type: 'error' | 'success' | 'warning';
  message: string;
  className?: string;
}

export function ValidationMessage({ type, message, className }: ValidationMessageProps) {
  const baseClasses = "flex items-center gap-2 text-sm mt-1 animate-in fade-in duration-200";
  
  const typeClasses = {
    error: "text-red-600",
    success: "text-green-600", 
    warning: "text-yellow-600"
  };

  const Icon = type === 'error' ? AlertCircle : CheckCircle;
  
  return (
    <div className={cn(baseClasses, typeClasses[type], className)}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

interface FormFieldWrapperProps {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  success?: string;
  description?: string;
  className?: string;
}

export function FormFieldWrapper({ 
  children, 
  label, 
  required, 
  error, 
  success, 
  description, 
  className 
}: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <ValidationMessage type="error" message={error} />}
      {success && <ValidationMessage type="success" message={success} />}
    </div>
  );
}
