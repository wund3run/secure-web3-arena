
import React from "react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/marketplace/card/StarRating";

interface MobileCardContentProps {
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore?: number;
    verificationLevel?: string;
  };
  category: string;
  tags: string[];
  rating: number;
  descriptionId?: string; // Added for accessibility
}

export function MobileCardContent({
  title,
  description,
  provider,
  category,
  tags,
  rating,
  descriptionId
}: MobileCardContentProps) {
  // Truncate description for better display
  const truncatedDescription = description.length > 80 
    ? `${description.substring(0, 80)}...` 
    : description;
  
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
      
      <p 
        className="text-sm text-muted-foreground line-clamp-2" 
        id={descriptionId}
      >
        {truncatedDescription}
      </p>
      
      <div className="flex items-center gap-1">
        <p className="text-xs font-medium">{provider.name}</p>
        {provider.verificationLevel && provider.verificationLevel === "verified" && (
          <span 
            className="text-primary" 
            aria-label="Verified provider"
            role="img"
          >
            ✓
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-1">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {category}
        </Badge>
        
        {tags.slice(0, 2).map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="text-[10px] px-1.5 py-0 bg-secondary/20"
          >
            {tag}
          </Badge>
        ))}
        
        {tags.length > 2 && (
          <span className="text-[10px] text-muted-foreground">
            +{tags.length - 2} more
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
        <StarRating rating={rating} size="small" />
        <span className="text-xs text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
