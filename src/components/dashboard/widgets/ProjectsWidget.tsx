
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ProjectsWidget() {
  // Sample data for demonstration
  const projects = [
    {
      id: 1,
      name: 'Token Contract',
      type: 'ERC20',
      linesOfCode: 547,
      status: 'audited',
      securityScore: 92,
    },
    {
      id: 2,
      name: 'DEX Protocol',
      type: 'DeFi',
      linesOfCode: 1432,
      status: 'auditing',
      securityScore: 65,
    },
    {
      id: 3,
      name: 'Lending Platform',
      type: 'DeFi',
      linesOfCode: 2147,
      status: 'audited',
      securityScore: 88,
    },
    {
      id: 4,
      name: 'NFT Marketplace',
      type: 'NFT',
      linesOfCode: 975,
      status: 'pending',
      securityScore: null,
    }
  ];

  // Function to determine badge color based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'audited': return 'default';
      case 'auditing': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  // Function to determine score color based on value
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-muted-foreground';
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.type} • {project.linesOfCode} LOC</p>
                  </div>
                  <Badge variant={getBadgeVariant(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">Security Score:</span>
                  <span className={`ml-2 font-semibold ${getScoreColor(project.securityScore)}`}>
                    {project.securityScore !== null ? `${project.securityScore}%` : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
