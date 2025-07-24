import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Send, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Users, 
  Video,
  ScreenShare,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  UserPlus,
  Settings,
  Bell,
  Pin,
  Reply,
  Smile,
  MoreHorizontal,
  Eye,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRealtimePresence } from "@/hooks/useRealtimePresence";
import { useRealtimeMessaging } from "@/hooks/useRealtimeMessaging";
import { toast } from "sonner";

interface EnhancedMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'auditor' | 'client' | 'system' | 'lead_auditor';
  };
  timestamp: string;
  message_type: 'text' | 'file' | 'milestone' | 'system' | 'code_snippet' | 'finding';
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size?: string;
  }>;
  reactions?: Array<{
    emoji: string;
    users: string[];
  }>;
  replies?: Array<EnhancedMessage>;
  pinned?: boolean;
  edited?: boolean;
  read_by?: string[];
}

interface AuditorPresence {
  id: string;
  name: string;
  avatar?: string;
  role: 'auditor' | 'client' | 'lead_auditor';
  status: 'online' | 'offline' | 'away' | 'busy' | 'in_call';
  last_seen?: string;
  current_location?: string; // Which part of the audit they're working on
  activity?: 'reviewing_code' | 'writing_report' | 'in_meeting' | 'idle';
}

interface EnhancedCollaborationHubProps {
  auditId: string;
  auditName: string;
  currentUserId: string;
  isMultiAuditor?: boolean;
  onInviteAuditor?: () => void;
  onStartCall?: () => void;
  onScreenShare?: () => void;
}

