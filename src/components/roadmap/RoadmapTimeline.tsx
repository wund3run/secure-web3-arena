
import React, { useState } from "react";
import { roadmapPhases } from "./roadmapData";
import { PhaseCard } from "./PhaseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

export function RoadmapTimeline() {
  const [activePhase, setActivePhase] = useState("1");

  const getPhaseIcon = (progress: number) => {
    if (progress === 100) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (progress > 0) return <Clock className="h-4 w-4 text-blue-500" />;
    return <ArrowRight className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">Development Timeline</h2>

      <div className="mb-8">
        <Tabs
          defaultValue="1"
          onValueChange={setActivePhase}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-8">
            {roadmapPhases.map((phase) => (
              <TabsTrigger 
                key={phase.id} 
                value={phase.id.toString()}
                className="flex flex-col gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-flex">{phase.title.split(":")[0]}</span>
                  <span className="md:hidden">Phase {phase.id}</span>
                  {getPhaseIcon(phase.progress)}
                </div>
                <span className="text-xs text-muted-foreground data-[state=active]:text-primary-foreground">
                  {phase.progress}% Complete
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {roadmapPhases.map((phase) => (
            <TabsContent 
              key={phase.id} 
              value={phase.id.toString()}
              className="border-none p-0 mt-0"
            >
              <PhaseCard phase={phase} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${roadmapPhases.find(p => p.id.toString() === activePhase)?.progress || 0}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Last updated: May 19, 2025
      </p>
    </div>
  );
}
