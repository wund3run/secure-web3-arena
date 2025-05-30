
import React from 'react';
import DOMPurify from 'dompurify';

interface InputSanitizerProps {
  children: React.ReactNode;
  allowedTags?: string[];
  stripTags?: boolean;
}

// XSS Protection utility functions
export const sanitizeHtml = (dirty: string, options?: { allowedTags?: string[] }): string => {
  if (typeof window === 'undefined') return dirty; // Server-side safety
  
  const config = {
    ALLOWED_TAGS: options?.allowedTags || ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
    FORBID_SCRIPT: true,
    FORBID_ATTR: ['style', 'onclick', 'onload', 'onerror'],
  };
  
  return DOMPurify.sanitize(dirty, config);
};

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove basic HTML chars
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000); // Limit length
};

export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    const parsedUrl = new URL(url);
    
    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return '';
    }
    
    return parsedUrl.toString();
  } catch {
    return '';
  }
};

export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return '';
  
  return fileName
    .replace(/[<>:"/\\|?*]/g, '') // Remove dangerous file chars
    .replace(/\.\./g, '') // Remove path traversal
    .replace(/^\.|\.$/g, '') // Remove leading/trailing dots
    .substring(0, 255); // Limit length
};

// React component for safe HTML rendering
export function SafeHtml({ 
  html, 
  allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
  className 
}: { 
  html: string; 
  allowedTags?: string[];
  className?: string;
}) {
  const sanitized = sanitizeHtml(html, { allowedTags });
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

// Input sanitizer wrapper component
export function InputSanitizer({ children }: InputSanitizerProps) {
  return <>{children}</>;
}
