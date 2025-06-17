
import React from 'react';
import { Link } from 'react-router-dom';

interface StandardizedLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showText?: boolean;
  onClick?: () => void;
  linkTo?: string;
  asLink?: boolean;
  variant?: 'default' | 'white' | 'gradient';
}

export function StandardizedLogo({ 
  className = '', 
  size = 'medium',
  showText = true,
  onClick,
  linkTo = '/',
  asLink = true,
  variant = 'default'
}: StandardizedLogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-3xl'
  };

  const textVariantClasses = {
    default: 'font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
    white: 'font-bold text-white',
    gradient: 'font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'
  };

  const logoContent = (
    <div className={`flex items-center space-x-3 ${className}`} onClick={onClick}>
      <img 
        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
        alt="Hawkly Logo"
        className={`${sizeClasses[size]} object-contain bg-transparent`}
        style={{ backgroundColor: 'transparent' }}
      />
      {showText && (
        <span className={`${textVariantClasses[variant]} ${textSizeClasses[size]}`}>
          Hawkly
        </span>
      )}
    </div>
  );

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
