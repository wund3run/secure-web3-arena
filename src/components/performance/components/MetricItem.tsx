
import React from 'react';

interface MetricItemProps {
  label: string;
  value: number;
  unit?: string;
  threshold?: number;
  isGood?: boolean;
  showColor?: boolean;
}

export const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  unit = '',
  threshold,
  isGood,
  showColor = true
}) => {
  const getColor = () => {
    if (!showColor) return 'text-white';
    if (isGood !== undefined) {
      return isGood ? 'text-green-400' : 'text-red-400';
    }
    if (threshold !== undefined) {
      return value <= threshold ? 'text-green-400' : 'text-red-400';
    }
    return 'text-white';
  };

  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span className={getColor()}>
        {Math.round(value * 100) / 100}{unit}
      </span>
    </div>
  );
};
