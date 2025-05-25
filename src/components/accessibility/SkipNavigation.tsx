
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipNavigationProps {
  links: Array<{
    href: string;
    label: string;
  }>;
  className?: string;
}

export function SkipNavigation({ links, className }: SkipNavigationProps) {
  return (
    <nav className={cn("sr-only focus-within:not-sr-only", className)} aria-label="Skip navigation">
      <ul className="flex flex-col gap-2 p-4 bg-primary text-primary-foreground">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="underline focus:outline-none focus:ring-2 focus:ring-ring"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  (target as HTMLElement).focus();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
