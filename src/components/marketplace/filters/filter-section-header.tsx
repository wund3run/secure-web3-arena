
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterSectionProps } from "./filter-types";

export function FilterSectionHeader({ title, section, isCollapsed, toggleSection }: FilterSectionProps) {
  const handleToggle = () => {
    if (toggleSection && section) {
      toggleSection(section);
    }
  };

  return (
    <div 
      className="flex justify-between items-center cursor-pointer group py-2"
      onClick={handleToggle}
    >
      <h3 className="font-medium text-base group-hover:text-primary transition-colors">{title}</h3>
      {isCollapsed !== undefined ? (
        isCollapsed ? 
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /> : 
          <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : null}
    </div>
  );
}
