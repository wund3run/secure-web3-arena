
import React from 'react';
import { useAuditManagement } from '@/hooks/useAuditManagement';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FileText, Info, MessageSquare, CheckCircle2, AlertTriangle, ExternalLink, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AuditProgressTrackerProps {
  expanded?: boolean;
}

export function AuditProgressTracker({ expanded = false }: AuditProgressTrackerProps) {
  const { audits, viewAudit, downloadReport, viewOnExplorer } = useAuditManagement();

  // Filter audits by status for the dashboard
  const inProgressAudits = audits.filter(audit => ['in_progress', 'scheduled'].includes(audit.status));
  const completedAudits = audits.filter(audit => audit.status === 'completed');
  
  // Progress calculation helper
  const getProgressPercentage = (status: string): number => {
    switch (status) {
      case 'scheduled': return 10;
      case 'in_progress': return 60;
      case 'completed': return 100;
      default: return 0;
    }
  };
  
  // Severity badge helper
  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      'critical': 'bg-red-500/10 text-red-500 border-red-500/20',
      'high': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      'medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'low': 'bg-green-500/10 text-green-500 border-green-500/20',
      'unknown': 'bg-muted text-muted-foreground',
    };
    
    return (
      <Badge className={cn('font-medium', variants[severity] || variants.unknown)}>
        {severity}
      </Badge>
    );
  };

  // For non-expanded view (widget on dashboard)
  if (!expanded) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Audit Progress</h3>
          </div>
          {inProgressAudits.length > 0 && (
            <Badge variant="outline">{inProgressAudits.length} Active</Badge>
          )}
        </div>
        
        <div className="space-y-4">
          {inProgressAudits.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No active audits</p>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-1"
                onClick={() => window.location.href = '/request-audit'}
              >
                Request an audit
              </Button>
            </div>
          ) : (
            inProgressAudits.slice(0, 2).map((audit) => (
              <div key={audit.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{audit.projectName}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {audit.auditType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {audit.status === 'scheduled' ? 'Scheduled' : 'In progress'}
                      </span>
                    </div>
                  </div>
                  {getSeverityBadge(audit.severity)}
                </div>
                
                <Progress value={getProgressPercentage(audit.status)} className="h-1.5" />
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Started: {audit.submissionDate}</span>
                  {audit.status === 'in_progress' ? (
                    <span className="flex items-center">
                      <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                      {audit.vulnerabilitiesFound} issues found
                    </span>
                  ) : (
                    <span>Due: {audit.completionDate || 'TBD'}</span>
                  )}
                </div>
              </div>
            ))
          )}
          
          {inProgressAudits.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-muted-foreground"
              onClick={() => window.location.href = '/audits'}
            >
              View all {inProgressAudits.length} active audits
            </Button>
          )}
        </div>
        
        {completedAudits.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Recently Completed</span>
              <Badge variant="outline" className="text-xs">{completedAudits.length}</Badge>
            </div>
            
            {completedAudits.slice(0, 1).map((audit) => (
              <div key={audit.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">{audit.projectName}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                    <span>Completed on {audit.completionDate}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => downloadReport(audit)}>
                  <Download className="h-3 w-3 mr-1" />
                  Report
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For expanded view (dedicated page)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Audit Progress Dashboard</h2>
        <p className="text-muted-foreground">
          Track and manage your security audits
        </p>
      </div>
      
      <div className="grid gap-6">
        {inProgressAudits.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium mb-3">Active Audits</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {inProgressAudits.map((audit) => (
                <Card key={audit.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{audit.projectName}</CardTitle>
                      {getSeverityBadge(audit.severity)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Status:</span>
                        <Badge variant={audit.status === 'scheduled' ? 'outline' : 'default'}>
                          {audit.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Type:</span>
                        <span>{audit.auditType}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Auditor:</span>
                        <span>{audit.auditor}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{getProgressPercentage(audit.status)}%</span>
                      </div>
                      <Progress value={getProgressPercentage(audit.status)} className="h-2" />
                    </div>
                    
                    {audit.status === 'in_progress' && (
                      <div className="flex items-center text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="font-medium">{audit.vulnerabilitiesFound} vulnerabilities found</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                <Info className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Issues are being documented and remediation steps will be provided.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Submitted: </span>
                        <span>{audit.submissionDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estimated completion: </span>
                        <span>{audit.completionDate || 'TBD'}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 flex justify-between pt-3">
                    <Button variant="ghost" size="sm" onClick={() => viewAudit(audit)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discuss
                    </Button>
                    <div>
                      <Button variant="ghost" size="sm" onClick={() => viewOnExplorer(audit)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Contract
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Active Audits</h3>
              <p className="text-muted-foreground text-center mb-4">
                You don't have any active audits at the moment. 
                Request a new audit to enhance your project's security.
              </p>
              <Button onClick={() => window.location.href = '/request-audit'}>
                Request an Audit
              </Button>
            </CardContent>
          </Card>
        )}
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-3">Completed Audits</h3>
          {completedAudits.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {completedAudits.map((audit) => (
                <Card key={audit.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{audit.projectName}</CardTitle>
                        <div className="flex items-center mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-muted-foreground">Completed on {audit.completionDate}</span>
                        </div>
                      </div>
                      {getSeverityBadge(audit.severity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Audit Type:</span>
                        <span className="ml-2">{audit.auditType}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Auditor:</span>
                        <span className="ml-2">{audit.auditor}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vulnerabilities Found:</span>
                        <span className="ml-2">{audit.vulnerabilitiesFound}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 flex justify-between pt-3">
                    <Button variant="ghost" size="sm" onClick={() => viewAudit(audit)}>
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => downloadReport(audit)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No completed audits yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
