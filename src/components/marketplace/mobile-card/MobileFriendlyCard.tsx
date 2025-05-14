
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MobileCardContent } from "./MobileCardContent";
import { MobileCardFooter } from "./MobileCardFooter";
import { MobileCardImage } from "./MobileCardImage";

export interface MobileFriendlyCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore: number;
    verificationLevel: string;
    completedProjects: number;
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
  onSelect
}: MobileFriendlyCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <MobileCardImage imageUrl={imageUrl} title={title} />
      
      <CardContent className="p-4 flex-grow">
        <MobileCardContent
          title={title}
          description={description}
          provider={provider}
          category={category}
          tags={tags}
        />
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex-shrink-0">
        <MobileCardFooter pricing={pricing} />
        
        <div className="flex justify-end flex-1">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSelect}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
