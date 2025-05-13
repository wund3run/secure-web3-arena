
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, X, Eye, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { ServiceCardProps } from "@/data/marketplace-data";

export interface ServiceCardsProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
}

export function ServiceCards({ services, onRemoveService }: ServiceCardsProps) {
  const handleContactProvider = (service: ServiceCardProps) => {
    toast.success(`Request sent to ${service.provider.name}`, {
      description: "The provider will contact you soon"
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {services.map(service => (
        <Card key={service.id} className="relative border border-border/30 hover:border-primary/50 transition-all">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 z-10"
            onClick={() => onRemoveService(service.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm font-medium">Provider:</span>
              <span className="text-sm font-bold">{service.provider.name}</span>
              <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
            </div>
            <CardTitle className="text-base">{service.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-1 mb-3">
              {service.tags.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="bg-primary/5 border border-primary/20 px-1.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-lg">
                {service.pricing.amount} {service.pricing.currency}
              </div>
              <div className="flex items-center bg-black/10 rounded-full px-2 py-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(service.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"
                    }`}
                  />
                ))}
                <span className="text-xs ml-1">{service.rating}</span>
              </div>
            </div>
            
            <div className="text-xs flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-sky-500" />
                <span className="text-muted-foreground">24h response</span>
              </div>
              <Badge
                className="text-[10px] px-1 bg-green-100 text-green-700 border border-green-200"
              >
                Basic
              </Badge>
            </div>
            
            <div className="text-xs flex items-center">
              <Shield className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{service.completedJobs} completed jobs</span>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-3">
            <Button 
              className="w-full text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => handleContactProvider(service)}
            >
              <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
