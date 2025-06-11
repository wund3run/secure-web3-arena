
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Target,
  BarChart3,
  Activity,
  Globe,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Download
} from 'lucide-react';

const SecurityInsights = () => {
  const threatData = [
    {
      name: 'Flash Loan Attacks',
      severity: 'High',
      trend: 'up',
      change: '+15%',
      incidents: 23,
      description: 'Increased activity in flash loan exploits targeting DeFi protocols'
    },
    {
      name: 'Smart Contract Reentrancy',
      severity: 'Critical',
      trend: 'down',
      change: '-8%',
      incidents: 12,
      description: 'Decrease in reentrancy attacks due to better prevention measures'
    },
    {
      name: 'Private Key Compromise',
      severity: 'Critical',
      trend: 'up',
      change: '+22%',
      incidents: 31,
      description: 'Rising incidents of compromised private keys and seed phrases'
    },
    {
      name: 'Oracle Manipulation',
      severity: 'High',
      trend: 'stable',
      change: '0%',
      incidents: 8,
      description: 'Stable but concerning levels of oracle price manipulation'
    }
  ];

  const vulnerabilityStats = [
    { category: 'Smart Contracts', critical: 45, high: 128, medium: 234, low: 156 },
    { category: 'DeFi Protocols', critical: 23, high: 89, medium: 167, low: 98 },
    { category: 'NFT Projects', critical: 12, high: 67, medium: 145, low: 203 },
    { category: 'Web3 Apps', critical: 34, high: 156, medium: 289, low: 167 }
  ];

  const riskMetrics = [
    {
      title: 'Total Value at Risk',
      value: '$2.4B',
      change: '+12%',
      trend: 'up',
      description: 'Across monitored protocols'
    },
    {
      title: 'Average Response Time',
      value: '4.2h',
      change: '-15%',
      trend: 'down',
      description: 'For critical vulnerabilities'
    },
    {
      title: 'Prevention Rate',
      value: '94.7%',
      change: '+3%',
      trend: 'up',
      description: 'Of attacks successfully prevented'
    },
    {
      title: 'Recovery Time',
      value: '12.8h',
      change: '-8%',
      trend: 'down',
      description: 'Average incident recovery time'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-3 w-3 text-red-500" />;
      case 'down': return <ArrowDown className="h-3 w-3 text-green-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <StandardLayout
      title="Security Insights | Hawkly"
      description="Real-time security intelligence and threat analysis"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Activity className="h-4 w-4 mr-2" />
            Real-Time Intelligence
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security intelligence dashboard providing real-time threat analysis, 
            vulnerability trends, and risk assessments across the Web3 ecosystem.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {riskMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className={metric.trend === 'up' ? 'text-red-600' : 'text-green-600'}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="threats" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Active Threat Landscape
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {threatData.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{threat.name}</h4>
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{threat.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {threat.incidents} incidents this month
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        {getTrendIcon(threat.trend)}
                        <span className={threat.trend === 'up' ? 'text-red-600' : 'text-green-600'}>
                          {threat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Global Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Network Security Level</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Stable
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">DeFi Protocol Safety</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Elevated Risk
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Smart Contract Security</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Good
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-500" />
                  Vulnerability Distribution by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {vulnerabilityStats.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{category.category}</h4>
                        <span className="text-sm text-muted-foreground">
                          Total: {category.critical + category.high + category.medium + category.low}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex rounded-full overflow-hidden h-3">
                          <div 
                            className="bg-red-500" 
                            style={{ width: `${(category.critical / (category.critical + category.high + category.medium + category.low)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-orange-500" 
                            style={{ width: `${(category.high / (category.critical + category.high + category.medium + category.low)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-yellow-500" 
                            style={{ width: `${(category.medium / (category.critical + category.high + category.medium + category.low)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-green-500" 
                            style={{ width: `${(category.low / (category.critical + category.high + category.medium + category.low)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Critical: {category.critical}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          High: {category.high}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Medium: {category.medium}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Low: {category.low}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Risk Assessment Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-center">
                      <div></div>
                      <div>Low Impact</div>
                      <div>Medium Impact</div>
                      <div>High Impact</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-xs font-semibold">High Probability</div>
                      <div className="h-12 bg-yellow-200 rounded flex items-center justify-center text-xs">12</div>
                      <div className="h-12 bg-orange-200 rounded flex items-center justify-center text-xs">8</div>
                      <div className="h-12 bg-red-200 rounded flex items-center justify-center text-xs">3</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-xs font-semibold">Medium Probability</div>
                      <div className="h-12 bg-green-200 rounded flex items-center justify-center text-xs">23</div>
                      <div className="h-12 bg-yellow-200 rounded flex items-center justify-center text-xs">15</div>
                      <div className="h-12 bg-orange-200 rounded flex items-center justify-center text-xs">7</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-xs font-semibold">Low Probability</div>
                      <div className="h-12 bg-green-100 rounded flex items-center justify-center text-xs">45</div>
                      <div className="h-12 bg-green-200 rounded flex items-center justify-center text-xs">18</div>
                      <div className="h-12 bg-yellow-200 rounded flex items-center justify-center text-xs">9</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Incident Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '2h ago', event: 'Flash loan attack detected on Protocol X', severity: 'critical' },
                      { time: '6h ago', event: 'Suspicious oracle price movement', severity: 'high' },
                      { time: '12h ago', event: 'Smart contract upgrade completed', severity: 'medium' },
                      { time: '1d ago', event: 'Routine security scan completed', severity: 'low' },
                      { time: '2d ago', event: 'New vulnerability disclosed', severity: 'high' }
                    ].map((incident, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          incident.severity === 'critical' ? 'bg-red-500' :
                          incident.severity === 'high' ? 'bg-orange-500' :
                          incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm">{incident.event}</p>
                          <p className="text-xs text-muted-foreground">{incident.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Weekly Security Summary',
                  description: 'Comprehensive weekly analysis of security trends and incidents',
                  date: 'January 15, 2024',
                  type: 'Weekly Report'
                },
                {
                  title: 'DeFi Threat Landscape Q1 2024',
                  description: 'Quarterly analysis of DeFi security threats and mitigation strategies',
                  date: 'January 10, 2024',
                  type: 'Quarterly Report'
                },
                {
                  title: 'Flash Loan Attack Analysis',
                  description: 'Deep dive into recent flash loan attacks and prevention methods',
                  date: 'January 8, 2024',
                  type: 'Special Report'
                },
                {
                  title: 'Smart Contract Vulnerability Trends',
                  description: 'Monthly analysis of smart contract vulnerabilities and patterns',
                  date: 'January 5, 2024',
                  type: 'Monthly Report'
                },
                {
                  title: 'Incident Response Best Practices',
                  description: 'Guidelines for effective incident response in Web3 environments',
                  date: 'January 3, 2024',
                  type: 'Best Practices'
                },
                {
                  title: 'Security Metrics Dashboard',
                  description: 'Real-time metrics and KPIs for security performance tracking',
                  date: 'January 1, 2024',
                  type: 'Dashboard'
                }
              ].map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{report.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {report.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Published: {report.date}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default SecurityInsights;
