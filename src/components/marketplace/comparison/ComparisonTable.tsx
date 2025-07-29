import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MarketplaceService } from "../hooks/types/marketplace-types";
import { Circle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ComparisonTableProps {
  services: MarketplaceService[];
  onRemoveService: (serviceId: string) => void;
}

export function ComparisonTable({ services, onRemoveService }: ComparisonTableProps) {
  // Define comparison categories
  const categories = [
    { id: "general", label: "General Information" },
    { id: "pricing", label: "Pricing & Delivery" },
    { id: "features", label: "Features & Capabilities" },
    { id: "provider", label: "Provider Information" },
  ];

  // Define comparison fields for each category
  const fields = {
    general: [
      { id: "name", label: "Service Name" },
      { id: "category", label: "Category" },
      { id: "description", label: "Description" },
      { id: "tags", label: "Tags" },
    ],
    pricing: [
      { id: "price", label: "Price" },
      { id: "deliveryTime", label: "Delivery Time" },
    ],
    features: [
      { id: "securityScore", label: "Security Score" },
      { id: "responseTime", label: "Response Time" },
    ],
    provider: [
      { id: "providerName", label: "Provider" },
      { id: "completedJobs", label: "Completed Jobs" },
      { id: "rating", label: "Rating" },
    ],
  };

  // Get a specific field value from a service
  const getFieldValue = (service: MarketplaceService, fieldId: string): string | JSX.Element => {
    const serviceData = service as any; // Type assertion for accessing dynamic properties
    
    switch (fieldId) {
      case "name":
        return serviceData.title || "N/A";
      case "category":
        return serviceData.category || "N/A";
      case "description":
        return serviceData.description || "N/A";
      case "tags":
        return serviceData.tags || [];
      case "price":
        return serviceData.pricing ? `${serviceData.pricing.amount} ${serviceData.pricing.currency}` : "N/A";
      case "deliveryTime":
        return serviceData.deliveryTime ? `${serviceData.deliveryTime} days` : "N/A";
      case "securityScore":
        return `${serviceData.securityScore || "N/A"}`;
      case "responseTime":
        return serviceData.responseTime || "N/A";
      case "providerName":
        return serviceData.provider?.name || "N/A";
      case "completedJobs":
        return `${serviceData.completedJobs || 0}`;
      case "rating":
        return `${serviceData.rating || 0}/5`;
      default:
        return "N/A";
    }
  };

  return (
    <div className="space-y-6 mt-4" role="region" aria-label="Service Comparison">
      {/* Service headers with images */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="hidden md:block"></div> {/* Empty cell for field labels */}
        
        {services.map((service) => (
          <div key={service.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6 bg-background border border-border rounded-full z-10"
              onClick={() => onRemoveService(service.id)}
              aria-label={`Remove ${(service as any).title} from comparison`}
            >
              <Circle className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </Button>
            
            <div className="border border-border rounded-md overflow-hidden">
              <div className="relative h-32 bg-muted">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={(service as any).imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                    alt={`${(service as any).title} illustration`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="font-medium text-sm line-clamp-1">{(service as any).title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison tables by category */}
      {categories.map((category) => (
        <div key={category.id} className="border border-border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2" id={`category-${category.id}`}>
            <h3 className="font-medium">{category.label}</h3>
          </div>
          
          <Table>
            <TableHead className="sr-only">
              <TableRow>
                <TableCell>Field</TableCell>
                {services.map(service => (
                  <TableCell key={`header-${service.id}`}>{(service as any).title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields[category.id as keyof typeof fields].map((field) => (
                <TableRow key={field.id}>
                  <TableCell className="font-medium w-1/4">
                    <span id={`${category.id}-${field.id}-label`}>{field.label}</span>
                  </TableCell>
                  
                  {services.map((service) => {
                    const value = getFieldValue(service, field.id);
                    const cellId = `${category.id}-${field.id}-${service.id}`;
                    
                    return (
                      <TableCell 
                        key={`${service.id}-${field.id}`} 
                        className="w-1/4"
                        id={cellId}
                        aria-labelledby={`${category.id}-${field.id}-label`}
                      >
                        {field.id === 'tags' && Array.isArray(value) ? (
                          <div className="flex flex-wrap gap-1">
                            {(value as string[]).map((tag: string) => (
                              <Badge variant="outline" key={tag}>{tag}</Badge>
                            ))}
                          </div>
                        ) : (
                          <span>{value}</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="px-8"
          onClick={() => onRemoveService(services[0]?.id || "")}
          aria-label="Clear all services from comparison"
        >
          Clear Comparison
        </Button>
      </div>
    </div>
  );
}
