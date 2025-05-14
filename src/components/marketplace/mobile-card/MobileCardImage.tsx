
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getInitials } from "@/lib/utils";

interface MobileCardImageProps {
  imageUrl?: string;
  title: string;
  alt?: string;
}

export function MobileCardImage({ imageUrl, title, alt }: MobileCardImageProps) {
  const safeAlt = alt || `${title} service cover image`;
  const initials = getInitials(title);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-content');
    if (fallback) {
      fallback.classList.remove('hidden');
    }
  };

  return (
    <div className="rounded-t-lg overflow-hidden">
      <AspectRatio 
        ratio={16/9} 
        className="bg-muted"
        fallbackContent={
          <div className="fallback-content flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
            <div className="text-muted-foreground text-2xl font-medium opacity-50">
              {initials}
            </div>
          </div>
        }
      >
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={safeAlt}
              className="object-cover w-full h-full transition-all duration-300 hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
            <div className="fallback-content hidden flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50 absolute inset-0">
              <div className="text-muted-foreground text-2xl font-medium opacity-50">
                {initials}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
            <div className="text-muted-foreground text-2xl font-medium opacity-50">
              {initials}
            </div>
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
