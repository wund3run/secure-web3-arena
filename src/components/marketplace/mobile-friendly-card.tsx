
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Star, Shield } from "lucide-react";
import { toast } from "sonner";
import { TrustIndicators } from "./trust-indicators";

interface MobileFriendlyCardProps {
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
  onSelect: () => void;
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
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites", 
      { description: isFavorite ? "Service removed from your saved list" : "Service added to your saved list" }
    );
  };

  return (
    <Card 
      className="h-full flex flex-col transform transition-all duration-300 hover:shadow-lg border border-border/50 hover:border-primary/50 active:scale-[0.98]"
      onClick={onSelect}
    >
      <CardHeader className="p-0">
        <div className="relative h-40 rounded-t-lg overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Shield className="h-16 w-16 text-primary/50" />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </Button>
          </div>
          
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/50 text-white hover:bg-black/60 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <div className="space-y-3">
          <h3 className="font-bold line-clamp-2">{title}</h3>
          
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-primary">
              {pricing.amount} {pricing.currency}
            </div>
          </div>
          
          <TrustIndicators 
            securityScore={provider.securityScore}
            verificationLevel={provider.verificationLevel}
            completedProjects={provider.completedProjects}
            size="sm"
          />
          
          <div className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex bg-secondary/10 px-2 py-0.5 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex bg-secondary/5 px-2 py-0.5 rounded text-xs">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full touch-manipulation"
          variant="default"
          onClick={onSelect}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
