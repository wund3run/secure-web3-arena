
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoadmapPhase } from "./types";
import { MilestoneList } from "./MilestoneList";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PhaseCardProps {
  phase: RoadmapPhase;
}

export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{phase.title}</CardTitle>
        <CardDescription>{phase.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Milestones</h3>
          <MilestoneList milestones={phase.milestones} />
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
          <p className="text-sm text-muted-foreground mt-2">
            Visual representation of key features in {phase.title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
