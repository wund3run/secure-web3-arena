
import React from 'react';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';

export function NavbarSearch() {
  return (
    <div className="hidden md:flex flex-1 max-w-md mx-4">
      <GlobalSearchBar 
        placeholder="Search auditors, projects..."
        className="w-full"
      />
    </div>
  );
}
