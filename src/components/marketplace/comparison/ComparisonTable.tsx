
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceCardProps } from "@/data/marketplace-data";

interface ComparisonTableProps {
  services: ServiceCardProps[];
}

export function ComparisonTable({ services }: ComparisonTableProps) {
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
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 font-medium">Feature</th>
            {services.map(service => (
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
            <td className="p-3 font-medium">Specialization</td>
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
          {["Code Review", "Vulnerability Assessment", "Gas Optimization", "Documentation Review"].map(feature => (
            <tr key={feature} className="border-t border-border/50">
              <td className="p-3 font-medium">{feature}</td>
              {services.map(service => {
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
  );
}
