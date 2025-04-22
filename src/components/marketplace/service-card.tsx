
import { Star, BadgeCheck, Users, Shield } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
  return (
    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="h-40 bg-gradient-to-r from-web3-purple-dark to-web3-background-light relative overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-16 h-16 text-white/20" />
            </div>
          )}
          <div className="absolute top-3 right-3 flex space-x-2">
            <BadgeAward variant={provider.level} className="font-medium">
              {provider.level === "rookie" ? "Rookie" : provider.level === "expert" ? "Expert" : "Verified"}
            </BadgeAward>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mb-4 text-sm text-muted-foreground line-clamp-3">{description}</div>
        
        <div className="flex items-center space-x-1 mb-4">
          <span className="text-sm font-medium">Provider:</span>
          <span className="text-sm">{provider.name}</span>
          {provider.isVerified && (
            <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex bg-secondary/30 text-secondary-foreground px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{completedJobs} completed</span>
          </div>
          <div>
            <span className="text-xs uppercase">{category}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto border-t border-border/30">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-lg">
            {pricing.amount} {pricing.currency}
          </div>
          <Button variant="default" size="sm">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
