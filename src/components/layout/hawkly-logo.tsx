
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HawklyLogoProps {
  variant?: "default" | "large" | "compact";
  className?: string;
}

export function HawklyLogo({ variant = "default", className }: HawklyLogoProps) {
  const sizes = {
    compact: {
      container: "h-8 w-8",
      icon: "h-4 w-4",
      text: "text-lg",
    },
    default: {
      container: "h-9 w-9",
      icon: "h-5 w-5",
      text: "text-xl",
    },
    large: {
      container: "h-12 w-12",
      icon: "h-6 w-6",
      text: "text-2xl",
    },
  };
  
  return (
    <Link to="/" className={cn("flex items-center space-x-2 group", className)}>
      <div className="p-1 transition-all duration-300 group-hover:scale-105">
        <div className={cn("bg-gradient-to-br from-[#9b87f5] to-[#33C3F0] rounded-lg flex items-center justify-center shadow-md", sizes[variant].container)}>
          <Shield className={cn("text-white", sizes[variant].icon)} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={cn("font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#33C3F0]", sizes[variant].text)}>
          Hawkly
        </span>
        {variant === "large" && (
          <span className="text-xs text-muted-foreground">
            Securing the Future of Web3
          </span>
        )}
      </div>
    </Link>
  );
}
