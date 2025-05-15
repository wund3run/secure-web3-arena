
import React from "react";
import LoadingTrivia from "@/components/ui/loading-trivia";

export function DashboardLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingTrivia message="Loading dashboard data..." size="md" />
    </div>
  );
}
