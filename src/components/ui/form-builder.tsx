import React, { useState, useCallback } from 'react';
import { useForm, Controller, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Upload, 
  X, 
  Plus, 
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Type for form data - using Record for better compatibility
type FormData = Record<string, any>;

// Enhanced interfaces
export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'number' | 'email' | 'url' | 'date' | 'multi-select';
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: z.ZodSchema;
  conditional?: {
    field: string;
    value: unknown;
    operator?: 'equals' | 'not-equals' | 'contains';
  };
  grid?: {
    cols: number;
    span?: number;
  };
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  validation?: z.ZodSchema;
  icon?: React.ReactNode;
}

interface FormBuilderProps {
  steps: FormStep[];
  onSubmit: (data: FormData) => Promise<void>;
  onStepChange?: (step: number) => void;
  className?: string;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  autoSave?: boolean;
  initialData?: FormData;
}

export function FormBuilder({
  steps,
  onSubmit,
  onStepChange,
  className,
  showProgress = true,
  allowStepNavigation = true,
  autoSave = false,
  initialData = {}
}: FormBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Create a default schema if none provided
  const currentStepSchema = currentStepData?.validation || z.object({});

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    getValues
  } = useForm<FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const watchedValues = watch();

  const shouldShowField = useCallback((field: FormField) => {
    if (!field.conditional) return true;
    
    const { field: condField, value: condValue, operator = 'equals' } = field.conditional;
    const fieldValue = watchedValues[condField];
    
    switch (operator) {
      case 'equals':
        return fieldValue === condValue;
      case 'not-equals':
        return fieldValue !== condValue;
      case 'contains':
        return Array.isArray(fieldValue) ? fieldValue.includes(condValue) : false;
      default:
        return true;
    }
  }, [watchedValues]);

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      if (isLastStep) {
        await handleFormSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
        onStepChange?.(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const handleStepClick = async (stepIndex: number) => {
    if (!allowStepNavigation) return;
    
    if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    } else if (stepIndex === currentStep + 1) {
      await handleNext();
    }
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = getValues();
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    if (!shouldShowField(field)) return null;

    const fieldError = errors[field.id];
    const hasError = !!fieldError;

    const fieldWrapper = (children: React.ReactNode) => (
      <div className={cn(
        "space-y-2",
        field.grid && `col-span-${field.grid.span || 1}`
      )}>
        <Label htmlFor={field.id} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {children}
        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
        {hasError && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fieldError?.message as string}
          </p>
        )}
      </div>
    );

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <Input
                {...formField}
                type={field.type}
                placeholder={field.placeholder}
                className={cn(hasError && "border-red-500")}
              />
            )}
          />
        );

      case 'textarea':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <Textarea
                {...formField}
                placeholder={field.placeholder}
                className={cn(hasError && "border-red-500")}
                rows={4}
              />
            )}
          />
        );

      case 'select':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <Select onValueChange={formField.onChange} value={formField.value}>
                <SelectTrigger className={cn(hasError && "border-red-500")}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case 'checkbox':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={formField.value}
                  onCheckedChange={formField.onChange}
                />
                <Label htmlFor={field.id} className="text-sm">
                  {field.placeholder}
                </Label>
              </div>
            )}
          />
        );

      case 'radio':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <RadioGroup
                onValueChange={formField.onChange}
                value={formField.value}
                className="space-y-2"
              >
                {field.options?.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                    <Label htmlFor={`${field.id}-${option.value}`} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        );

      case 'file':
        return fieldWrapper(
          <Controller
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  {field.placeholder || "Click to upload or drag and drop"}
                </p>
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => formField.onChange(e.target.files)}
                  multiple
                />
                <Button type="button" variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Step Navigation */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => handleStepClick(index)}
              disabled={!allowStepNavigation}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                index === currentStep && "border-primary bg-primary text-primary-foreground",
                completedSteps.has(index) && index !== currentStep && "border-green-500 bg-green-500 text-white",
                index !== currentStep && !completedSteps.has(index) && "border-gray-300 text-gray-400",
                allowStepNavigation && "hover:border-primary cursor-pointer"
              )}
            >
              {completedSteps.has(index) && index !== currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : index === currentStep ? (
                <Clock className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </button>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-12 h-0.5 mx-2",
                completedSteps.has(index) ? "bg-green-500" : "bg-gray-300"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {currentStepData.icon}
            <div>
              <CardTitle>{currentStepData.title}</CardTitle>
              {currentStepData.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStepData.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className={cn(
              "grid gap-6",
              currentStepData.fields.some(f => f.grid) 
                ? `grid-cols-${Math.max(...currentStepData.fields.map(f => f.grid?.cols || 1))}`
                : "grid-cols-1"
            )}>
              {currentStepData.fields.map(renderField)}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isValid}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                
                {isLastStep && (
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 