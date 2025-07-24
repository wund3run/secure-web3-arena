import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";

export function UpcomingDeadlinesWidget() {
  // Sample data for demonstration
  const deadlines = [
    {
      id: 1,
      project: 'DeFi Protocol XYZ',
      deadline: '2023-06-20',
      daysLeft: 3,
      status: 'urgent'
    },
    {
      id: 2,
      project: 'NFT Marketplace',
      deadline: '2023-06-25',
      daysLeft: 8,
      status: 'upcoming'
    },
    {
      id: 3,
      project: 'DAO Governance',
      deadline: '2023-07-05',
      daysLeft: 18,
      status: 'scheduled'
    },
    {
      id: 4,
      project: 'Cross-chain Bridge',
      deadline: '2023-07-12',
      daysLeft: 25,
      status: 'scheduled'
    }
  ];

  return (
    <Card className="bg-card rounded-[1.15rem] shadow-[0_8px_40px_0_rgba(50,60,130,0.23)] p-6">
      <CardContent>
        <h3 className="font-black uppercase tracking-tight text-accent-primary mb-3" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", letterSpacing: '0.08em' }}>
          Upcoming Deadlines
        </h3>
        <ul className="space-y-3">
          {deadlines.map((deadline, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span className="font-medium text-primary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{deadline.project}</span>
              <span className="text-xs text-accent-primary font-bold uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{deadline.daysLeft} days left</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
