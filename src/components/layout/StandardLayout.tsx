
import React from 'react';
import { AuthAwareLayout } from './AuthAwareLayout';

interface StandardLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function StandardLayout({ title, description, children, className = '' }: StandardLayoutProps) {
  return (
    <AuthAwareLayout title={title} description={description} className={className}>
      {children}
    </AuthAwareLayout>
  );
}
