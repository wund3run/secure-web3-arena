
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FilterSectionProps {
  title: string;
  section?: string;
  isCollapsed?: boolean;
  toggleSection?: (section: string) => void;
}

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
      role="button"
      aria-expanded={isCollapsed ? false : true}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <h3 className="font-medium text-base group-hover:text-primary transition-colors">{title}</h3>
      {isCollapsed !== undefined ? (
        isCollapsed ? 
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" /> : 
          <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
      ) : null}
    </div>
  );
}
