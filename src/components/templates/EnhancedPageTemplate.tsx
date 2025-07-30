import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

interface EnhancedPageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function EnhancedPageTemplate({
  title,
  description,
  children,
  showBackButton = false,
  actions,
  className = ''
}: EnhancedPageTemplateProps) {
  return (
    <StandardLayout title={title} description={description}>
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-4">
              {actions}
            </div>
          )}
        </div>
        {children}
      </div>
    </StandardLayout>
  );
}
