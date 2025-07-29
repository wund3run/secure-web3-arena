import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  FileText, 
  Search, 
  Filter,
  ArrowRight,
  Calendar,
  Users,
  Target,
  Award,
  Eye,
  Download
} from 'lucide-react';

const Audits = () => {
  const auditStats = [
    { label: "Total Audits", value: "2,500+", icon: Shield },
    { label: "Assets Secured", value: "$850M+", icon: TrendingUp },
    { label: "Critical Issues Found", value: "15,000+", icon: Target },
    { label: "Client Satisfaction", value: "99.8%", icon: Star }
  ];

  const recentAudits = [
    {
      id: "AUD-2025-0156",
      project: "DeFiSwap Protocol",
      type: "Smart Contract Audit",
      status: "Completed",
      score: 9.2,
      issues: { critical: 0, high: 1, medium: 3, low: 5 },
      auditor: "Alex Chen",
      date: "June 10, 2025",
      blockchain: "Ethereum",
      category: "DeFi"
    },
    {
      id: "AUD-2025-0155",
      project: "CrossChain Bridge",
      type: "Security Assessment",
      status: "In Progress",
      score: null,
      issues: { critical: 1, high: 2, medium: 4, low: 8 },
      auditor: "Sarah Wilson",
      date: "June 8, 2025",
      blockchain: "Multi-chain",
      category: "Infrastructure"
    },
    {
      id: "AUD-2025-0154",
      project: "NFT Marketplace",
      type: "Penetration Test",
      status: "Completed",
      score: 8.7,
      issues: { critical: 0, high: 0, medium: 2, low: 3 },
      auditor: "Marcus Rodriguez",
      date: "June 5, 2025",
      blockchain: "Polygon",
      category: "NFT"
    },
    {
      id: "AUD-2025-0153",
      project: "Yield Farming Protocol",
      type: "Code Review",
      status: "Completed",
      score: 9.5,
      issues: { critical: 0, high: 0, medium: 1, low: 2 },
      auditor: "Dr. Emily Zhang",
      date: "June 3, 2025",
      blockchain: "BSC",
      category: "DeFi"
    },
    {
      id: "AUD-2025-0152",
      project: "GameFi Platform",
      type: "Smart Contract Audit",
      status: "Under Review",
      score: null,
      issues: { critical: 0, high: 1, medium: 5, low: 7 },
      auditor: "Michael Thompson",
      date: "June 1, 2025",
      blockchain: "Solana",
      category: "Gaming"
    }
  ];

  const auditTypes = [
    {
      title: "Smart Contract Audits",
      description: "Comprehensive code review and vulnerability assessment",
      icon: Shield,
      count: "1,200+",
      avgDuration: "7-14 days"
    },
    {
      title: "Security Assessments",
      description: "End-to-end security evaluation of Web3 applications",
      icon: Eye,
      count: "800+",
      avgDuration: "14-21 days"
    },
    {
      title: "Penetration Testing",
      description: "Simulated attacks to identify security weaknesses",
      icon: Target,
      count: "300+",
      avgDuration: "5-10 days"
    },
    {
      title: "Code Reviews",
      description: "Expert review of code quality and best practices",
      icon: FileText,
      count: "200+",
      avgDuration: "3-7 days"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Under Review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Security Audits - Browse Completed Audits & Reports | Hawkly</title>
        <meta name="description" content="Browse our comprehensive database of security audits, assessments, and penetration tests. View detailed reports and findings from Web3 security experts." />
        <meta name="keywords" content="security audits, smart contract audits, penetration testing, security reports, blockchain audits, defi audits" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              2,500+ Audits Completed
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-6">
              Security Audit Database
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our comprehensive database of security audits, assessments, and penetration tests. 
              Learn from real-world findings and security best practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/request-audit">
                  Request Audit
                  <Shield className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">
                  Find Auditors
                  <Users className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Audit Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {auditStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search audits by project name, auditor, or blockchain..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Types */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Audit Types</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore different types of security audits and assessments available
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {auditTypes.map((type, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>{type.count} completed</div>
                      <div>Avg: {type.avgDuration}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Audits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recent Audits</h2>
                <p className="text-muted-foreground">Latest security audits and assessments</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/audits/all">
                  View All Audits <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentAudits.map((audit, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{audit.project}</h3>
                          <Badge variant="outline">{audit.category}</Badge>
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(audit.status)} text-white`}
                          >
                            {audit.status}
                          </Badge>
                          {audit.score && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{audit.score}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Audit ID</div>
                            <div className="font-mono text-sm">{audit.id}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Type</div>
                            <div className="text-sm">{audit.type}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Auditor</div>
                            <div className="text-sm">{audit.auditor}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Date</div>
                            <div className="text-sm">{audit.date}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Blockchain: </span>
                            <span className="font-medium">{audit.blockchain}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`${getSeverityColor('critical')}`}>
                              {audit.issues.critical} Critical
                            </span>
                            <span className={`${getSeverityColor('high')}`}>
                              {audit.issues.high} High
                            </span>
                            <span className={`${getSeverityColor('medium')}`}>
                              {audit.issues.medium} Medium
                            </span>
                            <span className={`${getSeverityColor('low')}`}>
                              {audit.issues.low} Low
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/audit-details/${audit.id}`}>
                            View Details
                          </Link>
                        </Button>
                        {audit.status === 'Completed' && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-green-600/10 border-primary/20">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-4">Need a Security Audit?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get your Web3 project audited by our network of expert security professionals. 
                  Protect your users and assets with comprehensive security assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/request-audit">
                      Request Security Audit
                      <Shield className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/marketplace">
                      Browse Auditors
                      <Users className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Audits;
