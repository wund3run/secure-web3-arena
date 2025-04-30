
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCardProps } from "@/data/marketplace-data";
import { Sparkles, Shield, Clock } from "lucide-react";
import { toast } from "sonner";

interface AIRecommendationsProps {
  services: ServiceCardProps[];
  projectSize?: "small" | "medium" | "large";
  blockchains?: string[];
  onRecommendationSelect?: (service: ServiceCardProps) => void;
}

export function AIRecommendations({ 
  services, 
  projectSize = "medium",
  blockchains = [], 
  onRecommendationSelect 
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ServiceCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate AI recommendations based on project size and blockchain
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    const timer = setTimeout(() => {
      let recommendedServices = [...services];
      
      // Filter based on project size
      if (projectSize === "small") {
        // For small projects, prefer faster delivery and lower cost
        recommendedServices = recommendedServices.sort((a, b) => {
          // Prioritize cost and then reputation for small projects
          if (a.pricing.amount !== b.pricing.amount) {
            return a.pricing.amount - b.pricing.amount;
          }
          return b.provider.reputation - a.provider.reputation;
        });
      } else if (projectSize === "large") {
        // For large projects, prioritize high reputation and expertise
        recommendedServices = recommendedServices.sort((a, b) => {
          // Prioritize expertise level and then reputation
          if (a.provider.level !== b.provider.level) {
            return a.provider.level === "expert" ? -1 : 1;
          }
          return b.provider.reputation - a.provider.reputation;
        });
      } else {
        // For medium projects, balance reputation and cost
        recommendedServices = recommendedServices.sort((a, b) => {
          // Combined score of reputation and inverse of price
          const scoreA = a.provider.reputation - (a.pricing.amount * 5);
          const scoreB = b.provider.reputation - (b.pricing.amount * 5);
          return scoreB - scoreA;
        });
      }
      
      // Further filter by blockchain if specified
      if (blockchains.length > 0) {
        recommendedServices = recommendedServices.filter(service => 
          service.tags.some(tag => 
            blockchains.includes(tag.toLowerCase())
          )
        );
      }
      
      // Take top 3 recommendations
      setRecommendations(recommendedServices.slice(0, 3));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [services, projectSize, blockchains]);

  const getRecommendationReason = (service: ServiceCardProps) => {
    if (projectSize === "small") {
      return "Best value for small projects";
    } else if (projectSize === "large") {
      return "Comprehensive coverage for large codebases";
    } else {
      return "Balanced quality and value";
    }
  };

  const handleSelect = (service: ServiceCardProps) => {
    if (onRecommendationSelect) {
      onRecommendationSelect(service);
    } else {
      toast.info(`Selected recommended service: ${service.title}`);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full bg-gradient-to-br from-background to-muted/30 border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Finding the best security services for your project...</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="h-24 rounded-md bg-muted animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className="w-full bg-gradient-to-br from-background to-muted/30 border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            AI Recommendations
          </CardTitle>
          <CardDescription>No matching services found for your criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 text-center">
            <p className="text-muted-foreground">
              Try adjusting your project size or blockchain selection
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-to-br from-background to-muted/30 border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Tailored services for {projectSize} projects
          {blockchains.length > 0 && ` on ${blockchains.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3 pt-2">
          {recommendations.map((service, index) => (
            <div 
              key={service.id}
              className="flex justify-between p-3 bg-card border border-border/60 rounded-md hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col">
                <div className="font-medium">{service.title}</div>
                <div className="text-xs flex items-center text-muted-foreground">
                  <Shield className="h-3 w-3 mr-1" />
                  {service.provider.name} · {service.provider.reputation}% reputation
                </div>
                <Badge variant="outline" className="mt-1 text-xs w-fit bg-primary/10 border-primary/30">
                  {getRecommendationReason(service)}
                </Badge>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">{service.pricing.amount} {service.pricing.currency}</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.completedJobs} completed jobs
                </div>
                <Button size="sm" variant="ghost" className="mt-1" onClick={() => handleSelect(service)}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="text-xs text-muted-foreground">
          Recommendations based on project complexity and security requirements
        </div>
      </CardFooter>
    </Card>
  );
}
