
import React from "react";
import { Link } from "react-router-dom";
import logoDefault from "@/assets/hawkly-logo.svg";
import logoDark from "@/assets/hawkly-logo-dark.svg";
import logoLight from "@/assets/hawkly-logo-light.svg";
import { useTheme } from "@/components/ui/theme-provider";

interface HawklyLogoProps {
  size?: "small" | "default" | "large";
  asLink?: boolean;
  variant?: "default" | "full" | "large";
  className?: string;
}

export function HawklyLogo({ size = "default", asLink = true, variant = "default", className = "" }: HawklyLogoProps) {
  const { theme } = useTheme();
  
  const getLogoSize = (): { width: number, height: number } => {
    switch (size) {
      case "small":
        return { width: 32, height: 32 };
      case "large":
        return { width: 48, height: 48 };
      default:
        return { width: 40, height: 40 };
    }
  };
  
  const logoSizes = getLogoSize();
  
  // Select the appropriate logo based on theme
  const logoSrc = theme === "dark" ? logoLight : logoDark;
  
  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="mr-3">
        <img 
          src={logoSrc} 
          alt="Hawkly - Web3 Security Platform" 
          width={logoSizes.width} 
          height={logoSizes.height}
          className="text-current transition-transform hover:scale-105"
        />
      </div>
      <span className={`font-bold bg-gradient-to-r from-[#4A90E2] via-[#8A73E2] to-[#33C3F0] bg-clip-text text-transparent ${
        size === "small" ? "text-xl" : size === "large" ? "text-3xl" : "text-2xl"
      }`}>
        HAWKLY
      </span>
    </div>
  );

  return asLink ? (
    <Link to="/" aria-label="Hawkly Home" className="transition-opacity hover:opacity-80">
      {logoContent}
    </Link>
  ) : logoContent;
}
