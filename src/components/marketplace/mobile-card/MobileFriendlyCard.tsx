
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MobileCardImage } from "./MobileCardImage";
import { MobileCardContent } from "./MobileCardContent";
import { MobileCardFooter } from "./MobileCardFooter";

export interface MobileFriendlyCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore: number;
    verificationLevel: "verified" | "expert" | "elite";
    completedProjects: number;
  };
  pricing: {
    amount: number;
    currency: string;
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
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites", 
      { description: isFavorite ? "Service removed from your saved list" : "Service added to your saved list" }
    );
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      // Only navigate if onSelect is not provided
      navigate(`/service/${id}`, { 
        state: { 
          serviceDetail: {
            id,
            title,
            description,
            provider,
            pricing,
            category,
            tags,
            imageUrl
          }
        }
      });
    }
  };

  const handleFooterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click handler from firing
    handleCardClick();
  };

  return (
    <Card 
      className="h-full flex flex-col transform transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/50 active:scale-[0.99] touch-manipulation cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <MobileCardImage 
          imageUrl={imageUrl}
          title={title}
          category={category}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </CardHeader>
      
      <CardContent className="flex-grow p-3">
        <MobileCardContent
          title={title}
          description={description}
          provider={provider}
          pricing={pricing}
          tags={tags}
        />
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <MobileCardFooter onClick={handleFooterClick} />
      </CardFooter>
    </Card>
  );
}
