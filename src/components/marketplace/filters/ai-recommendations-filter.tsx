
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { FilterSectionHeader } from "./filter-section-header";
import { FilterOption } from "./filter-types";

interface AIRecommendationsFilterProps {
  showAIRecommendations: boolean;
  setShowAIRecommendations: (show: boolean) => void;
  projectSize: string;
  setProjectSize: (size: string) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

const projectSizeOptions: FilterOption[] = [
  { id: "small", label: "Small (<1000 LOC)" },
  { id: "medium", label: "Medium (1000-5000 LOC)" },
  { id: "large", label: "Large (>5000 LOC)" }
];

export function AIRecommendationsFilter({ 
  showAIRecommendations, 
  setShowAIRecommendations, 
  projectSize, 
  setProjectSize, 
  isCollapsed, 
  toggleSection 
}: AIRecommendationsFilterProps) {
  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="AI Recommendations" 
        section="aiRecommendations" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-recommendations" className="text-sm">
              Show AI Recommendations
            </Label>
            <Switch 
              id="ai-recommendations"
              checked={showAIRecommendations}
              onCheckedChange={setShowAIRecommendations}
            />
          </div>
          
          {showAIRecommendations && (
            <div className="space-y-3">
              <Label className="text-sm">Project Size</Label>
              <RadioGroup 
                value={projectSize}
                onValueChange={setProjectSize}
                className="space-y-1"
              >
                {projectSizeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`size-${option.id}`} />
                    <Label htmlFor={`size-${option.id}`} className="cursor-pointer text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
