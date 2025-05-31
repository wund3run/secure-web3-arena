
import React from 'react';
import { Link } from 'react-router-dom';

interface HawklyLogoProps {
  className?: string;
  textSize?: string;
  showText?: boolean;
  onClick?: () => void;
  linkTo?: string;
}

export function HawklyLogo({ 
  className = '', 
  textSize = 'text-xl', 
  showText = true,
  onClick,
  linkTo = '/'
}: HawklyLogoProps) {
  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`} onClick={onClick}>
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-2">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        </svg>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${textSize}`}>
          Hawkly
        </span>
      )}
    </div>
  );

  // If onClick is provided, render as a clickable div, otherwise as a Link
  if (onClick) {
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
