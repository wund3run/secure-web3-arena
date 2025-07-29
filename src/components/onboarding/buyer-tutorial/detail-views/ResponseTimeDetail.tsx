
import React from "react";
import { Clock, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ResponseTimeDetail() {
  return (
    <Card className="mt-3 shadow-sm border-primary/20 overflow-hidden">
      <CardContent className="p-4 pb-0">
        <h4 className="font-semibold mb-2 text-primary">Communication expectations:</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            <span className="text-sm">Initial response within 24 hours</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            <span className="text-sm">Regular progress updates during audit</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            <span className="text-sm">Immediate notification for critical findings</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            <span className="text-sm">Post-audit support for implementing fixes</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="mt-3 text-xs text-muted-foreground p-3 bg-primary/5 border-t border-primary/10">
        <div className="flex items-start">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-1.5 mt-0.5 shrink-0" />
          <p>Tip: Send a test message before hiring to gauge response time and communication style</p>
        </div>
      </CardFooter>
    </Card>
  );
}
