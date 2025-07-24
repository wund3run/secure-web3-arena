import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VulnerabilityHeatmap, VulnerabilityCategory } from '@/components/security-visualizations/VulnerabilityHeatmap';

interface VulnerabilitiesTabProps {
  vulnerabilities: unknown[];
}

export const VulnerabilitiesTab: React.FC<VulnerabilitiesTabProps> = ({ vulnerabilities }) => {
  // Type guard function for vulnerability categories
  const isValidVulnerabilityCategory = (item: unknown): item is VulnerabilityCategory => {
    return (
      typeof item === 'object' && 
      item !== null && 
      'name' in item &&
      'count' in item &&
      'severity' in item
    );
  };

  const validVulnerabilities = vulnerabilities.filter(isValidVulnerabilityCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerabilities Found</CardTitle>
      </CardHeader>
      <CardContent>
        <VulnerabilityHeatmap categories={validVulnerabilities} />
      </CardContent>
    </Card>
  );
};
