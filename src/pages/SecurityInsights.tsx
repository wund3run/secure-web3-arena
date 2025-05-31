
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  BarChart,
  AlertTriangle,
  Shield,
  Activity,
  Globe,
  Brain,
  Target,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Eye,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityInsights = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const insights = [
    {
      title: "Vulnerability Trends",
      description: "Critical vulnerabilities discovered across Web3 protocols",
      value: "127",
      change: "+23%",
      trend: "up",
      color: "text-red-600",
      icon: AlertTriangle
    },
    {
      title: "Security Score",
      description: "Average security score across audited projects",
      value: "8.2/10",
      change: "+0.3",
      trend: "up",
      color: "text-green-600",
      icon: Shield
    },
    {
      title: "Threat Level",
      description: "Current ecosystem threat assessment",
      value: "Medium",
      change: "Stable",
      trend: "stable",
      color: "text-yellow-600",
      icon: Target
    },
    {
      title: "Active Audits",
      description: "Ongoing security assessments this month",
      value: "89",
      change: "+12%",
      trend: "up",
      color: "text-blue-600",
      icon: Activity
    }
  ];

  const threatIntelligence = [
    {
      type: "Flash Loan Attacks",
      severity: "High",
      instances: 23,
      trend: "+15%",
      description: "Sophisticated flash loan exploits targeting cross-protocol integrations"
    },
    {
      type: "Reentrancy Variants",
      severity: "Critical",
      instances: 12,
      trend: "+8%",
      description: "New reentrancy patterns affecting bridge contracts"
    },
    {
      type: "Oracle Manipulation",
      severity: "High",
      instances: 18,
      trend: "-5%",
      description: "Price oracle attacks on DeFi lending protocols"
    },
    {
      type: "Governance Exploits",
      severity: "Medium",
      instances: 7,
      trend: "+25%",
      description: "DAO governance token manipulation attacks"
    }
  ];

  const topVulnerabilities = [
    {
      name: "Cross-Chain Bridge Reentrancy",
      category: "Critical",
      protocols: 15,
      bounty: "$2.5M",
      discovered: "March 2025"
    },
    {
      name: "MEV-Enhanced Flash Loans",
      category: "High",
      protocols: 23,
      bounty: "$1.8M",
      discovered: "March 2025"
    },
    {
      name: "AI-Assisted Social Engineering",
      category: "High",
      protocols: 8,
      bounty: "$950k",
      discovered: "February 2025"
    },
    {
      name: "ZK-SNARK Circuit Bugs",
      category: "Critical",
      protocols: 6,
      bounty: "$3.2M",
      discovered: "February 2025"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  return (
    <StandardLayout
      title="Security Insights"
      description="AI-powered security analytics and threat intelligence for Web3"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Real-time Intelligence</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Insights</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered security analytics providing real-time threat intelligence, 
            vulnerability trends, and predictive insights for the Web3 ecosystem.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {getTrendIcon(insight.trend)}
                    <span className="ml-1">{insight.change} from last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Threat Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Active Threats
              </CardTitle>
              <CardDescription>
                Current threat landscape and emerging attack vectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntelligence.map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{threat.type}</span>
                        <Badge className={getSeverityColor(threat.severity)} variant="secondary">
                          {threat.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-semibold">{threat.instances}</div>
                      <div className="text-sm text-muted-foreground">{threat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Predictions
              </CardTitle>
              <CardDescription>
                Machine learning insights and risk forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cross-Chain Attack Risk</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    High probability of bridge exploits in next 30 days
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>DeFi Protocol Vulnerability</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Elevated risk in lending and AMM protocols
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Social Engineering Threats</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    AI-enhanced phishing campaigns targeting developers
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Zero-Day Discovery Rate</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected increase in novel vulnerability patterns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Vulnerabilities */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Critical Vulnerabilities - March 2025
            </CardTitle>
            <CardDescription>
              Most significant security discoveries and their impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVulnerabilities.map((vuln, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{vuln.name}</span>
                      <Badge className={getSeverityColor(vuln.category)} variant="secondary">
                        {vuln.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {vuln.protocols} protocols affected
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Max Bounty: {vuln.bounty}</span>
                      <span>Discovered: {vuln.discovered}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-600" />
                Security Trend Analysis
              </CardTitle>
              <CardDescription>
                Monthly vulnerability discovery and resolution patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold">Interactive Chart</p>
                  <p className="text-sm text-muted-foreground">
                    Vulnerability trends over time with AI-powered predictions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Global Impact
              </CardTitle>
              <CardDescription>
                Ecosystem-wide security metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Value Secured</span>
                  <span className="font-semibold">$847B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Protocols Monitored</span>
                  <span className="font-semibold">2,340</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Researchers</span>
                  <span className="font-semibold">8,920</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vulnerabilities Prevented</span>
                  <span className="font-semibold">1,247</span>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Top Ecosystems</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Ethereum", percentage: 45 },
                      { name: "Solana", percentage: 23 },
                      { name: "Polygon", percentage: 18 },
                      { name: "Avalanche", percentage: 14 }
                    ].map((ecosystem, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{ecosystem.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={ecosystem.percentage} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground w-8">
                            {ecosystem.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Stay Ahead of Security Threats</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get personalized security insights and threat intelligence for your Web3 projects with our AI-powered analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Brain className="mr-2 h-4 w-4" />
              Get AI Security Report
            </Button>
            <Link to="/request-audit">
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Request Full Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default SecurityInsights;
