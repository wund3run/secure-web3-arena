
import React from "react";
import { Milestone } from "./types";
import { CheckCircle, Clock, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MilestoneListProps {
  milestones: Milestone[];
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div 
          key={index}
          className="p-4 rounded-lg border border-border bg-card"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-medium">{milestone.title}</h4>
            <StatusBadge status={milestone.status} />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {milestone.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>{milestone.date}</span>
            </div>
            {milestone.link && (
              <Button asChild variant="link" size="sm" className="p-0 h-auto">
                <Link to={milestone.link.url}>
                  {milestone.link.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Milestone["status"] }) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
          <Clock className="h-3 w-3 mr-1" /> In Progress
        </Badge>
      );
    case "upcoming":
      return (
        <Badge variant="outline">
          Upcoming
        </Badge>
      );
  }
}
