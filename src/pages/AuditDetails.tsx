
import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { useAuditDetails } from '@/hooks/useAuditDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Shield, 
  Clock, 
  Users, 
  MessageCircle, 
  Download,
  AlertTriangle,
  CheckCircle,
  Send,
  Calendar,
  DollarSign
} from 'lucide-react';
import LoadingState from '@/components/ui/loading-state';

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, auditData, activeTab, setActiveTab, handleSendMessage } = useAuditDetails(id);
  const [newMessage, setNewMessage] = React.useState('');

  if (isLoading) {
    return (
      <StandardLayout 
        title="Loading Audit Details" 
        description="Loading detailed information about your security audit"
      >
        <LoadingState message="Loading audit details..." />
      </StandardLayout>
    );
  }

  if (!auditData) {
    return (
      <StandardLayout 
        title="Audit Not Found" 
        description="The requested audit could not be found"
      >
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Audit Not Found</h1>
          <p className="text-muted-foreground">The requested audit could not be found.</p>
        </div>
      </StandardLayout>
    );
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <StandardLayout 
      title={auditData.name} 
      description={`Security audit details for ${auditData.name} - Track progress, view vulnerabilities, and collaborate with your audit team`}
    >
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{auditData.name}</h1>
              <p className="text-muted-foreground">{auditData.description}</p>
            </div>
            <Badge variant={auditData.status === 'in-progress' ? 'default' : 'secondary'}>
              {auditData.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Audit Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary">{auditData.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                  <Progress value={auditData.progress} className="mt-2" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{auditData.securityScore}</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Due Date</div>
                    <div className="text-sm text-muted-foreground">{auditData.dueDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Client</div>
                    <div className="text-sm text-muted-foreground">{auditData.client.name}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security Analysis</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnerabilities Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Vulnerabilities Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditData.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            vuln.severity === 'critical' ? 'destructive' :
                            vuln.severity === 'high' ? 'secondary' :
                            vuln.severity === 'medium' ? 'outline' : 'default'
                          }>
                            {vuln.severity}
                          </Badge>
                          <span className="font-medium">{vuln.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{vuln.count} found</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Audit Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditData.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-sm text-muted-foreground">{participant.role}</div>
                        </div>
                        <Badge variant={
                          participant.status === 'online' ? 'default' :
                          participant.status === 'away' ? 'secondary' : 'outline'
                        }>
                          {participant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              {/* Security Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Analysis Breakdown</CardTitle>
                  <CardDescription>Detailed security assessment by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditData.riskCategories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.score}/{category.maxScore}</span>
                        </div>
                        <Progress value={(category.score / category.maxScore) * 100} />
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Educational Resources</CardTitle>
                  <CardDescription>Learn about the vulnerabilities found in your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditData.learningResources.map((resource, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline">{resource.type}</Badge>
                              <span className="text-sm text-muted-foreground">{resource.readingTime}</span>
                              <Badge variant={resource.level === 'advanced' ? 'secondary' : 'outline'}>
                                {resource.level}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Read
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message History */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {auditData.messages.map((message) => (
                        <div key={message.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={message.sender.avatar} />
                              <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{message.sender.name}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <div className="ml-8 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">{message.content}</p>
                            {message.attachments && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((attachment, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    <FileText className="h-3 w-3" />
                                    <span>{attachment.name}</span>
                                    <Badge variant="outline" className="text-xs">{attachment.type}</Badge>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <form onSubmit={handleMessageSubmit} className="mt-4 space-y-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Guidelines
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Audit Report (Draft)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Technical Specifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Recommendations
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Initial review completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Detailed analysis in progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Final report generation pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AuditDetails;
