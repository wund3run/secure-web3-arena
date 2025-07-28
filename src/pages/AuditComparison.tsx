import React, { useState, useEffect } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { HawklyTabs } from '@/components/ui/hawkly-tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Search,
  Plus,
  X,
  Check,
  Clock,
  Shield,
  FileCheck,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowRight,
  DollarSign,
  GitCompare,
  FileText,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditType {
  id: string;
  name: string;
  description: string;
  provider: string;
  providerVerified: boolean;
  rating: number;
  reviewCount: number;
  price: number;
  estimatedDuration: string;
  securityLevel: 'basic' | 'standard' | 'comprehensive' | 'enterprise';
  features: string[];
  benefits: string[];
  specializations: string[];
  deliverables: string[];
  image: string;
  popularChoice?: boolean;
  bestValue?: boolean;
  mostThorough?: boolean;
}

const auditTypes: AuditType[] = [
  {
    id: 'smart-contract-audit',
    name: 'Smart Contract Audit',
    description: 'Comprehensive review of your smart contracts for vulnerabilities and optimizations',
    provider: 'Hawkly Security Team',
    providerVerified: true,
    rating: 4.9,
    reviewCount: 328,
    price: 12000,
    estimatedDuration: '1-2 weeks',
    securityLevel: 'comprehensive',
    features: [
      'Manual code review',
      'Automated vulnerability scanning',
      'Gas optimization analysis',
      'Business logic assessment',
      'Remediation guidance',
      'Follow-up review'
    ],
    benefits: [
      'Identify critical security vulnerabilities',
      'Prevent potential exploits',
      'Optimize gas usage',
      'Ensure compliance with best practices'
    ],
    specializations: ['DeFi', 'NFT', 'Gaming', 'DAO', 'Cross-chain'],
    deliverables: [
      'Detailed security report',
      'Executive summary',
      'Remediation plan',
      'Security certificate'
    ],
    image: '/assets/audit-types/smart-contract.png',
    bestValue: true
  },
  {
    id: 'protocol-security-audit',
    name: 'Protocol Security Audit',
    description: 'End-to-end security assessment for complex DeFi protocols and ecosystems',
    provider: 'Hawkly Enterprise Division',
    providerVerified: true,
    rating: 4.8,
    reviewCount: 156,
    price: 35000,
    estimatedDuration: '3-4 weeks',
    securityLevel: 'enterprise',
    features: [
      'Architecture review',
      'Smart contract auditing',
      'Economic model analysis',
      'Attack vector simulation',
      'Integration security assessment',
      'Formal verification',
      'On-chain monitoring setup'
    ],
    benefits: [
      'Comprehensive security assessment',
      'Protection for complex token economics',
      'Cross-contract vulnerability detection',
      'Post-deployment security',
      'Enterprise-grade security assurance'
    ],
    specializations: ['DeFi', 'Lending', 'DEX', 'Yield', 'Bridges', 'Derivatives'],
    deliverables: [
      'Detailed protocol security assessment',
      'Formal verification report',
      'Economic security analysis',
      'Integration risk assessment',
      'Long-term security recommendations'
    ],
    image: '/assets/audit-types/protocol.png',
    mostThorough: true
  },
  {
    id: 'rapid-security-assessment',
    name: 'Rapid Security Assessment',
    description: 'Quick security review focusing on high-risk vulnerabilities and common attack vectors',
    provider: 'Hawkly Fast Track',
    providerVerified: true,
    rating: 4.7,
    reviewCount: 219,
    price: 5000,
    estimatedDuration: '2-4 days',
    securityLevel: 'standard',
    features: [
      'Focused vulnerability assessment',
      'Common attack vector analysis',
      'Quick turnaround time',
      'High-risk issue prioritization',
      'Basic remediation guidance'
    ],
    benefits: [
      'Fast security feedback',
      'Critical vulnerability identification',
      'Quick pre-deployment check',
      'Budget-friendly option',
      'Expert guidance for critical issues'
    ],
    specializations: ['NFT', 'Simple contracts', 'MVPs', 'Pre-deployment'],
    deliverables: [
      'Focused security report',
      'Critical issues summary',
      'Basic remediation guidance'
    ],
    image: '/assets/audit-types/rapid.png',
    popularChoice: true
  },
  {
    id: 'continuous-security',
    name: 'Continuous Security Monitoring',
    description: 'Ongoing security monitoring and assessment for projects in active development',
    provider: 'Hawkly Security Operations',
    providerVerified: true,
    rating: 4.9,
    reviewCount: 92,
    price: 8000,
    estimatedDuration: 'Monthly subscription',
    securityLevel: 'comprehensive',
    features: [
      'Continuous code review',
      'Real-time vulnerability scanning',
      'Regular security reports',
      'Development team collaboration',
      'Integration with CI/CD pipeline',
      'Security alerts and notifications'
    ],
    benefits: [
      'Early vulnerability detection',
      'Security integrated into development',
      'Continuous improvement of security posture',
      'Rapid response to emerging threats',
      'Security expertise on demand'
    ],
    specializations: ['Active Development', 'Agile Projects', 'Evolving Protocols', 'Regular Deployments'],
    deliverables: [
      'Monthly security reports',
      'Security metrics dashboard',
      'Alert notifications',
      'Development team security guidance',
      'Quarterly security review'
    ],
    image: '/assets/audit-types/continuous.png'
  }
];

