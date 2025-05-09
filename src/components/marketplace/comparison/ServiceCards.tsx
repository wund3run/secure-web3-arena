
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { ServiceCardProps } from "@/data/marketplace-data";

interface ServiceCardsProps {
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
        <Card key={service.id} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={() => onRemoveService(service.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{service.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center mb-2">
              <div className="font-medium text-lg">
                {service.pricing.amount} {service.pricing.currency}
              </div>
              <div className="ml-auto flex items-center">
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
            <div className="text-xs flex items-center mb-2">
              <Shield className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{service.provider.name}</span>
              <Badge
                variant="outline"
                className={`ml-auto text-[10px] px-1 ${
                  service.provider.level === "expert" 
                    ? "border-green-500/50 bg-green-500/10" 
                    : service.provider.level === "verified"
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-gray-500/50 bg-gray-500/10"
                }`}
              >
                {service.provider.level}
              </Badge>
            </div>
            <div className="text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{service.completedJobs} completed jobs</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full text-xs h-8" onClick={() => handleContactProvider(service)}>
              Contact Provider
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
