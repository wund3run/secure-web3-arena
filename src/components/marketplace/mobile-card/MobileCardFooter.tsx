
import React from "react";
import { formatCurrency } from "@/lib/utils";

interface MobileCardFooterProps {
  pricing: {
    amount: number;
    currency: string;
    model?: "fixed" | "hourly" | "range";
  };
  completedJobs?: number;
}

export function MobileCardFooter({
  pricing,
  completedJobs
}: MobileCardFooterProps) {
  const formattedAmount = formatCurrency(pricing.amount, pricing.currency);
  
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <div className="font-bold text-lg" aria-label={`Price: ${formattedAmount}${pricing.model === "hourly" ? " per hour" : ""}`}>
          {formattedAmount}
          {pricing.model === "hourly" && (
            <span className="text-sm font-medium text-muted-foreground">/hr</span>
          )}
        </div>
        
        {completedJobs !== undefined && (
          <div className="text-xs text-muted-foreground">
            {completedJobs} completed {completedJobs === 1 ? 'project' : 'projects'}
          </div>
        )}
      </div>
    </div>
  );
}
