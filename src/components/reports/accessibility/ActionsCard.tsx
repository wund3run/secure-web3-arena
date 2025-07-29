
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActionsCardProps {
  runValidation: () => void;
  isValidating: boolean;
}

export const ActionsCard: React.FC<ActionsCardProps> = ({ runValidation, isValidating }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={runValidation}
          disabled={isValidating}
        >
          {isValidating ? "Scanning..." : "Re-scan Platform"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </CardContent>
    </Card>
  );
};
