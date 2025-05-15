
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertTriangle, ExternalLink } from "lucide-react";

interface RealTimeMonitoringProps {
  isScanning: boolean;
}

export function RealTimeMonitoring({ isScanning }: RealTimeMonitoringProps) {
  // Sample monitoring data
  const monitoringEvents = [
    {
      id: "E001",
      timestamp: "2025-05-15T12:30:45Z",
      type: "Contract Interaction",
      description: "Admin function called by authorized address",
      address: "0x1234...5678",
      status: "normal",
      details: "setFeeReceiver() called by owner"
    },
    {
      id: "E002",
      timestamp: "2025-05-15T11:45:22Z",
      type: "Large Transaction",
      description: "Transfer of tokens exceeding threshold",
      address: "0xabcd...ef01",
      status: "warning",
      details: "50,000 tokens transferred"
    },
    {
      id: "E003",
      timestamp: "2025-05-15T11:15:08Z",
      type: "Price Impact",
      description: "Significant price impact detected",
      address: "0x9876...5432",
      status: "normal",
      details: "5% price change within acceptable limits"
    },
    {
      id: "E004",
      timestamp: "2025-05-15T10:30:15Z",
      type: "Contract Interaction",
      description: "Admin function called by authorized address",
      address: "0x1234...5678",
      status: "normal",
      details: "updateFee() called by owner"
    },
    {
      id: "E005",
      timestamp: "2025-05-15T09:22:37Z",
      type: "Flash Loan",
      description: "Flash loan transaction detected",
      address: "0x2468...1357",
      status: "warning",
      details: "100 ETH flash loan transaction"
    }
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning</Badge>;
      default:
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Normal</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-green-500 animate-pulse' : 'bg-muted'}`}></div>
          <span className="ml-2 text-sm text-muted-foreground">
            {isScanning ? 'Scanning in progress...' : 'Monitoring active'}
          </span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-sm text-muted-foreground">Last updated: just now</span>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="max-h-[400px] overflow-y-auto">
            {monitoringEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`
                  p-4 flex items-start justify-between border-b last:border-0
                  ${event.status === 'warning' ? 'bg-yellow-50' : 'bg-card'}
                `}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center">
                    {getStatusIcon(event.status)}
                    <span className="ml-2 font-medium">{event.type}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{formatTime(event.timestamp)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="text-xs font-mono text-muted-foreground">{event.address}</div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {getStatusBadge(event.status)}
                  <button className="p-1 hover:bg-muted rounded">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Displaying recent 5 events</span>
        <a href="#" className="text-primary hover:underline flex items-center">
          View all events
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
