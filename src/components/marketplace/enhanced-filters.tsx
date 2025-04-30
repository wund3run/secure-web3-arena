
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Filter, Clock, Star } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface EnhancedFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function EnhancedFilters({ onFilterChange }: EnhancedFiltersProps) {
  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>("any");
  const [minReputation, setMinReputation] = useState<number>(0);
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(false);
  const [projectSize, setProjectSize] = useState<string>("medium");
  
  // Collapsed states for filter sections
  const [collapsedSections, setCollapsedSections] = useState({
    auditTypes: false,
    blockchains: false,
    price: false,
    delivery: false,
    reputation: false,
    aiRecommendations: false,
  });

  // Available filter options
  const auditTypes: FilterOption[] = [
    { id: "smart-contract", label: "Smart Contract Audit" },
    { id: "defi", label: "DeFi Protocol Review" },
    { id: "nft", label: "NFT Security Audit" },
    { id: "exchange", label: "DEX Security Assessment" },
    { id: "bridge", label: "Cross-chain Bridge Audit" },
    { id: "dao", label: "DAO Governance Review" }
  ];

  const blockchainOptions: FilterOption[] = [
    { id: "ethereum", label: "Ethereum" },
    { id: "solana", label: "Solana" },
    { id: "polygon", label: "Polygon" },
    { id: "avalanche", label: "Avalanche" },
    { id: "bsc", label: "BNB Chain" },
    { id: "optimism", label: "Optimism" }
  ];

  const deliveryTimeOptions: FilterOption[] = [
    { id: "any", label: "Any Time" },
    { id: "1-3", label: "1-3 Days" },
    { id: "4-7", label: "4-7 Days" },
    { id: "8-14", label: "1-2 Weeks" },
    { id: "15+", label: "2+ Weeks" }
  ];

  const projectSizeOptions: FilterOption[] = [
    { id: "small", label: "Small (<1000 LOC)" },
    { id: "medium", label: "Medium (1000-5000 LOC)" },
    { id: "large", label: "Large (>5000 LOC)" }
  ];

  // Toggle section collapse
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  const handleAuditTypeChange = (auditType: string) => {
    setSelectedAuditTypes(prev => 
      prev.includes(auditType) 
        ? prev.filter(type => type !== auditType) 
        : [...prev, auditType]
    );
  };

  const handleBlockchainChange = (blockchain: string) => {
    setSelectedBlockchains(prev => 
      prev.includes(blockchain) 
        ? prev.filter(chain => chain !== blockchain) 
        : [...prev, blockchain]
    );
  };

  // Apply all filters
  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      auditTypes: selectedAuditTypes,
      blockchains: selectedBlockchains,
      deliveryTime,
      minReputation,
      aiRecommendations: showAIRecommendations,
      projectSize: showAIRecommendations ? projectSize : null,
    };
    
    onFilterChange(filters);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 10]);
    setSelectedAuditTypes([]);
    setSelectedBlockchains([]);
    setDeliveryTime("any");
    setMinReputation(0);
    setShowAIRecommendations(false);
    setProjectSize("medium");
    
    // Also update parent component
    onFilterChange({});
  };

  // Effect to apply filters when certain values change
  useEffect(() => {
    if (showAIRecommendations) {
      handleApplyFilters();
    }
  }, [showAIRecommendations, projectSize]);

  const FilterSectionHeader = ({ title, section }: { title: string, section: keyof typeof collapsedSections }) => (
    <div 
      className="flex justify-between items-center cursor-pointer group py-2"
      onClick={() => toggleSection(section)}
    >
      <h3 className="font-medium text-base group-hover:text-primary transition-colors">{title}</h3>
      {collapsedSections[section] ? 
        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /> : 
        <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      }
    </div>
  );

  return (
    <div className="bg-card p-6 rounded-xl space-y-5 border border-border/50 sticky top-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset All</Button>
      </div>
      
      {/* Audit Types Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="Audit Types" section="auditTypes" />
        {!collapsedSections.auditTypes && (
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
      
      {/* Blockchains Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="Blockchains" section="blockchains" />
        {!collapsedSections.blockchains && (
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
      
      {/* Price Range Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="Price Range (ETH)" section="price" />
        {!collapsedSections.price && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-muted-foreground">
                {priceRange[0]} - {priceRange[1]} ETH
              </div>
            </div>
            <Slider 
              defaultValue={[0, 10]} 
              max={10} 
              step={0.1} 
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-4"
            />
            <div className="flex gap-2 items-center">
              <Input 
                type="number" 
                placeholder="Min" 
                className="w-24" 
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                step={0.1}
                min={0}
                max={priceRange[1]}
              />
              <span className="text-muted-foreground">to</span>
              <Input 
                type="number" 
                placeholder="Max" 
                className="w-24" 
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                step={0.1}
                min={priceRange[0]}
                max={10}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Delivery Time Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="Delivery Time" section="delivery" />
        {!collapsedSections.delivery && (
          <RadioGroup 
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="mt-2"
          >
            {deliveryTimeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`delivery-${option.id}`} />
                <Label htmlFor={`delivery-${option.id}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      
      {/* Provider Reputation Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="Provider Reputation" section="reputation" />
        {!collapsedSections.reputation && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm">Min Score: {minReputation}</span>
              </div>
            </div>
            <Slider 
              defaultValue={[0]} 
              max={100} 
              step={1} 
              value={[minReputation]}
              onValueChange={(value) => setMinReputation(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        )}
      </div>
      
      {/* AI Recommendations Section */}
      <div className="border-t border-border/50 pt-2">
        <FilterSectionHeader title="AI Recommendations" section="aiRecommendations" />
        {!collapsedSections.aiRecommendations && (
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
      
      {/* Summary of active filters */}
      <div className="pt-4 border-t border-border/50">
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
                Delivery: {deliveryTimeOptions.find(o => o.id === deliveryTime)?.label}
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
        
        <Button 
          onClick={handleApplyFilters} 
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
