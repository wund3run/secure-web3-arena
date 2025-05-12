
import React from "react";
import { Award, Check, Shield, Star, BadgeCheck, Award as AwardIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function VerificationStatusDetail() {
  const verificationLevels = [
    { name: "Basic", progress: 100, icon: <Shield className="h-4 w-4 text-gray-500" /> },
    { name: "Verified", progress: 100, icon: <BadgeCheck className="h-4 w-4 text-green-500" /> },
    { name: "Expert", progress: 65, icon: <Star className="h-4 w-4 text-violet-500" /> },
    { name: "Elite", progress: 15, icon: <AwardIcon className="h-4 w-4 text-amber-500" /> }
  ];

  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-3">Verification Levels:</h4>
      
      <div className="space-y-3 mb-4">
        {verificationLevels.map((level, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {level.icon}
                <span className="text-sm font-medium">{level.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{level.progress}%</span>
            </div>
            <Progress value={level.progress} className="h-1.5" />
          </div>
        ))}
      </div>

      <h4 className="font-semibold mb-2 mt-4">What verification means:</h4>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Identity verified through wallet signing</span>
        </li>
        <li className="flex items-start">
          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Professional credentials reviewed by platform</span>
        </li>
        <li className="flex items-start">
          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Past work experience validated</span>
        </li>
      </ul>
      
      <div className="mt-4 bg-secondary/10 p-3 rounded-lg border border-secondary/20">
        <span className="text-sm font-medium flex items-center gap-1.5">
          <Award className="h-4 w-4 text-secondary" />
          Expert status requirements:
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs">10+ successful audits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs">4.8+ rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
