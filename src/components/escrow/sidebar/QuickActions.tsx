
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ShieldCheck, AlertTriangle } from "lucide-react";

interface QuickActionsProps {
  onCreateNew: () => void;
  setActiveTab: (tab: string) => void;
  isArbitrator: boolean;
}

export function QuickActions({ onCreateNew, setActiveTab, isArbitrator }: QuickActionsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks for escrow management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={onCreateNew}
        >
          <FileCheck className="mr-2 h-4 w-4" />
          Create New Escrow
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => setActiveTab("contracts")}
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          View My Contracts
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          disabled={!isArbitrator}
          onClick={() => setActiveTab("arbitration")}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Dispute Resolution
        </Button>
      </CardContent>
    </Card>
  );
}
