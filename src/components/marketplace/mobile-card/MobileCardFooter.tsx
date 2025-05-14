
import React from "react";

interface MobileCardFooterProps {
  pricing: {
    amount: number;
    currency: string;
    model?: "fixed" | "hourly" | "range";
  };
}

export function MobileCardFooter({ pricing }: MobileCardFooterProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pricing.currency === 'USD' ? 'USD' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pricing.amount);
  
  return (
    <div className="flex items-baseline">
      <div className="text-sm">
        <span className="font-semibold">{formattedPrice}</span>
        {pricing.model === "hourly" && <span className="text-muted-foreground ml-1">/hr</span>}
      </div>
    </div>
  );
}
