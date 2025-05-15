
import React from "react";
import { Link } from "react-router-dom";

interface HawklyLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function HawklyLogo({ variant = "default", size = "md" }: HawklyLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const colorClasses = {
    default: "text-primary",
    light: "text-white",
    dark: "text-gray-900",
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]}`}>
      <Link to="/" className="flex items-center gap-1.5">
        <span className="sr-only">Hawkly</span>
        <span className="inline-block">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2C7.373 2 2 7.373 2 14C2 20.627 7.373 26 14 26C20.627 26 26 20.627 26 14C26 7.373 20.627 2 14 2ZM14 22C9.589 22 6 18.411 6 14C6 9.589 9.589 6 14 6C18.411 6 22 9.589 22 14C22 18.411 18.411 22 14 22Z" fill="currentColor" />
            <path d="M19.707 8.293C19.316 7.902 18.684 7.902 18.293 8.293L14 12.586L9.707 8.293C9.316 7.902 8.684 7.902 8.293 8.293C7.902 8.684 7.902 9.316 8.293 9.707L12.586 14L8.293 18.293C7.902 18.684 7.902 19.316 8.293 19.707C8.488 19.902 8.744 20 9 20C9.256 20 9.512 19.902 9.707 19.707L14 15.414L18.293 19.707C18.488 19.902 18.744 20 19 20C19.256 20 19.512 19.902 19.707 19.707C20.098 19.316 20.098 18.684 19.707 18.293L15.414 14L19.707 9.707C20.098 9.316 20.098 8.684 19.707 8.293Z" fill="currentColor" />
          </svg>
        </span>
        <span>Hawkly</span>
      </Link>
    </div>
  );
}
