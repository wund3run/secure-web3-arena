import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, Download, Calendar, Shield, Clock, DollarSign } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Audits = () => {
  console.log('Audits component rendering...');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log('State initialized successfully');

  const audits = [
    {
      id: '1',
      projectName: 'DeFi Protocol V2',
      auditor: 'CyberGuard Security',
      status: 'completed',
      blockchain: 'Ethereum',
      severity: 'medium',
      findings: 3,
      startDate: '2024-01-15',
      completionDate: '2024-01-29',
      cost: '$12,500'
    },
    {
      id: '2',
      projectName: 'NFT Marketplace',
      auditor: 'BlockSafe Auditors',
      status: 'in_progress',
      blockchain: 'Polygon',
      severity: 'low',
      findings: 1,
      startDate: '2024-02-01',
      completionDate: null,
      cost: '$8,000'
    },
    {
      id: '3',
      projectName: 'Cross-chain Bridge',
      auditor: 'SecureChain Labs',
      status: 'pending',
      blockchain: 'Arbitrum',
      severity: null,
      findings: 0,
      startDate: null,
      completionDate: null,
      cost: '$15,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         audit.auditor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log('About to render JSX...');

  try {
    return (
      <>
        <Helmet>
          <title>Security Audits | Hawkly</title>
          <meta name="description" content="Browse and manage your security audits" />
        </Helmet>

        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Security Audits</h1>
              <p className="text-gray-600">Track and manage your Web3 security audits</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search audits..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <Tabs defaultValue="grid" className="space-y-6">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAudits.map(audit => (
                    <Card key={audit.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{audit.projectName}</CardTitle>
                          <Badge className={getStatusColor(audit.status)}>
                            {audit.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">by {audit.auditor}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Blockchain:</span>
                          <Badge variant="outline">{audit.blockchain}</Badge>
                        </div>
                        
                        {audit.severity && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Severity:</span>
                            <Badge className={getSeverityColor(audit.severity)}>
                              {audit.severity}
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Findings:</span>
                          <span className="font-medium">{audit.findings}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Cost:</span>
                          <span className="font-medium">{audit.cost}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button asChild size="sm" className="flex-1">
                            <Link to={`/audit/${audit.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          {audit.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredAudits.map(audit => (
                    <Card key={audit.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold">{audit.projectName}</h3>
                            <p className="text-sm text-gray-600">by {audit.auditor}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(audit.status)}>
                              {audit.status.replace('_', ' ')}
                            </Badge>
                            {audit.severity && (
                              <Badge className={getSeverityColor(audit.severity)}>
                                {audit.severity}
                              </Badge>
                            )}
                            <Badge variant="outline">{audit.blockchain}</Badge>
                            <span className="font-medium">{audit.cost}</span>
                            <Button asChild size="sm">
                              <Link to={`/audit/${audit.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {filteredAudits.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No audits found</h3>
                <p className="text-gray-600 mb-6">Get started by requesting your first security audit</p>
                <Button asChild>
                  <Link to="/request-audit">Request Audit</Link>
                </Button>
              </div>
            )}
          </div>
          
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering Audits component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">There was an error loading the audits page.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }
};

export default Audits;
