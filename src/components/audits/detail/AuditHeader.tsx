
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Download, MessageSquare, ArrowLeft } from "lucide-react";

interface AuditHeaderProps {
  auditName: string;
  status: string;
  clientName: string;
  startDate: string;
  dueDate: string;
  isMobile?: boolean;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
  auditName,
  status,
  clientName,
  startDate,
  dueDate,
  isMobile = false
}) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <>
      {/* Mobile Back Button */}
      {isMobile && (
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/audits')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Audits
        </Button>
      )}

      {/* Header with Key Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{auditName}</h1>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground mt-1">
            {clientName} • Started {startDate} • Due {dueDate}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Collaborate</span>
          </Button>
        </div>
      </div>
    </>
  );
};
