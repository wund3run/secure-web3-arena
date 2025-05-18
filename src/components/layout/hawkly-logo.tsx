
import { cn } from "@/lib/utils";

interface HawklyLogoProps {
  variant?: "default" | "large" | "compact" | "full";
  className?: string;
  asLink?: boolean;
}

export function HawklyLogo({ variant = "default", className, asLink = true }: HawklyLogoProps) {
  const sizes = {
    compact: {
      container: "h-8 w-8",
      icon: "h-4 w-4",
      text: "text-lg",
      tagline: "text-xs"
    },
    default: {
      container: "h-10 w-10",
      icon: "h-5 w-5",
      text: "text-xl",
      tagline: "text-xs"
    },
    large: {
      container: "h-12 w-12",
      icon: "h-6 w-6",
      text: "text-2xl md:text-3xl",
      tagline: "text-sm"
    },
    full: {
      container: "h-14 w-14",
      icon: "h-7 w-7",
      text: "text-3xl md:text-4xl",
      tagline: "text-base md:text-lg"
    }
  };
  
  const LogoContent = () => (
    <>
      <div className="relative transition-all duration-300 group-hover:scale-105">
        {/* Shield SVG with gradient colors matching the screenshot */}
        <svg 
          viewBox="0 0 140 160" 
          className={cn(sizes[variant].container)}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer shield outline */}
          <path 
            d="M70 0C45 12 20 18 3 20v60c0 35 27 65 67 80 40-15 67-45 67-80V20c-17-2-42-8-67-20z" 
            fill="#6E59A5" 
          />
          
          {/* Inner shield */}
          <path 
            d="M70 10C48 20 25 26 13 28v52c0 30 23 55 57 68 34-13 57-38 57-68V28c-12-2-35-8-57-18z" 
            fill="#9b87f5" 
          />
          
          {/* Top circle */}
          <circle cx="70" cy="50" r="25" fill="#8A73E2" />
          
          {/* Lower shield inside */}
          <path 
            d="M70 55C58 60 40 64 30 65v25c0 15 15 28 40 35 25-7 40-20 40-35V65c-10-1-28-5-40-10z" 
            fill="#33C3F0" 
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className={cn("font-bold tracking-tight text-[#8A73E2]", sizes[variant].text)}>
          Hawkly
        </span>
        {(variant === "large" || variant === "full") && (
          <span className={cn("text-gray-500 font-medium", sizes[variant].tagline)}>
            Web3 Security Marketplace
          </span>
        )}
      </div>
    </>
  );
  
  if (asLink) {
    return (
      <a href="/" className={cn("flex items-center space-x-2 group", className)}>
        <LogoContent />
      </a>
    );
  }
  
  return (
    <div className={cn("flex items-center space-x-2 group", className)}>
      <LogoContent />
    </div>
  );
}