export function EnhancedCollaborationHub({
  auditId,
  auditName,
  currentUserId,
  isMultiAuditor = false,
  onInviteAuditor,
  onStartCall,
  onScreenShare
}: EnhancedCollaborationHubProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'text' | 'code_snippet' | 'finding'>('text');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Real-time hooks
  const { 
    messages, 
    sendMessage, 
    isLoading: messagesLoading,
    isConnected,
    typingUsers,
    sendTypingIndicator 
  } = useRealtimeMessaging(auditId, currentUserId);
  
  const { 
    participants,
    updatePresence,
    isConnected: presenceConnected 
  } = useRealtimePresence(auditId, currentUserId);

  // Enhanced participants with activity status
  const [enhancedParticipants, setEnhancedParticipants] = useState<AuditorPresence[]>([]);

  // Mock data for demonstration - in real implementation, this would come from the hooks
  const mockMessages: EnhancedMessage[] = [
    {
      id: '1',
      content: 'Starting audit review for smart contract deployment functions',
      sender: { id: 'lead1', name: 'Sarah Chen', role: 'lead_auditor', avatar: '/avatars/sarah.jpg' },
      timestamp: '2024-01-15T10:00:00Z',
      message_type: 'system',
      pinned: true,
      read_by: ['user1', 'user2', 'lead1']
    },
    {
      id: '2', 
      content: 'Found potential reentrancy vulnerability in withdraw function. Line 156-162 needs review.',
      sender: { id: 'aud1', name: 'Alex Rodriguez', role: 'auditor', avatar: '/avatars/alex.jpg' },
      timestamp: '2024-01-15T10:15:00Z',
      message_type: 'finding',
      reactions: [{ emoji: '⚠️', users: ['lead1', 'user2'] }, { emoji: '👍', users: ['user1'] }],
      read_by: ['user1', 'lead1']
    },
    {
      id: '3',
      content: 'Can you share the specific code snippet? I want to review the implementation details.',
      sender: { id: 'user1', name: 'Michael Smith', role: 'client' },
      timestamp: '2024-01-15T10:17:00Z', 
      message_type: 'text',
      read_by: ['aud1', 'lead1']
    }
  ];

  const mockParticipants: AuditorPresence[] = [
    {
      id: 'lead1',
      name: 'Sarah Chen',
      role: 'lead_auditor',
      status: 'online',
      avatar: '/avatars/sarah.jpg',
      current_location: 'Smart Contract Review',
      activity: 'reviewing_code'
    },
    {
      id: 'aud1', 
      name: 'Alex Rodriguez',
      role: 'auditor',
      status: 'online',
      avatar: '/avatars/alex.jpg',
      current_location: 'Security Analysis',
      activity: 'writing_report'
    },
    {
      id: 'aud2',
      name: 'Emma Wilson', 
      role: 'auditor',
      status: 'in_call',
      avatar: '/avatars/emma.jpg',
      current_location: 'Architecture Review',
      activity: 'in_meeting'
    },
    {
      id: 'user1',
      name: 'Michael Smith',
      role: 'client',
      status: 'online',
      avatar: '/avatars/michael.jpg',
      current_location: 'Dashboard',
      activity: 'idle'
    }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mockMessages]);

  // Handle typing indicators
  const handleTyping = useCallback((isTyping: boolean) => {
    setIsTyping(isTyping);
    sendTypingIndicator?.(isTyping);
    
    if (isTyping) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        sendTypingIndicator?.(false);
      }, 3000);
    }
  }, [sendTypingIndicator]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage?.(newMessage, messageType);
      setNewMessage('');
      setMessageType('text');
      handleTyping(false);
      toast.success('Message sent');
    } catch (error) {
      toast.error('Failed to send message');
    }
  }, [newMessage, messageType, sendMessage, handleTyping]);

  const handleReaction = useCallback((messageId: string, emoji: string) => {
    // In real implementation, this would update the message reactions
    toast.success(`Added ${emoji} reaction`);
  }, []);

  const getStatusColor = (status: AuditorPresence['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'in_call': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityIcon = (activity?: AuditorPresence['activity']) => {
    switch (activity) {
      case 'reviewing_code': return <FileText className="h-3 w-3" />;
      case 'writing_report': return <FileText className="h-3 w-3" />;
      case 'in_meeting': return <Video className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const ConnectionStatus = () => (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className={cn(
        "h-2 w-2 rounded-full",
        isConnected && presenceConnected ? "bg-green-500" : "bg-red-500"
      )} />
      <span>{isConnected && presenceConnected ? 'Connected' : 'Reconnecting...'}</span>
    </div>
  );

  const TypingIndicator = () => {
    if (!typingUsers || typingUsers.length === 0) return null;
    
    return (
      <div className="flex items-center gap-2 p-2 text-xs text-muted-foreground">
        <div className="flex space-x-1">
          <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-1 w-1 bg-current rounded-full animate-bounce" />
        </div>
        <span>
          {typingUsers.length === 1 
            ? `Someone is typing...` 
            : `${typingUsers.length} people are typing...`
          }
        </span>
      </div>
    );
  };

  const MessageItem = ({ message }: { message: EnhancedMessage }) => (
    <div className={cn(
      "group relative p-3 rounded-lg transition-colors hover:bg-muted/50",
      message.pinned && "border-l-4 border-l-yellow-500 bg-yellow-50/50"
    )}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{message.sender.name}</span>
            <Badge 
              variant={message.sender.role === 'lead_auditor' ? 'default' : 'outline'}
              className="h-4 text-xs"
            >
              {message.sender.role.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
            {message.pinned && <Pin className="h-3 w-3 text-yellow-600" />}
            {message.edited && <span className="text-xs text-muted-foreground">(edited)</span>}
          </div>
          
          <div className={cn(
            "prose prose-sm max-w-none",
            message.message_type === 'finding' && "bg-red-50 border border-red-200 p-2 rounded",
            message.message_type === 'code_snippet' && "bg-gray-50 border border-gray-200 p-2 rounded font-mono text-sm",
            message.message_type === 'system' && "bg-blue-50 border border-blue-200 p-2 rounded font-medium"
          )}>
            {message.content}
          </div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                  <FileText className="h-4 w-4" />
                  <span className="flex-1 truncate">{attachment.name}</span>
                  <span className="text-xs text-muted-foreground">{attachment.size}</span>
                </div>
              ))}
            </div>
          )}
          
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-2">
              {message.reactions.map((reaction, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => handleReaction(message.id, reaction.emoji)}
                >
                  {reaction.emoji} {reaction.users.length}
                </Button>
              ))}
            </div>
          )}
          
          {message.read_by && (
            <div className="flex items-center gap-1 mt-1">
              <Eye className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Read by {message.read_by.length}
              </span>
            </div>
          )}
        </div>
        
        {/* Message actions - shown on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <Card className="flex flex-col h-[700px] overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {auditName}
                  {isMultiAuditor && (
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      Multi-Auditor
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <ConnectionStatus />
                  <span>{mockParticipants.length} participants</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isMultiAuditor && onInviteAuditor && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={onInviteAuditor}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Invite Auditor</TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onStartCall}>
                    <Video className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start Video Call</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onScreenShare}>
                    <ScreenShare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Screen Share</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1 gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
              {typingUsers && typingUsers.length > 0 && (
                <Badge variant="secondary" className="h-4 text-xs">{typingUsers.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="team" className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Team ({mockParticipants.filter(p => p.status === 'online').length})
            </TabsTrigger>
            <TabsTrigger value="files" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex-1 gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>
          
          {/* Enhanced Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col space-y-0 mt-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {mockMessages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
                <TypingIndicator />
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <Separator />
            
            <div className="p-4 space-y-3">
              {/* Message type selector */}
              <div className="flex gap-2">
                <Button
                  variant={messageType === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMessageType('text')}
                >
                  Text
                </Button>
                <Button
                  variant={messageType === 'code_snippet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMessageType('code_snippet')}
                >
                  Code
                </Button>
                <Button
                  variant={messageType === 'finding' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMessageType('finding')}
                >
                  Finding
                </Button>
              </div>
              
              {/* Message input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping(e.target.value.length > 0);
                  }}
                  placeholder={
                    messageType === 'text' ? 'Type your message...' :
                    messageType === 'code_snippet' ? 'Paste your code snippet...' :
                    'Describe the security finding...'
                  }
                  className="min-h-[60px] flex-1 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!newMessage.trim() || messagesLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          {/* Enhanced Team Tab */}
          <TabsContent value="team" className="flex-1 mt-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Team Members</h3>
                  {isMultiAuditor && (
                    <Button variant="outline" size="sm" onClick={onInviteAuditor}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Auditor
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background flex items-center justify-center",
                          getStatusColor(participant.status)
                        )}>
                          {participant.status === 'in_call' && <Video className="h-2 w-2 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{participant.name}</span>
                          <Badge variant={participant.role === 'lead_auditor' ? 'default' : 'outline'} className="text-xs">
                            {participant.role.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {getActivityIcon(participant.activity)}
                          <span className="truncate">
                            {participant.current_location} • {participant.activity?.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Send Message</TooltipContent>
                        </Tooltip>
                        
                        {participant.status === 'online' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Video className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Start Call</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Files and Schedule tabs remain similar to original but enhanced */}
          <TabsContent value="files" className="flex-1 flex items-center justify-center mt-0">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">Shared Files</h3>
              <p className="text-muted-foreground mb-4">
                Share audit files, reports, and code snippets with the team.
              </p>
              <Button>Upload Files</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="flex-1 flex items-center justify-center mt-0">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">Schedule & Milestones</h3>
              <p className="text-muted-foreground mb-4">
                Coordinate audit timelines, meetings, and deliverable deadlines.
              </p>
              <Button>Schedule Meeting</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </TooltipProvider>
  );
} 