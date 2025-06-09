
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Share2, 
  FileText, 
  Clock,
  Activity,
  Zap,
  Eye,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

export function RealTimeCollaborationHub() {
  const [activeUsers] = useState([
    { id: '1', name: 'Alex Chen', role: 'Lead Auditor', status: 'active', avatar: '/api/placeholder/32/32' },
    { id: '2', name: 'Sarah Kim', role: 'Security Analyst', status: 'active', avatar: '/api/placeholder/32/32' },
    { id: '3', name: 'Mike Johnson', role: 'Project Owner', status: 'away', avatar: '/api/placeholder/32/32' },
    { id: '4', name: 'Emma Davis', role: 'Junior Auditor', status: 'active', avatar: '/api/placeholder/32/32' }
  ]);

  const [liveActivities] = useState([
    { 
      id: '1', 
      user: 'Alex Chen', 
      action: 'Updated vulnerability assessment', 
      timestamp: '2 minutes ago',
      type: 'update'
    },
    { 
      id: '2', 
      user: 'Sarah Kim', 
      action: 'Added comment to smart contract review', 
      timestamp: '5 minutes ago',
      type: 'comment'
    },
    { 
      id: '3', 
      user: 'Mike Johnson', 
      action: 'Approved milestone completion', 
      timestamp: '8 minutes ago',
      type: 'approval'
    }
  ]);

  const [collaborativeSessions] = useState([
    {
      id: '1',
      name: 'DeFi Protocol Security Review',
      participants: 4,
      status: 'active',
      progress: 67,
      type: 'audit'
    },
    {
      id: '2',
      name: 'Smart Contract Code Review',
      participants: 2,
      status: 'active',
      progress: 34,
      type: 'review'
    },
    {
      id: '3',
      name: 'Vulnerability Discussion',
      participants: 6,
      status: 'scheduled',
      progress: 0,
      type: 'discussion'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time Collaboration Hub</h2>
          <p className="text-muted-foreground">
            Live collaboration, communication, and project coordination
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button>
            <Video className="h-4 w-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="activities">Live Activities</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Active Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                              user.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Shared Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <div className="font-medium">Security Assessment Report</div>
                          <div className="text-sm text-muted-foreground">Last edited by Alex Chen • 3 min ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-700">
                          <Eye className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                        <Button variant="ghost" size="sm">Open</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-purple-500" />
                        <div>
                          <div className="font-medium">Vulnerability Analysis</div>
                          <div className="text-sm text-muted-foreground">Last edited by Sarah Kim • 12 min ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Draft</Badge>
                        <Button variant="ghost" size="sm">Open</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Create Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Screen
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    New Document
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Real-Time Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Live Sessions</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Messages Today</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Files Shared</span>
                    <span className="font-medium">8</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="communication">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-64 overflow-y-auto">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Alex Chen</span>
                        <span className="text-muted-foreground">2:34 PM</span>
                      </div>
                      <div className="text-sm mt-1">Just found a potential reentrancy vulnerability in the withdraw function</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Sarah Kim</span>
                        <span className="text-muted-foreground">2:36 PM</span>
                      </div>
                      <div className="text-sm mt-1">Can you share the code snippet? I'll take a look</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Conferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Daily Standup</div>
                      <Badge variant="default" className="bg-red-100 text-red-800">
                        <Play className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">3 participants</div>
                    <Button size="sm" className="w-full">Join Meeting</Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Security Review Session</div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">Starts in 15 minutes</div>
                    <Button variant="outline" size="sm" className="w-full">Set Reminder</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      activity.type === 'update' ? 'bg-blue-400' :
                      activity.type === 'comment' ? 'bg-green-400' : 'bg-purple-400'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="space-y-4">
            {collaborativeSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{session.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {session.participants} participants • {session.type}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={session.status === 'active' ? 'default' : 'outline'}>
                        {session.status === 'active' ? (
                          <>
                            <Activity className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Scheduled
                          </>
                        )}
                      </Badge>
                      <Button size="sm">
                        {session.status === 'active' ? 'Join' : 'Schedule'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{session.progress}%</span>
                    </div>
                    <Progress value={session.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
