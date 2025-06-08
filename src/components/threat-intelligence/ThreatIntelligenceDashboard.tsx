
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Eye, 
  Clock, 
  MapPin,
  Globe,
  Zap,
  Target,
  Activity
} from 'lucide-react';

interface ThreatIntelligence {
  id: string;
  type: 'malware' | 'phishing' | 'vulnerability' | 'botnet' | 'ddos';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  geography: string[];
  indicators: string[];
  status: 'active' | 'monitoring' | 'mitigated';
}

interface ThreatMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export function ThreatIntelligenceDashboard() {
  const [threats, setThreats] = useState<ThreatIntelligence[]>([
    {
      id: '1',
      type: 'vulnerability',
      severity: 'critical',
      title: 'Zero-day in Web3 Authentication Libraries',
      description: 'Critical vulnerability affecting multiple Web3 authentication libraries allows for wallet takeover',
      source: 'Hawkly Security Research',
      confidence: 95,
      firstSeen: '2024-01-15T10:00:00Z',
      lastSeen: '2024-01-15T14:30:00Z',
      geography: ['Global'],
      indicators: ['CVE-2024-0001', 'wallet-auth-lib@1.2.3'],
      status: 'active'
    },
    {
      id: '2',
      type: 'phishing',
      severity: 'high',
      title: 'Sophisticated Smart Contract Audit Phishing Campaign',
      description: 'Attackers impersonating legitimate audit firms to steal credentials and private keys',
      source: 'Community Reports',
      confidence: 87,
      firstSeen: '2024-01-14T08:00:00Z',
      lastSeen: '2024-01-15T12:00:00Z',
      geography: ['North America', 'Europe'],
      indicators: ['fake-audit-firm.com', 'audit-verification@scam.com'],
      status: 'monitoring'
    },
    {
      id: '3',
      type: 'malware',
      severity: 'medium',
      title: 'Crypto Miner Targeting Development Environments',
      description: 'Malware targeting developer machines to mine cryptocurrency using development resources',
      source: 'Threat Intelligence Feed',
      confidence: 78,
      firstSeen: '2024-01-13T15:00:00Z',
      lastSeen: '2024-01-15T09:00:00Z',
      geography: ['Asia-Pacific'],
      indicators: ['dev-miner.exe', 'crypto-dev-tool.js'],
      status: 'mitigated'
    }
  ]);

  const [threatMetrics, setThreatMetrics] = useState<ThreatMetric[]>([
    { name: 'Active Threats', value: 23, change: +5, trend: 'up' },
    { name: 'Critical Alerts', value: 3, change: -1, trend: 'down' },
    { name: 'IoCs Detected', value: 156, change: +12, trend: 'up' },
    { name: 'Confidence Score', value: 87, change: +2, trend: 'up' }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'malware': return <Target className="h-4 w-4" />;
      case 'phishing': return <Globe className="h-4 w-4" />;
      case 'vulnerability': return <AlertTriangle className="h-4 w-4" />;
      case 'botnet': return <Activity className="h-4 w-4" />;
      case 'ddos': return <Zap className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Threat Intelligence Dashboard
          </CardTitle>
          <CardDescription>
            Real-time threat intelligence and security indicators for the Web3 ecosystem
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Threat Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {threatMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.name}</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${
                    metric.trend === 'up' ? 'text-red-500' : 
                    metric.trend === 'down' ? 'text-green-500 rotate-180' : 
                    'text-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    metric.change > 0 ? 'text-red-600' : 
                    metric.change < 0 ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="threats">Active Threats</TabsTrigger>
          <TabsTrigger value="indicators">IoCs</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          {threats.map((threat) => (
            <Card key={threat.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getThreatTypeIcon(threat.type)}
                      <Badge className={getSeverityColor(threat.severity)} variant="outline">
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)} variant="secondary">
                        {threat.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground capitalize">{threat.type}</span>
                    </div>
                    
                    <h4 className="font-semibold mb-1">{threat.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{threat.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <span className="text-xs font-medium">Source:</span>
                        <div className="text-sm">{threat.source}</div>
                      </div>
                      <div>
                        <span className="text-xs font-medium">Confidence:</span>
                        <div className="text-sm font-bold">{threat.confidence}%</div>
                      </div>
                      <div>
                        <span className="text-xs font-medium">First Seen:</span>
                        <div className="text-sm">{formatDate(threat.firstSeen)}</div>
                      </div>
                      <div>
                        <span className="text-xs font-medium">Geography:</span>
                        <div className="text-sm">{threat.geography.join(', ')}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium">Indicators:</span>
                      <div className="flex gap-1 mt-1">
                        {threat.indicators.map((indicator, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Button size="sm">
                      <Shield className="h-3 w-3 mr-1" />
                      Mitigate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="indicators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Indicators of Compromise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">fake-audit-firm.com</span>
                  <Badge className="bg-red-100 text-red-800">Domain</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">192.168.1.100</span>
                  <Badge className="bg-orange-100 text-orange-800">IP Address</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">dev-miner.exe</span>
                  <Badge className="bg-yellow-100 text-yellow-800">File Hash</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-mono text-sm">CVE-2024-0001</span>
                  <Badge className="bg-purple-100 text-purple-800">CVE</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Actor Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded">
                  <div className="font-medium">APT-Web3-001</div>
                  <div className="text-sm text-muted-foreground">Advanced persistent threat targeting DeFi protocols</div>
                  <Badge className="mt-1 bg-red-100 text-red-800">High Risk</Badge>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Crypto-Phishers-Group</div>
                  <div className="text-sm text-muted-foreground">Organized phishing campaigns against crypto users</div>
                  <Badge className="mt-1 bg-orange-100 text-orange-800">Medium Risk</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Threat Distribution by Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>North America</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Europe</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Asia-Pacific</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Other Regions</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Phishing Attacks</span>
                    <span className="text-red-600 font-medium">↑ 23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Contract Vulnerabilities</span>
                    <span className="text-orange-600 font-medium">↑ 15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Malware Campaigns</span>
                    <span className="text-green-600 font-medium">↓ 8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DDoS Attempts</span>
                    <span className="text-gray-600 font-medium">→ 0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Overall Risk Level</span>
                      <span className="text-sm font-medium">Medium-High</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current threat landscape shows increased targeting of Web3 infrastructure with 
                    sophisticated phishing campaigns and zero-day vulnerabilities.
                  </div>
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
