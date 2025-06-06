
import React from "react";
import { Link } from "react-router-dom";

interface NavigationDropdownItemProps {
  href: string;
  title: string;
  description?: string;
  onNavigate: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
}

export function NavigationDropdownItem({
  href,
  title,
  description,
  onNavigate,
  isFirst = false,
  isLast = false,
  disabled = false
}: NavigationDropdownItemProps) {
  const baseClasses = "block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700";
  const disabledClasses = "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent";
  
  if (disabled) {
    return (
      <div 
        className={`${baseClasses} ${disabledClasses} ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
        role="menuitem"
        aria-disabled="true"
      >
        <div className="font-medium text-gray-900 dark:text-gray-100">{title}</div>
        {description && (
          <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={href}
      className={`${baseClasses} ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
      onClick={onNavigate}
      role="menuitem"
    >
      <div className="font-medium text-gray-900 dark:text-gray-100">{title}</div>
      {description && (
        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</div>
      )}
    </Link>
  );
}
