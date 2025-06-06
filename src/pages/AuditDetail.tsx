
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuditDetail() {
  const { id } = useParams<{ id: string }>();

  // Mock audit data
  const auditData = {
    id: id || '1',
    project_name: 'DeFi Protocol Security Audit',
    status: 'in_progress',
    auditor: 'SecureCode Auditors',
    completion_percentage: 65,
    vulnerabilities_found: 3,
    estimated_completion: '2024-01-15'
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/audits">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Audits
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Audit Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {auditData.project_name}
                </CardTitle>
                <Badge variant={auditData.status === 'completed' ? 'default' : 'secondary'}>
                  {auditData.status.replace('_', ' ')}
                </Badge>
              </div>
              <CardDescription>
                Audit ID: {auditData.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{auditData.completion_percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${auditData.completion_percentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{auditData.vulnerabilities_found}</div>
                  <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">Security Checks</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">9</div>
                  <div className="text-sm text-muted-foreground">Passed Tests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Audit Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium">Auditor</div>
                <div className="text-sm text-muted-foreground">{auditData.auditor}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Status</div>
                <Badge variant="secondary" className="mt-1">
                  {auditData.status.replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Estimated Completion
                </div>
                <div className="text-sm text-muted-foreground">{auditData.estimated_completion}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Download Report
              </Button>
              <Button className="w-full" variant="outline">
                Contact Auditor
              </Button>
              <Button className="w-full" variant="outline">
                Request Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
