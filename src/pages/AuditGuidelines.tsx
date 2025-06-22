
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, FileText, Users, Clock } from 'lucide-react';

const AuditGuidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Audit Guidelines</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Comprehensive standards for Web3 security audits on the Hawkly platform
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Audit Process Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50">1</Badge>
                    <span className="text-sm">Initial Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-50">2</Badge>
                    <span className="text-sm">Security Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50">3</Badge>
                    <span className="text-sm">Report Delivery</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  All audits follow a standardized process to ensure consistent quality and thoroughness.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Vulnerability Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Critical</Badge>
                      <span className="font-medium">Critical Vulnerabilities</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Immediate risk of fund loss</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">High</Badge>
                      <span className="font-medium">High Risk Issues</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Significant security concerns</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      <span className="font-medium">Medium Risk Issues</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Potential vulnerabilities</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Low</Badge>
                      <span className="font-medium">Low Risk Issues</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Best practice recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Auditor Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Verified security credentials and experience
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Proficiency in relevant blockchain technologies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Adherence to professional communication standards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Commitment to confidentiality and ethical practices
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Standard Audits</h4>
                    <ul className="text-sm space-y-1">
                      <li>Small projects: 3-5 days</li>
                      <li>Medium projects: 1-2 weeks</li>
                      <li>Large projects: 2-4 weeks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Expedited Audits</h4>
                    <ul className="text-sm space-y-1">
                      <li>Available for smaller codebases</li>
                      <li>48-72 hour turnaround</li>
                      <li>Premium pricing applies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditGuidelines;
