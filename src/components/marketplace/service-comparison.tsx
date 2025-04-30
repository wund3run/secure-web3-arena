
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCardProps } from "@/data/marketplace-data";
import { X, Star, Compare, Shield, Clock, Check, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ServiceComparisonProps {
  services: ServiceCardProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceComparison({ services, open, onOpenChange }: ServiceComparisonProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceCardProps[]>(services || []);
  
  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
    if (selectedServices.length <= 1) {
      onOpenChange(false);
    }
  };
  
  const handleContactProvider = (service: ServiceCardProps) => {
    toast.success(`Request sent to ${service.provider.name}`, {
      description: "The provider will contact you soon"
    });
  };

  // Comparison criteria
  const comparisonCriteria = [
    { name: "Price", key: "pricing" },
    { name: "Provider Reputation", key: "reputation" },
    { name: "Completed Jobs", key: "completedJobs" },
    { name: "Provider Level", key: "level" },
    { name: "Category", key: "category" },
  ];
  
  // Helper functions to get values
  const getValueForCriteria = (service: ServiceCardProps, key: string) => {
    switch(key) {
      case "pricing":
        return `${service.pricing.amount} ${service.pricing.currency}`;
      case "reputation":
        return `${service.provider.reputation}%`;
      case "completedJobs":
        return service.completedJobs;
      case "level":
        return service.provider.level.charAt(0).toUpperCase() + service.provider.level.slice(1);
      case "category":
        return service.category;
      default:
        return "-";
    }
  };

  // Function to render appropriate styling based on criteria
  const getCellClass = (service: ServiceCardProps, key: string, services: ServiceCardProps[]) => {
    // Don't highlight if there's only one service
    if (services.length <= 1) return "";
    
    switch(key) {
      case "pricing":
        // Lower price is better (highlighted)
        const prices = services.map(s => s.pricing.amount);
        return service.pricing.amount === Math.min(...prices) ? "bg-green-500/10" : "";
      case "reputation":
        // Higher reputation is better
        const reputations = services.map(s => s.provider.reputation);
        return service.provider.reputation === Math.max(...reputations) ? "bg-green-500/10" : "";
      case "completedJobs":
        // More jobs is better
        const jobs = services.map(s => s.completedJobs);
        return service.completedJobs === Math.max(...jobs) ? "bg-green-500/10" : "";
      case "level":
        // Expert is best, then verified, then rookie
        const levels = {expert: 3, verified: 2, rookie: 1};
        const maxLevel = Math.max(...services.map(s => levels[s.provider.level as keyof typeof levels]));
        return levels[service.provider.level as keyof typeof levels] === maxLevel ? "bg-green-500/10" : "";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Compare className="mr-2 h-5 w-5" />
            Service Comparison
          </DialogTitle>
          <DialogDescription>
            Compare security services side by side to find the best match for your project
          </DialogDescription>
        </DialogHeader>
        
        {selectedServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">No services selected for comparison</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => onOpenChange(false)}
            >
              Select Services
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {selectedServices.map(service => (
                <Card key={service.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => handleRemoveService(service.id)}
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
            
            {/* Detailed comparison table */}
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Feature</th>
                    {selectedServices.map(service => (
                      <th key={service.id} className="text-left p-3 font-medium">
                        {service.provider.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic comparison criteria */}
                  {comparisonCriteria.map(criteria => (
                    <tr key={criteria.key} className="border-t border-border/50">
                      <td className="p-3 font-medium">{criteria.name}</td>
                      {selectedServices.map(service => (
                        <td 
                          key={service.id} 
                          className={`p-3 ${getCellClass(service, criteria.key, selectedServices)}`}
                        >
                          {getValueForCriteria(service, criteria.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Tags/Features */}
                  <tr className="border-t border-border/50">
                    <td className="p-3 font-medium">Specialization</td>
                    {selectedServices.map(service => (
                      <td key={service.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                          {service.tags.length > 3 && (
                            <Badge variant="outline" className="text-[10px]">
                              +{service.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Audit Features */}
                  {["Code Review", "Vulnerability Assessment", "Gas Optimization", "Documentation Review"].map(feature => (
                    <tr key={feature} className="border-t border-border/50">
                      <td className="p-3 font-medium">{feature}</td>
                      {selectedServices.map(service => {
                        // Simulate feature presence based on service type and provider level
                        const hasFeature = 
                          (feature === "Code Review") ||
                          (feature === "Vulnerability Assessment") ||
                          (feature === "Gas Optimization" && 
                            (service.provider.level === "expert" || 
                             service.category === "Smart Contracts")) ||
                          (feature === "Documentation Review" && service.provider.level === "expert");
                          
                        return (
                          <td key={service.id} className="p-3">
                            {hasFeature ? <Check className="h-4 w-4 text-green-500" /> : <Minus className="h-4 w-4 text-muted" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Component to handle selection of services for comparison
interface CompareButtonProps {
  onCompare: () => void;
  count: number;
  className?: string;
}

export function CompareButton({ onCompare, count, className }: CompareButtonProps) {
  return (
    <Button
      variant={count >= 2 ? "default" : "outline"}
      size="sm"
      disabled={count < 2}
      onClick={onCompare}
      className={className}
    >
      <Compare className="h-4 w-4 mr-2" />
      Compare {count > 0 && `(${count})`}
    </Button>
  );
}
