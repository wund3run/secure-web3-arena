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
      className="flex justify-between items-center cursor-pointer group py-2 select-none"
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
      style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", transition: 'all 0.23s cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <h3 className={
        `font-bold text-base tracking-tight uppercase transition-colors duration-200 ${isCollapsed === false ? 'text-accent-primary' : 'text-primary'} group-hover:text-accent-primary`
      } style={{ letterSpacing: '0.08em' }}>{title}</h3>
      {isCollapsed !== undefined ? (
        isCollapsed ? 
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-accent-primary transition-colors" aria-hidden="true" /> : 
          <ChevronUp className="h-4 w-4 text-accent-primary transition-colors" aria-hidden="true" />
      ) : null}
    </div>
  );
}
