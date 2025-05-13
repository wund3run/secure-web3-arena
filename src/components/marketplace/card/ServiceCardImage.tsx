
import { memo } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Shield, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServiceCardImageProps {
  title: string;
  imageUrl?: string;
  category: string;
  rating: number;
  provider: {
    name: string;
    isVerified: boolean;
  };
  securityScore?: number;
}

export const ServiceCardImage = memo(function ServiceCardImage({
  title,
  imageUrl,
  category,
  rating,
  provider,
  securityScore = 85
}: ServiceCardImageProps) {
  const placeholderColors = [
    "bg-gradient-to-br from-violet-500 to-purple-800",
    "bg-gradient-to-br from-blue-500 to-indigo-800",
    "bg-gradient-to-br from-emerald-500 to-teal-800",
    "bg-gradient-to-br from-amber-500 to-orange-800",
  ];
  
  // Pick a color based on the title string to ensure consistency
  const colorIndex = title.length % placeholderColors.length;
  const placeholderColor = placeholderColors[colorIndex];

  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${placeholderColor} rounded-t-lg`}>
            <Shield className="w-12 h-12 text-white/80" />
          </div>
        )}
      </AspectRatio>
      
      <div className="absolute top-4 left-4 z-10">
        <Badge 
          className="bg-black/60 text-white text-xs backdrop-blur-sm border-white/20"
        >
          {category}
        </Badge>
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm text-xs">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span>{rating.toFixed(1)}</span>
      </div>
      
      {securityScore && (
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Score: {securityScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
});
