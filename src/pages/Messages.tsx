
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Plus, Clock } from 'lucide-react';

export default function Messages() {
  // Mock conversations data
  const conversations = [
    {
      id: '1',
      participant: 'SecureCode Auditors',
      lastMessage: 'The initial security review has been completed. We found 3 medium-priority issues.',
      timestamp: '2 hours ago',
      unread: true,
      projectName: 'DeFi Protocol Audit'
    },
    {
      id: '2',
      participant: 'CryptoSecure Team',
      lastMessage: 'Thank you for the comprehensive report. We are working on addressing the vulnerabilities.',
      timestamp: '1 day ago',
      unread: false,
      projectName: 'Smart Contract Review'
    },
    {
      id: '3',
      participant: 'BlockSafe Auditing',
      lastMessage: 'The audit has been scheduled for next week. Please prepare the documentation.',
      timestamp: '3 days ago',
      unread: false,
      projectName: 'NFT Platform Audit'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Messages
          </h1>
          <p className="text-muted-foreground mt-1">
            Communicate with auditors and project teams
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>Recent messages and ongoing discussions</CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    conversation.unread ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium">{conversation.participant}</div>
                    <div className="flex items-center gap-2">
                      {conversation.unread && (
                        <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {conversation.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {conversation.projectName}
                  </div>
                  <div className="text-sm text-foreground line-clamp-2">
                    {conversation.lastMessage}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Select a conversation</CardTitle>
              <CardDescription>
                Choose a conversation from the left to view messages
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
                <p className="text-sm mt-2">
                  All your audit-related communications will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
