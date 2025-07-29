/**
 * Variant Migration Utilities
 * 
 * This file provides utility functions for handling the transition from 'destructive' to 'error'
 * variants and vice versa, to ensure consistent component variant usage across the application.
 */

/**
 * Converts Badge variant values to ensure compatibility
 * 
 * Badge components use "error" instead of "destructive" for error states
 * 
 * @param variant The variant value to convert
 * @returns The correct variant value for Badge components
 */
export function getBadgeVariant(variant: string | null | undefined): "error" | "success" | "warning" | "default" | "secondary" | "accent" | "outline" | null | undefined {
  if (variant === "destructive") {
    return "error";
  }
  
  return variant as "error" | "success" | "warning" | "default" | "secondary" | "accent" | "outline" | null | undefined;
}

/**
 * Converts Alert variant values to ensure compatibility
 * 
 * Alert components use "destructive" instead of "error" for error states
 * 
 * @param variant The variant value to convert
 * @returns The correct variant value for Alert components
 */
export function getAlertVariant(variant: string | null | undefined): "default" | "destructive" | null | undefined {
  if (variant === "error") {
    return "destructive";
  }
  
  return variant as "default" | "destructive" | null | undefined;
}

/**
 * Converts Button variant values to ensure compatibility
 * 
 * Button components use "destructive" instead of "error" for error states
 * 
 * @param variant The variant value to convert
 * @returns The correct variant value for Button components
 */
export function getButtonVariant(variant: string | null | undefined): "link" | "default" | "secondary" | "destructive" | "ghost" | "outline" | null | undefined {
  if (variant === "error") {
    return "destructive";
  }
  
  return variant as "link" | "default" | "secondary" | "destructive" | "ghost" | "outline" | null | undefined;
}
