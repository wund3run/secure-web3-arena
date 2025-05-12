
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SecurityRiskScorecard } from '@/components/security-visualizations/SecurityRiskScorecard';
import { VulnerabilityHeatmap } from '@/components/security-visualizations/VulnerabilityHeatmap';
import { EmbeddedLearningCard } from '@/components/educational/EmbeddedLearningCard';
import { AuditCollaborationPanel } from '@/components/collaboration/AuditCollaborationPanel';
import { CustomizableDashboard } from '@/components/dashboard/CustomizableDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, ArrowLeft, BookOpen, Calendar, Clipboard, Download, FileText, MessageSquare, PlusCircle, Share2, Shield, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demonstration
const mockAuditData = {
  id: 'audit-123',
  name: 'DeFi Protocol Security Audit',
  status: 'in-progress',
  progress: 60,
  startDate: '2023-05-15',
  dueDate: '2023-06-10',
  client: {
    name: 'DeFi Innovations Inc.',
    logo: ''
  },
  description: 'Comprehensive security audit of smart contract ecosystem for DeFi lending protocol',
  securityScore: 76,
  riskCategories: [
    { name: 'Access Controls', score: 85, maxScore: 100, riskLevel: 'low', description: 'Good access control implementation with minor improvements needed' },
    { name: 'Smart Contract Logic', score: 62, maxScore: 100, riskLevel: 'medium', description: 'Several logic issues found that require attention' },
    { name: 'Oracle Integration', score: 45, maxScore: 100, riskLevel: 'high', description: 'Critical vulnerabilities in price feed implementations' },
    { name: 'Gas Optimization', score: 90, maxScore: 100, riskLevel: 'low', description: 'Efficient gas usage with minor optimization opportunities' }
  ],
  vulnerabilities: [
    { name: 'Reentrancy', count: 2, severity: 'critical' },
    { name: 'Access Control', count: 3, severity: 'high' },
    { name: 'Input Validation', count: 5, severity: 'medium' },
    { name: 'Oracle Manipulation', count: 1, severity: 'high' },
    { name: 'Front-Running', count: 2, severity: 'medium' },
    { name: 'Integer Overflow', count: 0, severity: 'low' },
    { name: 'Gas Optimization', count: 7, severity: 'info' }
  ],
  learningResources: [
    {
      title: 'Understanding Reentrancy Attacks',
      description: 'Learn about reentrancy vulnerabilities and how to prevent them in your smart contracts',
      type: 'article',
      url: '#',
      readingTime: '5 min',
      level: 'intermediate'
    },
    {
      title: 'Best Practices for Oracle Integration',
      description: 'A comprehensive guide to securely integrating price oracles in DeFi applications',
      type: 'guide',
      url: '#',
      readingTime: '12 min',
      level: 'advanced'
    }
  ],
  messages: [
    {
      id: 'm1',
      sender: {
        id: 'auditor1',
        name: 'Alex Chen',
        avatar: '',
        role: 'auditor'
      },
      content: "I've completed the initial analysis of your lending pool contract. I found a potential reentrancy vulnerability in the withdraw function.",
      timestamp: '10:30 AM',
      status: 'read'
    },
    {
      id: 'm2',
      sender: {
        id: 'client1',
        name: 'Sarah Kim',
        avatar: '',
        role: 'client'
      },
      content: "Thanks for the update. Can you provide more details about this vulnerability?",
      timestamp: '10:45 AM',
      status: 'read'
    },
    {
      id: 'm3',
      sender: {
        id: 'system',
        name: 'System',
        role: 'system'
      },
      content: "Alex Chen has shared a code snippet",
      timestamp: '11:02 AM'
    },
    {
      id: 'm4',
      sender: {
        id: 'auditor1',
        name: 'Alex Chen',
        avatar: '',
        role: 'auditor'
      },
      content: "Here's the vulnerable code section. The issue is that the contract updates the user's balance after sending ETH, which could allow an attacker to call back into the withdraw function before the balance is updated.",
      timestamp: '11:02 AM',
      attachments: [
        {
          name: 'vulnerable-code.sol',
          url: '#',
          type: 'code',
          size: '4.2 KB'
        }
      ],
      status: 'read'
    }
  ],
  participants: [
    {
      id: 'auditor1',
      name: 'Alex Chen',
      avatar: '',
      role: 'Lead Auditor',
      status: 'online'
    },
    {
      id: 'auditor2',
      name: 'Maria Garcia',
      avatar: '',
      role: 'Security Researcher',
      status: 'away'
    },
    {
      id: 'client1',
      name: 'Sarah Kim',
      avatar: '',
      role: 'Project Manager',
      status: 'online'
    },
    {
      id: 'client2',
      name: 'Jason Wei',
      avatar: '',
      role: 'Lead Developer',
      status: 'offline'
    }
  ]
};

