
import { Check, InfoIcon, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceCardProps } from "@/data/marketplace-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ComparisonTableProps {
  services: ServiceCardProps[];
}

export function ComparisonTable({ services }: ComparisonTableProps) {
  // Comparison criteria
  const comparisonCriteria = [
    { 
      name: "Price", 
      key: "pricing",
      description: "Starting price for the security service"
    },
    { 
      name: "Provider Reputation", 
      key: "reputation",
      description: "Overall satisfaction rating from previous clients"
    },
    { 
      name: "Completed Jobs", 
      key: "completedJobs",
      description: "Number of successfully delivered security audits"
    },
    { 
      name: "Provider Level", 
      key: "level",
      description: "Qualification level based on experience and success rate"
    },
    { 
      name: "Category", 
      key: "category",
      description: "Type of security service offered"
    },
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

  // Features with descriptions for tooltips
  const auditFeatures = [
    { name: "Code Review", description: "Detailed analysis of smart contract code for vulnerabilities" },
    { name: "Vulnerability Assessment", description: "Identification and evaluation of security risks" },
    { name: "Gas Optimization", description: "Analysis and recommendations for reducing transaction costs" },
    { name: "Documentation Review", description: "Evaluation of technical documentation accuracy and completeness" }
  ];

  return (
    <div className="border rounded-md overflow-auto">
      <div className="min-w-[600px]">
        <table className="w-full text-sm" aria-label="Service comparison table">
          <caption className="sr-only">Comparison of security services</caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="text-left p-3 font-medium">Feature</th>
              {services.map(service => (
                <th scope="col" key={service.id} className="text-left p-3 font-medium">
                  {service.provider.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic comparison criteria */}
            {comparisonCriteria.map(criteria => (
              <tr key={criteria.key} className="border-t border-border/50">
                <td className="p-3 font-medium">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1" tabIndex={0}>
                        <span>{criteria.name}</span>
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        <span className="sr-only">{criteria.description}</span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="text-xs max-w-xs">{criteria.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                {services.map(service => (
                  <td 
                    key={service.id} 
                    className={`p-3 ${getCellClass(service, criteria.key, services)}`}
                  >
                    {getValueForCriteria(service, criteria.key)}
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Tags/Features */}
            <tr className="border-t border-border/50">
              <td className="p-3 font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1" tabIndex={0}>
                      <span>Specialization</span>
                      <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                      <span className="sr-only">Primary security focus areas and expertise</span>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs">Primary security focus areas and expertise</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
              {services.map(service => (
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
            {auditFeatures.map(feature => (
              <tr key={feature.name} className="border-t border-border/50">
                <td className="p-3 font-medium">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1" tabIndex={0}>
                        <span>{feature.name}</span>
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        <span className="sr-only">{feature.description}</span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="text-xs max-w-xs">{feature.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                {services.map(service => {
                  // Simulate feature presence based on service type and provider level
                  const hasFeature = 
                    (feature.name === "Code Review") ||
                    (feature.name === "Vulnerability Assessment") ||
                    (feature.name === "Gas Optimization" && 
                      (service.provider.level === "expert" || 
                      service.category === "Smart Contracts")) ||
                    (feature.name === "Documentation Review" && service.provider.level === "expert");
                    
                  return (
                    <td key={service.id} className="p-3">
                      {hasFeature ? (
                        <Check className="h-4 w-4 text-green-500" aria-label={`${feature.name} included`} />
                      ) : (
                        <Minus className="h-4 w-4 text-muted" aria-label={`${feature.name} not included`} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
