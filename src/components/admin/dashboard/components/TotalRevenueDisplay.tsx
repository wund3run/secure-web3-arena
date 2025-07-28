
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

interface TotalRevenueDisplayProps {
  total: number;
  change: number;
  period: string;
}

export function TotalRevenueDisplay({ total, change, period }: TotalRevenueDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <div className="flex items-center gap-1">
            <h3 className="text-3xl font-bold">{formatCurrency(total)}</h3>
            <Badge variant={change >= 0 ? "success" : "error"} className="text-xs">
              {change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {period === "day" ? "Today" : period === "week" ? "This week" : "This month"}
          </p>
        </div>
      </div>
    </div>
  );
}
