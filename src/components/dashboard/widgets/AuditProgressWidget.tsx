
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function AuditProgressWidget() {
  // Sample data for demonstration
  const audits = [
    {
      id: 1,
      name: 'Token Contract',
      auditor: 'Secure Labs',
      progress: 75,
      status: 'in-progress',
      completion: '2023-06-25',
    },
    {
      id: 2,
      name: 'DEX Protocol',
      auditor: 'CryptGuard',
      progress: 30,
      status: 'in-progress',
      completion: '2023-07-15',
    },
    {
      id: 3,
      name: 'Lending Platform',
      auditor: 'Chain Sentinels',
      progress: 100,
      status: 'complete',
      completion: '2023-05-30',
    }
  ];

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="space-y-5">
          {audits.map((audit) => (
            <div key={audit.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{audit.name}</h4>
                  <p className="text-sm text-muted-foreground">Auditor: {audit.auditor}</p>
                </div>
                <Badge variant={audit.status === 'complete' ? 'default' : 'outline'}>
                  {audit.status === 'complete' ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completion: {audit.progress}%</span>
                  {audit.status !== 'complete' && (
                    <span className="text-sm text-muted-foreground">
                      Expected: {new Date(audit.completion).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <Progress value={audit.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
