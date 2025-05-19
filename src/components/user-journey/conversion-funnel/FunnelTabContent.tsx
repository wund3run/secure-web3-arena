
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
  return (
    <div className="pt-4">
      <FunnelChart 
        data={funnelData[userType]} 
        renderTooltip={renderTooltip} 
      />
      <OptimizationStrategies 
        userType={userType} 
        funnelData={funnelData} 
      />
    </div>
  );
}
