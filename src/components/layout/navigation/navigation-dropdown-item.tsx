
import React from "react";
import { Link } from "react-router-dom";

interface NavigationDropdownItemProps {
  href: string;
  title: string;
  description?: string;
}

export function NavigationDropdownItem({ href, title, description }: NavigationDropdownItemProps) {
  return (
    <Link
      to={href}
      className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 border-transparent hover:border-primary focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-primary"
    >
      <div className="font-medium text-gray-900 dark:text-gray-100">{title}</div>
      {description && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{description}</div>
      )}
    </Link>
  );
}
