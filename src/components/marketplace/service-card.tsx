
import { Star, BadgeCheck, Users, Shield, ArrowRight } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

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
}: ServiceCardProps) {
  
  const handleViewDetails = () => {
    toast.success(`Service details for ${title}`, {
      description: "Full service details would open here",
    });
  };

  // Generate a unique gradient based on the service id
  const generateGradient = (id: string) => {
    // Convert string to number for consistent color generation
    const numId = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use the number to generate HSL colors
    const hue1 = (numId * 77) % 360;
    const hue2 = (hue1 + 40) % 360;
    
    return `linear-gradient(135deg, hsl(${hue1}, 80%, 40%), hsl(${hue2}, 80%, 40%))`;
  };

  return (
    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card h-full flex flex-col group">
      <CardHeader className="p-0">
        <div className="h-48 relative overflow-hidden">
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
            </>
          ) : (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: generateGradient(id) }}
            >
              <Shield className="w-16 h-16 text-white/50" />
            </div>
          )}
          
          <div className="absolute top-3 right-3 flex space-x-2">
            <BadgeAward 
              variant={provider.level} 
              className="font-medium backdrop-blur-sm shadow-lg"
            >
              {provider.level === "rookie" ? "Rookie" : provider.level === "expert" ? "Expert" : "Verified"}
            </BadgeAward>
          </div>
          
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md px-2 py-1">
              <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
              <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-grow">
        <h3 className="font-bold text-lg mb-3 line-clamp-2">{title}</h3>
        
        <div className="mb-4 text-sm text-muted-foreground line-clamp-3 h-[4.5rem]">
          {description}
        </div>
        
        <div className="flex items-center space-x-1 mb-4">
          <span className="text-sm font-medium">Provider:</span>
          <span className="text-sm">{provider.name}</span>
          {provider.isVerified && (
            <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-flex bg-secondary/10 border border-secondary/20 text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex bg-secondary/5 text-secondary-foreground/70 px-2 py-1 rounded-md text-xs">
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
            <span className="text-xs uppercase bg-primary/10 text-primary px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto border-t border-border/30">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-lg text-gradient">
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
