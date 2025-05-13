
import { formatCurrency } from "../utils/formatters";

interface RevenueSource {
  name: string;
  value: number;
  color: string;
}

interface RevenueSourcesListProps {
  sources: RevenueSource[];
}

export function RevenueSourcesList({ sources }: RevenueSourcesListProps) {
  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: source.color }}
            />
            <span className="text-sm font-medium">{source.name}</span>
          </div>
          <span className="text-sm">{formatCurrency(source.value)}</span>
        </div>
      ))}
    </div>
  );
}
