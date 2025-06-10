
import { Card, CardContent } from "@/components/ui/card";
import { useAuditManagement } from "@/hooks/useAuditManagement";
import { AuditSearchHeader } from "./audits/AuditSearchHeader";
import { AuditTable } from "./audits/AuditTable";
import { AuditPagination } from "./audits/AuditPagination";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { InfoIcon, Shield, Award, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function AuditManagement() {
  const { audits, viewAudit, downloadReport, viewOnExplorer } = useAuditManagement();

  const stats = {
    completed: 42,
    inProgress: 8,
    securityScore: 87,
    vulnerabilities: 125
  };

  return (
    <div className="space-y-4" role="region" aria-label="Audit Management">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Audit Management</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center cursor-help">
                <InfoIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">Information about audit management</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">
                Track and manage all security audits. Use the filters to find specific audits,
                and the action menu to view details, download reports, or view on blockchain explorer.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <div className="flex items-center mt-1">
                  <Shield className="h-4 w-4 text-primary mr-1.5" />
                  <span className="text-2xl font-bold">{stats.securityScore}%</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Good</Badge>
            </div>
            <Progress 
              value={stats.securityScore} 
              className="h-1.5 mt-2 [&>div]:bg-gradient-to-r [&>div]:from-primary/80 [&>div]:to-primary"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Audits Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{stats.completed}</span>
                  <span className="text-xs text-muted-foreground mt-1">completed</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-lg font-semibold text-amber-500">{stats.inProgress}</span>
                  <span className="text-xs text-muted-foreground mt-1">in progress</span>
                </div>
              </div>
              <Award className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-secondary h-full rounded-full" 
                  style={{ width: `${(stats.completed / (stats.completed + stats.inProgress)) * 100}%` }} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/5 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vulnerabilities Found</p>
                <div className="flex items-center mt-1">
                  <BarChart className="h-4 w-4 text-destructive mr-1.5" />
                  <span className="text-2xl font-bold">{stats.vulnerabilities}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Critical: 17</Badge>
            </div>
            <Progress 
              value={70} 
              className="h-1.5 mt-2 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-destructive"
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <AuditSearchHeader />
        <CardContent>
          <AuditTable
            audits={audits}
            onView={viewAudit}
            onDownload={downloadReport}
            onViewExplorer={viewOnExplorer}
          />
          
          <AuditPagination 
            currentPage={1}
            totalItems={50}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
