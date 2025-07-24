import React from "react";
import { FunnelChart } from "./FunnelChart";
import { OptimizationStrategies } from "./OptimizationStrategies";
import { renderTooltip } from "./FunnelTooltip";
import { FunnelData } from "./types";

interface FunnelTabContentProps {
  userType: keyof FunnelData;
  funnelData: FunnelData;
}

export function FunnelTabContent({ userType, funnelData }: FunnelTabContentProps) {
  // Create a wrapper to handle the type mismatch
  const tooltipWrapper = (props: unknown) => {
    return renderTooltip(props as any);
  };

  return (
    <div className="pt-4">
      <FunnelChart 
        data={funnelData[userType]} 
        renderTooltip={tooltipWrapper} 
      />
      <OptimizationStrategies 
        userType={userType} 
        funnelData={funnelData} 
      />
    </div>
  );
}
