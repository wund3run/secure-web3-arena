
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReviewStepProps {
  values: any;
}

export function ReviewStep({ values }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <strong>Project Name:</strong> {values.projectName}
          </div>
          <div>
            <strong>Blockchain:</strong> <Badge variant="secondary">{values.blockchain}</Badge>
          </div>
          {values.projectType && (
            <div>
              <strong>Project Type:</strong> <Badge variant="outline">{values.projectType}</Badge>
            </div>
          )}
          <div>
            <strong>Description:</strong>
            <p className="mt-1 text-muted-foreground">{values.projectDescription}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <strong>Repository:</strong> {values.repositoryUrl}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <strong>Contracts:</strong> {values.contractCount}
            </div>
            <div>
              <strong>Lines of Code:</strong> {values.linesOfCode || 'Not specified'}
            </div>
            <div>
              <strong>Test Coverage:</strong> {values.testCoverage || 'Not specified'}%
            </div>
          </div>
          {values.frameworks && values.frameworks.length > 0 && (
            <div>
              <strong>Frameworks:</strong>
              <div className="flex gap-1 mt-1">
                {values.frameworks.map((framework: string) => (
                  <Badge key={framework} variant="secondary">{framework}</Badge>
                ))}
              </div>
            </div>
          )}
          {values.auditScope && (
            <div>
              <strong>Audit Scope:</strong>
              <p className="mt-1 text-muted-foreground">{values.auditScope}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Deadline:</strong> {new Date(values.deadline).toLocaleDateString()}
            </div>
            <div>
              <strong>Budget:</strong> ${values.budget?.toLocaleString()}
            </div>
          </div>
          <div>
            <strong>Urgency:</strong> <Badge variant={values.urgencyLevel === 'critical' ? 'destructive' : 'secondary'}>{values.urgencyLevel}</Badge>
          </div>
          {values.specificConcerns && (
            <div>
              <strong>Specific Concerns:</strong>
              <p className="mt-1 text-muted-foreground">{values.specificConcerns}</p>
            </div>
          )}
          <div>
            <strong>Previous Audits:</strong> {values.previousAudits ? 'Yes' : 'No'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
