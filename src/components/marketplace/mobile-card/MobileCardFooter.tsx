
import React from "react";

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
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <div className="font-bold text-lg">
          {pricing.currency === "USD" ? "$" : pricing.currency} {pricing.amount}
          {pricing.model === "hourly" && <span className="text-sm font-medium text-muted-foreground">/hr</span>}
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
