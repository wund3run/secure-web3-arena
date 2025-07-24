import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download,
  FileText,
  Bug,
  Zap,
  TrendingUp,
  TrendingDown,
  Eye,
  Lock,
  Unlock,
  Target,
  Award,
  Users,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart,
  AlertCircle
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';
import { HawklyCard, SecurityBadge, AuditorAvatar, LiveMetric, ProgressIndicator } from '@/components/ui/hawkly-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock audit data
const auditData = {
  id: 'AUD-2024-001',
  projectName: 'DefiSwap Protocol',
  status: 'completed',
  auditor: {
    name: 'Alex Chen',
    avatar: '',
    verified: true,
    rating: 4.9
  },
  completedDate: '2024-01-15',
  timeline: {
    started: '2024-01-01',
    completed: '2024-01-15',
    duration: '14 days'
  },
  overallScore: 92,
  riskLevel: 'low',
  contractsAudited: 12,
  linesOfCode: 2847,
  testCoverage: 94,
  gasOptimization: 87,
  findings: {
    critical: 0,
    high: 1,
    medium: 3,
    low: 8,
    informational: 12,
    total: 24
  },
  categories: [
    { name: 'Access Control', score: 95, status: 'excellent' },
    { name: 'Arithmetic', score: 88, status: 'good' },
    { name: 'Denial of Service', score: 92, status: 'excellent' },
    { name: 'Front Running', score: 85, status: 'good' },
    { name: 'Reentrancy', score: 98, status: 'excellent' },
    { name: 'Timestamp Dependence', score: 90, status: 'good' },
    { name: 'Gas Optimization', score: 87, status: 'good' }
  ]
};

const vulnerabilities = [
  {
    id: 'HIGH-001',
    severity: 'high',
    title: 'Potential Flash Loan Attack Vector',
    description: 'The contract does not implement sufficient protection against flash loan attacks in the swap function.',
    location: 'contracts/DeFiSwap.sol:line 247',
    impact: 'Attackers could potentially manipulate token prices using flash loans',
    recommendation: 'Implement oracle price validation and add reentrancy guards',
    status: 'fixed',
    category: 'Flash Loans',
    cwe: 'CWE-841',
    gasImpact: 'medium'
  },
  {
    id: 'MED-001',
    severity: 'medium',
    title: 'Missing Event Emission',
    description: 'Critical state changes are not emitting events for transparency',
    location: 'contracts/Governance.sol:line 156',
    impact: 'Reduces transparency and makes monitoring difficult',
    recommendation: 'Add appropriate event emissions for all state changes',
    status: 'fixed',
    category: 'Transparency',
    cwe: 'CWE-223',
    gasImpact: 'low'
  },
  {
    id: 'MED-002',
    severity: 'medium',
    title: 'Unchecked Return Value',
    description: 'External call return value is not checked',
    location: 'contracts/TokenVault.sol:line 89',
    impact: 'Silent failures could lead to inconsistent state',
    recommendation: 'Always check return values of external calls',
    status: 'acknowledged',
    category: 'Error Handling',
    cwe: 'CWE-252',
    gasImpact: 'low'
  },
  {
    id: 'LOW-001',
    severity: 'low',
    title: 'Gas Optimization Opportunity',
    description: 'Loop can be optimized to reduce gas consumption',
    location: 'contracts/StakingPool.sol:line 203',
    impact: 'Higher gas costs for users',
    recommendation: 'Use more efficient loop patterns or caching',
    status: 'fixed',
    category: 'Gas Optimization',
    cwe: 'N/A',
    gasImpact: 'high'
  }
];

const severityColors = {
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500' },
  low: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500' },
  informational: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500' }
};

const statusColors = {
  fixed: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle },
  acknowledged: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Eye },
  pending: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: Clock }
};

