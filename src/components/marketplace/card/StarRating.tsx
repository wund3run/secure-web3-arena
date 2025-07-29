
import React from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "small" | "medium" | "large";
  showValue?: boolean;
}

export function StarRating({ rating, size = "medium", showValue = false }: StarRatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Set size based on prop
  const starSize = {
    small: { width: 12, height: 12, className: "h-3 w-3" },
    medium: { width: 16, height: 16, className: "h-4 w-4" },
    large: { width: 20, height: 20, className: "h-5 w-5" }
  }[size];
  
  return (
    <div 
      className="flex items-center" 
      role="img" 
      aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
    >
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star 
          key={`star-${i}`} 
          className={`${starSize.className} text-yellow-400 fill-yellow-400`}
          aria-hidden="true"
        />
      ))}
      
      {/* Render half star if needed */}
      {hasHalfStar && (
        <StarHalf 
          className={`${starSize.className} text-yellow-400 fill-yellow-400`}
          aria-hidden="true" 
        />
      )}
      
      {/* Render empty stars */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star 
          key={`empty-star-${i}`} 
          className={`${starSize.className} text-yellow-400`}
          aria-hidden="true"
        />
      ))}
      
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground" aria-hidden="true">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
