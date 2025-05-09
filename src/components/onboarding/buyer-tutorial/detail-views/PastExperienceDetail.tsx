
import React from "react";
import { CircleHelp } from "lucide-react";

export function PastExperienceDetail() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-2">Why experience matters:</h4>
      <p className="text-sm mb-4">Auditors with experience in your specific domain are more likely to identify vulnerabilities relevant to your project.</p>
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium">Ask these questions:</div>
          <ul className="mt-1 space-y-1 text-sm">
            <li className="flex items-start">
              <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>"Have you audited similar projects to mine?"</span>
            </li>
            <li className="flex items-start">
              <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>"What vulnerabilities have you found in similar projects?"</span>
            </li>
            <li className="flex items-start">
              <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>"Can you share redacted reports from previous audits?"</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
