
import { Star, Award, BadgeCheck } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { FilterSectionHeader } from "./filter-section-header";
import { Badge } from "@/components/ui/badge";

interface ReputationFilterProps {
  minReputation: number;
  setMinReputation: (value: number) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

export function ReputationFilter({ 
  minReputation, 
  setMinReputation, 
  isCollapsed, 
  toggleSection 
}: ReputationFilterProps) {
  // Get reputation level based on score
  const getReputationLevel = (score: number) => {
    if (score >= 90) return { label: "Elite", icon: <Award className="h-3 w-3 text-amber-500" /> };
    if (score >= 70) return { label: "Expert", icon: <BadgeCheck className="h-3 w-3 text-violet-500" /> };
    if (score >= 50) return { label: "Verified", icon: <BadgeCheck className="h-3 w-3 text-green-500" /> };
    return { label: "Basic", icon: <BadgeCheck className="h-3 w-3 text-gray-500" /> };
  };

  const reputationLevel = getReputationLevel(minReputation);
  
  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Provider Reputation" 
        section="reputation" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">Min Score: {minReputation}</span>
            </div>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 flex items-center gap-1">
              {reputationLevel.icon}
              {reputationLevel.label}
            </Badge>
          </div>
          <Slider 
            defaultValue={[0]} 
            max={100} 
            step={1} 
            value={[minReputation]}
            onValueChange={(value) => setMinReputation(value[0])}
          />
          <div className="flex justify-between mt-1">
            <div className="text-xs text-muted-foreground">Basic</div>
            <div className="text-xs text-green-500">Verified</div>
            <div className="text-xs text-violet-500">Expert</div>
            <div className="text-xs text-amber-500">Elite</div>
          </div>
        </div>
      )}
    </div>
  );
}
