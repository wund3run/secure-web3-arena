
import React from 'react';
import { Link } from 'react-router-dom';

interface HawklyLogoProps {
  className?: string;
  linkClassName?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export function HawklyLogo({ 
  className = "h-8 w-auto", 
  linkClassName = "",
  showText = true,
  variant = 'auto'
}: HawklyLogoProps) {
  const [imageError, setImageError] = React.useState(false);

  // Fallback to text logo if image fails to load
  if (imageError || !showText) {
    return (
      <Link to="/" className={`flex items-center ${linkClassName}`}>
        <div className={`font-bold text-2xl text-blue-600 ${className}`}>
          Hawkly
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className={`flex items-center ${linkClassName}`}>
      <img
        className={className}
        src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png"
        alt="Hawkly"
        onError={() => setImageError(true)}
      />
      {showText && (
        <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
          Hawkly
        </span>
      )}
    </Link>
  );
}
