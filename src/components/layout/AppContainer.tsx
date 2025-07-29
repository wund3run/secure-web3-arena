import React from 'react';
import { cn } from '@/lib/utils';
import design from '../../../design.json';

interface AppContainerProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g., 'max-w-7xl'
  padding?: string;  // e.g., 'px-6 py-8'
  glass?: boolean;
  elevation?: boolean;
  className?: string;
}

export function AppContainer({
  children,
  maxWidth = 'max-w-7xl',
  padding = 'px-6 py-8',
  glass = false,
  elevation = false,
  className = ''
}: AppContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidth,
        padding,
        glass && 'backdrop-blur-[20px] bg-[rgba(24,31,47,0.58)] border border-[rgba(168,121,239,0.08)]',
        elevation && 'shadow-[0_8px_40px_0_rgba(50,60,130,0.23)]',
        'rounded-[1.15rem]',
        className
      )}
      style={{
        ...(glass
          ? {
              background: design.special.glassmorphism.background,
              backdropFilter: design.special.glassmorphism.backdropFilter,
              border: design.special.glassmorphism.border,
            }
          : {}),
        ...(elevation
          ? { boxShadow: design.effects.cardShadowStrong }
          : {}),
        maxWidth: design.structure.contentMaxWidth || '1320px',
      }}
    >
      {children}
    </div>
  );
} 