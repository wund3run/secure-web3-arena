
import React from "react";
import { AlertTriangle, Settings } from "lucide-react";

export function TransparentPricingDetail() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-2">Pricing considerations:</h4>
      <div className="space-y-3 text-sm">
        <p>Typical pricing factors include:</p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Code complexity and size (SLOC)</span>
          </li>
          <li className="flex items-start">
            <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Audit timeline (standard vs. expedited)</span>
          </li>
          <li className="flex items-start">
            <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Depth of audit (basic review vs. formal verification)</span>
          </li>
          <li className="flex items-start">
            <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Additional services like fix verification</span>
          </li>
        </ul>
        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800">
          <AlertTriangle className="h-4 w-4 inline mr-1" />
          <span>Warning: Quality audits typically cost 0.5-2 ETH per 1,000 lines of code</span>
        </div>
      </div>
    </div>
  );
}