const AuditComparison: React.FC = () => {
  const [selectedAudits, setSelectedAudits] = useState<AuditType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFeatures, setExpandedFeatures] = useState<{[key: string]: boolean}>({});
  const [activeView, setActiveView] = useState<'types' | 'comparison'>('types');
  const { toast } = useToast();
  
  const toggleAuditSelection = (audit: AuditType) => {
    if (selectedAudits.some(a => a.id === audit.id)) {
      setSelectedAudits(selectedAudits.filter(a => a.id !== audit.id));
    } else {
      if (selectedAudits.length < 3) {
        setSelectedAudits([...selectedAudits, audit]);
      } else {
        toast({
          title: "Maximum selections reached",
          description: "You can compare up to 3 audit types at once",
          variant: "warning",
        });
      }
    }
  };

  const clearComparison = () => {
    setSelectedAudits([]);
  };

  const toggleFeatures = (auditId: string) => {
    setExpandedFeatures({
      ...expandedFeatures,
      [auditId]: !expandedFeatures[auditId]
    });
  };

  const filteredAudits = searchTerm
    ? auditTypes.filter(audit => 
        audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : auditTypes;

  const getSecurityLevelText = (level: string) => {
    switch(level) {
      case 'basic': return 'Basic Protection';
      case 'standard': return 'Standard Protection';
      case 'comprehensive': return 'Comprehensive Security';
      case 'enterprise': return 'Enterprise Grade';
      default: return 'Standard Protection';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch(level) {
      case 'basic': return 'bg-blue-900/20 text-blue-500';
      case 'standard': return 'bg-green-900/20 text-green-500';
      case 'comprehensive': return 'bg-purple-900/20 text-purple-500';
      case 'enterprise': return 'bg-amber-900/20 text-amber-500';
      default: return 'bg-blue-900/20 text-blue-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Compare audit types in a table format
  const renderComparisonView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Audit Comparison</h2>
        <Button variant="outline" onClick={clearComparison}>Clear All</Button>
      </div>

      {selectedAudits.length === 0 ? (
        <HawklyCard variant="glass" className="p-8 text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium mb-2">No audit types selected for comparison</p>
            <p>Select up to 3 audit types to compare their features, pricing, and benefits</p>
            <Button 
              variant="default" 
              className="mt-6"
              onClick={() => setActiveView('types')}
            >
              Browse Audit Types
            </Button>
          </div>
        </HawklyCard>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 bg-gray-900/50"></th>
                {selectedAudits.map((audit) => (
                  <th key={audit.id} className="text-center p-4 min-w-60 bg-gray-900/50">
                    <div className="space-y-2">
                      <div className="relative">
                        <h3 className="font-medium text-lg">{audit.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAuditSelection(audit)}
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{audit.provider}</p>
                      {audit.bestValue && (
                        <Badge className="bg-green-500">Best Value</Badge>
                      )}
                      {audit.popularChoice && (
                        <Badge className="bg-blue-500">Popular Choice</Badge>
                      )}
                      {audit.mostThorough && (
                        <Badge className="bg-purple-500">Most Thorough</Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Price</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <div className="font-bold text-lg">{formatCurrency(audit.price)}</div>
                    <div className="text-sm text-muted-foreground">USD</div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Security Level</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <Badge variant="outline" className={getSecurityLevelColor(audit.securityLevel)}>
                      {getSecurityLevelText(audit.securityLevel)}
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Duration</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{audit.estimatedDuration}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Rating</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{audit.rating}</span>
                      <span className="text-muted-foreground">({audit.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Specializations</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {audit.specializations.map((spec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Features</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {audit.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 min-w-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 font-medium text-muted-foreground">Deliverables</td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {audit.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FileCheck className="h-4 w-4 text-blue-500 mt-0.5 min-w-4" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4"></td>
                {selectedAudits.map((audit) => (
                  <td key={audit.id} className="p-4 text-center">
                    <Button className="w-full">Request This Audit</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <ProductionLayout
      title="Audit Comparison Tool"
      description="Compare different audit options to find the best fit for your project"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Audit Comparison Tool
            </h1>
            <p className="text-lg text-gray-300">
              Compare different audit options to find the best fit for your project
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button 
              variant={activeView === 'types' ? 'default' : 'outline'} 
              onClick={() => setActiveView('types')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Browse Audit Types
            </Button>
            <Button 
              variant={activeView === 'comparison' ? 'default' : 'outline'} 
              onClick={() => setActiveView('comparison')}
              className="flex items-center gap-2"
              disabled={selectedAudits.length === 0}
            >
              <GitCompare className="h-4 w-4" />
              Compare ({selectedAudits.length})
            </Button>
          </div>
        </div>

        <HawklyTabs defaultValue={activeView} value={activeView} onValueChange={(value) => setActiveView(value as 'types' | 'comparison')}>
          <div className="mb-6">
            <TabsList className="h-12 bg-transparent border-b border-gray-800">
              <TabsTrigger 
                value="types" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
              >
                Audit Types
              </TabsTrigger>
              <TabsTrigger 
                value="comparison" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
                disabled={selectedAudits.length === 0}
              >
                Comparison View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="types" className="mt-0">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search audit types, features, or specializations..."
                  className="pl-10 bg-gray-900/50 border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAudits.map(audit => (
                <HawklyCard 
                  key={audit.id} 
                  variant="glass" 
                  className={`p-6 relative overflow-hidden transition-all duration-300 ${
                    selectedAudits.some(a => a.id === audit.id) 
                      ? 'border-2 border-blue-500' 
                      : ''
                  }`}
                >
                  {audit.bestValue && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-green-500 text-white px-3 py-1 text-xs font-bold transform rotate-45 translate-x-6 translate-y-3">
                        BEST VALUE
                      </div>
                    </div>
                  )}
                  {audit.popularChoice && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white px-3 py-1 text-xs font-bold transform rotate-45 translate-x-6 translate-y-3">
                        POPULAR
                      </div>
                    </div>
                  )}
                  {audit.mostThorough && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-purple-500 text-white px-3 py-1 text-xs font-bold transform rotate-45 translate-x-8 translate-y-3">
                        MOST THOROUGH
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{audit.name}</h2>
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-gray-300 flex items-center">
                          {audit.provider}
                          {audit.providerVerified && (
                            <Badge variant="default" className="ml-2 text-[10px] h-5 bg-blue-500">Verified</Badge>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatCurrency(audit.price)}</div>
                      <div className="text-sm text-gray-400">{audit.estimatedDuration}</div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{audit.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={getSecurityLevelColor(audit.securityLevel)}>
                      {getSecurityLevelText(audit.securityLevel)}
                    </Badge>
                    {audit.specializations.slice(0, 3).map((spec, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-800/50">
                        {spec}
                      </Badge>
                    ))}
                    {audit.specializations.length > 3 && (
                      <Badge variant="outline" className="bg-gray-800/50">
                        +{audit.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFeatures(audit.id)}>
                      <h3 className="font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        Key Features
                      </h3>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        {expandedFeatures[audit.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFeatures[audit.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-2 space-y-1">
                            {audit.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{audit.rating}</span>
                      <span className="text-sm text-muted-foreground">({audit.reviewCount} reviews)</span>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleAuditSelection(audit)}
                      >
                        {selectedAudits.some(a => a.id === audit.id) ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Compare
                          </>
                        )}
                      </Button>
                      <Button size="sm">
                        <span>Details</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </HawklyCard>
              ))}

              {filteredAudits.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-400">No audit types found matching "{searchTerm}"</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
            
            {selectedAudits.length > 0 && (
              <div className="fixed bottom-8 right-8 z-50">
                <HawklyCard variant="glass" className="p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <GitCompare className="h-4 w-4 mr-2" />
                      Selected for comparison
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={clearComparison}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-[150px] overflow-y-auto mb-3">
                    {selectedAudits.map(audit => (
                      <div 
                        key={audit.id} 
                        className="flex justify-between items-center bg-gray-800/50 p-2 rounded text-sm"
                      >
                        <div className="truncate max-w-[180px]">{audit.name}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleAuditSelection(audit)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {selectedAudits.length} of 3 selected
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => setActiveView('comparison')}
                    >
                      Compare Now
                    </Button>
                  </div>
                </HawklyCard>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="mt-0">
            {renderComparisonView()}
          </TabsContent>
        </HawklyTabs>

        <div className="mt-12 lg:mt-16">
          <h2 className="text-2xl font-bold mb-6">Audit Options Guide</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HawklyCard variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-3 bg-blue-900/30 mr-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold">When To Choose Each Audit</h3>
              </div>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Smart Contract Audit:</strong> For most projects that need comprehensive security assessment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Protocol Audit:</strong> For complex DeFi protocols, DEXes, lending platforms, or multi-contract systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Rapid Assessment:</strong> For quick feedback before major security investment or for simpler contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Continuous Security:</strong> For projects in active development with frequent updates.</span>
                </li>
              </ul>
            </HawklyCard>

            <HawklyCard variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-3 bg-purple-900/30 mr-4">
                  <BarChart3 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold">Audit Process Overview</h3>
              </div>
              
              <ol className="space-y-3 text-sm list-decimal list-inside">
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-purple-900/40 text-center text-xs flex items-center justify-center mt-0.5">
                    1
                  </div>
                  <span>Scope definition and project assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-purple-900/40 text-center text-xs flex items-center justify-center mt-0.5">
                    2
                  </div>
                  <span>Manual and automated code analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-purple-900/40 text-center text-xs flex items-center justify-center mt-0.5">
                    3
                  </div>
                  <span>Vulnerability identification and classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-purple-900/40 text-center text-xs flex items-center justify-center mt-0.5">
                    4
                  </div>
                  <span>Report generation with remediation steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-purple-900/40 text-center text-xs flex items-center justify-center mt-0.5">
                    5
                  </div>
                  <span>Fixes review and final security certification</span>
                </li>
              </ol>
            </HawklyCard>

            <HawklyCard variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-3 bg-green-900/30 mr-4">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold">Need More Information?</h3>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">
                Our team can help you determine the best audit solution for your specific project needs. Schedule a consultation to discuss your requirements.
              </p>
              
              <Button variant="default" className="w-full mb-3">Schedule Consultation</Button>
              <Button variant="outline" className="w-full">Download Audit Guide</Button>
            </HawklyCard>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
};

export default AuditComparison;
