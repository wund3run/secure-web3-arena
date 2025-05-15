
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox' | 'multiselect';
  question: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  validation?: (value: any) => string | null;
  autoFocus?: boolean;
  required?: boolean;
}

interface ConversationalFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void> | void;
  onComplete?: () => void;
  showProgressBar?: boolean;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
}

export function ConversationalForm({
  fields,
  onSubmit,
  onComplete,
  showProgressBar = true,
  initialValues = {},
  submitButtonText = "Submit"
}: ConversationalFormProps) {
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  const currentField = fields[currentFieldIndex];
  const progress = ((currentFieldIndex) / fields.length) * 100;
  
  useEffect(() => {
    // Clear error when field changes
    setError(null);
  }, [currentFieldIndex]);

  const handleNext = () => {
    const value = formData[currentField.id];
    
    // Validate required field
    if (currentField.required && (value === undefined || value === "")) {
      setError("This field is required");
      return;
    }
    
    // Custom validation if provided
    if (currentField.validation && value !== undefined) {
      const validationError = currentField.validation(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    
    if (currentFieldIndex < fields.length - 1) {
      setAnimationDirection('forward');
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setAnimationDirection('backward');
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };
  
  const handleInputChange = (value: any) => {
    setFormData({
      ...formData,
      [currentField.id]: value
    });
    setError(null);
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (onComplete) {
        onComplete();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentField.type !== 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  const renderField = () => {
    const value = formData[currentField.id] !== undefined ? formData[currentField.id] : '';
    
    switch (currentField.type) {
      case 'text':
      case 'email':
        return (
          <Input
            type={currentField.type}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentField.placeholder}
            className="w-full"
            autoFocus={currentField.autoFocus !== false}
            onKeyPress={handleKeyPress}
            aria-describedby={error ? `${currentField.id}-error` : undefined}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentField.placeholder}
            className="w-full min-h-[100px]"
            autoFocus={currentField.autoFocus !== false}
            aria-describedby={error ? `${currentField.id}-error` : undefined}
          />
        );
        
      case 'select':
        return (
          <Select
            value={value}
            onValueChange={handleInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={currentField.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {currentField.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={currentField.id}
              checked={!!value}
              onCheckedChange={handleInputChange}
            />
            <Label htmlFor={currentField.id} className="text-base">
              {currentField.placeholder}
            </Label>
          </div>
        );
        
      case 'multiselect':
        // We expect the value to be an array for multiselect
        const selectedValues = Array.isArray(value) ? value : [];
        
        return (
          <div className="space-y-2">
            {currentField.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${currentField.id}-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange([...selectedValues, option.value]);
                    } else {
                      handleInputChange(selectedValues.filter(v => v !== option.value));
                    }
                  }}
                />
                <Label htmlFor={`${currentField.id}-${option.value}`} className="text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Progress bar */}
      {showProgressBar && (
        <div className="w-full">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Start</span>
            <span>{`Question ${currentFieldIndex + 1} of ${fields.length}`}</span>
            <span>Complete</span>
          </div>
        </div>
      )}
      
      {/* Field container */}
      <div className="min-h-[200px] flex flex-col justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentFieldIndex}
            initial={{ 
              opacity: 0, 
              x: animationDirection === 'forward' ? 20 : -20 
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ 
              opacity: 0, 
              x: animationDirection === 'forward' ? -20 : 20 
            }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-medium">
              {currentField.question}
            </h3>
            
            {renderField()}
            
            {error && (
              <div 
                className="text-destructive text-sm" 
                id={`${currentField.id}-error`}
                role="alert"
              >
                {error}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentFieldIndex === 0 || isSubmitting}
          type="button"
        >
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className={currentFieldIndex === fields.length - 1 ? "bg-gradient-to-r from-primary to-secondary" : ""}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : currentFieldIndex === fields.length - 1 ? (
            submitButtonText
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
