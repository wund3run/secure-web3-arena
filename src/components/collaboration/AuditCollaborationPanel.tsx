
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, FileText, Calendar, ChevronDown, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuditMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'auditor' | 'client' | 'system';
  };
  content: string;
  timestamp: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size?: string;
  }>;
  status?: 'sent' | 'delivered' | 'read';
}

export interface AuditCollaborationPanelProps {
  auditId: string;
  auditName: string;
  messages: AuditMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  participants?: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: string;
    status: 'online' | 'offline' | 'away';
  }>;
  className?: string;
}

export function AuditCollaborationPanel({
  auditId,
  auditName,
  messages,
  onSendMessage,
  isLoading = false,
  participants = [],
  className
}: AuditCollaborationPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return "bg-green-500";
      case 'away': return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <Card className={cn("flex flex-col h-[600px] overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{auditName}</CardTitle>
            <CardDescription>Real-time collaboration</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>Live</span>
          </Badge>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1 gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="files" className="flex-1 gap-2">
            <FileText className="h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1 gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="team" className="flex-1 gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>
        
        {/* Chat tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col space-y-4 mt-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex gap-2",
                    message.sender.role === 'system' && "justify-center"
                  )}
                >
                  {message.sender.role !== 'system' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>
                        {message.sender.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1">
                    {message.sender.role !== 'system' && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{message.sender.name}</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "h-5 text-xs capitalize",
                            message.sender.role === 'auditor' ? "bg-primary/10 text-primary" : 
                            message.sender.role === 'client' ? "bg-blue-500/10 text-blue-500" : ""
                          )}
                        >
                          {message.sender.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                    )}
                    
                    <div 
                      className={cn(
                        "mt-1 p-3 rounded-md",
                        message.sender.role === 'system' ? 
                          "bg-muted text-center text-sm inline-block mx-auto px-4" :
                        message.sender.role === 'auditor' ? 
                          "bg-primary/10" : 
                          "bg-card border"
                      )}
                    >
                      {message.content}
                    </div>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="flex-1 truncate">{attachment.name}</span>
                            {attachment.size && (
                              <span className="text-xs text-muted-foreground">{attachment.size}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="space-x-1 flex items-center">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <CardFooter className="p-4 pt-0">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Textarea
                className="min-h-[60px] flex-1 resize-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!newMessage.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </TabsContent>
        
        {/* Team tab */}
        <TabsContent value="team" className="flex-1 mt-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-2">Participants</h3>
              
              <div className="divide-y">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>
                            {participant.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div 
                          className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                            getStatusIndicator(participant.status)
                          )}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-xs text-muted-foreground">{participant.role}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Send message
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        {/* Placeholder tabs */}
        <TabsContent value="files" className="flex-1 flex items-center justify-center mt-0">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">File Sharing</h3>
            <p className="text-muted-foreground">
              Share contract files and audit reports here. <br />
              Drag & drop files or click to upload.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="flex-1 flex items-center justify-center mt-0">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">Audit Schedule</h3>
            <p className="text-muted-foreground">
              Schedule audit milestones, meetings and review sessions.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
