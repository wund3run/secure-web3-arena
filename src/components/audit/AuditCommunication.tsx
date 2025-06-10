
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip, User } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuditCommunicationProps {
  auditRequestId: string;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  message_type: string;
  file_attachments?: any[];
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
}

export function AuditCommunication({ auditRequestId }: AuditCommunicationProps) {
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['audit-messages', auditRequestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_messages')
        .select(`
          *,
          sender:sender_id(full_name, avatar_url)
        `)
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform the data to ensure proper typing
      return (data || []).map((item: any) => ({
        id: item.id,
        content: item.content,
        sender_id: item.sender_id,
        created_at: item.created_at,
        message_type: item.message_type,
        file_attachments: item.file_attachments || [],
        sender: item.sender && typeof item.sender === 'object' && !('error' in item.sender) 
          ? item.sender 
          : { full_name: 'Unknown User', avatar_url: undefined }
      })) as Message[];
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('audit_messages')
        .insert({
          audit_request_id: auditRequestId,
          sender_id: user.id,
          content,
          message_type: 'text'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit-messages', auditRequestId] });
      setNewMessage('');
      toast.success('Message sent');
    },
    onError: (error) => {
      toast.error('Failed to send message');
      console.error(error);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage.trim());
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Communication</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-12 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender?.avatar_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {message.sender?.full_name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.created_at)}
                    </span>
                    {message.message_type !== 'text' && (
                      <Badge variant="outline" className="text-xs">
                        {message.message_type}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{message.content}</p>
                    
                    {message.file_attachments && message.file_attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.file_attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Paperclip className="h-3 w-3" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim() || sendMessageMutation.isPending}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
