// Example implementation of the HawklyCard component

import React from 'react';
import { cn } from '@/lib/utils';

type HawklyCardVariant = 'glass' | 'highlighted' | 'standard';
type HawklyCardElevation = 'none' | 'subtle' | 'medium' | 'high';

interface HawklyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HawklyCardVariant;
  elevation?: HawklyCardElevation;
  interactive?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const HawklyCard = ({
  variant = 'standard',
  elevation = 'none',
  interactive = false,
  glow = false,
  className,
  children,
  ...props
}: HawklyCardProps) => {
  const baseClasses = 'rounded-xl overflow-hidden';
  
  const variantClasses = {
    'glass': 'bg-[#1e2332]/80 backdrop-blur-md border border-[#23283e]',
    'highlighted': 'bg-gradient-to-br from-[#1e2332] to-[#24293e] border border-[#a879ef]/20',
    'standard': 'bg-[#1e2332] border border-[#23283e]'
  };
  
  const elevationClasses = {
    'none': '',
    'subtle': 'shadow-sm shadow-black/20',
    'medium': 'shadow-md shadow-black/30',
    'high': 'shadow-lg shadow-black/40'
  };
  
  const interactiveClasses = interactive 
    ? 'hover:border-[#a879ef]/40 hover:shadow-md transition-all duration-200 cursor-pointer'
    : '';
  
  const glowClasses = glow
    ? 'before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-[#a879ef]/20 before:to-[#32d9fa]/20 before:blur-xl relative'
    : '';
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        elevationClasses[elevation],
        interactiveClasses,
        glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const SecurityBadge = ({
  level = 'basic',
  verified = false,
  size = 'md'
}: {
  level: 'basic' | 'advanced' | 'enterprise';
  verified?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const baseClasses = 'rounded-full flex items-center';
  
  const sizeClasses = {
    'sm': 'px-2 py-0.5 text-xs',
    'md': 'px-3 py-1 text-sm',
    'lg': 'px-4 py-1.5 text-base'
  };
  
  const levelClasses = {
    'basic': 'bg-[#32d9fa]/10 text-[#32d9fa] border border-[#32d9fa]/30',
    'advanced': 'bg-[#a879ef]/10 text-[#a879ef] border border-[#a879ef]/30',
    'enterprise': 'bg-[#ffd553]/10 text-[#ffd553] border border-[#ffd553]/30'
  };
  
  const levelIcons = {
    'basic': '●',
    'advanced': '◆',
    'enterprise': '★'
  };
  
  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${levelClasses[level]}`}>
      <span className="mr-1.5">{levelIcons[level]}</span>
      <span className="capitalize">{level}</span>
      {verified && (
        <span className="ml-1.5 text-[#2de08e]">✓</span>
      )}
    </div>
  );
};

export const ProgressIndicator = ({
  value,
  max = 100,
  glowEffect = false
}: {
  value: number;
  max?: number;
  glowEffect?: boolean;
}) => {
  const percentage = Math.min(Math.max(0, value / max * 100), 100);
  
  return (
    <div className="h-1.5 w-full bg-[#272e43] rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${
          glowEffect 
            ? 'bg-gradient-to-r from-[#a879ef] to-[#32d9fa] shadow-[0_0_5px_rgba(168,121,239,0.5)]' 
            : 'bg-[#a879ef]'
        }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export const LiveMetric = ({
  label,
  value,
  trend = 'neutral'
}: {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}) => {
  const trendClasses = {
    'up': 'text-[#2de08e]',
    'down': 'text-[#fc3574]',
    'neutral': 'text-[#8391ad]'
  };
  
  const trendIcons = {
    'up': '↑',
    'down': '↓',
    'neutral': '→'
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#8391ad]">{label}</span>
      <div className={`flex items-center ${trendClasses[trend]}`}>
        <span className="text-xs font-medium">{value}</span>
        <span className="ml-1">{trendIcons[trend]}</span>
      </div>
    </div>
  );
};
