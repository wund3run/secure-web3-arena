
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoadmapPhase } from "./types";
import { MilestoneList } from "./MilestoneList";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface PhaseCardProps {
  phase: RoadmapPhase;
}

export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <Card className="border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl md:text-2xl">{phase.title}</CardTitle>
          <Badge variant={phase.progress === 100 ? "default" : "outline"} className={phase.progress === 100 ? "bg-green-500 hover:bg-green-600" : ""}>
            {phase.progress === 100 ? "Completed" : phase.progress > 0 ? "In Progress" : "Upcoming"}
          </Badge>
        </div>
        <CardDescription className="text-base">{phase.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Milestones</h3>
          <MilestoneList milestones={phase.milestones} />
          
          <div className="mt-6 border-t border-border pt-4">
            <h4 className="text-sm font-medium mb-2">Timeline Impact</h4>
            <p className="text-sm text-muted-foreground">
              {phase.id === 1 && "Foundation phase establishes core platform experiences and Web3 integrations."}
              {phase.id === 2 && "Innovation phase strengthens platform security and introduces AI-powered tools."}
              {phase.id === 3 && "Scalability phase ensures platform can handle growth and deeper blockchain integration."}
              {phase.id === 4 && "Governance phase transitions platform to community leadership and sustainable growth."}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Feature Highlights</h3>
          <div className="rounded-lg overflow-hidden border border-border">
            <AspectRatio ratio={16/9}>
              <div className="flex items-center justify-center w-full h-full bg-muted">
                {phase.visualAsset ? (
                  <img 
                    src={phase.visualAsset} 
                    alt={`${phase.title} visualization`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">Feature visualization</span>
                )}
              </div>
            </AspectRatio>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Key Objectives</h4>
            <ul className="space-y-2">
              {phase.id === 1 && (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Enhance user interfaces for better accessibility</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Integrate Web3 wallets for seamless authentication</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Establish support infrastructure and community presence</span>
                  </li>
                </>
              )}
              
              {phase.id === 2 && (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Implement advanced security features and undergo third-party audit</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Launch AI-assisted tools for more efficient auditing</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Store audit results on-chain for transparency and verification</span>
                  </li>
                </>
              )}
              
              {phase.id === 3 && (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Optimize performance for handling 10,000+ simultaneous users</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Implement decentralized identity verification for auditors</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Expand audit services to multiple blockchains</span>
                  </li>
                </>
              )}
              
              {phase.id === 4 && (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Launch DAO for community governance and decision-making</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Create IPFS-based knowledge hub with contributor rewards</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>Implement smart contract subscriptions and dispute resolution</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
