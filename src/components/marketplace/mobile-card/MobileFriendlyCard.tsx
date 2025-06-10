import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MobileCardContent } from "./MobileCardContent";
import { MobileCardFooter } from "./MobileCardFooter";
import { MobileCardImage } from "./MobileCardImage";

// Keep existing interface definition
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
      className="card-enhanced h-full flex flex-col group brand-hover-lift overflow-hidden"
      id={cardId}
    >
      <MobileCardImage 
        imageUrl={imageUrl} 
        title={title} 
        alt={`${title} service preview`}
      />
      
      <CardContent className="p-4 flex-grow">
        <MobileCardContent
          title={title}
          description={description}
          provider={provider}
          category={category}
          tags={tags}
          rating={rating}
          descriptionId={descriptionId}
        />
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex-shrink-0 justify-between items-center border-t border-brand-primary/10 mt-auto">
        <MobileCardFooter 
          pricing={pricing} 
          completedJobs={completedJobs} 
        />
        
        <Button 
          variant="brandSecondary" 
          size="sm"
          onClick={onSelect}
          className="group-hover:variant-brand transition-all duration-300"
          aria-label={`View details for ${title}`}
          aria-describedby={descriptionId}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
