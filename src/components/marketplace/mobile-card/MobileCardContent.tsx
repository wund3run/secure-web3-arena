
import React from "react";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import { truncateText } from "@/lib/utils";

interface MobileCardContentProps {
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore?: number;
    verificationLevel?: string;
    completedProjects?: number;
  };
  category: string;
  tags: string[];
  rating?: number;
}

export function MobileCardContent({
  title,
  description,
  provider,
  category,
  tags,
  rating
}: MobileCardContentProps) {
  return (
    <div className="space-y-3">
      {/* Category Badge and Rating */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
          {category}
        </Badge>
        
        {rating !== undefined && (
          <div className="flex items-center gap-1 text-amber-500" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
            <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />
            <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      {/* Title and Description */}
      <div>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2" title={title}>
          {truncateText(title, 60)}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3" title={description}>
          {truncateText(description, 150)}
        </p>
      </div>
      
      {/* Provider Info */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium" aria-hidden="true">
          {provider.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">
          <span className="font-medium">{provider.name}</span>
          {provider.verificationLevel && (
            <span className="text-xs ml-2 bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
              {provider.verificationLevel}
            </span>
          )}
        </div>
      </div>
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1" aria-label="Service tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
