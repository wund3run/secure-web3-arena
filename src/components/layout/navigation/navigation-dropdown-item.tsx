
import React from "react";
import { Link } from "react-router-dom";

interface NavigationDropdownItemProps {
  href: string;
  title: string;
  description?: string;
  onNavigate?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function NavigationDropdownItem({ 
  href, 
  title, 
  description, 
  onNavigate,
  isFirst,
  isLast 
}: NavigationDropdownItemProps) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={`
        block px-4 py-3 text-sm transition-all duration-200
        hover:bg-gray-50 dark:hover:bg-gray-700 
        focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700
        border-l-4 border-transparent hover:border-primary focus:border-primary
        group relative
        ${isFirst ? 'rounded-t-lg' : ''}
        ${isLast ? 'rounded-b-lg' : ''}
      `}
      style={{ 
        backgroundColor: 'white',
        color: '#374151'
      }}
      role="menuitem"
      tabIndex={0}
    >
      <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
        {title}
      </div>
      {description && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300">
          {description}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </Link>
  );
}
