
import React from 'react';
import { Link } from 'react-router-dom';

interface HawklyLogoProps {
  className?: string;
  textSize?: string;
  showText?: boolean;
  onClick?: () => void;
  linkTo?: string;
  variant?: 'small' | 'default' | 'large' | 'full';
  asLink?: boolean;
}

export function HawklyLogo({ 
  className = '', 
  textSize = 'text-xl', 
  showText = true,
  onClick,
  linkTo = '/',
  variant = 'default',
  asLink = true
}: HawklyLogoProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
    full: 'w-16 h-16'
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`} onClick={onClick}>
      <img 
        src="/lovable-uploads/04363a2f-c38a-4f57-8d7d-24793bf99bd3.png" 
        alt="Hawkly Logo"
        className={`${sizeClasses[variant]} object-contain`}
      />
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${textSize}`}>
          Hawkly
        </span>
      )}
    </div>
  );

  // If onClick is provided or asLink is false, render as a clickable div
  if (onClick || !asLink) {
    return (
      <button type="button" className="flex items-center focus:outline-none">
        {logoContent}
      </button>
    );
  }

  return (
    <Link to={linkTo} className="flex items-center hover:opacity-80 transition-opacity">
      {logoContent}
    </Link>
  );
}
