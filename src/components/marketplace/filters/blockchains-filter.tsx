
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterSectionHeader } from "./filter-section-header";
import { FilterOption } from "./filter-types";

interface BlockchainsFilterProps {
  selectedBlockchains: string[];
  setSelectedBlockchains: (blockchains: string[]) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

// Available filter options
const blockchainOptions: FilterOption[] = [
  { id: "ethereum", label: "Ethereum" },
  { id: "solana", label: "Solana" },
  { id: "polygon", label: "Polygon" },
  { id: "avalanche", label: "Avalanche" },
  { id: "bsc", label: "BNB Chain" },
  { id: "optimism", label: "Optimism" }
];

export function BlockchainsFilter({ 
  selectedBlockchains, 
  setSelectedBlockchains, 
  isCollapsed, 
  toggleSection 
}: BlockchainsFilterProps) {
  const handleBlockchainChange = (blockchain: string) => {
    // Create a new array based on the current selection
    const updatedBlockchains = selectedBlockchains.includes(blockchain) 
      ? selectedBlockchains.filter(chain => chain !== blockchain) 
      : [...selectedBlockchains, blockchain];
    
    // Pass the new array directly to the setter function
    setSelectedBlockchains(updatedBlockchains);
  };

  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Blockchains" 
        section="blockchains" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {blockchainOptions.map((blockchain) => (
            <div key={blockchain.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`chain-${blockchain.id}`} 
                checked={selectedBlockchains.includes(blockchain.id)}
                onCheckedChange={() => handleBlockchainChange(blockchain.id)}
              />
              <Label htmlFor={`chain-${blockchain.id}`} className="cursor-pointer">
                {blockchain.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
