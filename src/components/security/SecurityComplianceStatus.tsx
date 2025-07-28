import React from 'react';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface ComplianceItem {
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable';
  progress: number;
  description: string;
}

const complianceItems: ComplianceItem[] = [
  {
    name: 'OWASP Top 10 for Web3',
    status: 'compliant',
    progress: 100,
    description: 'Smart contract vulnerabilities addressed'
  },
  {
    name: 'CWE Smart Contract Weaknesses',
    status: 'compliant',
    progress: 100,
    description: 'Common weaknesses in smart contracts mitigated'
  },
  {
    name: 'SOC 2 Type II',
    status: 'partial',
    progress: 75,
    description: 'Security policies and procedures in place'
  },
  {
    name: 'GDPR',
    status: 'partial',
    progress: 80,
    description: 'User data protection and privacy controls'
  },
  {
    name: 'ISO 27001',
    status: 'partial',
    progress: 60,
    description: 'Information security management'
  },
  {
    name: 'Blockchain Security Alliance',
    status: 'compliant',
    progress: 100,
    description: 'Web3 security standards compliance'
  }
];

export const SecurityComplianceStatus: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'partial': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'non-compliant': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compliant': return 'Compliant';
      case 'partial': return 'Partial';
      case 'non-compliant': return 'Non-Compliant';
      case 'not-applicable': return 'N/A';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-900/20 text-green-500';
      case 'partial': return 'bg-yellow-900/20 text-yellow-500';
      case 'non-compliant': return 'bg-red-900/20 text-red-500';
      case 'not-applicable': return 'bg-gray-900/20 text-gray-500';
      default: return 'bg-blue-900/20 text-blue-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Compliance Status</h2>
          <p className="text-gray-400">Security standards and regulatory compliance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline">Generate Compliance Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HawklyCard variant="glass" className="p-6">
          <h3 className="text-xl font-semibold mb-4">Regulatory Compliance</h3>
          <div className="space-y-4">
            {complianceItems.filter(item => item.name === 'GDPR' || item.name === 'SOC 2 Type II').map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span>{item.name}</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {getStatusText(item.status)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{item.description}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className={getProgressColor(item.progress)} />
                </div>
              </div>
            ))}
          </div>
        </HawklyCard>

        <HawklyCard variant="glass" className="p-6">
          <h3 className="text-xl font-semibold mb-4">Security Standards</h3>
          <div className="space-y-4">
            {complianceItems.filter(item => item.name !== 'GDPR' && item.name !== 'SOC 2 Type II').map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span>{item.name}</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {getStatusText(item.status)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{item.description}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className={getProgressColor(item.progress)} />
                </div>
              </div>
            ))}
          </div>
        </HawklyCard>
      </div>

      <HawklyCard variant="glass" className="p-6">
        <h3 className="text-xl font-semibold mb-4">Compliance Timeline</h3>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-700"></div>
          <div className="space-y-8">
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium">OWASP Top 10 Compliance</h4>
                <p className="text-sm text-gray-400">Completed - June 15, 2025</p>
              </div>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium">Blockchain Security Alliance Certification</h4>
                <p className="text-sm text-gray-400">Completed - July 3, 2025</p>
              </div>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-yellow-900/30 border border-yellow-500 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-medium">ISO 27001 Certification</h4>
                <p className="text-sm text-gray-400">In Progress - Expected August 25, 2025</p>
              </div>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-900/30 border border-gray-500 flex items-center justify-center">
                <Shield className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium">SOC 2 Type II Certification</h4>
                <p className="text-sm text-gray-400">Scheduled - September 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </HawklyCard>
    </div>
  );
};
