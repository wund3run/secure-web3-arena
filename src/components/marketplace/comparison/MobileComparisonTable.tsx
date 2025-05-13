
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";
import { ServiceCardProps } from "@/types/marketplace";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MobileComparisonTableProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
}

export function MobileComparisonTable({ services, onRemoveService }: MobileComparisonTableProps) {
  // Define comparison categories
  const categories = [
    { id: "general", label: "General Information" },
    { id: "pricing", label: "Pricing & Delivery" },
    { id: "features", label: "Features & Capabilities" },
    { id: "provider", label: "Provider Information" },
  ];

  // Define comparison fields for each category (same as in ComparisonTable)
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

  // Get a specific field value from a service (same as in ComparisonTable)
  const getFieldValue = (service: ServiceCardProps, fieldId: string) => {
    switch (fieldId) {
      case "name":
        return service.title;
      case "category":
        return service.category;
      case "description":
        return service.description;
      case "tags":
        return service.tags;
      case "price":
        return service.pricing ? `${service.pricing.amount} ${service.pricing.currency}` : "N/A";
      case "deliveryTime":
        return service.responseTime ? `${service.responseTime}` : "N/A";
      case "securityScore":
        return `${service.securityScore || "N/A"}`;
      case "responseTime":
        return service.responseTime || "N/A";
      case "providerName":
        return service.provider?.name || "N/A";
      case "completedJobs":
        return `${service.completedJobs || 0}`;
      case "rating":
        return `${service.rating || 0}/5`;
      default:
        return "N/A";
    }
  };

  return (
    <div className="space-y-6">
      {/* Service headers with images - optimized for mobile */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div key={service.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6 bg-background border border-border rounded-full z-10"
              onClick={() => onRemoveService(service.id)}
            >
              <CircleX className="h-6 w-6 text-muted-foreground" />
              <span className="sr-only">Remove {service.title} from comparison</span>
            </Button>
            
            <div className="border border-border rounded-md overflow-hidden">
              <div className="relative h-32 bg-muted">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={service.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                    alt={service.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="font-medium text-lg line-clamp-1">{service.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-optimized accordion comparison */}
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-lg font-medium px-2">
              {category.label}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {fields[category.id as keyof typeof fields].map((field) => (
                  <div key={field.id} className="border border-border rounded-md overflow-hidden">
                    <div className="bg-muted px-4 py-2">
                      <h4 className="font-medium">{field.label}</h4>
                    </div>
                    
                    <Table>
                      <TableBody>
                        {services.map((service) => {
                          const value = getFieldValue(service, field.id);
                          
                          return (
                            <TableRow key={`${service.id}-${field.id}`}>
                              <TableCell className="p-2">
                                <div className="font-medium text-muted-foreground text-sm">
                                  {service.title}
                                </div>
                                
                                {field.id === 'tags' && Array.isArray(value) ? (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {value.map((tag: string) => (
                                      <Badge variant="outline" key={tag} className="text-xs">{tag}</Badge>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-sm">{value}</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="px-8"
          onClick={() => onRemoveService(services[0]?.id || "")}
        >
          Clear Comparison
        </Button>
      </div>
    </div>
  );
}
