
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
  textSize = 'text-lg', 
  showText = true,
  onClick,
  linkTo = '/',
  variant = 'default',
  asLink = true
}: HawklyLogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
    full: 'w-20 h-20'
  };

  const logoContent = (
    <div className={`flex items-center space-x-3 ${className}`} onClick={onClick}>
      <img 
        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
        alt="Hawkly Logo"
        className={`${sizeClasses[variant]} object-contain bg-transparent`}
        style={{ backgroundColor: 'transparent' }}
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
      <button type="button" className="flex items-center focus:outline-none bg-transparent">
        {logoContent}
      </button>
    );
  }

  return (
    <Link to={linkTo} className="flex items-center hover:opacity-80 transition-opacity bg-transparent">
      {logoContent}
    </Link>
  );
}
