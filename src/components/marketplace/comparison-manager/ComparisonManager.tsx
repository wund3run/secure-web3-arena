
import React from "react";
import { ComparisonProvider } from "./ComparisonContext";
import { ComparisonManagerProps } from "./types";

export function ComparisonManager({ maxCompare = 3, children }: ComparisonManagerProps & { children: React.ReactNode }) {
  // Create a wrapper ComparisonProvider that includes the maxCompare prop
  return (
    <ComparisonProvider maxCompare={maxCompare}>
      {children}
    </ComparisonProvider>
  );
}
