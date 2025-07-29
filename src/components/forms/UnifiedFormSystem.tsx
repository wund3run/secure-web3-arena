
import React from 'react';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { MobileInput, MobileButton } from '@/components/ui/mobile/MobileOptimizedComponents';
import { Loader2 } from 'lucide-react';

// Form context
interface FormContextValue<T extends FieldValues> {
  form: UseFormReturn<T>;
  loading?: boolean;
}

const FormContext = React.createContext<FormContextValue<any> | null>(null);

// Main form wrapper
interface UnifiedFormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => Promise<void> | void;
  form: UseFormReturn<T>;
  className?: string;
}

export function UnifiedForm<T extends FieldValues>({
  children,
  onSubmit,
  form,
  className
}: UnifiedFormProps<T>) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data: T) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ form, loading }}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-4', className)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Form field wrapper
interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  helper?: string;
  children: (field: any, fieldState: any) => React.ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  helper,
  children
}: FormFieldProps<T>) {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('FormField must be used within UnifiedForm');
  }

  const { form } = context;
  const field = form.register(name);
  const fieldState = form.getFieldState(name, form.formState);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      {children(field, fieldState)}
      {fieldState.error && (
        <p className="text-sm text-destructive" role="alert">
          {fieldState.error.message}
        </p>
      )}
      {helper && !fieldState.error && (
        <p className="text-sm text-muted-foreground">
          {helper}
        </p>
      )}
    </div>
  );
}

// Standardized form input
interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  helper?: string;
  type?: string;
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  helper,
  type = 'text',
  placeholder
}: FormInputProps<T>) {
  return (
    <FormField name={name} label={label} helper={helper}>
      {(field, fieldState) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full h-12 px-4 text-base bg-background border border-input rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'placeholder:text-muted-foreground',
            fieldState.error && 'border-destructive focus:border-destructive focus:ring-destructive/20'
          )}
        />
      )}
    </FormField>
  );
}

// Form submit button
interface FormSubmitProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  className?: string;
}

export function FormSubmit({
  children,
  variant = 'primary',
  fullWidth = true,
  className
}: FormSubmitProps) {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('FormSubmit must be used within UnifiedForm');
  }

  const { loading } = context;

  return (
    <MobileButton
      type="submit"
      variant={variant}
      fullWidth={fullWidth}
      loading={loading}
      className={className}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </MobileButton>
  );
}

// Form validation helpers
export const formValidation = {
  required: (message = 'This field is required') => ({
    required: { value: true, message }
  }),
  
  email: (message = 'Please enter a valid email address') => ({
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message
    }
  }),
  
  minLength: (length: number, message?: string) => ({
    minLength: {
      value: length,
      message: message || `Must be at least ${length} characters`
    }
  }),
  
  maxLength: (length: number, message?: string) => ({
    maxLength: {
      value: length,
      message: message || `Must be no more than ${length} characters`
    }
  })
};
