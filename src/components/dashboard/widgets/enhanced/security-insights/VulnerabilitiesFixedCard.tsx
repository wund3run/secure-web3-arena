
import React from 'react';

interface VulnerabilitiesFixedCardProps {
  vulnerabilitiesFixed: number;
}

export function VulnerabilitiesFixedCard({ vulnerabilitiesFixed }: VulnerabilitiesFixedCardProps) {
  return (
    <div className="text-center p-4 border rounded-lg">
      <div className="text-2xl font-bold text-success mb-1">
        {vulnerabilitiesFixed}
      </div>
      <div className="text-sm text-muted-foreground">
        Vulnerabilities Fixed
      </div>
    </div>
  );
}
