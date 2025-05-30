
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface MultiSelectFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  showCount?: boolean;
}

export function MultiSelectFilter({ options, selected, onChange, showCount = true }: MultiSelectFilterProps) {
  const handleToggle = (optionId: string) => {
    const newSelected = selected.includes(optionId)
      ? selected.filter(id => id !== optionId)
      : [...selected, optionId];
    onChange(newSelected);
  };

  const handleRemove = (optionId: string) => {
    onChange(selected.filter(id => id !== optionId));
  };

  return (
    <div className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map(id => {
            const option = options.find(opt => opt.id === id);
            return option ? (
              <Badge key={id} variant="secondary" className="text-xs">
                {option.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleRemove(id)}
                />
              </Badge>
            ) : null;
          })}
        </div>
      )}
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selected.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-normal cursor-pointer flex-1 flex justify-between"
            >
              <span>{option.label}</span>
              {showCount && option.count && (
                <span className="text-muted-foreground">({option.count})</span>
              )}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
