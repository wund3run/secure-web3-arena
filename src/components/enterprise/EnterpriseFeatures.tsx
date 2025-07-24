import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield,
  Users,
  Key,
  FileText,
  Settings,
  CheckCircle,
  AlertTriangle,
  Building,
  Lock,
  Eye,
  UserCheck,
  Clock,
  Download,
  Upload,
  Activity,
  Zap,
  Globe,
  Database,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'oidc';
  status: 'active' | 'inactive' | 'configuring';
  users_count: number;
  last_sync: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'audit' | 'admin' | 'billing' | 'reporting';
  level: 'read' | 'write' | 'admin';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users_count: number;
  is_default: boolean;
}

interface ComplianceReport {
  id: string;
  type: 'soc2' | 'iso27001' | 'gdpr' | 'hipaa';
  status: 'compliant' | 'non_compliant' | 'pending';
  last_audit: string;
  next_audit: string;
  findings_count: number;
}

interface EnterpriseFeaturesProps {
  className?: string;
}

export function EnterpriseFeatures({ className }: EnterpriseFeaturesProps) {
  const [activeTab, setActiveTab] = useState('sso');
  const [ssoProviders, setSsoProviders] = useState<SSOProvider[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const mockSSOProviders: SSOProvider[] = [
    {
      id: '1',
      name: 'Azure Active Directory',
      type: 'saml',
      status: 'active',
      users_count: 245,
      last_sync: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Google Workspace',
      type: 'oauth',
      status: 'active',
      users_count: 89,
      last_sync: '2024-01-15T09:45:00Z'
    },
    {
      id: '3',
      name: 'Okta',
      type: 'oidc',
      status: 'configuring',
      users_count: 0,
      last_sync: 'Never'
    }
  ];

  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Audit Manager',
      description: 'Full audit management and team oversight',
      permissions: ['audit:read', 'audit:write', 'audit:admin', 'reporting:read', 'user:manage'],
      users_count: 12,
      is_default: false
    },
    {
      id: '2',
      name: 'Senior Auditor',
      description: 'Conduct audits and manage findings',
      permissions: ['audit:read', 'audit:write', 'reporting:read'],
      users_count: 34,
      is_default: true
    },
    {
      id: '3',
      name: 'Junior Auditor',
      description: 'Basic audit access with supervision',
      permissions: ['audit:read'],
      users_count: 67,
      is_default: false
    },
    {
      id: '4',
      name: 'Client Representative',
      description: 'View audit progress and reports',
      permissions: ['audit:read', 'reporting:read'],
      users_count: 23,
      is_default: false
    }
  ];

  const mockComplianceReports: ComplianceReport[] = [
    {
      id: '1',
      type: 'soc2',
      status: 'compliant',
      last_audit: '2024-01-01T00:00:00Z',
      next_audit: '2024-07-01T00:00:00Z',
      findings_count: 0
    },
    {
      id: '2',
      type: 'iso27001',
      status: 'compliant',
      last_audit: '2023-12-15T00:00:00Z',
      next_audit: '2024-12-15T00:00:00Z',
      findings_count: 2
    },
    {
      id: '3',
      type: 'gdpr',
      status: 'compliant',
      last_audit: '2024-01-10T00:00:00Z',
      next_audit: '2025-01-10T00:00:00Z',
      findings_count: 1
    },
    {
      id: '4',
      type: 'hipaa',
      status: 'pending',
      last_audit: '2023-11-01T00:00:00Z',
      next_audit: '2024-02-01T00:00:00Z',
      findings_count: 5
    }
  ];

  const loadSSOProviders = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSsoProviders(mockSSOProviders);
      toast.success('SSO providers loaded successfully');
    } catch (error) {
      toast.error('Failed to load SSO providers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRoles(mockRoles);
      toast.success('Roles and permissions loaded successfully');
    } catch (error) {
      toast.error('Failed to load roles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadComplianceReports = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setComplianceReports(mockComplianceReports);
      toast.success('Compliance reports loaded successfully');
    } catch (error) {
      toast.error('Failed to load compliance reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncSSOProvider = useCallback(async (providerId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSsoProviders(prev => 
        prev.map(provider => 
          provider.id === providerId 
            ? { ...provider, last_sync: new Date().toISOString() }
            : provider
        )
      );
      toast.success('SSO provider synced successfully');
    } catch (error) {
      toast.error('Failed to sync SSO provider');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateComplianceReport = useCallback(async (type: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      toast.success(`${type.toUpperCase()} compliance report generated`);
    } catch (error) {
      toast.error('Failed to generate compliance report');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': case 'non_compliant': return 'text-red-600 bg-red-50 border-red-200';
      case 'configuring': case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': case 'non_compliant': return <AlertTriangle className="h-4 w-4" />;
      case 'configuring': case 'pending': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            Enterprise Features
          </h2>
          <p className="text-muted-foreground">
            Advanced security, compliance, and organizational management
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Enterprise Plan
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sso">SSO & Identity</TabsTrigger>
          <TabsTrigger value="permissions">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="security">Security Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="sso" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Single Sign-On Providers</h3>
            <div className="flex gap-2">
              <Button onClick={loadSSOProviders} disabled={isLoading} variant="outline">
                <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button>
                <Key className="h-4 w-4 mr-2" />
                Add Provider
              </Button>
            </div>
          </div>

          {ssoProviders.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ssoProviders.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <Badge className={getStatusColor(provider.status)}>
                        {getStatusIcon(provider.status)}
                        {provider.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Type</label>
                        <p className="font-medium uppercase">{provider.type}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Users</label>
                        <p className="font-medium">{provider.users_count}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-sm">Last Sync</label>
                      <p className="text-sm">
                        {provider.last_sync === 'Never' 
                          ? 'Never' 
                          : new Date(provider.last_sync).toLocaleString()
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => syncSSOProvider(provider.id)}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No SSO providers configured</p>
                <Button onClick={loadSSOProviders} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load SSO Providers'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Roles & Permissions</h3>
            <div className="flex gap-2">
              <Button onClick={loadRoles} disabled={isLoading} variant="outline">
                <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Create Role
              </Button>
            </div>
          </div>

          {roles.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Available Roles</h4>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <Card 
                      key={role.id}
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-all",
                        selectedRole?.id === role.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedRole(role)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{role.name}</h5>
                          <div className="flex items-center gap-2">
                            {role.is_default && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {role.users_count} users
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                        <div className="flex gap-1 flex-wrap">
                          {role.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Role Details</h4>
                {selectedRole ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{selectedRole.name}</span>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                        <p className="text-sm">{selectedRole.description}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Users Assigned</label>
                        <p className="text-sm">{selectedRole.users_count} users</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Permissions</label>
                        <div className="grid gap-2 mt-2">
                          {selectedRole.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <span className="text-sm">{permission}</span>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a role to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No roles configured</p>
                <Button onClick={loadRoles} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load Roles'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compliance & Auditing</h3>
            <Button onClick={loadComplianceReports} disabled={isLoading} variant="outline">
              <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
              Refresh Reports
            </Button>
          </div>

          {complianceReports.length > 0 ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {complianceReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg uppercase">{report.type}</CardTitle>
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusIcon(report.status)}
                          {report.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <label className="text-muted-foreground">Last Audit</label>
                          <p className="font-medium">
                            {new Date(report.last_audit).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-muted-foreground">Next Audit</label>
                          <p className="font-medium">
                            {new Date(report.next_audit).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-muted-foreground">Findings</label>
                          <p className="font-medium">
                            {report.findings_count} open finding{report.findings_count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => generateComplianceReport(report.type)}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Generate Report
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-muted-foreground">Overall Compliance Score</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-muted-foreground">Active Frameworks</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                      <div className="text-sm text-muted-foreground">Open Findings</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">45</div>
                      <div className="text-sm text-muted-foreground">Days to Next Audit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No compliance reports available</p>
                <Button onClick={loadComplianceReports} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load Compliance Reports'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">IP Restrictions</h4>
                      <p className="text-sm text-muted-foreground">Limit access by IP address</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Audit Logging</h4>
                      <p className="text-sm text-muted-foreground">Log all user activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Encryption</h4>
                      <p className="text-sm text-muted-foreground">Encrypt data at rest and in transit</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Backup Encryption</h4>
                      <p className="text-sm text-muted-foreground">Encrypt all backup data</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Retention</h4>
                      <p className="text-sm text-muted-foreground">Auto-delete old data</p>
                    </div>
                    <Badge variant="secondary">7 years</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">GDPR Compliance</h4>
                      <p className="text-sm text-muted-foreground">EU data protection compliance</p>
                    </div>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Security Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">Security Incidents</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1,247</div>
                  <div className="text-sm text-muted-foreground">Login Attempts</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className="text-sm text-muted-foreground">Failed Logins</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 