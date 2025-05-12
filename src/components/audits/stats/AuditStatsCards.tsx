
import React from "react";
import { Shield, Clock, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const AuditStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover-lift">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Audits</div>
              <div className="text-2xl font-bold">2,387</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover-lift">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg Completion</div>
              <div className="text-2xl font-bold">4.2 days</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover-lift">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-web3-orange/10 rounded-full">
              <BadgeCheck className="h-6 w-6 text-web3-orange" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Verified Fixes</div>
              <div className="text-2xl font-bold">7,129</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
