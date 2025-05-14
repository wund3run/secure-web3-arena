
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MobileCardImageProps {
  imageUrl?: string;
  title: string;
}

export function MobileCardImage({ imageUrl, title }: MobileCardImageProps) {
  return (
    <div className="overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
            <span className="text-xl font-semibold text-primary/60">
              {title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
