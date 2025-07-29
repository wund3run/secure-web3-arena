
import React from "react";

interface CompareProps {
  className?: string;
}

export function Compare({ className = "h-6 w-6" }: CompareProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 8H6m4 8H6M15 8l3 8m-3 0l3-8" />
    </svg>
  );
}
