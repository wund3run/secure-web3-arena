
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MobileCardImageProps {
  imageUrl?: string;
  title: string;
}

export function MobileCardImage({ imageUrl, title }: MobileCardImageProps) {
  return (
    <div className="rounded-t-lg overflow-hidden">
      <AspectRatio ratio={16/9} className="bg-muted">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${title} service cover image`}
            className="object-cover w-full h-full transition-all duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
            <div className="text-muted-foreground text-2xl font-medium opacity-50">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
