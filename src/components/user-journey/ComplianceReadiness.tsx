
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Lock,
  Users,
  Globe,
  Database,
  Key
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  priority: 'high' | 'medium' | 'low';
  completionRate: number;
  requirements: string[];
  actionItems: string[];
  deadline?: string;
}

export function ComplianceReadiness() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const complianceItems: ComplianceItem[] = [
    {
      id: 'gdpr',
      category: 'Data Privacy',
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation compliance for EU users',
      status: 'compliant',
      priority: 'high',
      completionRate: 95,
      requirements: [
        'Privacy policy implementation',
        'Cookie consent management',
        'Data subject rights',
        'Data breach notification procedures'
      ],
      actionItems: [
        'Update privacy policy language',
        'Implement data export functionality'
      ],
      deadline: '2024-03-01'
    },
    {
      id: 'ccpa',
      category: 'Data Privacy',
      name: 'CCPA Compliance',
      description: 'California Consumer Privacy Act compliance',
      status: 'partial',
      priority: 'high',
      completionRate: 78,
      requirements: [
        'Privacy notice requirements',
        'Consumer rights implementation',
        'Data sale opt-out',
        'Third-party data sharing disclosure'
      ],
      actionItems: [
        'Implement "Do Not Sell" mechanism',
        'Create consumer request portal',
        'Update third-party vendor agreements'
      ],
      deadline: '2024-02-15'
    },
    {
      id: 'sox',
      category: 'Financial',
      name: 'SOX Compliance',
      description: 'Sarbanes-Oxley Act financial reporting requirements',
      status: 'partial',
      priority: 'medium',
      completionRate: 65,
      requirements: [
        'Internal controls documentation',
        'Audit trail maintenance',
        'Financial data accuracy',
        'Access control procedures'
      ],
      actionItems: [
        'Document internal controls',
        'Implement audit logging',
        'Establish change management procedures'
      ],
      deadline: '2024-04-01'
    },
    {
      id: 'pci-dss',
      category: 'Payment Security',
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'compliant',
      priority: 'high',
      completionRate: 92,
      requirements: [
        'Secure payment processing',
        'Encrypted data transmission',
        'Access control measures',
        'Regular security testing'
      ],
      actionItems: [
        'Complete quarterly security scans',
        'Update firewall configurations'
      ],
      deadline: '2024-01-31'
    },
    {
      id: 'iso27001',
      category: 'Information Security',
      name: 'ISO 27001',
      description: 'Information Security Management System standard',
      status: 'partial',
      priority: 'medium',
      completionRate: 72,
      requirements: [
        'ISMS documentation',
        'Risk assessment procedures',
        'Security controls implementation',
        'Continuous monitoring'
      ],
      actionItems: [
        'Complete risk assessment documentation',
        'Implement monitoring procedures',
        'Conduct management review'
      ],
      deadline: '2024-05-01'
    },
    {
      id: 'web-accessibility',
      category: 'Accessibility',
      name: 'WCAG 2.1 AA',
      description: 'Web Content Accessibility Guidelines compliance',
      status: 'partial',
      priority: 'medium',
      completionRate: 68,
      requirements: [
        'Keyboard navigation support',
        'Screen reader compatibility',
        'Color contrast standards',
        'Alternative text for images'
      ],
      actionItems: [
        'Audit existing components',
        'Implement ARIA labels',
        'Fix color contrast issues'
      ],
      deadline: '2024-03-15'
    },
    {
      id: 'blockchain-kyc',
      category: 'Blockchain',
      name: 'Blockchain KYC/AML',
      description: 'Know Your Customer and Anti-Money Laundering for blockchain transactions',
      status: 'non-compliant',
      priority: 'high',
      completionRate: 45,
      requirements: [
        'Customer identity verification',
        'Transaction monitoring',
        'Suspicious activity reporting',
        'Record keeping requirements'
      ],
      actionItems: [
        'Implement KYC verification flow',
        'Set up transaction monitoring',
        'Create compliance reporting system'
      ],
      deadline: '2024-06-01'
    },
    {
      id: 'audit-standards',
      category: 'Professional Standards',
      name: 'Audit Standards Compliance',
      description: 'Professional auditing standards and certification requirements',
      status: 'compliant',
      priority: 'high',
      completionRate: 88,
      requirements: [
        'Auditor certification verification',
        'Quality assurance procedures',
        'Professional ethics guidelines',
        'Continuing education requirements'
      ],
      actionItems: [
        'Update auditor verification process',
        'Implement quality metrics'
      ],
      deadline: '2024-02-28'
    }
  ];

  const categories = ['all', 'Data Privacy', 'Financial', 'Payment Security', 'Information Security', 'Accessibility', 'Blockchain', 'Professional Standards'];
  
  const filteredItems = selectedCategory === 'all' 
    ? complianceItems 
    : complianceItems.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'partial': return 'text-yellow-600 bg-yellow-50';
      case 'non-compliant': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'partial': return <AlertTriangle className="h-4 w-4" />;
      case 'non-compliant': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Data Privacy': return <Lock className="h-4 w-4" />;
      case 'Financial': return <FileText className="h-4 w-4" />;
      case 'Payment Security': return <Shield className="h-4 w-4" />;
      case 'Information Security': return <Database className="h-4 w-4" />;
      case 'Accessibility': return <Users className="h-4 w-4" />;
      case 'Blockchain': return <Key className="h-4 w-4" />;
      case 'Professional Standards': return <Globe className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const calculateOverallCompliance = () => {
    const totalItems = filteredItems.length;
    const compliantItems = filteredItems.filter(item => item.status === 'compliant').length;
    const partialItems = filteredItems.filter(item => item.status === 'partial').length;
    
    return {
      total: totalItems,
      compliant: compliantItems,
      partial: partialItems,
      nonCompliant: totalItems - compliantItems - partialItems,
      percentage: ((compliantItems + (partialItems * 0.5)) / totalItems) * 100
    };
  };

  const complianceStats = calculateOverallCompliance();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Readiness</h2>
          <p className="text-muted-foreground">
            Comprehensive compliance assessment for production readiness
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-2"
          >
            {category !== 'all' && getCategoryIcon(category)}
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Compliance</p>
                <p className="text-2xl font-bold">{complianceStats.percentage.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold">{complianceStats.compliant}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Partial</p>
                <p className="text-2xl font-bold">{complianceStats.partial}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Non-Compliant</p>
                <p className="text-2xl font-bold">{complianceStats.nonCompliant}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(item.category)}
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                        {item.priority} priority
                      </Badge>
                      {item.deadline && (
                        <Badge variant="outline">Due: {item.deadline}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  <span className="text-sm font-medium capitalize">{item.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Requirements</h4>
                  <div className="space-y-1">
                    {item.requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Action Items</h4>
                  <div className="space-y-1">
                    {item.actionItems.map((action, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completion Progress</span>
                  <span className="text-sm text-muted-foreground">{item.completionRate}%</span>
                </div>
                <Progress value={item.completionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
