
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Key,
  Globe,
  Database,
  Server,
  RefreshCw,
  XCircle,
  FileText,
  UserCheck
} from 'lucide-react';

interface SecurityCheck {
  id: string;
  category: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  lastChecked: Date;
  automated: boolean;
}

interface ComplianceStandard {
  name: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  coverage: number;
  requirements: {
    name: string;
    status: 'met' | 'partial' | 'not_met';
  }[];
}

export const AdvancedSecurityAudit = () => {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
  const [compliance, setCompliance] = useState<ComplianceStandard[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<Date>(new Date());

  const initializeSecurityChecks = () => {
    const checks: SecurityCheck[] = [
      {
        id: 'ssl-config',
        category: 'Network Security',
        name: 'SSL/TLS Configuration',
        status: 'pass',
        severity: 'critical',
        description: 'SSL certificate is properly configured and up to date',
        recommendation: 'Monitor certificate expiration dates',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'cors-policy',
        category: 'Network Security',
        name: 'CORS Policy Configuration',
        status: 'warning',
        severity: 'medium',
        description: 'CORS policy allows some wildcards that could be restricted',
        recommendation: 'Review and tighten CORS policy to specific domains',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'auth-tokens',
        category: 'Authentication',
        name: 'JWT Token Security',
        status: 'pass',
        severity: 'high',
        description: 'JWT tokens are properly signed and have appropriate expiration',
        recommendation: 'Consider implementing token rotation',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'password-policy',
        category: 'Authentication',
        name: 'Password Policy Enforcement',
        status: 'pass',
        severity: 'high',
        description: 'Strong password requirements are enforced',
        recommendation: 'Consider adding password breach checking',
        lastChecked: new Date(),
        automated: false
      },
      {
        id: 'rate-limiting',
        category: 'API Security',
        name: 'API Rate Limiting',
        status: 'warning',
        severity: 'medium',
        description: 'Rate limiting is configured but could be more granular',
        recommendation: 'Implement user-specific and endpoint-specific rate limits',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'input-validation',
        category: 'Data Security',
        name: 'Input Validation',
        status: 'pass',
        severity: 'critical',
        description: 'Input validation is properly implemented across endpoints',
        recommendation: 'Regular validation rule updates and testing',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'data-encryption',
        category: 'Data Security',
        name: 'Data Encryption at Rest',
        status: 'pass',
        severity: 'critical',
        description: 'Sensitive data is encrypted in the database',
        recommendation: 'Regular encryption key rotation',
        lastChecked: new Date(),
        automated: false
      },
      {
        id: 'access-logs',
        category: 'Monitoring',
        name: 'Access Logging',
        status: 'pass',
        severity: 'medium',
        description: 'Comprehensive access logging is enabled',
        recommendation: 'Implement log analysis for anomaly detection',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'vulnerability-scanning',
        category: 'Vulnerability Management',
        name: 'Dependency Vulnerability Scanning',
        status: 'warning',
        severity: 'high',
        description: '3 medium-severity vulnerabilities found in dependencies',
        recommendation: 'Update affected packages to latest versions',
        lastChecked: new Date(),
        automated: true
      },
      {
        id: 'backup-encryption',
        category: 'Data Security',
        name: 'Backup Encryption',
        status: 'pass',
        severity: 'high',
        description: 'Database backups are encrypted and stored securely',
        recommendation: 'Test backup restoration procedures regularly',
        lastChecked: new Date(),
        automated: false
      }
    ];

    setSecurityChecks(checks);
  };

  const initializeCompliance = () => {
    const standards: ComplianceStandard[] = [
      {
        name: 'GDPR',
        status: 'compliant',
        coverage: 95,
        requirements: [
          { name: 'Data Processing Records', status: 'met' },
          { name: 'User Consent Management', status: 'met' },
          { name: 'Right to be Forgotten', status: 'met' },
          { name: 'Data Breach Notification', status: 'partial' },
          { name: 'Privacy by Design', status: 'met' }
        ]
      },
      {
        name: 'SOC 2 Type II',
        status: 'partial',
        coverage: 78,
        requirements: [
          { name: 'Security Controls', status: 'met' },
          { name: 'Availability Controls', status: 'met' },
          { name: 'Processing Integrity', status: 'partial' },
          { name: 'Confidentiality', status: 'met' },
          { name: 'Privacy Controls', status: 'partial' }
        ]
      },
      {
        name: 'ISO 27001',
        status: 'partial',
        coverage: 65,
        requirements: [
          { name: 'Information Security Policy', status: 'met' },
          { name: 'Risk Management', status: 'partial' },
          { name: 'Asset Management', status: 'partial' },
          { name: 'Access Control', status: 'met' },
          { name: 'Incident Management', status: 'not_met' }
        ]
      }
    ];

    setCompliance(standards);
  };

  const runSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Update some checks with new results
    setSecurityChecks(prev => prev.map(check => ({
      ...check,
      lastChecked: new Date(),
      status: Math.random() > 0.8 ? 'warning' : check.status
    })));
    
    setLastScan(new Date());
    setIsScanning(false);
  };

  useEffect(() => {
    initializeSecurityChecks();
    initializeCompliance();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Eye className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'outline',
      low: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[severity as keyof typeof variants] || 'outline'}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'compliant': return { color: 'text-green-600', icon: CheckCircle };
      case 'partial': return { color: 'text-yellow-600', icon: AlertTriangle };
      case 'non_compliant': return { color: 'text-red-600', icon: XCircle };
      default: return { color: 'text-gray-600', icon: Eye };
    }
  };

  const criticalIssues = securityChecks.filter(c => c.severity === 'critical' && c.status !== 'pass').length;
  const highIssues = securityChecks.filter(c => c.severity === 'high' && c.status !== 'pass').length;
  const overallScore = Math.round((securityChecks.filter(c => c.status === 'pass').length / securityChecks.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Advanced Security Audit</h2>
          <p className="text-muted-foreground">
            Comprehensive security assessment and compliance monitoring
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Last scan: {lastScan.toLocaleString()}
          </span>
          <Button onClick={runSecurityScan} disabled={isScanning}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Run Security Scan'}
          </Button>
        </div>
      </div>

      {/* Security Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${overallScore >= 85 ? 'text-green-600' : overallScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
              {overallScore}%
            </div>
            <div className="flex-1">
              <Progress value={overallScore} className="h-3" />
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-600">{securityChecks.filter(c => c.status === 'pass').length} Passed</span>
                <span className="text-yellow-600">{securityChecks.filter(c => c.status === 'warning').length} Warnings</span>
                <span className="text-red-600">{securityChecks.filter(c => c.status === 'fail').length} Failed</span>
              </div>
            </div>
          </div>
          
          {(criticalIssues > 0 || highIssues > 0) && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{criticalIssues} critical</strong> and <strong>{highIssues} high severity</strong> security issues require immediate attention.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="security-checks" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="security-checks">Security Checks</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="security-checks" className="space-y-4">
          <div className="grid gap-4">
            {['Network Security', 'Authentication', 'API Security', 'Data Security', 'Monitoring', 'Vulnerability Management'].map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {securityChecks.filter(check => check.category === category).map(check => (
                      <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(check.status)}
                          <div>
                            <p className="font-medium">{check.name}</p>
                            <p className="text-sm text-muted-foreground">{check.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(check.severity)}
                          {check.automated && (
                            <Badge variant="outline" className="text-xs">AUTO</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4">
            {compliance.map((standard, index) => {
              const statusConfig = getComplianceStatus(standard.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {standard.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                        <Badge variant={standard.status === 'compliant' ? 'default' : 'outline'}>
                          {standard.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Compliance Coverage</span>
                          <span className="font-medium">{standard.coverage}%</span>
                        </div>
                        <Progress value={standard.coverage} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-medium">Requirements Status:</p>
                        {standard.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm">{req.name}</span>
                            <Badge 
                              variant={req.status === 'met' ? 'default' : req.status === 'partial' ? 'outline' : 'destructive'}
                              className="text-xs"
                            >
                              {req.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Vulnerability Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-sm text-muted-foreground">Critical</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-muted-foreground">High</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">7</div>
                    <div className="text-sm text-muted-foreground">Medium</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-muted-foreground">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Lodash Prototype Pollution</p>
                      <p className="text-sm text-muted-foreground">CVE-2021-23337 in lodash@4.17.20</p>
                    </div>
                    <Badge variant="outline">MEDIUM</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">React DOM XSS Vulnerability</p>
                      <p className="text-sm text-muted-foreground">CVE-2021-44906 in react-dom@17.0.2</p>
                    </div>
                    <Badge variant="destructive">HIGH</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Express.js Path Traversal</p>
                      <p className="text-sm text-muted-foreground">CVE-2022-24999 in express@4.17.1</p>
                    </div>
                    <Badge variant="outline">MEDIUM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Immediate Actions Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityChecks.filter(c => c.status !== 'pass' && (c.severity === 'critical' || c.severity === 'high')).map(check => (
                    <div key={check.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <p className="font-medium">{check.name}</p>
                        {getSeverityBadge(check.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{check.description}</p>
                      <p className="text-sm"><strong>Recommendation:</strong> {check.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Implement Zero Trust Architecture</p>
                      <p className="text-sm text-muted-foreground">Never trust, always verify - implement comprehensive identity verification for all users and devices.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Regular Security Training</p>
                      <p className="text-sm text-muted-foreground">Conduct regular security awareness training for all team members.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Classification and Protection</p>
                      <p className="text-sm text-muted-foreground">Implement data classification policies and ensure appropriate protection measures.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
