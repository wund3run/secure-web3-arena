
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ConversationsList } from '@/components/messaging/ConversationsList';
import { RealtimeMessagingInterface } from '@/components/messaging/RealtimeMessagingInterface';
import { MessageNotificationCenter } from '@/components/notifications/MessageNotificationCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bell } from 'lucide-react';

interface Conversation {
  id: string;
  audit_request_id?: string;
  client_id?: string;
  auditor_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  other_participant?: {
    id: string;
    name: string;
  };
}

const MessagingPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <Helmet>
        <title>Messages | Hawkly</title>
        <meta name="description" content="Real-time messaging and notifications" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">
                Communicate with auditors and clients in real-time
              </p>
            </div>

            <Tabs defaultValue="conversations" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="conversations" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Conversations
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversations" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
                  <div className="lg:col-span-1">
                    <ConversationsList
                      onSelectConversation={handleSelectConversation}
                      selectedConversationId={selectedConversation?.id}
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    {selectedConversation ? (
                      <RealtimeMessagingInterface
                        conversationId={selectedConversation.id}
                        receiverId={selectedConversation.other_participant?.id || ''}
                        receiverName={selectedConversation.other_participant?.name}
                        className="h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full border-2 border-dashed border-muted rounded-lg">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                          <p className="text-muted-foreground">
                            Choose a conversation from the list to start messaging
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="flex justify-center">
                  <MessageNotificationCenter />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MessagingPage;