const AuditDetails = () => {
  const { auditId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [auditData, setAuditData] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchAuditData = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from API: await api.getAuditDetails(auditId);
        setTimeout(() => {
          setAuditData(mockAuditData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        toast.error("Failed to load audit details");
        setIsLoading(false);
      }
    };
    
    fetchAuditData();
  }, [auditId]);
  
  const handleSendMessage = (message: string) => {
    toast.success("Message sent successfully");
    // In a real app, send to API and update state
    console.log("Sending message:", message);
  };
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!auditData) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Audit Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The audit you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button onClick={() => navigate('/audits')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Audits
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{auditData.name} | Hawkly Audit</title>
        <meta name="description" content={`Security audit details for ${auditData.name}`} />
      </Helmet>
      <Navbar />
      <main className="container py-4 md:py-8">
        {/* Mobile Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 md:hidden" 
          onClick={() => navigate('/audits')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Audits
        </Button>
        
        {/* Header with Key Info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{auditData.name}</h1>
              <Badge 
                className={auditData.status === 'in-progress' ? 'bg-yellow-500' : 
                         auditData.status === 'completed' ? 'bg-green-500' : 
                         'bg-blue-500'}
              >
                {auditData.status === 'in-progress' ? 'In Progress' : 
                 auditData.status === 'completed' ? 'Completed' : 'Scheduled'}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {auditData.client.name} • Started {auditData.startDate} • Due {auditData.dueDate}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Collaborate</span>
            </Button>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-auto">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview" className="gap-2">
                <Clipboard className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="vulnerabilities" className="gap-2">
                <Shield className="h-4 w-4" />
                <span>Vulnerabilities</span>
              </TabsTrigger>
              <TabsTrigger value="collaborate" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Collaborate</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <UserCircle className="h-4 w-4" />
                <span>Team</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Security Score Card */}
              <div className="lg:col-span-2">
                <SecurityRiskScorecard 
                  projectName={auditData.name}
                  overallScore={auditData.securityScore}
                  categories={auditData.riskCategories}
                  lastUpdated="May 21, 2023"
                />
              </div>
              
              {/* Educational Resources */}
              <div>
                <EmbeddedLearningCard
                  title="Learning Resources"
                  description="Educational content related to your audit findings"
                  resources={auditData.learningResources}
                  contextual={true}
                />
              </div>
            </div>
            
            {/* Widgets Dashboard */}
            <CustomizableDashboard 
              title="Audit Dashboard"
              widgets={[
                {
                  id: '1',
                  title: 'Vulnerability Heatmap',
                  size: 'medium',
                  type: 'heatmap',
                  colSpan: 2,
                  content: (
                    <div className="p-4">
                      <VulnerabilityHeatmap 
                        categories={auditData.vulnerabilities}
                        className="border-none shadow-none"
                      />
                    </div>
                  ),
                  minimizable: true
                },
                {
                  id: '2',
                  title: 'Recent Activity',
                  size: 'small',
                  type: 'activity',
                  content: (
                    <div className="p-4">
                      <ul className="space-y-3">
                        {auditData.messages.map((msg: any, idx: number) => (
                          <li key={idx} className="border-b pb-2 last:border-0">
                            <div className="flex items-start gap-3">
                              <span className="text-sm font-medium">{msg.sender.name}</span>
                              <span className="text-sm text-muted-foreground">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm truncate">
                              {msg.content.length > 80 ? `${msg.content.substring(0, 80)}...` : msg.content}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                  minimizable: true
                },
                {
                  id: '3',
                  title: 'Smart Contract Coverage',
                  size: 'small',
                  type: 'coverage',
                  content: (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold">86%</div>
                          <div className="text-sm text-muted-foreground">Code Coverage</div>
                        </div>
                        <div className="h-16 w-16 rounded-full border-4 border-primary flex items-center justify-center">
                          <span className="text-lg font-bold">86%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Contract Core</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Oracle Integration</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '78%' }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>External Interfaces</span>
                          <span>84%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '84%' }}></div>
                        </div>
                      </div>
                    </div>
                  ),
                  minimizable: true
                },
                {
                  id: '4',
                  title: 'Learning Resources',
                  size: 'small',
                  type: 'resources',
                  content: (
                    <div className="p-4">
                      <div className="flex items-center mb-3 text-primary">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <h3 className="font-medium">Recommended Reading</h3>
                      </div>
                      <ul className="space-y-3">
                        {auditData.learningResources.map((resource: any, idx: number) => (
                          <li key={idx} className="border-b pb-2 last:border-0">
                            <p className="text-sm font-medium">{resource.title}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                              <span className="text-xs text-muted-foreground">{resource.readingTime} read</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" size="sm" className="w-full mt-3">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        View All Resources
                      </Button>
                    </div>
                  ),
                  minimizable: true
                }
              ]}
              onAddWidget={() => toast.info("Widget customization coming soon")}
            />
          </TabsContent>
          
          {/* Collaborate Tab */}
          <TabsContent value="collaborate" className="mt-6">
            <AuditCollaborationPanel
              auditId={auditData.id}
              auditName={auditData.name}
              messages={auditData.messages}
              onSendMessage={handleSendMessage}
              participants={auditData.participants}
            />
          </TabsContent>
          
          {/* Vulnerabilities Tab */}
          <TabsContent value="vulnerabilities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerabilities Found</CardTitle>
              </CardHeader>
              <CardContent>
                <VulnerabilityHeatmap categories={auditData.vulnerabilities} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Placeholder for other tabs */}
          {['reports', 'timeline', 'team'].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <Card className="w-full h-[400px] flex items-center justify-center">
                <CardContent className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2 capitalize">{tab}</h3>
                  <p className="text-muted-foreground">
                    This section is under development. Check back soon for updates!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default AuditDetails;
