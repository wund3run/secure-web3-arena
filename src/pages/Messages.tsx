
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, MessageCircle, Clock } from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'SecureCode Labs',
      lastMessage: 'Initial audit findings have been completed',
      timestamp: '2 hours ago',
      unread: 2,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: '2',
      name: 'CyberSec Auditors',
      lastMessage: 'Ready to start the review process',
      timestamp: '1 day ago',
      unread: 0,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: '3',
      name: 'Blockchain Security Co.',
      lastMessage: 'Quote for smart contract audit',
      timestamp: '3 days ago',
      unread: 1,
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'SecureCode Labs',
      content: 'Hello! We have completed the initial review of your smart contracts.',
      timestamp: '2 hours ago',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Great! When can we expect the detailed report?',
      timestamp: '1 hour ago',
      isOwn: true
    },
    {
      id: '3',
      sender: 'SecureCode Labs',
      content: 'The detailed report will be ready by tomorrow. We found a few medium-severity issues that need attention.',
      timestamp: '30 minutes ago',
      isOwn: false
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Messages | Hawkly</title>
        <meta name="description" content="Communicate with auditors and manage your conversations" />
      </Helmet>
      
      <StandardLayout
        title="Messages"
        description="Communicate with auditors and project teams"
      >
        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Conversations
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{conversation.name}</h4>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b">
                    <CardTitle>SecureCode Labs</CardTitle>
                    <CardDescription>Audit Discussion</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 opacity-70" />
                              <span className="text-xs opacity-70">
                                {message.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 resize-none"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                        />
                        <Button onClick={sendMessage} className="self-end">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </StandardLayout>
    </>
  );
};

export default Messages;
