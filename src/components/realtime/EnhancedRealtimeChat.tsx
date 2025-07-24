import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEnhancedRealtimeMessaging } from '@/hooks/useEnhancedRealtimeMessaging';
import { useAuth } from '@/contexts/auth';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Circle,
  CheckCheck,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tables } from '@/integrations/supabase/types';
import { EngagementOfferService } from '@/services/engagementOfferService';
import { useToast } from '@/hooks/use-toast';
import { Collapse } from '@/components/ui/collapse';

type AuditMessage = Tables<'audit_messages'>;

interface EnhancedRealtimeChatProps {
  auditRequestId: string;
  otherParticipant: {
    id: string;
    name: string;
    avatar?: string;
    role: 'client' | 'auditor';
  };
  className?: string;
}

export function EnhancedRealtimeChat({
  auditRequestId,
  otherParticipant,
  className
}: EnhancedRealtimeChatProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerScope, setOfferScope] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [offerTimeline, setOfferTimeline] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [latestOffer, setLatestOffer] = useState<EngagementOffer | null>(null);
  const [offerHistory, setOfferHistory] = useState<EngagementOffer[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [offerError, setOfferError] = useState('');
  const [notificationFeed, setNotificationFeed] = useState<any[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const {
    messages,
    isConnected,
    typingUsers,
    unreadCount,
    loading,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
  } = useEnhancedRealtimeMessaging(user?.id, auditRequestId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read when component is visible
  useEffect(() => {
    if (messages.length > 0 && user?.id) {
      const unreadMessageIds = messages
        .filter(msg => msg.sender_id !== user.id && !msg.is_read)
        .map(msg => msg.id);
      
      if (unreadMessageIds.length > 0) {
        markAsRead(unreadMessageIds);
      }
    }
  }, [messages, user?.id, markAsRead]);

  useEffect(() => {
    async function poll() {
      const offer = await EngagementOfferService.getLatestOfferForAudit(auditRequestId, otherParticipant.id);
      setLatestOffer(offer);
      const history = await EngagementOfferService.getOffersForAudit(auditRequestId);
      setOfferHistory(history.filter(o => o.auditor_id === otherParticipant.id));
      // Fetch notifications for this audit/offer
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .or(`metadata->>audit_request_id.eq.${auditRequestId},metadata->>offer_id.eq.${offer?.id}`)
        .order('created_at', { ascending: false });
      setNotificationFeed(notifications || []);
    }
    poll();
    pollingRef.current = setInterval(poll, 10000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [auditRequestId, otherParticipant.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage(newMessage.trim());
    setNewMessage('');
    setIsTyping(false);
    sendTypingIndicator(false);
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      sendTypingIndicator(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingIndicator(false);
    }, 1000);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessageStatus = (message: AuditMessage) => {
    if (message.sender_id !== user?.id) return null;
    
    if (message.is_read) {
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    } else {
      return <CheckCheck className="h-3 w-3 text-gray-400" />;
    }
  };

  const handleAcceptReject = async (status: 'accepted' | 'rejected') => {
    if (!latestOffer) return;
    try {
      const updated = await EngagementOfferService.acceptOrRejectOffer(latestOffer.id, status);
      setLatestOffer(updated);
      await supabase.from('notifications').insert({
        user_id: latestOffer.client_id,
        title: `Offer ${status === 'accepted' ? 'Accepted' : 'Rejected'}`,
        message: `Your engagement offer for audit request ${auditRequestId} was ${status}.`,
        type: 'info',
        metadata: { audit_request_id: auditRequestId, offer_id: latestOffer.id }
      });
      toast({ title: `Offer ${status.charAt(0).toUpperCase() + status.slice(1)}`, description: `Offer ${status}.` });
    } catch (err) {
      toast({ title: 'Error', description: `Failed to ${status} offer`, variant: 'destructive' });
    }
  };

  const validateOffer = () => {
    if (!offerScope.trim() || !offerPrice.trim() || !offerTimeline.trim()) {
      setOfferError('All fields are required.');
      return false;
    }
    if (isNaN(Number(offerPrice)) || Number(offerPrice) <= 0) {
      setOfferError('Price must be a positive number.');
      return false;
    }
    if (isNaN(Number(offerTimeline)) || Number(offerTimeline) <= 0) {
      setOfferError('Timeline must be a positive number.');
      return false;
    }
    setOfferError('');
    return true;
  };

  const handleSendOffer = async () => {
    if (!validateOffer()) return;
    setSubmittingOffer(true);
    try {
      const terms = { scope: offerScope, price: offerPrice, timeline: offerTimeline };
      const offer = await EngagementOfferService.createOffer(
        auditRequestId,
        otherParticipant.id,
        user?.id,
        terms
      );
      if (offer) {
        // Insert notification for auditor
        await supabase.from('notifications').insert({
          user_id: otherParticipant.id,
          title: 'New Engagement Offer',
          message: `You have received an engagement offer for audit request ${auditRequestId}.`,
          type: 'info',
          metadata: { audit_request_id: auditRequestId, offer_id: offer.id }
        });
        toast({ title: 'Offer Sent', description: 'Engagement offer sent to auditor.' });
        setOfferModalOpen(false);
        setOfferScope(''); setOfferPrice(''); setOfferTimeline('');
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send offer', variant: 'destructive' });
    } finally {
      setSubmittingOffer(false);
    }
  };

  const handleCounterOffer = () => {
    if (!latestOffer) return;
    setOfferScope(latestOffer.terms.scope);
    setOfferPrice(latestOffer.terms.price);
    setOfferTimeline(latestOffer.terms.timeline);
    setOfferModalOpen(true);
    setOfferError('');
  };

  const handleSendCounterOffer = async () => {
    if (!validateOffer()) return;
    setSubmittingOffer(true);
    try {
      await EngagementOfferService.createCounterOffer(
        auditRequestId,
        otherParticipant.id,
        user.id,
        { scope: offerScope, price: offerPrice, timeline: offerTimeline },
        latestOffer?.id
      );
      setOfferModalOpen(false);
      setOfferScope('');
      setOfferPrice('');
      setOfferTimeline('');
      toast({ title: 'Counter-Offer Sent', description: 'Your counter-offer has been sent.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send counter-offer', variant: 'destructive' });
    } finally {
      setSubmittingOffer(false);
    }
  };

  return (
    <Card className={cn("flex flex-col h-[600px]", className)}>
      {/* Header */}
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherParticipant.avatar} />
            <AvatarFallback>
              {otherParticipant.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{otherParticipant.name}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {otherParticipant.role}
              </Badge>
              <div className="flex items-center space-x-1">
                <Circle 
                  className={cn(
                    "h-2 w-2 fill-current",
                    isConnected ? "text-green-500" : "text-gray-400"
                  )} 
                />
                <span className="text-xs text-gray-500">
                  {isConnected ? "Connected" : "Connecting..."}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          )}
          
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex space-x-3",
                    isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant.avatar} />
                      <AvatarFallback>
                        {otherParticipant.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 max-w-xs lg:max-w-md break-words",
                        isOwn
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {message.file_attachments && (
                        <div className="mt-2 text-xs opacity-80">
                          📎 Attachment
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(message.created_at || '')}
                      </span>
                      {getMessageStatus(message)}
                    </div>
                  </div>
                  
                  {isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
            
            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={otherParticipant.avatar} />
                  <AvatarFallback>
                    {otherParticipant.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-xs text-gray-500">typing...</span>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={!isConnected}
          />
          
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim() || !isConnected}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        {unreadCount > 0 && (
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="text-xs">
              {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>

      {/* Send Engagement Offer Button */}
      <Button onClick={() => setOfferModalOpen(true)} variant="outline" className="mt-2">Send Engagement Offer</Button>
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Send Engagement Offer</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Scope</label>
              <Input value={offerScope} onChange={e => setOfferScope(e.target.value)} placeholder="Audit scope" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price (USD)</label>
              <Input value={offerPrice} onChange={e => setOfferPrice(e.target.value)} placeholder="e.g. 5000" type="number" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Timeline (days)</label>
              <Input value={offerTimeline} onChange={e => setOfferTimeline(e.target.value)} placeholder="e.g. 14" type="number" />
            </div>
            {offerError && <div className="text-red-600 text-sm mb-2">{offerError}</div>}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOfferModalOpen(false)} disabled={submittingOffer}>Cancel</Button>
              <Button onClick={handleSendOffer} loading={submittingOffer} disabled={submittingOffer}>Send Offer</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 