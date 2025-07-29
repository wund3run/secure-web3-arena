import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Eye,
  Clock,
  Globe,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Download,
  Filter,
  Search
} from 'lucide-react';

const SecurityInsightsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const securityMetrics = {
    totalThreats: 1247,
    activeIncidents: 23,
    resolvedToday: 156,
    securityScore: 94,
    trendsUp: 12,
    trendsDown: 3
  };

  const recentThreats = [
    {
      id: '1',
      title: 'Suspicious Transaction Pattern Detected',
      severity: 'High',
      protocol: 'Uniswap V3',
      timestamp: '2 minutes ago',
      status: 'Active',
      description: 'Unusual MEV activity detected in liquidity pools'
    },
    {
      id: '2',
      title: 'Flash Loan Attack Vector Identified',
      severity: 'Critical',
      protocol: 'Compound',
      timestamp: '15 minutes ago',
      status: 'Investigating',
      description: 'Potential flash loan vulnerability in lending protocol'
    },
    {
      id: '3',
      title: 'Smart Contract Upgrade Risk',
      severity: 'Medium',
      protocol: 'Aave',
      timestamp: '1 hour ago',
      status: 'Monitoring',
      description: 'Proxy contract upgrade detected, monitoring for issues'
    },
    {
      id: '4',
      title: 'Governance Attack Attempt',
      severity: 'High',
      protocol: 'MakerDAO',
      timestamp: '3 hours ago',
      status: 'Resolved',
      description: 'Malicious governance proposal blocked by community'
    }
  ];

  const vulnerabilityTrends = [
    { category: 'Reentrancy', count: 45, trend: 'up', change: '+12%' },
    { category: 'Flash Loans', count: 23, trend: 'up', change: '+8%' },
    { category: 'Oracle Manipulation', count: 18, trend: 'down', change: '-5%' },
    { category: 'Access Control', count: 34, trend: 'up', change: '+15%' },
    { category: 'Integer Overflow', count: 12, trend: 'down', change: '-20%' }
  ];

  const protocolRisks = [
    { name: 'Ethereum', risk: 'Low', score: 92, protocols: 1247 },
    { name: 'Polygon', risk: 'Medium', score: 78, protocols: 456 },
    { name: 'BSC', risk: 'Medium', score: 74, protocols: 234 },
    { name: 'Arbitrum', risk: 'Low', score: 88, protocols: 123 },
    { name: 'Optimism', risk: 'Low', score: 85, protocols: 89 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Investigating': return 'bg-orange-100 text-orange-800';
      case 'Monitoring': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Security Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time analysis and insights into Web3 security trends and threats.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Threats</p>
                  <p className="text-2xl font-bold">{securityMetrics.totalThreats.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-hawkly-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+{securityMetrics.trendsUp}% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                  <p className="text-2xl font-bold text-red-600">{securityMetrics.activeIncidents}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-600">-{securityMetrics.trendsDown}% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{securityMetrics.resolvedToday}</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+24% efficiency</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold">{securityMetrics.securityScore}/100</p>
                </div>
                <Activity className="h-8 w-8 text-hawkly-secondary" />
              </div>
              <div className="mt-2">
                <Progress value={securityMetrics.securityScore} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="threats" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="threats">Live Threats</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="protocols">Protocol Risks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-red-500" />
                      Real-time Threat Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentThreats.map((threat) => (
                        <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{threat.title}</h3>
                            <div className="flex gap-2">
                              <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                                {threat.severity}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(threat.status)}>
                                {threat.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {threat.description}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              {threat.protocol}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {threat.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Threat Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Critical</span>
                        <Badge className="bg-red-100 text-red-800">3</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High</span>
                        <Badge className="bg-orange-100 text-orange-800">12</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium</span>
                        <Badge className="bg-yellow-100 text-yellow-800">8</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low</span>
                        <Badge className="bg-green-100 text-green-800">0</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter Threats
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Search History
                    </Button>
                    <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report Threat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vulnerabilityTrends.map((vuln, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h3 className="font-medium">{vuln.category}</h3>
                          <p className="text-sm text-gray-600">{vuln.count} incidents</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${vuln.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                            {vuln.change}
                          </span>
                          {vuln.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vulnerabilityTrends.map((vuln, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{vuln.category}</span>
                          <span>{vuln.count}</span>
                        </div>
                        <Progress value={(vuln.count / 45) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="protocols" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Protocol Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Network</th>
                        <th className="text-left py-2">Risk Level</th>
                        <th className="text-left py-2">Security Score</th>
                        <th className="text-left py-2">Protocols</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocolRisks.map((protocol, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 font-medium">{protocol.name}</td>
                          <td className="py-3">
                            <Badge variant="outline" className={`${getRiskColor(protocol.risk)} border-current`}>
                              {protocol.risk}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{protocol.score}</span>
                              <Progress value={protocol.score} className="h-2 w-20" />
                            </div>
                          </td>
                          <td className="py-3">{protocol.protocols.toLocaleString()}</td>
                          <td className="py-3">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Threat Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500">Chart visualization would be rendered here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Attack Vectors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500">Pie chart visualization would be rendered here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Weekly Security Summary', date: '2024-01-15', type: 'Weekly' },
                    { title: 'DeFi Threat Analysis', date: '2024-01-12', type: 'Special' },
                    { title: 'Cross-Chain Security Report', date: '2024-01-10', type: 'Monthly' }
                  ].map((report, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.date} • {report.type} Report</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProductionLayout>
  );
};

export default SecurityInsightsPage;
