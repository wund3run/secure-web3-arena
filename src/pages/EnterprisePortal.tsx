import { Switch } from '@/components/ui/switch';
import React, { useState, useEffect } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnterpriseDashboard } from '@/components/enterprise/EnterpriseDashboard';
import { EnterpriseFeatures } from '@/components/enterprise/EnterpriseFeatures';
import { EnterpriseControlPanel } from '@/components/integrations/EnterpriseControlPanel';
import { useToast } from '@/components/ui/use-toast';
import { EnterpriseService } from '@/services/integrations/enterpriseService';
import {
  Building2,
  Users,
  Shield,
  Settings,
  BarChart3,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Server,
  Lock,
  Key,
  UserCheck,
  FileCode,
  Archive,
  BookOpen,
  PieChart,
  Database,
  Wrench,
  Zap,
  Target
} from 'lucide-react';

interface EnterpriseClient {
  id: string;
  name: string;
  tier: 'standard' | 'professional' | 'enterprise' | 'custom';
  activeUsers: number;
  activeSince: string;
  contractValue: number;
  securityScore: number;
  lastAudit: string;
  upcomingRenewals: boolean;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface EnterpriseInsight {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  status: 'positive' | 'negative' | 'neutral';
  formatter?: (value: string | number) => string;
}

interface EnterpriseAudit {
  id: string;
  projectName: string;
  auditType: string;
  status: 'planned' | 'in_progress' | 'under_review' | 'completed' | 'remediation';
  startDate: string;
  endDate?: string;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  completionPercentage: number;
}

interface EnterpriseResource {
  id: string;
  title: string;
  type: 'documentation' | 'training' | 'whitepaper' | 'case_study';
  description: string;
  dateAdded: string;
  tags: string[];
  url: string;
}

const mockClients: EnterpriseClient[] = [
  {
    id: '1',
    name: 'Solana Systems Corporation',
    tier: 'enterprise',
    activeUsers: 245,
    activeSince: '2023-09-15',
    contractValue: 1250000,
    securityScore: 92,
    lastAudit: '2025-05-15',
    upcomingRenewals: false,
    primaryContact: {
      name: 'Alexandra Roberts',
      email: 'a.roberts@solanasystems.com',
      phone: '+1 (415) 555-8723'
    }
  },
  {
    id: '2',
    name: 'Ethereum Enterprise Solutions',
    tier: 'professional',
    activeUsers: 85,
    activeSince: '2024-02-01',
    contractValue: 450000,
    securityScore: 87,
    lastAudit: '2025-06-22',
    upcomingRenewals: true,
    primaryContact: {
      name: 'Michael Chen',
      email: 'm.chen@ethereumenterprises.io',
      phone: '+1 (628) 555-3492'
    }
  },
  {
    id: '3',
    name: 'Avalanche Financial Technologies',
    tier: 'enterprise',
    activeUsers: 173,
    activeSince: '2024-01-10',
    contractValue: 950000,
    securityScore: 95,
    lastAudit: '2025-07-03',
    upcomingRenewals: false,
    primaryContact: {
      name: 'Sarah Johnson',
      email: 's.johnson@avalancheft.com',
      phone: '+1 (212) 555-6789'
    }
  }
];

const formatCurrency = (value: string | number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(value));
};

const formatPercentage = (value: string | number): string => {
  return `${value}%`;
};

const mockInsights: EnterpriseInsight[] = [
  {
    title: 'Total Enterprise Clients',
    value: 27,
    change: 8.5,
    icon: <Building2 className="h-5 w-5" />,
    status: 'positive'
  },
  {
    title: 'Annual Recurring Revenue',
    value: 14500000,
    change: 12.3,
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'positive',
    formatter: formatCurrency
  },
  {
    title: 'Average Security Score',
    value: 91,
    change: 3.2,
    icon: <Shield className="h-5 w-5" />,
    status: 'positive',
    formatter: formatPercentage
  },
  {
    title: 'Active Enterprise Users',
    value: 1892,
    change: 15.7,
    icon: <Users className="h-5 w-5" />,
    status: 'positive'
  },
  {
    title: 'Audits Completed',
    value: 138,
    change: 22.5,
    icon: <CheckCircle className="h-5 w-5" />,
    status: 'positive'
  },
  {
    title: 'Client Retention Rate',
    value: 97,
    change: 1.5,
    icon: <Target className="h-5 w-5" />,
    status: 'positive',
    formatter: formatPercentage
  }
];

