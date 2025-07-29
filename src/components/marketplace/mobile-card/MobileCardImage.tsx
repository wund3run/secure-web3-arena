
import React from "react";

interface MobileCardImageProps {
  imageUrl?: string;
  title: string;
  alt?: string; // Added alt prop for better accessibility
}

export function MobileCardImage({ imageUrl, title, alt }: MobileCardImageProps) {
  // Fallback alt text
  const imageAlt = alt || `${title} service preview image`;
  
  return (
    <div className="relative w-full h-40 bg-muted/50 overflow-hidden">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          loading="lazy" // For better performance
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted/40"
          aria-label={imageAlt}
          role="img"
        >
          <span className="text-muted-foreground font-medium text-sm opacity-70">
            {title.substring(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
