
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Maximize2 } from 'lucide-react';
import { ChatParticipant, ChatMessage } from '../types';
import { getParticipantByRole } from '../utils/chatUtils';

interface MinimizedChatProps {
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isConnected: boolean;
  onToggleMinimize?: () => void;
}

export function MinimizedChat({ participants, messages, isConnected, onToggleMinimize }: MinimizedChatProps) {
  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50">
      <CardHeader className="pb-2 cursor-pointer" onClick={onToggleMinimize}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            Chat with {getParticipantByRole(participants, 'auditor')?.name || 'Auditor'}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
              {messages.length} messages
            </Badge>
            <Maximize2 className="h-3 w-3" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
