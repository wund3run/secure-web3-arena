import * as React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive container component that provides consistent max width and margins
 * for content across different screen sizes.
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export { ResponsiveContainer };
