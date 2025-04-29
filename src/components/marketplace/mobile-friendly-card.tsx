
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield } from "lucide-react";
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

  // Generate fallback images for different categories
  const getFallbackImage = (category: string) => {
    const images: Record<string, string> = {
      "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop",
      "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop",
      "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop",
      "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop",
      "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
      "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop",
      "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop",
    };

    return images[category] || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&auto=format&fit=crop";
  };

  return (
    <Card 
      className="h-full flex flex-col transform transition-all duration-300 hover:shadow-lg border border-border/50 hover:border-primary/50 active:scale-[0.98] touch-manipulation"
      onClick={onSelect}
    >
      <CardHeader className="p-0">
        <div className="relative h-40 rounded-t-lg overflow-hidden">
          {imageUrl ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = getFallbackImage(category);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Shield className="h-16 w-16 text-primary/50" />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white touch-manipulation"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </Button>
          </div>
          
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/60 text-white hover:bg-black/70 backdrop-blur-sm px-3 py-1 text-sm font-medium">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <div className="space-y-3">
          <h3 className="font-bold text-base line-clamp-2 min-h-[2.5rem]">{title}</h3>
          
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
          
          <div className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {description}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex bg-secondary/20 border border-secondary/30 px-2 py-0.5 rounded text-xs font-medium text-secondary-foreground shadow-sm"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex bg-muted/40 px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full touch-manipulation h-10 text-base"
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