const mockAudits: EnterpriseAudit[] = [
  {
    id: '1',
    projectName: 'DeFi Lending Protocol',
    auditType: 'Smart Contract Security',
    status: 'completed',
    startDate: '2025-05-01',
    endDate: '2025-06-10',
    criticalFindings: 1,
    highFindings: 3,
    mediumFindings: 7,
    lowFindings: 12,
    completionPercentage: 100
  },
  {
    id: '2',
    projectName: 'Cross-Chain Bridge',
    auditType: 'Security Assessment',
    status: 'in_progress',
    startDate: '2025-06-15',
    criticalFindings: 2,
    highFindings: 5,
    mediumFindings: 4,
    lowFindings: 8,
    completionPercentage: 65
  },
  {
    id: '3',
    projectName: 'NFT Marketplace',
    auditType: 'Protocol Audit',
    status: 'under_review',
    startDate: '2025-06-01',
    criticalFindings: 0,
    highFindings: 4,
    mediumFindings: 9,
    lowFindings: 15,
    completionPercentage: 85
  },
  {
    id: '4',
    projectName: 'DAO Governance',
    auditType: 'Smart Contract Security',
    status: 'planned',
    startDate: '2025-08-01',
    criticalFindings: 0,
    highFindings: 0,
    mediumFindings: 0,
    lowFindings: 0,
    completionPercentage: 0
  },
  {
    id: '5',
    projectName: 'Staking Protocol',
    auditType: 'Full Security Audit',
    status: 'remediation',
    startDate: '2025-04-10',
    endDate: '2025-05-20',
    criticalFindings: 3,
    highFindings: 6,
    mediumFindings: 8,
    lowFindings: 14,
    completionPercentage: 100
  }
];

