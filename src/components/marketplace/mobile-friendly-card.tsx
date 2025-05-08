
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield } from "lucide-react";
import { toast } from "sonner";
import { TrustIndicators } from "./trust-indicators";
import { useNavigate } from "react-router-dom";

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

  // Generate themed images for different categories
  const getFallbackImage = (category: string) => {
    const images: Record<string, string> = {
      "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50",
      "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-40",
      "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop&blend=6E59A5&blend-mode=multiply&sat=-40",
      "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-30",
      "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
    };

    return images[category] || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-40";
  };

  return (
    <Card 
      className="h-full flex flex-col transform transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/50 active:scale-[0.99] touch-manipulation"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-32 rounded-t-lg overflow-hidden">
          {imageUrl ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Shield className="h-12 w-12 text-primary/50" />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white touch-manipulation"
              onClick={toggleFavorite}
              type="button"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </Button>
          </div>
          
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/70 text-white hover:bg-black/80 backdrop-blur-sm px-2 py-0.5 text-xs font-medium">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-3">
        <div className="space-y-2">
          <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{title}</h3>
          
          <div className="flex items-center space-x-2">
            <div className="text-base font-bold text-gradient bg-gradient-to-r from-primary to-primary/80">
              {pricing.amount} {pricing.currency}
            </div>
          </div>
          
          <TrustIndicators 
            securityScore={provider.securityScore}
            verificationLevel={provider.verificationLevel}
            completedProjects={provider.completedProjects}
            size="sm" 
          />
          
          <div className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {description}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex bg-secondary/30 border border-secondary/40 px-1.5 py-0.5 rounded text-xs font-medium text-secondary-foreground shadow-sm"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-flex bg-muted/80 px-1.5 py-0.5 rounded text-xs font-medium text-muted-foreground shadow-sm">
                +{tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button 
          className="w-full touch-manipulation h-8 text-sm"
          variant="default"
          onClick={handleCardClick}
          type="button"
        >
          View Details
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
