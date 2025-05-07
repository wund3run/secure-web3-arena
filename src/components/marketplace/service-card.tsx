import { Star, BadgeCheck, Users, Shield, ArrowRight, Clock } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SecurityScore } from "@/components/trust/security-metrics";
import { useNavigate } from "react-router-dom";

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number;
    isVerified: boolean;
    level: "rookie" | "expert" | "verified";
  };
  pricing: {
    amount: number;
    currency: string;
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
}

export function ServiceCard({
  id,
  title,
  description,
  provider,
  pricing,
  rating,
  completedJobs,
  category,
  tags,
  imageUrl,
  securityScore = 85,
  responseTime = "24h",
}: ServiceCardProps) {
  
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/service/${id}`);
  };

  // Define consistent high-quality images with theme-aligned gradients for different security categories
  const getCategoryImage = (category: string) => {
    const images = {
      "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50",
      "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-40",
      "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop&blend=6E59A5&blend-mode=multiply&sat=-40",
      "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-30",
      "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "default": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-40"
    };
    
    return images[category] || images["default"];
  };

  const displayImage = imageUrl || getCategoryImage(category);

  return (
    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card h-full flex flex-col group">
      <CardHeader className="p-0">
        <div className="h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
            <img 
              src={displayImage} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = getCategoryImage("default");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
          </div>
          
          <div className="absolute top-3 right-3 flex space-x-2">
            <BadgeAward 
              variant={provider.level === "rookie" ? "verified" : provider.level} 
              className="font-medium backdrop-blur-sm shadow-lg"
            >
              {provider.level === "rookie" ? "Verified" : provider.level === "expert" ? "Expert" : "Verified"}
            </BadgeAward>
          </div>
          
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
              <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
              <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Security score */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
              <SecurityScore score={securityScore} size="sm" showLabel={false} />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-grow">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">{title}</h3>
        
        <div className="mb-4 text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
          {description}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">Provider:</span>
            <span className="text-sm">{provider.name}</span>
            {provider.isVerified && (
              <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
            )}
          </div>
          
          <div className="flex items-center text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            <span>{responseTime} response</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-flex bg-secondary/30 border border-secondary/40 text-secondary-foreground px-2.5 py-0.5 rounded-md text-xs font-medium shadow-sm"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex bg-muted/80 text-muted-foreground px-2.5 py-0.5 rounded-md text-xs font-medium shadow-sm">
              +{tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{completedJobs} completed</span>
          </div>
          <div>
            <span className="text-xs uppercase bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto border-t border-border/30">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
            {pricing.amount} {pricing.currency}
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="group-hover:bg-primary/90"
            onClick={handleViewDetails}
          >
            <span>View Details</span>
            <ArrowRight className="ml-1 h-3 w-3 opacity-70 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
