
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
        return { width: 24, height: 24 };
      case "large":
        return { width: 32, height: 32 };
      default:
        return { width: 28, height: 28 };
    }
  };
  
  const logoSizes = getLogoSize();
  
  // Select the appropriate logo based on theme
  const logoSrc = theme === "dark" ? logoLight : logoDark;
  
  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">
        <img 
          src={logoSrc} 
          alt="Hawkly Logo" 
          width={logoSizes.width} 
          height={logoSizes.height}
          className="text-current"
        />
      </div>
      <span className={`font-bold ${size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl"}`}>
        Hawkly
      </span>
    </div>
  );

  return asLink ? <Link to="/" aria-label="Hawkly Home">{logoContent}</Link> : logoContent;
}
