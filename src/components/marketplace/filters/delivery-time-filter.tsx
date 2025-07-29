
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterSectionHeader } from "./filter-section-header";
import { FilterOption } from "./filter-types";

interface DeliveryTimeFilterProps {
  deliveryTime: string;
  setDeliveryTime: (time: string) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

const deliveryTimeOptions: FilterOption[] = [
  { id: "any", label: "Any Time" },
  { id: "1-3", label: "1-3 Days" },
  { id: "4-7", label: "4-7 Days" },
  { id: "8-14", label: "1-2 Weeks" },
  { id: "15+", label: "2+ Weeks" }
];

export function DeliveryTimeFilter({ 
  deliveryTime, 
  setDeliveryTime, 
  isCollapsed, 
  toggleSection 
}: DeliveryTimeFilterProps) {
  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Delivery Time" 
        section="delivery" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
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
  );
}
