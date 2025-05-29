
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface HawklyLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export const HawklyLogo: React.FC<HawklyLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  linkTo = '/'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const LogoContent = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Shield className={`${sizeClasses[size]} text-blue-600`} />
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} text-gray-900 dark:text-white`}>
          Hawkly
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default HawklyLogo;
