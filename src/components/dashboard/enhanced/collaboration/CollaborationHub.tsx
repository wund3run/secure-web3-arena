
import React, { useState, useEffect } from 'react';
// Real-time presence and messaging (stub for backend integration)
const usePresence = (teamMembers: TeamMember[]) => {
  const [presence, setPresence] = useState<{ [id: string]: string }>(() => {
    const initial: { [id: string]: string } = {};
    teamMembers.forEach(m => { initial[m.id] = m.status; });
    return initial;
  });
  // Simulate presence updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPresence(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          // Randomly toggle status for demo
          updated[id] = Math.random() > 0.8 ? 'busy' : updated[id];
        });
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return presence;
};

const useMessaging = () => {
  const [messages, setMessages] = useState<{ author: string; content: string; timestamp: string }[]>([]);
  const sendMessage = (author: string, content: string) => {
    setMessages(prev => [...prev, { author, content, timestamp: new Date().toLocaleTimeString() }]);
  };
  return { messages, sendMessage };
};
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Send,
  Video,
  Share
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  expertise: string[];
}

interface AuditComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'finding' | 'suggestion' | 'question';
  resolved: boolean;
  line?: number;
  file?: string;
}

export const CollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [newComment, setNewComment] = useState('');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alice Chen',
      role: 'Lead Auditor',
      status: 'online',
      expertise: ['DeFi', 'Smart Contracts', 'Solidity']
    },
    {
      id: '2',
      name: 'Bob Kumar',
      role: 'Security Researcher',
      status: 'busy',
      expertise: ['Cryptography', 'Protocol Analysis']
    },
    {
      id: '3',
      name: 'Carol Smith',
      role: 'Junior Auditor',
      status: 'online',
      expertise: ['Testing', 'Documentation']
    }
  ];
  const presence = usePresence(teamMembers);
  const { messages, sendMessage } = useMessaging();

  const comments: AuditComment[] = [
    {
      id: '1',
      author: 'Alice Chen',
      content: 'Found potential reentrancy vulnerability in the withdraw function. Need to implement checks-effects-interactions pattern.',
      timestamp: '2 hours ago',
      type: 'finding',
      resolved: false,
      file: 'Token.sol',
      line: 45
    },
    {
      id: '2',
      author: 'Bob Kumar',
      content: 'The access control implementation looks solid. Good use of OpenZeppelin roles.',
      timestamp: '3 hours ago',
      type: 'suggestion',
      resolved: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case 'finding': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'suggestion': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'question': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Collaboration Hub</h2>
          <p className="text-muted-foreground">Work together seamlessly on audit projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4 mr-2" />
            Start Call
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share Screen
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="comments">Code Comments</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Team Members
                <Badge variant="secondary">{teamMembers.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(presence[member.id] || member.status)}`} />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex gap-1 mt-1">
                          {member.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => sendMessage(member.name, 'Hello!') }>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Code Review Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getCommentIcon(comment.type)}
                          <span className="font-medium">{comment.author}</span>
                          {comment.file && (
                            <Badge variant="outline" className="text-xs">
                              {comment.file}:{comment.line}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          {comment.resolved && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reply</Button>
                        {!comment.resolved && (
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Finding</Button>
                    <Button variant="outline" size="sm">Suggestion</Button>
                    <Button variant="outline" size="sm">Question</Button>
                  </div>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Live Collaboration Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No active sessions</p>
                <Button>
                  <Video className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Team Chat (Demo)</h4>
                <ScrollArea className="h-40 mb-2">
                  <div className="space-y-2">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Avatar className="h-6 w-6"><AvatarFallback>{msg.author[0]}</AvatarFallback></Avatar>
                        <span className="font-medium text-xs">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        <span className="text-sm">{msg.content}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      sendMessage('You', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }} />
                  <Button size="sm" onClick={() => {}}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
