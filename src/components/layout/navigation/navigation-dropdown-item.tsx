
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
      className="block px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
    >
      <div className="font-medium">{title}</div>
      {description && (
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      )}
    </Link>
  );
}