const mockResources: EnterpriseResource[] = [
  {
    id: '1',
    title: 'Enterprise Security Best Practices for Web3',
    type: 'documentation',
    description: 'Comprehensive guide to implementing enterprise-grade security in Web3 projects.',
    dateAdded: '2025-06-15',
    tags: ['security', 'enterprise', 'best-practices'],
    url: '/resources/enterprise-security-best-practices'
  },
  {
    id: '2',
    title: 'Smart Contract Auditing for Enterprise Teams',
    type: 'training',
    description: 'Advanced training course for enterprise security teams on smart contract auditing.',
    dateAdded: '2025-05-22',
    tags: ['training', 'smart-contracts', 'auditing'],
    url: '/resources/enterprise-smart-contract-auditing'
  },
  {
    id: '3',
    title: 'Zero-Knowledge Proofs in Enterprise Applications',
    type: 'whitepaper',
    description: 'Technical whitepaper on implementing ZK proofs in enterprise blockchain solutions.',
    dateAdded: '2025-07-01',
    tags: ['whitepaper', 'zero-knowledge', 'privacy'],
    url: '/resources/zk-proofs-enterprise'
  },
  {
    id: '4',
    title: 'Solana Systems: Securing a DeFi Ecosystem',
    type: 'case_study',
    description: 'Case study on how Solana Systems improved their security posture with Hawkly.',
    dateAdded: '2025-04-10',
    tags: ['case-study', 'defi', 'solana'],
    url: '/resources/solana-systems-case-study'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge className="bg-blue-500">
          <RefreshCw className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'under_review':
      return (
        <Badge className="bg-amber-500">
          <FileText className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      );
    case 'planned':
      return (
        <Badge className="bg-purple-500">
          <Clock className="h-3 w-3 mr-1" />
          Planned
        </Badge>
      );
    case 'remediation':
      return (
        <Badge className="bg-red-500">
          <Wrench className="h-3 w-3 mr-1" />
          Remediation
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const getResourceTypeBadge = (type: string) => {
  switch (type) {
    case 'documentation':
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          <BookOpen className="h-3 w-3 mr-1" />
          Documentation
        </Badge>
      );
    case 'training':
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          <UserCheck className="h-3 w-3 mr-1" />
          Training
        </Badge>
      );
    case 'whitepaper':
      return (
        <Badge variant="outline" className="border-purple-500 text-purple-500">
          <FileText className="h-3 w-3 mr-1" />
          Whitepaper
        </Badge>
      );
    case 'case_study':
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          <Target className="h-3 w-3 mr-1" />
          Case Study
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const EnterprisePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState<EnterpriseClient | null>(null);
  const [clients, setClients] = useState<EnterpriseClient[]>(mockClients);
  const [insights, setInsights] = useState<EnterpriseInsight[]>(mockInsights);
  const [audits, setAudits] = useState<EnterpriseAudit[]>(mockAudits);
  const [resources, setResources] = useState<EnterpriseResource[]>(mockResources);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set default selected client
    if (clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0]);
    }
  }, [clients, selectedClient]);

  const handleClientChange = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      toast({
        title: "Client Changed",
        description: `Switched to ${client.name}`,
      });
    }
  };

  const handleDownloadReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Report Downloaded",
        description: "Enterprise security report has been downloaded",
      });
    }, 2000);
  };

  const handleExportData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Data Exported",
        description: "Enterprise audit data exported successfully",
      });
    }, 2000);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {selectedClient && (
        <HawklyCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{selectedClient.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" className="bg-blue-600 text-white">
                  {selectedClient.tier.charAt(0).toUpperCase() + selectedClient.tier.slice(1)} Tier
                </Badge>
                <span className="text-sm text-gray-400">
                  Active since {new Date(selectedClient.activeSince).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Contract Value</div>
              <div className="text-2xl font-bold">{formatCurrency(selectedClient.contractValue)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col p-4 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Active Users</span>
              <span className="text-xl font-bold">{selectedClient.activeUsers}</span>
            </div>
            <div className="flex flex-col p-4 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Security Score</span>
              <span className="text-xl font-bold">{selectedClient.securityScore}%</span>
            </div>
            <div className="flex flex-col p-4 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Last Audit</span>
              <span className="text-xl font-bold">{new Date(selectedClient.lastAudit).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h4 className="font-medium mb-2">Primary Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-sm">
                <div className="text-gray-400">Name</div>
                <div>{selectedClient.primaryContact.name}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-400">Email</div>
                <div>{selectedClient.primaryContact.email}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-400">Phone</div>
                <div>{selectedClient.primaryContact.phone}</div>
              </div>
            </div>
          </div>
        </HawklyCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <HawklyCard key={index} variant="glass" className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{insight.title}</span>
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                insight.status === 'positive' ? 'bg-green-900/20 text-green-500' : 
                insight.status === 'negative' ? 'bg-red-900/20 text-red-500' : 
                'bg-gray-900/20 text-gray-500'
              }`}>
                {insight.change > 0 ? '+' : ''}{insight.change}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-800/50">
                {insight.icon}
              </div>
              <span className="text-2xl font-bold">
                {insight.formatter ? insight.formatter(insight.value) : insight.value}
              </span>
            </div>
          </HawklyCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HawklyCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Recent Audits
            </h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {audits.slice(0, 3).map((audit) => (
              <div key={audit.id} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{audit.projectName}</h4>
                  {getStatusBadge(audit.status)}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {audit.auditType} • Started {new Date(audit.startDate).toLocaleDateString()}
                  {audit.endDate && ` • Completed ${new Date(audit.endDate).toLocaleDateString()}`}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-xs bg-red-900/20 text-red-500 px-2 py-1 rounded">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Critical: {audit.criticalFindings}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-orange-900/20 text-orange-500 px-2 py-1 rounded">
                    <AlertTriangle className="h-3 w-3" />
                    <span>High: {audit.highFindings}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-yellow-900/20 text-yellow-500 px-2 py-1 rounded">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Medium: {audit.mediumFindings}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      audit.status === 'completed' || audit.status === 'remediation' 
                        ? 'bg-green-500' 
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${audit.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </HawklyCard>

        <HawklyCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Enterprise Resources
            </h3>
            <Button variant="outline" size="sm">
              Browse Library
            </Button>
          </div>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  {getResourceTypeBadge(resource.type)}
                </div>
                <p className="text-sm text-gray-400 mb-2">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="default" className="h-7">
                    View Resource
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </HawklyCard>
      </div>
    </div>
  );

  return (
    <ProductionLayout
      title="Enterprise Portal"
      description="Advanced security and management for enterprise clients"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Enterprise Portal
            </h1>
            <p className="text-lg text-gray-300">
              Advanced security management and insights for enterprise clients
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end gap-4 w-full lg:w-auto">
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Select Client
              </label>
              <Select
                value={selectedClient?.id}
                onValueChange={handleClientChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleDownloadReport}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Report
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleExportData}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Database className="h-4 w-4" />
                )}
                Export Data
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900/50 p-1 h-auto">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
            >
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Administration
            </TabsTrigger>
            <TabsTrigger 
              value="integration" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
            >
              <Server className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <EnterpriseDashboard />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <EnterpriseFeatures />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <HawklyCard variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Enterprise Administration</h2>
                  <p className="text-gray-400">Manage users, roles, and organization settings</p>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Key className="h-4 w-4" />
                  Admin Access
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6" />
                  <span className="font-semibold">User Management</span>
                </Button>

                <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                  <Lock className="h-6 w-6" />
                  <span className="font-semibold">Roles & Permissions</span>
                </Button>

                <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                  <FileCode className="h-6 w-6" />
                  <span className="font-semibold">Contract Management</span>
                </Button>

                <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                  <Archive className="h-6 w-6" />
                  <span className="font-semibold">Audit Archives</span>
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Organization Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Require 2FA for all enterprise users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Advanced Audit Logging</h4>
                      <p className="text-sm text-gray-400">Enable comprehensive logging for all actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Single Sign-On</h4>
                      <p className="text-sm text-gray-400">Configure SSO for enterprise authentication</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">IP Restrictions</h4>
                      <p className="text-sm text-gray-400">Restrict access to specific IP ranges</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </HawklyCard>
          </TabsContent>

          <TabsContent value="integration" className="mt-6">
            <EnterpriseControlPanel />
          </TabsContent>
        </Tabs>
      </div>
    </ProductionLayout>
  );
};

export default EnterprisePortal;
