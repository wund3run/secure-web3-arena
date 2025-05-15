
import React from "react";
import LoadingTrivia from "@/components/ui/loading-trivia";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { Shield } from "lucide-react";

export function DashboardLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-6">
      <div className="flex items-center justify-center">
        <HawklyLogo variant="large" size="lg" className="mb-2" />
        <Shield className="h-6 w-6 text-primary ml-1" />
      </div>
      <LoadingTrivia message="Loading dashboard data..." size="md" />
      <div className="text-xs text-muted-foreground mt-2">
        Preparing your security insights...
      </div>
    </div>
  );
}
