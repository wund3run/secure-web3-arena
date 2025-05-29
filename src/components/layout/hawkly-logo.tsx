
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface HawklyLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
  variant?: 'default' | 'large' | 'full';
  asLink?: boolean;
}

export const HawklyLogo: React.FC<HawklyLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  linkTo = '/',
  variant = 'default',
  asLink = true
}) => {
  // Handle variant sizing
  const getVariantSize = () => {
    switch (variant) {
      case 'large':
        return 'lg';
      case 'full':
        return 'lg';
      default:
        return size;
    }
  };

  const actualSize = getVariantSize();

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

  const shouldShowText = variant === 'full' || showText;

  const LogoContent = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Shield className={`${sizeClasses[actualSize]} text-blue-600`} />
      {shouldShowText && (
        <span className={`font-bold ${textSizeClasses[actualSize]} text-gray-900 dark:text-white`}>
          Hawkly
        </span>
      )}
    </div>
  );

  if (asLink && linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default HawklyLogo;
