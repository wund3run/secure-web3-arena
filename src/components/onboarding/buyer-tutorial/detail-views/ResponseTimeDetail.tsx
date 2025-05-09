
import React from "react";

export function ResponseTimeDetail() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-2">Communication expectations:</h4>
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Initial response within 24 hours</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Regular progress updates during audit</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Immediate notification for critical findings</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Post-audit support for implementing fixes</span>
        </div>
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Tip: Send a test message before hiring to gauge response time
      </div>
    </div>
  );
}
