
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterSectionHeader } from "./filter-section-header";
import { FilterOption } from "./filter-types";

interface AuditTypesFilterProps {
  selectedAuditTypes: string[];
  setSelectedAuditTypes: (types: string[]) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

// Available filter options
const auditTypes: FilterOption[] = [
  { id: "smart-contract", label: "Smart Contract Audit" },
  { id: "defi", label: "DeFi Protocol Review" },
  { id: "nft", label: "NFT Security Audit" },
  { id: "exchange", label: "DEX Security Assessment" },
  { id: "bridge", label: "Cross-chain Bridge Audit" },
  { id: "dao", label: "DAO Governance Review" }
];

export function AuditTypesFilter({ 
  selectedAuditTypes, 
  setSelectedAuditTypes, 
  isCollapsed, 
  toggleSection 
}: AuditTypesFilterProps) {
  const handleAuditTypeChange = (auditType: string) => {
    // Create a new array based on the current selection
    const updatedTypes = selectedAuditTypes.includes(auditType) 
      ? selectedAuditTypes.filter(type => type !== auditType) 
      : [...selectedAuditTypes, auditType];
    
    // Pass the new array directly to the setter function
    setSelectedAuditTypes(updatedTypes);
  };

  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Audit Types" 
        section="auditTypes" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="space-y-2 mt-2">
          {auditTypes.map((auditType) => (
            <div key={auditType.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`audit-${auditType.id}`} 
                checked={selectedAuditTypes.includes(auditType.id)}
                onCheckedChange={() => handleAuditTypeChange(auditType.id)}
              />
              <Label htmlFor={`audit-${auditType.id}`} className="cursor-pointer">
                {auditType.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
