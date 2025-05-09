
import React from "react";
import { Award, Check, Shield, Star } from "lucide-react";

export function VerificationStatusDetail() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-2">What verification means:</h4>
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
      <div className="mt-4">
        <span className="text-sm font-medium">Expert status requires:</span>
        <div className="mt-2 flex items-center gap-2">
          <Award className="h-4 w-4 text-secondary" />
          <span className="text-xs">10+ successful audits</span>
          <Star className="h-4 w-4 text-secondary ml-2" />
          <span className="text-xs">4.8+ rating</span>
        </div>
      </div>
    </div>
  );
}
