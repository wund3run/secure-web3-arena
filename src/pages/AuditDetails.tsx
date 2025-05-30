
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuditDetails } from '@/hooks/useAuditDetails';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Calendar, Clock, FileText, MessageSquare, Users, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { AuditOverviewTab } from '@/components/audit-details/AuditOverviewTab';
import { AuditProgressTab } from '@/components/audit-details/AuditProgressTab';
import { AuditMessagesTab } from '@/components/audit-details/AuditMessagesTab';
import { AuditFilesTab } from '@/components/audit-details/AuditFilesTab';
import { LoadingState } from '@/components/audit-details/LoadingState';

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, auditData, activeTab, setActiveTab, handleSendMessage } = useAuditDetails(id);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!auditData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Audit Not Found</h2>
              <p className="text-muted-foreground">The audit you're looking for doesn't exist or you don't have permission to view it.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertTriangle;
      default: return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(auditData.status);

  return (
    <>
      <Helmet>
        <title>{auditData.name} | Audit Details | Hawkly</title>
        <meta name="description" content={`View progress and details for ${auditData.name}`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{auditData.name}</h1>
                    <p className="text-muted-foreground">{auditData.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-5 w-5" />
                    <Badge className={getStatusColor(auditData.status)}>
                      {auditData.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Security Score</span>
                      </div>
                      <div className="text-2xl font-bold">{auditData.securityScore}/100</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Progress</span>
                      </div>
                      <div className="text-2xl font-bold">{auditData.progress}%</div>
                      <Progress value={auditData.progress} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Due Date</span>
                      </div>
                      <div className="text-sm font-medium">{new Date(auditData.dueDate).toLocaleDateString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Team</span>
                      </div>
                      <div className="text-sm font-medium">{auditData.participants.length} members</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {auditData.participants.map((participant: any) => (
                        <div key={participant.id} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>{participant.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{participant.name}</div>
                            <div className="text-xs text-muted-foreground">{participant.role}</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            participant.status === 'online' ? 'bg-green-500' : 
                            participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Progress
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Files
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <AuditOverviewTab auditData={auditData} />
                </TabsContent>

                <TabsContent value="progress" className="mt-6">
                  <AuditProgressTab auditData={auditData} />
                </TabsContent>

                <TabsContent value="messages" className="mt-6">
                  <AuditMessagesTab 
                    auditData={auditData} 
                    onSendMessage={handleSendMessage} 
                  />
                </TabsContent>

                <TabsContent value="files" className="mt-6">
                  <AuditFilesTab auditData={auditData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AuditDetails;
