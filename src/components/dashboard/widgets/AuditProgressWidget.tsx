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
    <Card className="bg-card rounded-[1.15rem] shadow-[0_8px_40px_0_rgba(50,60,130,0.23)] p-6">
      <CardContent>
        <h3 className="font-black uppercase tracking-tight text-accent-primary mb-3" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", letterSpacing: '0.08em' }}>
          Audit Progress
        </h3>
        <div className="space-y-2">
          {audits.map((audit) => (
            <div key={audit.id} className="flex items-center gap-3">
              <span className="font-medium text-primary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{audit.name}</span>
              <Progress value={audit.progress} className="flex-1" />
              <span className="text-xs text-accent-primary font-bold uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{audit.progress}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
