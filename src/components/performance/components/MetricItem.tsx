
import React from "react";

interface MetricItemProps {
  label: string;
  value: number | string;
  unit?: string;
  threshold?: number;
  isGood?: boolean;
  showColor?: boolean;
}

export const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  unit = "",
  threshold,
  isGood,
  showColor = true
}) => {
  // Determine if the metric is good or bad if not explicitly specified
  const isGoodValue = isGood !== undefined 
    ? isGood 
    : threshold !== undefined 
      ? typeof value === 'number' && value !== null
        ? (threshold ? value <= threshold : value >= threshold)
        : true
      : true;
  
  const textColorClass = !showColor 
    ? "" 
    : isGoodValue 
      ? "text-green-400" 
      : "text-red-400";
  
  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span className={textColorClass}>
        {value}{unit}
      </span>
    </div>
  );
};
