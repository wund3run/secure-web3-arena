
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Bell,
  Archive,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

export function EnhancedMessagingCenter() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const [conversations] = useState([
    {
      id: '1',
      name: 'Security Team Alpha',
      type: 'group',
      participants: 4,
      lastMessage: 'Found critical vulnerability in smart contract',
      timestamp: '2 min ago',
      unread: 3,
      priority: 'high',
      status: 'active'
    },
    {
      id: '2',
      name: 'Alex Chen',
      type: 'direct',
      role: 'Lead Auditor',
      lastMessage: 'Can you review the latest report?',
      timestamp: '15 min ago',
      unread: 1,
      priority: 'medium',
      status: 'active'
    },
    {
      id: '3',
      name: 'Project Stakeholders',
      type: 'group',
      participants: 8,
      lastMessage: 'Milestone 3 completed successfully',
      timestamp: '1 hour ago',
      unread: 0,
      priority: 'low',
      status: 'active'
    }
  ]);

  const [messages] = useState([
    {
      id: '1',
      sender: 'Alex Chen',
      content: 'I\'ve identified a potential reentrancy vulnerability in the withdraw function',
      timestamp: '2:34 PM',
      type: 'message',
      priority: 'high'
    },
    {
      id: '2',
      sender: 'Sarah Kim',
      content: 'Can you share the specific code lines? I\'ll cross-check with my analysis',
      timestamp: '2:36 PM',
      type: 'message',
      priority: 'medium'
    },
    {
      id: '3',
      sender: 'Alex Chen',
      content: 'Lines 245-267 in TokenSale.sol. The external call happens before state updates',
      timestamp: '2:38 PM',
      type: 'message',
      priority: 'high'
    },
    {
      id: '4',
      sender: 'Mike Johnson',
      content: 'This needs immediate attention. What\'s the severity level?',
      timestamp: '2:40 PM',
      type: 'message',
      priority: 'high'
    }
  ]);

  const [notifications] = useState([
    {
      id: '1',
      type: 'security_alert',
      title: 'Critical Vulnerability Detected',
      message: 'High-priority security issue requires immediate review',
      timestamp: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Milestone Completed',
      message: 'Smart contract audit Phase 2 completed',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'message',
      title: 'New Team Message',
      message: 'You have 3 unread messages in Security Team Alpha',
      timestamp: '2 hours ago',
      read: true
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case 'medium':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      default:
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Messaging Center</h2>
          <p className="text-muted-foreground">
            Secure communication hub for audit teams and stakeholders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50">
            <Shield className="h-3 w-3 mr-1" />
            Encrypted
          </Badge>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-3 cursor-pointer hover:bg-muted/50 border-b ${
                        selectedChat === conv.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(conv.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {conv.type === 'group' ? 'GR' : conv.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conv.status === 'active' && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{conv.name}</div>
                            <div className="flex items-center gap-1">
                              {getPriorityIcon(conv.priority)}
                              <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                            </div>
                          </div>
                          {conv.type === 'group' && (
                            <div className="text-xs text-muted-foreground">{conv.participants} participants</div>
                          )}
                          {conv.role && (
                            <div className="text-xs text-muted-foreground">{conv.role}</div>
                          )}
                          <div className="text-sm text-muted-foreground truncate mt-1">
                            {conv.lastMessage}
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Security Team Alpha</div>
                        <div className="text-sm text-muted-foreground">4 members active</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-muted-foreground">{message.timestamp}</span>
                            {getPriorityIcon(message.priority)}
                          </div>
                          <div className="text-sm mt-1 p-2 bg-muted rounded-lg">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center gap-2 border-t pt-4">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'security_alert' ? 'bg-red-100' :
                        notification.type === 'milestone' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'security_alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {notification.type === 'milestone' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {notification.type === 'message' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{notification.message}</div>
                        <div className="text-xs text-muted-foreground mt-2">{notification.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Real-time notifications</div>
                    <div className="text-sm text-muted-foreground">Get notified instantly for new messages</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Security alerts</div>
                    <div className="text-sm text-muted-foreground">High-priority security notifications</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email summaries</div>
                    <div className="text-sm text-muted-foreground">Daily digest of conversations</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
