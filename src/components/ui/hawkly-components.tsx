import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HawklyCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'highlighted' | 'glass';
  elevation?: 'none' | 'subtle' | 'strong';
  glow?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function HawklyCard({
  children,
  variant = 'default',
  elevation = 'subtle',
  glow = false,
  interactive = false,
  onClick,
  className
}: HawklyCardProps) {
  const baseClasses = [
    'rounded-[1.15rem]',
    'border',
    'transition-all',
    'duration-300',
    'ease-out'
  ];

  const variantClasses = {
    default: [
      'bg-[#1e2332]',
      'border-[#23283e]'
    ],
    interactive: [
      'bg-[#1e2332]',
      'border-[#23283e]',
      'hover:border-[#a879ef]',
      'hover:scale-[1.02]',
      'cursor-pointer'
    ],
    highlighted: [
      'bg-gradient-to-br from-[#212842] to-[#2a224e]',
      'border-[#a879ef]',
      'ring-1',
      'ring-[#a879ef]/20'
    ],
    glass: [
      'bg-[rgba(24,31,47,0.58)]',
      'border-[rgba(168,121,239,0.08)]',
      'backdrop-blur-[20px]'
    ]
  };

  const elevationClasses = {
    none: '',
    subtle: 'shadow-[0_4px_20px_0_rgba(50,60,130,0.15)]',
    strong: 'shadow-[0_8px_40px_0_rgba(50,60,130,0.23)]'
  };

  const glowClasses = glow ? [
    'shadow-[0_0_24px_8px_rgba(168,121,239,0.15)]',
    'hover:shadow-[0_0_32px_12px_rgba(168,121,239,0.25)]'
  ] : [];

  const interactiveClasses = interactive ? [
    'hover:scale-[1.02]',
    'active:scale-[0.98]',
    'cursor-pointer'
  ] : [];

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        elevationClasses[elevation],
        glowClasses,
        interactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface SecurityBadgeProps {
  level: 'basic' | 'advanced' | 'enterprise';
  verified: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SecurityBadge({
  level,
  verified,
  animated = false,
  size = 'md',
  className
}: SecurityBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const levelClasses = {
    basic: 'bg-gradient-to-r from-[#32d9fa]/20 to-[#32d9fa]/10 text-[#32d9fa] border-[#32d9fa]/30',
    advanced: 'bg-gradient-to-r from-[#a879ef]/20 to-[#a879ef]/10 text-[#a879ef] border-[#a879ef]/30',
    enterprise: 'bg-gradient-to-r from-[#2de08e]/20 to-[#2de08e]/10 text-[#2de08e] border-[#2de08e]/30'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        'transition-all duration-300',
        sizeClasses[size],
        levelClasses[level],
        animated && 'animate-pulse',
        className
      )}
    >
      <div className={cn(
        'w-2 h-2 rounded-full',
        verified ? 'bg-current shadow-[0_0_8px_currentColor]' : 'bg-current/50'
      )} />
      <span className="capitalize">{level}</span>
      {verified && (
        <div className="w-3 h-3 rounded-full bg-current opacity-60" />
      )}
    </div>
  );
}

interface ProgressIndicatorProps {
  value: number;
  max: number;
  variant?: 'linear' | 'circular' | 'radial';
  animated?: boolean;
  showLabel?: boolean;
  glowEffect?: boolean;
  label?: string;
  className?: string;
}

export function ProgressIndicator({
  value,
  max,
  variant = 'linear',
  animated = false,
  showLabel = true,
  glowEffect = false,
  label,
  className
}: ProgressIndicatorProps) {
  const percentage = Math.min((value / max) * 100, 100);

  if (variant === 'circular') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#23283e"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              'transition-all duration-1000 ease-out',
              glowEffect && 'filter drop-shadow-[0_0_8px_#a879ef]'
            )}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a879ef" />
              <stop offset="100%" stopColor="#32d9fa" />
            </linearGradient>
          </defs>
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#f8f9fb]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#b2bfd4]">
            {label || `Progress`}
          </span>
          <span className="text-sm font-bold text-[#f8f9fb]">
            {value}/{max}
          </span>
        </div>
      )}
      <div className="w-full bg-[#23283e] rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa] rounded-full',
            'transition-all duration-1000 ease-out',
            glowEffect && 'shadow-[0_0_8px_#a879ef]',
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface AuditorAvatarProps {
  src?: string;
  name: string;
  skills?: string[];
  verified?: boolean;
  rating?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  className?: string;
}

export function AuditorAvatar({
  src,
  name,
  skills = [],
  verified = false,
  rating,
  size = 'md',
  showDetails = false,
  className
}: AuditorAvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative">
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-[#a879ef] to-[#32d9fa] flex items-center justify-center',
            'text-white font-bold ring-2 ring-[#23283e]',
            sizeClasses[size],
            verified && 'ring-[#a879ef] shadow-[0_0_12px_rgba(168,121,239,0.4)]'
          )}
        >
          {src ? (
            <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className={size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'}>
              {initials}
            </span>
          )}
        </div>
        {verified && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2de08e] rounded-full border-2 border-[#131822] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </div>
      
      {showDetails && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-[#f8f9fb] truncate">{name}</h4>
            {rating && (
              <div className="flex items-center gap-1">
                <span className="text-[#ffd553]">★</span>
                <span className="text-sm text-[#b2bfd4]">{rating}</span>
              </div>
            )}
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-[#212842] text-[#a879ef] rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-[#23283e] text-[#8391ad] rounded-full">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface LiveMetricProps {
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'stable';
  animated?: boolean;
  icon?: LucideIcon;
  format?: 'number' | 'currency' | 'percentage';
  className?: string;
}

export function LiveMetric({
  label,
  value,
  trend,
  animated = false,
  icon: Icon,
  format = 'number',
  className
}: LiveMetricProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        }).format(val);
      case 'percentage':
        return `${val}%`;
      default:
        return new Intl.NumberFormat('en-US', {
          notation: 'compact'
        }).format(val);
    }
  };

  const trendColors = {
    up: 'text-[#2de08e]',
    down: 'text-[#fc3574]',
    stable: 'text-[#b2bfd4]'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#b2bfd4]">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-[#a879ef]" />}
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-2xl font-bold text-[#f8f9fb]',
            animated && 'animate-pulse'
          )}
        >
          {formatValue(value)}
        </span>
        {trend && (
          <span className={cn('text-sm font-medium', trendColors[trend])}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </div>
  );
}
