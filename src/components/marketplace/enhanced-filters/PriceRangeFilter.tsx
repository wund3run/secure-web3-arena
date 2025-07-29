
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({ min, max, value, onChange }: PriceRangeFilterProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange([newValue[0], newValue[1]]);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1]);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0]);
    onChange([value[0], newMax]);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Budget Range</Label>
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
          <span>${value[0].toLocaleString()}</span>
          <span>${value[1].toLocaleString()}</span>
        </div>
      </div>
      
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={1000}
        className="w-full"
      />
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="min-price" className="text-xs">Min</Label>
          <Input
            id="min-price"
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            min={min}
            max={value[1]}
            className="h-8"
          />
        </div>
        <div>
          <Label htmlFor="max-price" className="text-xs">Max</Label>
          <Input
            id="max-price"
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            min={value[0]}
            max={max}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}
