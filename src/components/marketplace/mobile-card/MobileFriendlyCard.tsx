
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MobileCardContent } from "./MobileCardContent";
import { MobileCardFooter } from "./MobileCardFooter";
import { MobileCardImage } from "./MobileCardImage";

// Define a standalone interface without extending ServiceCardProps
export interface MobileFriendlyCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore?: number;
    verificationLevel?: string;
    completedProjects?: number;
    reputation?: number;
  };
  pricing: {
    amount: number;
    currency: string;
    model?: "fixed" | "hourly" | "range";
  };
  category: string;
  tags: string[];
  imageUrl?: string;
  onSelect?: () => void;
  rating: number;
  completedJobs: number;
}

export function MobileFriendlyCard({
  id,
  title,
  description,
  provider,
  pricing,
  category,
  tags,
  imageUrl,
  onSelect,
  rating,
  completedJobs
}: MobileFriendlyCardProps) {
  // Generate a unique ID for accessibility purposes
  const cardId = `service-card-${id}`;
  const descriptionId = `service-description-${id}`;
  
  return (
    <Card 
      className="overflow-hidden h-full flex flex-col interactive-card border-border/30 hover:border-primary/20 transition-all duration-300 group"
      id={cardId}
    >
      <MobileCardImage 
        imageUrl={imageUrl} 
        title={title} 
        alt={`${title} service preview`} // Added alt for accessibility
      />
      
      <CardContent className="p-4 flex-grow">
        <MobileCardContent
          title={title}
          description={description}
          provider={provider}
          category={category}
          tags={tags}
          rating={rating}
          descriptionId={descriptionId} // Pass ID for accessibility
        />
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex-shrink-0 justify-between items-center">
        <MobileCardFooter 
          pricing={pricing} 
          completedJobs={completedJobs} 
        />
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSelect}
          className="hover:bg-primary/5 group-hover:border-primary/30 transition-colors duration-300"
          aria-label={`View details for ${title}`}
          aria-describedby={descriptionId}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
