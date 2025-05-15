
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
    <Card className="h-full">
      <CardContent className="pt-6">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {deadlines.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start space-x-3 p-3 rounded-md border"
              >
                <CalendarClock className={`h-5 w-5 mt-0.5 ${
                  item.status === 'urgent' 
                    ? 'text-red-500' 
                    : item.status === 'upcoming' 
                      ? 'text-amber-500'
                      : 'text-blue-500'
                }`} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{item.project}</h4>
                    <Badge 
                      variant={
                        item.status === 'urgent' 
                          ? 'destructive' 
                          : item.status === 'upcoming' 
                            ? 'default'
                            : 'outline'
                      }
                      className="text-xs"
                    >
                      {item.daysLeft} days left
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(item.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
