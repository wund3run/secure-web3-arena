
import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

interface HawklyLogoProps {
  asLink?: boolean;
}

export function HawklyLogo({ asLink = true }: HawklyLogoProps) {
  const logoContent = (
    <div className="flex items-center">
      <div className="mr-2 bg-primary text-primary-foreground p-1 rounded shadow-sm">
        <Shield className="h-5 w-5" />
      </div>
      <span className="font-bold text-xl">Hawkly</span>
    </div>
  );
  
  if (asLink) {
    return <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">{logoContent}</Link>;
  }
  
  return logoContent;
}
