
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Shield, 
  Star, 
  DollarSign, 
  Clock, 
  FileText, 
  TrendingUp, 
  Calendar,
  Award,
  Eye,
  Plus
} from 'lucide-react';

const AuditorDashboard = () => {
  const [stats] = useState({
    totalAudits: 12,
    activeAudits: 3,
    totalEarnings: 15750,
    averageRating: 4.8,
    responseTime: '2.1 hrs',
    completionRate: 95
  });

  const [availableAudits] = useState([
    {
      id: 1,
      title: 'DeFi Lending Protocol Audit',
      client: 'BlockLend',
      budget: '$5,000',
      timeline: '2 weeks',
      complexity: 'High',
      technologies: ['Solidity', 'OpenZeppelin', 'Hardhat'],
      deadline: '2024-02-15',
      description: 'Comprehensive security audit for a new DeFi lending protocol with flash loan protection.'
    },
    {
      id: 2,
      title: 'NFT Marketplace Smart Contract',
      client: 'ArtChain',
      budget: '$3,200',
      timeline: '10 days',
      complexity: 'Medium',
      technologies: ['Solidity', 'ERC-721', 'IPFS'],
      deadline: '2024-02-10',
      description: 'Security review of NFT marketplace contracts including royalty mechanisms.'
    },
    {
      id: 3,
      title: 'Cross-Chain Bridge Audit',
      client: 'BridgeX',
      budget: '$8,500',
      timeline: '3 weeks',
      complexity: 'Critical',
      technologies: ['Solidity', 'LayerZero', 'Merkle Trees'],
      deadline: '2024-02-28',
      description: 'Critical security assessment of cross-chain bridge infrastructure.'
    }
  ]);

  const [activeAudits] = useState([
    {
      id: 101,
      title: 'GameFi Token Contract',
      client: 'PlayToken',
      progress: 75,
      deadline: '2024-02-08',
      status: 'In Progress',
      timeRemaining: '3 days'
    },
    {
      id: 102,
      title: 'DAO Governance Audit',
      client: 'DecentralDAO',
      progress: 45,
      deadline: '2024-02-12',
      status: 'Code Review',
      timeRemaining: '7 days'
    },
    {
      id: 103,
      title: 'Staking Protocol Review',
      client: 'StakeMax',
      progress: 20,
      deadline: '2024-02-20',
      status: 'Initial Assessment',
      timeRemaining: '15 days'
    }
  ]);

  const handleApplyForAudit = (auditId: number) => {
    toast.success('Application submitted successfully!');
  };

  const handleViewAudit = (auditId: number) => {
    // Navigate to audit details
    console.log('Viewing audit:', auditId);
  };

  return (
    <>
      <Helmet>
        <title>Auditor Dashboard | Hawkly</title>
        <meta name="description" content="Your comprehensive auditor dashboard for managing audits and tracking earnings" />
      </Helmet>

      <StandardLayout title="Auditor Dashboard" description="Your comprehensive workspace for Web3 security auditing">
        <div className="container py-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Audits</p>
                    <p className="text-2xl font-bold">{stats.totalAudits}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      {stats.averageRating}
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-2xl font-bold">{stats.responseTime}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="available">Available Audits</TabsTrigger>
              <TabsTrigger value="active">Active Audits</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>{stats.completionRate}%</span>
                      </div>
                      <Progress value={stats.completionRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Client Satisfaction</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-Time Delivery</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <Shield className="h-4 w-4 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Audit completed</p>
                          <p className="text-xs text-muted-foreground">GameFi Token Contract - 2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">5-star review received</p>
                          <p className="text-xs text-muted-foreground">From PlayToken - 1 day ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <Plus className="h-4 w-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">New audit opportunity</p>
                          <p className="text-xs text-muted-foreground">Cross-Chain Bridge Audit - 2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Audit Opportunities</h2>
                <Badge variant="outline">{availableAudits.length} opportunities</Badge>
              </div>
              
              <div className="grid gap-4">
                {availableAudits.map((audit) => (
                  <Card key={audit.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{audit.title}</CardTitle>
                          <p className="text-muted-foreground">by {audit.client}</p>
                        </div>
                        <Badge variant={audit.complexity === 'Critical' ? 'destructive' : 
                                     audit.complexity === 'High' ? 'default' : 'secondary'}>
                          {audit.complexity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{audit.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {audit.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Budget</p>
                          <p className="font-semibold text-green-600">{audit.budget}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Timeline</p>
                          <p className="font-semibold">{audit.timeline}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-semibold">{audit.deadline}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={() => handleApplyForAudit(audit.id)} className="flex-1">
                          Apply for Audit
                        </Button>
                        <Button variant="outline" onClick={() => handleViewAudit(audit.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Audits</h2>
                <Badge variant="outline">{activeAudits.length} active</Badge>
              </div>
              
              <div className="grid gap-4">
                {activeAudits.map((audit) => (
                  <Card key={audit.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{audit.title}</CardTitle>
                          <p className="text-muted-foreground">by {audit.client}</p>
                        </div>
                        <Badge variant="outline">{audit.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{audit.progress}%</span>
                        </div>
                        <Progress value={audit.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-semibold">{audit.deadline}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time Remaining</p>
                          <p className="font-semibold text-orange-600">{audit.timeRemaining}</p>
                        </div>
                      </div>
                      
                      <Button onClick={() => handleViewAudit(audit.id)} className="w-full">
                        Continue Audit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auditor Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">John Doe</h3>
                      <p className="text-muted-foreground">Senior Security Auditor</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{stats.averageRating}</span>
                        <span className="text-sm text-muted-foreground">({stats.totalAudits} audits)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">DeFi Protocols</Badge>
                        <Badge variant="secondary">Smart Contracts</Badge>
                        <Badge variant="secondary">Cross-chain Security</Badge>
                        <Badge variant="secondary">Solidity</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <div className="space-y-1 text-sm">
                        <p>• Certified Ethereum Developer</p>
                        <p>• Smart Contract Security Specialist</p>
                        <p>• Blockchain Security Professional</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StandardLayout>
    </>
  );
};

export default AuditorDashboard;
