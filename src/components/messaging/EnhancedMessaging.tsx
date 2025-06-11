
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Video, 
  Phone, 
  MoreVertical,
  Smile,
  FileText,
  Image,
  Archive,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'voice' | 'image';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isRead: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
}

export const EnhancedMessaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: '/avatars/alex.jpg',
      lastMessage: 'The audit report is ready for review',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      lastMessage: 'Can we schedule a call tomorrow?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Security Team',
      lastMessage: 'New vulnerability discovered',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 5,
      isOnline: true,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Alex Chen',
      senderAvatar: '/avatars/alex.jpg',
      content: 'Hi! I\'ve completed the initial analysis of your smart contract.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: 'text',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      content: 'Great! What did you find?',
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      type: 'text',
      isRead: true,
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Alex Chen',
      senderAvatar: '/avatars/alex.jpg',
      content: 'I found a few issues that need attention. Let me share the detailed report.',
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
      type: 'text',
      isRead: true,
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Alex Chen',
      senderAvatar: '/avatars/alex.jpg',
      content: '',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      type: 'file',
      fileName: 'security_audit_report.pdf',
      fileSize: 2048576,
      fileUrl: '/reports/audit.pdf',
      isRead: false,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const startVoiceCall = () => {
    console.log('Starting voice call...');
  };

  const startVideoCall = () => {
    console.log('Starting video call...');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <Image className="h-4 w-4" />;
    }
    if (['zip', 'rar', '7z'].includes(ext || '')) {
      return <Archive className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r bg-muted/10">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <ScrollArea className="h-[calc(600px-60px)]">
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant={selectedConversation === conversation.id ? "secondary" : "ghost"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{conversation.name}</span>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="h-5 w-5 p-0 text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedConv?.avatar} />
                  <AvatarFallback>{selectedConv?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConv?.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {selectedConv?.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={startVoiceCall}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={startVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.senderId === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.senderId !== 'me' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.senderAvatar} />
                        <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                        msg.senderId === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.type === 'text' && (
                        <p className="text-sm">{msg.content}</p>
                      )}
                      {msg.type === 'file' && (
                        <div className="flex items-center gap-2 p-2 border rounded">
                          {getFileIcon(msg.fileName || '')}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{msg.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {msg.fileSize && formatFileSize(msg.fileSize)}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      )}
                      <span className="text-xs opacity-70 mt-1 block">
                        {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                </div>
                <Button
                  variant={isRecording ? "destructive" : "ghost"}
                  size="sm"
                  onClick={toggleRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={(e) => {
                // Handle file selection
                console.log('Files selected:', e.target.files);
              }}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Send className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
