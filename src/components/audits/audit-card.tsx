
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface AuditorInfo {
  name: string;
  verified: boolean;
  imageUrl: string;
}

interface ProjectInfo {
  name: string;
  type: string;
}

interface FindingsInfo {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface AuditCardProps {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "requested";
  severity: "critical" | "high" | "medium" | "low" | "none";
  date: string;
  auditor: AuditorInfo;
  project: ProjectInfo;
  findings: FindingsInfo;
  viewMode: "grid" | "list";
}

export function AuditCard({
  id,
  title,
  status,
  severity,
  date,
  auditor,
  project,
  findings,
  viewMode
}: AuditCardProps) {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  
  // Get status badge color
  const getStatusColor = () => {
    switch(status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "requested": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };
  
  // Get severity badge color
  const getSeverityColor = () => {
    switch(severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-amber-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      case "none": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };
  
  const totalFindings = findings.critical + findings.high + findings.medium + findings.low;
  
  return viewMode === "grid" ? (
    <Card className="overflow-hidden hover-lift">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className={`text-white ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {severity !== "none" && (
            <Badge variant="outline" className={`text-white ${getSeverityColor()}`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">Project</div>
            <div className="font-medium">{project.name}</div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">Auditor</div>
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-1 cursor-pointer">
                <div className="font-medium">{auditor.name}</div>
                {auditor.verified && (
                  <svg width="15" height="15" viewBox="0 0 15 15" className="h-3 w-3 text-primary fill-current">
                    <path d="M7.5.5l1.634 1.634L11.5 2.5l-.366 2.366L12.5 7.5l-1.366 2.634.366 2.366-2.366-.366L7.5 13.5l-2.634-1.366L2.5 12.5l.366-2.366L1.5 7.5l1.366-2.634L2.5 2.5l2.366.366L7.5.5z" fillRule="evenodd" />
                  </svg>
                )}
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{auditor.name}</h4>
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Expert in smart contract security with over 200 audits performed
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">Date</div>
            <div className="font-medium">{formattedDate}</div>
          </div>
          
          <div className="border-t pt-3 mt-2">
            <div className="text-sm font-medium mb-2">Findings Summary:</div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="text-xs">
                <div className="font-bold text-red-500">{findings.critical}</div>
                <div className="text-muted-foreground">Critical</div>
              </div>
              <div className="text-xs">
                <div className="font-bold text-amber-500">{findings.high}</div>
                <div className="text-muted-foreground">High</div>
              </div>
              <div className="text-xs">
                <div className="font-bold text-yellow-500">{findings.medium}</div>
                <div className="text-muted-foreground">Medium</div>
              </div>
              <div className="text-xs">
                <div className="font-bold text-green-500">{findings.low}</div>
                <div className="text-muted-foreground">Low</div>
              </div>
            </div>
          </div>
          
          <Button className="w-full" variant="outline">View Details</Button>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{title}</h3>
              <Badge variant="outline" className={`text-white ${getStatusColor()}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              {severity !== "none" && (
                <Badge variant="outline" className={`text-white ${getSeverityColor()}`}>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </Badge>
              )}
            </div>
            <div className="flex gap-4 mt-1 text-sm">
              <div className="text-muted-foreground">Project: <span className="text-foreground">{project.name}</span></div>
              <div className="text-muted-foreground">Type: <span className="text-foreground">{project.type}</span></div>
            </div>
          </div>
          
          <div className="flex gap-6 md:items-center">
            <div className="hidden md:block">
              <div className="text-sm font-medium">Findings</div>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="bg-red-100 text-red-800">{findings.critical} Critical</Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">{findings.high} High</Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{findings.medium} Medium</Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">{findings.low} Low</Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-sm text-muted-foreground">{formattedDate}</div>
              <HoverCard>
                <HoverCardTrigger className="flex items-center gap-1 cursor-pointer text-sm mt-1">
                  <div className="font-medium">{auditor.name}</div>
                  {auditor.verified && (
                    <svg width="15" height="15" viewBox="0 0 15 15" className="h-3 w-3 text-primary fill-current">
                      <path d="M7.5.5l1.634 1.634L11.5 2.5l-.366 2.366L12.5 7.5l-1.366 2.634.366 2.366-2.366-.366L7.5 13.5l-2.634-1.366L2.5 12.5l.366-2.366L1.5 7.5l1.366-2.634L2.5 2.5l2.366.366L7.5.5z" fillRule="evenodd" />
                    </svg>
                  )}
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{auditor.name}</h4>
                      <div className="text-sm">
                        <div className="text-muted-foreground">
                          Expert in smart contract security with over 200 audits performed
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            <Button size="sm">View Audit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
