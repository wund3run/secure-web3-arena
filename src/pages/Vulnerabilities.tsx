
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, Shield, Search, Filter, TrendingUp, 
  Calendar, DollarSign, Code, ExternalLink, ArrowRight,
  Target, Zap, Lock, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Vulnerabilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const vulnerabilityStats = [
    { label: "Total Vulnerabilities", value: "1,247", icon: <Database className="h-5 w-5" />, color: "text-blue-600" },
    { label: "Critical Severity", value: "89", icon: <AlertTriangle className="h-5 w-5" />, color: "text-red-600" },
    { label: "Active Exploits", value: "23", icon: <Target className="h-5 w-5" />, color: "text-orange-600" },
    { label: "Total Value Lost", value: "$2.1B", icon: <DollarSign className="h-5 w-5" />, color: "text-purple-600" }
  ];

  const recentVulnerabilities = [
    {
      id: "CVE-2024-001",
      title: "Reentrancy in ERC-4626 Vault Implementation",
      severity: "Critical",
      category: "Smart Contract",
      dateDiscovered: "2024-01-15",
      affectedProjects: 15,
      valueLost: "$12.5M",
      description: "Reentrancy vulnerability in vault deposit function allows attackers to drain funds",
      tags: ["Reentrancy", "ERC-4626", "DeFi"],
      patchAvailable: true,
      exploitInWild: true
    },
    {
      id: "CVE-2024-002", 
      title: "Oracle Price Manipulation in AMM",
      severity: "High",
      category: "DeFi Protocol",
      dateDiscovered: "2024-01-12",
      affectedProjects: 8,
      valueLost: "$3.2M",
      description: "Flash loan attack enabling price oracle manipulation in automated market makers",
      tags: ["Oracle", "Flash Loan", "AMM"],
      patchAvailable: false,
      exploitInWild: true
    },
    {
      id: "CVE-2024-003",
      title: "Access Control Bypass in Governance",
      severity: "High", 
      category: "Governance",
      dateDiscovered: "2024-01-10",
      affectedProjects: 6,
      valueLost: "$1.8M",
      description: "Improper access control allows unauthorized proposal execution",
      tags: ["Access Control", "Governance", "DAO"],
      patchAvailable: true,
      exploitInWild: false
    },
    {
      id: "CVE-2024-004",
      title: "Integer Overflow in Token Bridge",
      severity: "Medium",
      category: "Cross-chain",
      dateDiscovered: "2024-01-08",
      affectedProjects: 12,
      valueLost: "$850K",
      description: "Integer overflow vulnerability in cross-chain bridge token transfers",
      tags: ["Integer Overflow", "Bridge", "Cross-chain"],
      patchAvailable: true,
      exploitInWild: false
    }
  ];

  const topAttackVectors = [
    {
      name: "Reentrancy Attacks",
      count: 156,
      growth: "+23%",
      description: "Recursive calls exploiting state inconsistencies",
      impact: "$450M"
    },
    {
      name: "Flash Loan Exploits", 
      count: 89,
      growth: "+45%",
      description: "Leveraging uncollateralized loans for market manipulation",
      impact: "$320M"
    },
    {
      name: "Oracle Manipulation",
      count: 67,
      growth: "+12%", 
      description: "Price feed manipulation and MEV attacks",
      impact: "$280M"
    },
    {
      name: "Access Control Bugs",
      count: 134,
      growth: "+8%",
      description: "Improper permission checks and privilege escalation",
      impact: "$180M"
    }
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

  return (
    <ContentPage
      title="Web3 Vulnerability Database"
      description="Comprehensive database of blockchain and smart contract vulnerabilities, exploits, and security threats with real-time tracking and analysis."
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            Real-time vulnerability tracking
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Web3 Vulnerability <span className="text-red-600">Database</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of security threats with our comprehensive database of Web3 vulnerabilities, 
            exploits, and attack vectors. Real-time updates and expert analysis.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vulnerabilityStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search vulnerabilities, CVE IDs, attack vectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="smart-contract">Smart Contract</SelectItem>
              <SelectItem value="defi">DeFi Protocol</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="cross-chain">Cross-chain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent Threats</TabsTrigger>
            <TabsTrigger value="trending">Attack Vectors</TabsTrigger>
            <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {recentVulnerabilities.map((vuln) => (
              <Card key={vuln.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                        <Badge variant="outline">{vuln.category}</Badge>
                        <span className="text-sm text-muted-foreground">{vuln.id}</span>
                      </div>
                      <CardTitle className="text-lg">{vuln.title}</CardTitle>
                      <CardDescription>{vuln.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {vuln.exploitInWild && (
                        <Badge variant="destructive" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          Active Exploit
                        </Badge>
                      )}
                      {vuln.patchAvailable && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Patch Available
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Discovered:</span>
                      <p className="font-medium">{vuln.dateDiscovered}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Affected Projects:</span>
                      <p className="font-medium">{vuln.affectedProjects}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Value Lost:</span>
                      <p className="font-medium text-red-600">{vuln.valueLost}</p>
                    </div>
                    <div className="text-sm">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vuln.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {topAttackVectors.map((vector, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{vector.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {vector.growth}
                      </Badge>
                    </div>
                    <CardDescription>{vector.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cases</p>
                        <p className="text-2xl font-bold">{vector.count}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Impact</p>
                        <p className="text-xl font-bold text-red-600">{vector.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Threat Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Get detailed analysis and predictions on emerging security threats.
              </p>
              <Button asChild>
                <Link to="/security-insights">
                  View Security Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Protect Your Project from These Threats</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don't let your project become another statistic. Get a comprehensive security audit 
            from verified experts to identify and fix vulnerabilities before they're exploited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-4 w-4" />
                Request Security Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ai-tools">
                <Zap className="mr-2 h-4 w-4" />
                Try AI Security Scanner
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Vulnerabilities;
