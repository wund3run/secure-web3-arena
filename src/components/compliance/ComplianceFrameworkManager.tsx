
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileCheck, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download,
  Upload,
  Eye,
  RefreshCw
} from 'lucide-react';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'pending';
  completionPercentage: number;
  lastAssessment: string;
  nextReview: string;
  requirements: ComplianceRequirement[];
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: 'met' | 'partial' | 'not_met' | 'not_applicable';
  priority: 'critical' | 'high' | 'medium' | 'low';
  evidence?: string[];
}

export function ComplianceFrameworkManager() {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 compliance for security and availability',
      status: 'compliant',
      completionPercentage: 95,
      lastAssessment: '2024-01-10',
      nextReview: '2024-07-10',
      requirements: [
        {
          id: 'soc2-1',
          title: 'Access Controls',
          description: 'Implement proper user access management',
          status: 'met',
          priority: 'critical',
          evidence: ['Access Control Policy', 'User Management Logs']
        },
        {
          id: 'soc2-2',
          title: 'Encryption at Rest',
          description: 'All data must be encrypted when stored',
          status: 'met',
          priority: 'high',
          evidence: ['Encryption Configuration', 'Key Management Policy']
        },
        {
          id: 'soc2-3',
          title: 'Incident Response',
          description: 'Documented incident response procedures',
          status: 'partial',
          priority: 'medium',
          evidence: ['Incident Response Plan']
        }
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation compliance',
      status: 'compliant',
      completionPercentage: 88,
      lastAssessment: '2024-01-05',
      nextReview: '2024-04-05',
      requirements: [
        {
          id: 'gdpr-1',
          title: 'Data Processing Agreement',
          description: 'Valid DPA with all processors',
          status: 'met',
          priority: 'critical',
          evidence: ['Signed DPAs', 'Processor Registry']
        },
        {
          id: 'gdpr-2',
          title: 'Right to be Forgotten',
          description: 'Ability to delete user data upon request',
          status: 'met',
          priority: 'high',
          evidence: ['Data Deletion Procedures', 'Request Logs']
        },
        {
          id: 'gdpr-3',
          title: 'Breach Notification',
          description: '72-hour breach notification process',
          status: 'partial',
          priority: 'critical',
          evidence: ['Notification Template']
        }
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      status: 'pending',
      completionPercentage: 65,
      lastAssessment: '2024-01-01',
      nextReview: '2024-03-01',
      requirements: [
        {
          id: 'iso-1',
          title: 'Risk Assessment',
          description: 'Comprehensive information security risk assessment',
          status: 'met',
          priority: 'critical',
          evidence: ['Risk Assessment Report']
        },
        {
          id: 'iso-2',
          title: 'Security Policies',
          description: 'Documented information security policies',
          status: 'partial',
          priority: 'high',
          evidence: ['Security Policy Draft']
        },
        {
          id: 'iso-3',
          title: 'Employee Training',
          description: 'Security awareness training program',
          status: 'not_met',
          priority: 'medium'
        }
      ]
    }
  ]);

  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'met':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'non_compliant':
      case 'not_met':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'not_applicable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'met':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'non_compliant':
      case 'not_met':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-blue-500" />
            Compliance Framework Manager
          </CardTitle>
          <CardDescription>
            Manage and track compliance across multiple regulatory frameworks
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {frameworks.map((framework) => (
              <Card key={framework.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getStatusIcon(framework.status)}
                    <Badge className={getStatusColor(framework.status)} variant="secondary">
                      {framework.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{framework.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{framework.completionPercentage}%</span>
                    </div>
                    <Progress value={framework.completionPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Next review: {new Date(framework.nextReview).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Compliance Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Compliance Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">83%</div>
                  <div className="text-sm text-muted-foreground">Average Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Active Frameworks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">5</div>
                  <div className="text-sm text-muted-foreground">Pending Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Due Reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          {frameworks.map((framework) => (
            <Card key={framework.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(framework.status)}
                      <h3 className="text-lg font-semibold">{framework.name}</h3>
                      <Badge className={getStatusColor(framework.status)} variant="secondary">
                        {framework.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{framework.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium">Completion</div>
                        <div className="text-lg font-bold">{framework.completionPercentage}%</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Last Assessment</div>
                        <div className="text-sm">{new Date(framework.lastAssessment).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Next Review</div>
                        <div className="text-sm">{new Date(framework.nextReview).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Requirements</div>
                        <div className="text-lg font-bold">{framework.requirements.length}</div>
                      </div>
                    </div>

                    <Progress value={framework.completionPercentage} className="h-2 mb-4" />
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <div className="space-y-4">
            {selectedFramework.requirements.map((requirement) => (
              <Card key={requirement.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(requirement.status)}
                        <h4 className="font-medium">{requirement.title}</h4>
                        <Badge className={getStatusColor(requirement.status)} variant="secondary">
                          {requirement.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(requirement.priority)} variant="outline">
                          {requirement.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{requirement.description}</p>
                      
                      {requirement.evidence && requirement.evidence.length > 0 && (
                        <div>
                          <span className="text-xs font-medium">Evidence:</span>
                          <div className="flex gap-1 mt-1">
                            {requirement.evidence.map((evidence, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {evidence}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload Evidence
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Overall Compliance Score</span>
                  <span className="font-bold">83%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Critical Requirements Met</span>
                  <span className="font-bold text-green-600">7/8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>High Priority Items</span>
                  <span className="font-bold text-yellow-600">3 Pending</span>
                </div>
                <Button className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">GDPR Review</span>
                  <Badge variant="outline">Apr 5, 2024</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">ISO 27001 Assessment</span>
                  <Badge variant="outline">Mar 1, 2024</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">SOC 2 Annual Review</span>
                  <Badge variant="outline">Jul 10, 2024</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
