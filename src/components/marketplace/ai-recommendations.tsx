
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ServiceCardProps } from "@/data/marketplace-data";
import { Brain, Shield, Sparkles, Star, Zap } from "lucide-react";
import { MobileFriendlyCard } from "./mobile-friendly-card";

interface AIRecommendationsProps {
  services: ServiceCardProps[];
  projectSize: string;
  blockchains: string[];
  onRecommendationSelect: (serviceId: string) => void;
}

export function AIRecommendations({
  services,
  projectSize,
  blockchains,
  onRecommendationSelect,
}: AIRecommendationsProps) {
  // This would normally be a complex AI-driven recommendation algorithm
  // For demo purposes, we'll just select based on some simple rules
  const getRecommendations = () => {
    // First, filter by relevant blockchains if specified
    let filtered = [...services];
    
    if (blockchains && blockchains.length > 0) {
      filtered = filtered.filter(service =>
        service.tags.some(tag =>
          blockchains.some(chain => 
            tag.toLowerCase().includes(chain.toLowerCase())
          )
        )
      );
    }
    
    // Then sort by rating and pick top 3
    filtered = filtered.sort((a, b) => {
      // Boost services based on project size
      const sizeBoostA = a.tags.includes(projectSize) ? 1 : 0;
      const sizeBoostB = b.tags.includes(projectSize) ? 1 : 0;
      
      return (b.rating + sizeBoostB) - (a.rating + sizeBoostA);
    });
    
    return filtered.slice(0, 3);
  };
  
  const recommendations = getRecommendations();
  
  if (recommendations.length === 0) {
    return (
      <Card className="bg-primary/5 border border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-primary">
            <Brain className="h-5 w-5" />
            <h3 className="font-semibold">No AI Recommendations Available</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            We couldn't find any services that match your specific requirements. 
            Try adjusting your filters or browse all available services below.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const mapProviderLevel = (level: "rookie" | "verified" | "expert") => {
    if (level === "rookie") return "verified";
    if (level === "expert") return "expert";
    return "verified";
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="bg-primary/10 p-1 rounded">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-bold">AI-Recommended Security Services</h2>
        <Badge variant="outline" className="bg-primary/5 border-primary/20 text-xs">Powered by AI</Badge>
      </div>
      
      <Card className="bg-primary/5 border border-primary/20">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold flex items-center">
                <Brain className="h-4 w-4 mr-1 text-primary" />
                Personalized Security Recommendations
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your {projectSize} project size
                {blockchains && blockchains.length > 0 && ` and ${blockchains.join(', ')} compatibility`}
              </p>
            </div>
            <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">AI Match</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((service, index) => (
              <div key={service.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <Badge className="bg-primary text-primary-foreground">Best Match</Badge>
                  </div>
                )}
                <MobileFriendlyCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  provider={{
                    name: service.provider.name,
                    securityScore: service.provider.reputation,
                    verificationLevel: mapProviderLevel(service.provider.level),
                    completedProjects: service.completedJobs
                  }}
                  pricing={service.pricing}
                  category={service.category}
                  tags={service.tags}
                  imageUrl={service.imageUrl}
                  onSelect={() => onRecommendationSelect(service.id)}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground bg-background/50 p-2 rounded">
            <p className="flex items-center">
              <Shield className="h-3 w-3 mr-1 inline" />
              These recommendations are based on your project parameters and security requirements
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-sm text-muted-foreground">
              <Zap className="h-4 w-4 mr-1" />
              <span>Matches optimized for your project</span>
            </div>
            
            <Button variant="link" size="sm" className="text-primary p-0">
              How are matches determined?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
