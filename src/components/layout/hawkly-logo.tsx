
import React from 'react';
import { Link } from 'react-router-dom';

interface HawklyLogoProps {
  asLink?: boolean;
  className?: string;
}

export function HawklyLogo({ asLink = true, className = "" }: HawklyLogoProps) {
  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">H</span>
      </div>
      <span className="text-xl font-bold text-foreground">Hawkly</span>
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
