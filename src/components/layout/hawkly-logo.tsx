
import React from "react";
import { Link } from "react-router-dom";

interface HawklyLogoProps {
  size?: "small" | "default" | "large";
  asLink?: boolean;
  variant?: "default" | "full" | "large";  // Added variant prop
  className?: string;  // Added className prop
}

export function HawklyLogo({ size = "default", asLink = true, variant = "default", className = "" }: HawklyLogoProps) {
  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">
        <svg
          width={size === "small" ? "24" : size === "large" ? "32" : "28"}
          height={size === "small" ? "24" : size === "large" ? "32" : "28"}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 4L6 14V34L25 44L44 34V14L25 4Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M25 44V28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M44 14L25 28L6 14"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 34L25 28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 28L44 34"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 18V19"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`font-bold ${size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl"}`}>
        Hawkly
      </span>
    </div>
  );

  return asLink ? <Link to="/" aria-label="Hawkly Home">{logoContent}</Link> : logoContent;
}
