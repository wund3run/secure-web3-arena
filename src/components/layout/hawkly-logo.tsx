
import React from 'react';
import { Link } from 'react-router-dom';

interface HawklyLogoProps {
  asLink?: boolean;
  className?: string;
  variant?: 'default' | 'full' | 'large' | 'small';
}

export function HawklyLogo({ asLink = true, className = "", variant = 'default' }: HawklyLogoProps) {
  const getLogoSize = () => {
    switch (variant) {
      case 'large':
        return 'w-10 h-10';
      case 'small':
        return 'w-6 h-6';
      case 'full':
      case 'default':
      default:
        return 'w-8 h-8';
    }
  };

  const getTextSize = () => {
    switch (variant) {
      case 'large':
        return 'text-2xl';
      case 'small':
        return 'text-lg';
      case 'full':
      case 'default':
      default:
        return 'text-xl';
    }
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${getLogoSize()} bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">H</span>
      </div>
      <span className={`${getTextSize()} font-bold text-foreground`}>Hawkly</span>
    </div>
  );

  if (!asLink) {
    return logoContent;
  }

  return (
    <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
      {logoContent}
    </Link>
  );
}

// Export the interface for other components to use
export type { HawklyLogoProps };
