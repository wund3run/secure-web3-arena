
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  success?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ 
  label, 
  error, 
  required, 
  helpText, 
  success, 
  className,
  children 
}: FormFieldProps) {
  const fieldId = React.useId();
  
  return (
    <div className={cn("form-field", className)}>
      <label 
        htmlFor={fieldId} 
        className="form-label"
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': error ? `${fieldId}-error` : helpText ? `${fieldId}-help` : undefined,
          'aria-invalid': error ? 'true' : 'false',
          className: cn(
            "form-input",
            error && "border-destructive focus:border-destructive",
            success && "border-green-500 focus:border-green-500",
            (children as React.ReactElement).props.className
          )
        })}
        
        {success && (
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
        
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
        )}
      </div>
      
      {error && (
        <div 
          id={`${fieldId}-error`}
          className="form-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
      
      {helpText && !error && (
        <div 
          id={`${fieldId}-help`}
          className="text-sm text-muted-foreground mt-1"
        >
          {helpText}
        </div>
      )}
    </div>
  );
}

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <input
        className={cn(
          "form-input",
          error && "border-destructive focus:border-destructive",
          success && "border-green-500 focus:border-green-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
EnhancedInput.displayName = "EnhancedInput";

interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export const EnhancedTextarea = forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "form-input min-h-[100px] resize-vertical",
          error && "border-destructive focus:border-destructive",
          success && "border-green-500 focus:border-green-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
EnhancedTextarea.displayName = "EnhancedTextarea";
