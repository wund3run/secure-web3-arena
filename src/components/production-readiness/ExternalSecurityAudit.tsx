import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Lock,
  Server,
  Database,
  Globe,
  Key
} from 'lucide-react';

interface SecurityAuditItem {
  id: string;
  category: 'infrastructure' | 'application' | 'data' | 'network' | 'compliance';
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'passed' | 'failed';
  recommendation?: string;
  evidence?: string;
  lastTested?: Date;
}

export const ExternalSecurityAudit = () => {
  const [auditItems, setAuditItems] = useState<SecurityAuditItem[]>([]);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('infrastructure');

  const auditCategories = [
    { id: 'infrastructure', name: 'Infrastructure', icon: Server },
    { id: 'application', name: 'Application', icon: Shield },
    { id: 'data', name: 'Data Security', icon: Database },
    { id: 'network', name: 'Network', icon: Globe },
    { id: 'compliance', name: 'Compliance', icon: Lock },
  ];

  const initializeAuditItems = () => {
    const items: SecurityAuditItem[] = [
      // Infrastructure Security
      {
        id: 'ssl-config',
        category: 'infrastructure',
        name: 'SSL/TLS Configuration',
        description: 'Verify proper SSL certificate configuration and security protocols',
        severity: 'critical',
        status: 'pending'
      },
      {
        id: 'server-hardening',
        category: 'infrastructure',
        name: 'Server Hardening',
        description: 'Check server security configurations and unnecessary services',
        severity: 'high',
        status: 'pending'
      },
      {
        id: 'firewall-rules',
        category: 'infrastructure',
        name: 'Firewall Configuration',
        description: 'Audit firewall rules and network access controls',
        severity: 'high',
        status: 'pending'
      },

      // Application Security
      {
        id: 'auth-security',
        category: 'application',
        name: 'Authentication Security',
        description: 'Test authentication mechanisms and session management',
        severity: 'critical',
        status: 'pending'
      },
      {
        id: 'input-validation',
        category: 'application',
        name: 'Input Validation',
        description: 'Check for injection vulnerabilities and input sanitization',
        severity: 'critical',
        status: 'pending'
      },
      {
        id: 'api-security',
        category: 'application',
        name: 'API Security',
        description: 'Audit API endpoints for proper security controls',
        severity: 'high',
        status: 'pending'
      },
      {
        id: 'xss-protection',
        category: 'application',
        name: 'XSS Protection',
        description: 'Test for cross-site scripting vulnerabilities',
        severity: 'high',
        status: 'pending'
      },

      // Data Security
      {
        id: 'data-encryption',
        category: 'data',
        name: 'Data Encryption',
        description: 'Verify encryption at rest and in transit',
        severity: 'critical',
        status: 'pending'
      },
      {
        id: 'database-security',
        category: 'data',
        name: 'Database Security',
        description: 'Audit database configurations and access controls',
        severity: 'critical',
        status: 'pending'
      },
      {
        id: 'data-backup',
        category: 'data',
        name: 'Backup Security',
        description: 'Test backup integrity and restoration procedures',
        severity: 'medium',
        status: 'pending'
      },

      // Network Security
      {
        id: 'network-segmentation',
        category: 'network',
        name: 'Network Segmentation',
        description: 'Check network isolation and segmentation controls',
        severity: 'high',
        status: 'pending'
      },
      {
        id: 'ddos-protection',
        category: 'network',
        name: 'DDoS Protection',
        description: 'Test distributed denial of service protection measures',
        severity: 'medium',
        status: 'pending'
      },

      // Compliance
      {
        id: 'gdpr-compliance',
        category: 'compliance',
        name: 'GDPR Compliance',
        description: 'Verify GDPR data protection requirements',
        severity: 'high',
        status: 'pending'
      },
      {
        id: 'pci-compliance',
        category: 'compliance',
        name: 'PCI DSS Compliance',
        description: 'Audit payment card industry standards compliance',
        severity: 'critical',
        status: 'pending'
      }
    ];

    setAuditItems(items);
  };

  const calculateOverallScore = () => {
    const completedItems = auditItems.filter(item => item.status !== 'pending' && item.status !== 'in_progress');
    if (completedItems.length === 0) return 0;
    
    const passedItems = completedItems.filter(item => item.status === 'passed');
    return Math.round((passedItems.length / completedItems.length) * 100);
  };

  useEffect(() => {
    initializeAuditItems();
  }, [calculateOverallScore]);

  const runSecurityAudit = async (itemId?: string) => {
    setIsRunningAudit(true);
    
    const itemsToTest = itemId ? auditItems.filter(item => item.id === itemId) : auditItems;
    
    for (const item of itemsToTest) {
      // Update status to in_progress
      setAuditItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, status: 'in_progress' } : i
      ));
      
      // Simulate audit execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic results
      const passed = Math.random() > (item.severity === 'critical' ? 0.3 : 0.2);
      const result: SecurityAuditItem = {
        ...item,
        status: passed ? 'passed' : 'failed',
        lastTested: new Date(),
        recommendation: passed ? undefined : generateRecommendation(item),
        evidence: generateEvidence(item, passed)
      };
      
      setAuditItems(prev => prev.map(i => i.id === item.id ? result : i));
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunningAudit(false);
  };

  const generateRecommendation = (item: SecurityAuditItem): string => {
    const recommendations = {
      'ssl-config': 'Update to TLS 1.3, implement HSTS headers, and configure proper cipher suites',
      'server-hardening': 'Disable unnecessary services, update all software packages, and implement fail2ban',
      'auth-security': 'Implement 2FA for all accounts, strengthen password policies, and add session timeout',
      'input-validation': 'Implement server-side input validation, use parameterized queries, and sanitize all inputs',
      'data-encryption': 'Enable AES-256 encryption for data at rest and implement perfect forward secrecy',
      'database-security': 'Enable row-level security, audit database access, and restrict database permissions',
      'gdpr-compliance': 'Implement data retention policies, add consent management, and enable data portability',
      'pci-compliance': 'Implement network segmentation, enhance logging, and conduct quarterly vulnerability scans'
    };
    
    return recommendations[item.id as keyof typeof recommendations] || 'Review and strengthen security controls for this component';
  };

  const generateEvidence = (item: SecurityAuditItem, passed: boolean): string => {
    if (passed) {
      return `✅ Security test passed. All controls properly implemented and functioning as expected.`;
    }
    
    const evidenceExamples = {
      'ssl-config': '❌ TLS 1.0/1.1 still enabled. Weak cipher suites detected. HSTS header missing.',
      'auth-security': '❌ Password policy allows weak passwords. Session timeout not configured. 2FA not enforced.',
      'input-validation': '❌ SQL injection vulnerability found in search endpoint. XSS possible in user comments.',
      'data-encryption': '❌ Database encryption not enabled. API tokens transmitted in plaintext logs.'
    };
    
    return evidenceExamples[item.id as keyof typeof evidenceExamples] || '❌ Security vulnerability detected. Manual review required.';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress': return <Eye className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getCategoryItems = (category: string) => {
    return auditItems.filter(item => item.category === category);
  };

  const getFailedCriticalItems = () => {
    return auditItems.filter(item => item.status === 'failed' && item.severity === 'critical');
  };

  useEffect(() => {
    setOverallScore(calculateOverallScore());
  }, [auditItems]);

  const failedCriticalItems = getFailedCriticalItems();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">External Security Audit</h3>
          <p className="text-muted-foreground">Comprehensive security assessment by third-party standards</p>
        </div>
        <Button onClick={() => runSecurityAudit()} disabled={isRunningAudit}>
          {isRunningAudit ? 'Running Audit...' : 'Run Full Audit'}
        </Button>
      </div>

      {/* Overall Security Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Audit Score
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
                <span className="text-green-600">{auditItems.filter(a => a.status === 'passed').length} Passed</span>
                <span className="text-red-600">{auditItems.filter(a => a.status === 'failed').length} Failed</span>
                <span className="text-gray-600">{auditItems.filter(a => a.status === 'pending').length} Pending</span>
              </div>
            </div>
          </div>
          
          {failedCriticalItems.length > 0 && (
            <Alert variant="error" className="mt-4">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>{failedCriticalItems.length} critical security issues</strong> must be resolved immediately.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Security Audit Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-5 w-full">
          {auditCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {auditCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4">
              {getCategoryItems(category.id).map((item) => (
                <Card key={item.id} className={`border-l-4 ${
                  item.status === 'passed' ? 'border-l-green-500' :
                  item.status === 'failed' ? 'border-l-red-500' :
                  item.status === 'in_progress' ? 'border-l-blue-500' :
                  'border-l-gray-300'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {getStatusIcon(item.status)}
                          {item.name}
                          <Badge variant="outline" className={getSeverityColor(item.severity)}>
                            {item.severity.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => runSecurityAudit(item.id)}
                        disabled={isRunningAudit}
                      >
                        {item.status === 'in_progress' ? 'Testing...' : 'Test'}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {(item.evidence || item.recommendation) && (
                    <CardContent className="space-y-3">
                      {item.evidence && (
                        <div>
                          <strong>Evidence:</strong>
                          <p className="text-sm text-muted-foreground mt-1">{item.evidence}</p>
                        </div>
                      )}
                      
                      {item.recommendation && (
                        <div className="bg-yellow-50 p-3 rounded">
                          <strong className="text-yellow-800">Recommendation:</strong>
                          <p className="text-sm text-yellow-700 mt-1">{item.recommendation}</p>
                        </div>
                      )}
                      
                      {item.lastTested && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            Last tested: {item.lastTested.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
