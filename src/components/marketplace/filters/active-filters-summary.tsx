
import { Badge } from "@/components/ui/badge";

interface ActiveFiltersSummaryProps {
  selectedAuditTypes: string[];
  selectedBlockchains: string[];
  priceRange: [number, number];
  deliveryTime: string;
  minReputation: number;
  showAIRecommendations: boolean;
}

export function ActiveFiltersSummary({ 
  selectedAuditTypes, 
  selectedBlockchains, 
  priceRange, 
  deliveryTime, 
  minReputation, 
  showAIRecommendations 
}: ActiveFiltersSummaryProps) {
  const deliveryTimeLabels: Record<string, string> = {
    "any": "Any Time",
    "1-3": "1-3 Days",
    "4-7": "4-7 Days",
    "8-14": "1-2 Weeks",
    "15+": "2+ Weeks"
  };

  return (
    <div className="mb-3">
      <div className="text-sm text-muted-foreground mb-2">Active Filters:</div>
      <div className="flex flex-wrap gap-2">
        {selectedAuditTypes.length > 0 && (
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            {selectedAuditTypes.length} Audit Types
          </Badge>
        )}
        {selectedBlockchains.length > 0 && (
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            {selectedBlockchains.length} Blockchains
          </Badge>
        )}
        {(priceRange[0] > 0 || priceRange[1] < 10) && (
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            Price: {priceRange[0]}-{priceRange[1]} ETH
          </Badge>
        )}
        {deliveryTime !== "any" && (
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            Delivery: {deliveryTimeLabels[deliveryTime]}
          </Badge>
        )}
        {minReputation > 0 && (
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            Min Reputation: {minReputation}
          </Badge>
        )}
        {showAIRecommendations && (
          <Badge variant="outline" className="bg-secondary/10 border-secondary/30">
            AI Recommendations
          </Badge>
        )}
      </div>
    </div>
  );
}
