
import React from "react";
import { FunnelData, FunnelStage } from "./types";

interface OptimizationStrategiesProps {
  userType: keyof FunnelData;
  funnelData: FunnelData;
}

export function OptimizationStrategies({ userType, funnelData }: OptimizationStrategiesProps) {
  // Identify the highest dropoff stage
  const highestDropoffStage = [...funnelData[userType]].sort((a, b) => b.dropoff - a.dropoff)[0];
  
  const strategies = {
    auditor: {
      discovery: "Targeted ads on security forums, GitHub sponsorships",
      verification: "Streamlined verification with AI assistance, better progress indicators",
      firstAudit: "Guided first audit process, mentor matching program"
    },
    projectOwner: {
      problemAwareness: "Educational content on Web3 vulnerabilities, case studies of hacks",
      research: "Transparent comparison tools, auditor verification badges",
      auditRequest: "AI-assisted project submission, simplified requirement forms"
    },
    general: {
      initialVisit: "Engaging homepage with clear value proposition, interactive demos",
      resourceView: "Gamified learning paths, exclusive content access",
      communityEngagement: "Recognition system, expert AMAs, community challenges"
    }
  };
  
  const getHighestDropoffStrategy = () => {
    const stageName = highestDropoffStage.name.toLowerCase().replace(/\s/g, '');
    let strategy = "";
    
    if (userType === "auditor" && strategies.auditor[stageName as keyof typeof strategies.auditor]) {
      strategy = strategies.auditor[stageName as keyof typeof strategies.auditor];
    } else if (userType === "projectOwner" && strategies.projectOwner[stageName as keyof typeof strategies.projectOwner]) {
      strategy = strategies.projectOwner[stageName as keyof typeof strategies.projectOwner];
    } else if (userType === "general" && strategies.general[stageName as keyof typeof strategies.general]) {
      strategy = strategies.general[stageName as keyof typeof strategies.general];
    }
    
    return strategy || "Custom optimization strategy based on user behavior analysis";
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg mt-4">
      <h4 className="font-medium mb-2">Optimization Insights:</h4>
      <div className="space-y-2">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
          <p className="text-sm font-medium">Highest Dropoff: {highestDropoffStage.name} ({highestDropoffStage.dropoff}%)</p>
          <p className="text-sm text-muted-foreground">{getHighestDropoffStrategy()}</p>
        </div>
        <div className="text-sm space-y-1">
          <p className="font-medium">Additional Recommendations:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personalized onboarding experiences based on user persona</li>
            <li>Targeted engagement campaigns at conversion bottlenecks</li>
            <li>Streamlined UX at high friction points in the journey</li>
            <li>A/B testing different paths to optimize conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
