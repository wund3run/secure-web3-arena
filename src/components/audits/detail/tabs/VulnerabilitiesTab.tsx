
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VulnerabilityHeatmap } from '@/components/security-visualizations/VulnerabilityHeatmap';

interface VulnerabilitiesTabProps {
  vulnerabilities: any[];
}

export const VulnerabilitiesTab: React.FC<VulnerabilitiesTabProps> = ({ vulnerabilities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerabilities Found</CardTitle>
      </CardHeader>
      <CardContent>
        <VulnerabilityHeatmap categories={vulnerabilities} />
      </CardContent>
    </Card>
  );
};