export default function EnhancedAuditResults() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFindings, setExpandedFindings] = useState<string[]>([]);

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSeverity = selectedSeverity === 'all' || vuln.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || vuln.status === selectedStatus;
    const matchesSearch = vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vuln.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const toggleFinding = (id: string) => {
    setExpandedFindings(prev =>
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'findings', label: 'Security Findings', icon: Bug },
    { id: 'categories', label: 'Security Categories', icon: Shield },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'reports', label: 'Reports & Downloads', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] via-[#181f2f] to-[#212842]">
      <AppContainer className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-[#f8f9fb]">{auditData.projectName}</h1>
                <SecurityBadge 
                  level={auditData.riskLevel === 'low' ? 'enterprise' : 'advanced'} 
                  verified={true} 
                  size="lg" 
                />
              </div>
              <p className="text-[#b2bfd4]">Audit ID: {auditData.id} • Completed {auditData.completedDate}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <AuditorAvatar 
                    name={auditData.auditor.name}
                    verified={auditData.auditor.verified}
                    size="sm"
                  />
                  <span className="text-[#b2bfd4]">Audited by {auditData.auditor.name}</span>
                </div>
                <div className="text-[#8391ad]">•</div>
                <div className="text-[#b2bfd4]">{auditData.timeline.duration}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <HawklyCard variant="glass" className="p-4 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(auditData.overallScore)}`}>
                  {auditData.overallScore}
                </div>
                <div className="text-[#8391ad] text-sm">Security Score</div>
              </HawklyCard>
              <Button className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa]">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-[#a879ef] text-white'
                      : 'bg-[#181e2c] text-[#b2bfd4] hover:bg-[#a879ef]/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid lg:grid-cols-4 gap-6">
              <HawklyCard variant="glass" className="p-6">
                <LiveMetric
                  label="Contracts Audited"
                  value={auditData.contractsAudited}
                  icon={FileText}
                />
              </HawklyCard>
              <HawklyCard variant="glass" className="p-6">
                <LiveMetric
                  label="Lines of Code"
                  value={auditData.linesOfCode.toLocaleString()}
                  icon={Target}
                />
              </HawklyCard>
              <HawklyCard variant="glass" className="p-6">
                <LiveMetric
                  label="Test Coverage"
                  value={auditData.testCoverage}
                  format="percentage"
                  icon={CheckCircle}
                />
              </HawklyCard>
              <HawklyCard variant="glass" className="p-6">
                <LiveMetric
                  label="Gas Optimization"
                  value={auditData.gasOptimization}
                  format="percentage"
                  icon={Zap}
                />
              </HawklyCard>
            </div>

            {/* Findings Summary */}
            <div className="grid lg:grid-cols-2 gap-8">
              <HawklyCard variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Security Findings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <span className="font-medium text-[#f8f9fb]">Critical</span>
                    </div>
                    <span className="text-2xl font-bold text-red-400">{auditData.findings.critical}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                      <span className="font-medium text-[#f8f9fb]">High</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-400">{auditData.findings.high}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      <span className="font-medium text-[#f8f9fb]">Medium</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">{auditData.findings.medium}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-blue-400" />
                      <span className="font-medium text-[#f8f9fb]">Low</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">{auditData.findings.low}</span>
                  </div>
                </div>
              </HawklyCard>

              <HawklyCard variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Security Categories</h3>
                <div className="space-y-3">
                  {auditData.categories.slice(0, 6).map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#b2bfd4]">{category.name}</span>
                        <span className={`font-bold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                      </div>
                      <ProgressIndicator
                        value={category.score}
                        max={100}
                        showLabel={false}
                        className="mb-4"
                      />
                    </div>
                  ))}
                </div>
              </HawklyCard>
            </div>

            {/* Timeline */}
            <HawklyCard variant="glass" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Audit Timeline</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#a879ef] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-medium text-[#f8f9fb]">Started</div>
                  <div className="text-[#b2bfd4]">{auditData.timeline.started}</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#32d9fa] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-medium text-[#f8f9fb]">Duration</div>
                  <div className="text-[#b2bfd4]">{auditData.timeline.duration}</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#2de08e] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-medium text-[#f8f9fb]">Completed</div>
                  <div className="text-[#b2bfd4]">{auditData.timeline.completed}</div>
                </div>
              </div>
            </HawklyCard>
          </div>
        )}

        {selectedTab === 'findings' && (
          <div className="space-y-6">
            {/* Filters */}
            <HawklyCard variant="glass" className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8391ad]" />
                    <Input
                      type="text"
                      placeholder="Search findings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#181e2c] border-[#23283e] text-[#f8f9fb] focus:border-[#a879ef]"
                    />
                  </div>
                </div>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-4 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#f8f9fb] focus:border-[#a879ef] focus:outline-none"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#f8f9fb] focus:border-[#a879ef] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="fixed">Fixed</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </HawklyCard>

            {/* Findings List */}
            <div className="space-y-4">
              {filteredVulnerabilities.map(vuln => {
                const severityStyle = severityColors[vuln.severity as keyof typeof severityColors];
                const statusStyle = statusColors[vuln.status as keyof typeof statusColors];
                const StatusIcon = statusStyle.icon;
                const isExpanded = expandedFindings.includes(vuln.id);

                return (
                  <HawklyCard key={vuln.id} variant="interactive" className="p-6">
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleFinding(vuln.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${severityStyle.bg} ${severityStyle.text} ${severityStyle.border} border`}>
                            {vuln.severity.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {vuln.status.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-xs bg-[#212842] text-[#32d9fa] rounded-full">
                            {vuln.category}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-[#f8f9fb] mb-2">{vuln.title}</h4>
                        <p className="text-[#b2bfd4] mb-3">{vuln.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-[#8391ad]">
                          <span>📍 {vuln.location}</span>
                          <span>⛽ Gas Impact: {vuln.gasImpact}</span>
                          {vuln.cwe !== 'N/A' && <span>🔢 {vuln.cwe}</span>}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-[#a879ef]" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-[#8391ad]" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-[#23283e] space-y-4">
                        <div>
                          <h5 className="font-medium text-[#f8f9fb] mb-2">Impact</h5>
                          <p className="text-[#b2bfd4] text-sm">{vuln.impact}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-[#f8f9fb] mb-2">Recommendation</h5>
                          <p className="text-[#b2bfd4] text-sm">{vuln.recommendation}</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="border-[#32d9fa] text-[#32d9fa]"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Code
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="border-[#a879ef] text-[#a879ef]"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </HawklyCard>
                );
              })}
            </div>

            {filteredVulnerabilities.length === 0 && (
              <HawklyCard variant="glass" className="p-12 text-center">
                <Bug className="w-16 h-16 text-[#8391ad] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#f8f9fb] mb-2">No findings match your filters</h3>
                <p className="text-[#b2bfd4]">Try adjusting your search criteria</p>
              </HawklyCard>
            )}
          </div>
        )}

        {selectedTab === 'categories' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {auditData.categories.map((category, index) => (
              <HawklyCard key={index} variant="interactive" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#f8f9fb]">{category.name}</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </div>
                </div>
                
                <ProgressIndicator
                  value={category.score}
                  max={100}
                  showLabel={false}
                  className="mb-4"
                />
                
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    category.status === 'excellent' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    category.status === 'excellent' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                  </span>
                </div>
              </HawklyCard>
            ))}
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="grid md:grid-cols-2 gap-8">
            <HawklyCard variant="glass" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Download Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#181e2c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#a879ef]" />
                    <div>
                      <div className="font-medium text-[#f8f9fb]">Full Audit Report</div>
                      <div className="text-sm text-[#8391ad]">Comprehensive analysis (PDF)</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#181e2c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#32d9fa]" />
                    <div>
                      <div className="font-medium text-[#f8f9fb]">Executive Summary</div>
                      <div className="text-sm text-[#8391ad]">High-level overview (PDF)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#32d9fa] text-[#32d9fa]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#181e2c] rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#2de08e]" />
                    <div>
                      <div className="font-medium text-[#f8f9fb]">Remediation Guide</div>
                      <div className="text-sm text-[#8391ad]">Step-by-step fixes (PDF)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#2de08e] text-[#2de08e]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </HawklyCard>

            <HawklyCard variant="glass" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Next Steps</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#a879ef]/10 rounded-lg border border-[#a879ef]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-[#a879ef]" />
                    <span className="font-medium text-[#f8f9fb]">Implement Fixes</span>
                  </div>
                  <p className="text-sm text-[#b2bfd4]">
                    Address the 1 high-severity and 3 medium-severity findings
                  </p>
                </div>
                
                <div className="p-4 bg-[#32d9fa]/10 rounded-lg border border-[#32d9fa]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-[#32d9fa]" />
                    <span className="font-medium text-[#f8f9fb]">Re-audit Request</span>
                  </div>
                  <p className="text-sm text-[#b2bfd4]">
                    Schedule a follow-up audit after implementing fixes
                  </p>
                </div>
                
                <div className="p-4 bg-[#2de08e]/10 rounded-lg border border-[#2de08e]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-[#2de08e]" />
                    <span className="font-medium text-[#f8f9fb]">Security Badge</span>
                  </div>
                  <p className="text-sm text-[#b2bfd4]">
                    Earn your security certification badge
                  </p>
                </div>
              </div>
            </HawklyCard>
          </div>
        )}
      </AppContainer>
    </div>
  );
}
