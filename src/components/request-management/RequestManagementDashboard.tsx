
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RequestStatusTracker } from './RequestStatusTracker';
import { Search, Filter, Plus, Download, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuditRequest {
  id: string;
  projectName: string;
  status: 'pending' | 'matched' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  progress: number;
  auditor?: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  timeline: {
    phase: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: Date;
    description: string;
  }[];
  createdAt: Date;
  deadline?: Date;
  budget: number;
  blockchain: string;
  lastUpdate: Date;
}

export function RequestManagementDashboard() {
  const [requests, setRequests] = useState<AuditRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [blockchainFilter, setBlockchainFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockRequests: AuditRequest[] = [
      {
        id: 'req_001',
        projectName: 'DeFi Yield Protocol',
        status: 'in_progress',
        progress: 65,
        auditor: {
          id: 'aud_001',
          name: 'Sarah Chen',
          rating: 4.9
        },
        timeline: [
          {
            phase: 'Initial Review',
            status: 'completed',
            date: new Date('2024-01-15'),
            description: 'Project scope and requirements analysis'
          },
          {
            phase: 'Code Analysis',
            status: 'current',
            description: 'Detailed smart contract review and testing'
          },
          {
            phase: 'Report Generation',
            status: 'upcoming',
            description: 'Comprehensive security report preparation'
          },
          {
            phase: 'Final Review',
            status: 'upcoming',
            description: 'Client review and recommendations'
          }
        ],
        createdAt: new Date('2024-01-10'),
        deadline: new Date('2024-02-15'),
        budget: 8500,
        blockchain: 'Ethereum',
        lastUpdate: new Date('2024-01-20')
      },
      {
        id: 'req_002',
        projectName: 'NFT Marketplace v2',
        status: 'completed',
        progress: 100,
        auditor: {
          id: 'aud_002',
          name: 'Marcus Rodriguez',
          rating: 4.8
        },
        timeline: [
          {
            phase: 'Initial Review',
            status: 'completed',
            date: new Date('2024-01-05'),
            description: 'Project scope and requirements analysis'
          },
          {
            phase: 'Code Analysis',
            status: 'completed',
            date: new Date('2024-01-12'),
            description: 'Detailed smart contract review and testing'
          },
          {
            phase: 'Report Generation',
            status: 'completed',
            date: new Date('2024-01-18'),
            description: 'Comprehensive security report preparation'
          },
          {
            phase: 'Final Review',
            status: 'completed',
            date: new Date('2024-01-22'),
            description: 'Client review and recommendations'
          }
        ],
        createdAt: new Date('2024-01-01'),
        deadline: new Date('2024-01-25'),
        budget: 5500,
        blockchain: 'Polygon',
        lastUpdate: new Date('2024-01-22')
      },
      {
        id: 'req_003',
        projectName: 'Cross-chain Bridge',
        status: 'pending',
        progress: 0,
        timeline: [
          {
            phase: 'Initial Review',
            status: 'upcoming',
            description: 'Project scope and requirements analysis'
          },
          {
            phase: 'Code Analysis',
            status: 'upcoming',
            description: 'Detailed smart contract review and testing'
          },
          {
            phase: 'Report Generation',
            status: 'upcoming',
            description: 'Comprehensive security report preparation'
          },
          {
            phase: 'Final Review',
            status: 'upcoming',
            description: 'Client review and recommendations'
          }
        ],
        createdAt: new Date('2024-01-22'),
        deadline: new Date('2024-03-01'),
        budget: 12000,
        blockchain: 'Avalanche',
        lastUpdate: new Date('2024-01-22')
      }
    ];

    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = requests;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(request =>
        request.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Blockchain filter
    if (blockchainFilter !== 'all') {
      filtered = filtered.filter(request => request.blockchain === blockchainFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchQuery, statusFilter, blockchainFilter]);

  const getStatusCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      in_progress: requests.filter(r => r.status === 'in_progress').length,
      completed: requests.filter(r => r.status === 'completed').length,
      cancelled: requests.filter(r => r.status === 'cancelled').length
    };
  };

  const statusCounts = getStatusCounts();

  const handleViewDetails = (requestId: string) => {
    navigate(`/audit-request/${requestId}`);
  };

  const handleContactAuditor = (requestId: string) => {
    navigate(`/messages/audit/${requestId}`);
  };

  const handleDownloadReport = (requestId: string) => {
    // Implement report download logic
    console.log('Downloading report for:', requestId);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Request Management</h1>
          <p className="text-muted-foreground">
            Track and manage your audit requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/enhanced-request-audit')}>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{statusCounts.all}</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.in_progress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="matched">Matched</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={blockchainFilter} onValueChange={setBlockchainFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blockchains</SelectItem>
                <SelectItem value="Ethereum">Ethereum</SelectItem>
                <SelectItem value="Polygon">Polygon</SelectItem>
                <SelectItem value="Avalanche">Avalanche</SelectItem>
                <SelectItem value="Solana">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No requests found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <RequestStatusTracker
              key={request.id}
              request={request}
              onViewDetails={() => handleViewDetails(request.id)}
              onContactAuditor={request.auditor ? () => handleContactAuditor(request.id) : undefined}
              onDownloadReport={request.status === 'completed' ? () => handleDownloadReport(request.id) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
