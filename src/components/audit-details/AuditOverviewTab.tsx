
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface AuditOverviewTabProps {
  auditData: any;
}

export const AuditOverviewTab = ({ auditData }: AuditOverviewTabProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      case 'info': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditData.riskCategories.map((category: any, index: number) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{category.name}</h4>
                  <span className={`text-sm font-semibold ${getRiskLevelColor(category.riskLevel)}`}>
                    {category.score}/{category.maxScore}
                  </span>
                </div>
                <Progress value={(category.score / category.maxScore) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vulnerabilities Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Vulnerabilities Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditData.vulnerabilities.map((vuln: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{vuln.name}</div>
                  <div className="text-sm text-muted-foreground">{vuln.count} issues</div>
                </div>
                <Badge className={getSeverityColor(vuln.severity)}>
                  {vuln.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommended Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditData.learningResources.map((resource: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{resource.type}</Badge>
                    <Badge variant="secondary">{resource.level}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {resource.readingTime}
                  </span>
                  <a 
                    href={resource.url} 
                    className="text-primary hover:underline text-sm font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Client</h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {auditData.client.name.charAt(0)}
                </div>
                <span>{auditData.client.name}</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Timeline</h4>
              <div className="space-y-1">
                <div className="text-sm">Started: {new Date(auditData.startDate).toLocaleDateString()}</div>
                <div className="text-sm">Due: {new Date(auditData.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
