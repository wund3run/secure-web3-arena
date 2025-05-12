
import React from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Eye, MessageSquare, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface AuditCardProps {
  id: string;
  title: string;
  projectName: string;
  startDate: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'paused';
  progress: number;
  criticalIssues?: number;
  highIssues?: number;
  auditors?: Array<{
    name: string;
    avatar?: string;
  }>;
  unreadMessages?: number;
}

export const AuditCard = ({
  id,
  title,
  projectName,
  startDate,
  status,
  progress,
  criticalIssues = 0,
  highIssues = 0,
  auditors = [],
  unreadMessages = 0
}: AuditCardProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = () => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>;
      case 'paused':
        return <Badge className="bg-orange-500"><AlertCircle className="mr-1 h-3 w-3" /> Paused</Badge>;
      default:
        return null;
    }
  };
  
  const viewAuditDetails = () => {
    navigate(`/audit/${id}`);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">{projectName}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {(criticalIssues > 0 || highIssues > 0) && (
          <div className="mt-3 flex gap-2">
            {criticalIssues > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                <AlertCircle className="mr-1 h-3 w-3" />
                {criticalIssues} Critical
              </Badge>
            )}
            {highIssues > 0 && (
              <Badge variant="outline" className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200">
                <AlertCircle className="mr-1 h-3 w-3" />
                {highIssues} High
              </Badge>
            )}
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Started {startDate}
          </div>
          {unreadMessages > 0 && (
            <Badge className="bg-primary">
              <MessageSquare className="mr-1 h-3 w-3" />
              {unreadMessages} new
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 p-3 bg-muted/20 border-t">
        <Button variant="ghost" className="flex-1" onClick={viewAuditDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
};
