
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Video, MoreHorizontal, Minimize2 } from 'lucide-react';
import { ChatParticipant } from '../types';
import { getParticipantByRole, getStatusColor } from '../utils/chatUtils';

interface ChatHeaderProps {
  participants: ChatParticipant[];
  isConnected: boolean;
  onToggleMinimize?: () => void;
}

export function ChatHeader({ participants, isConnected, onToggleMinimize }: ChatHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          Chat with {getParticipantByRole(participants, 'auditor')?.name || 'Auditor'}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Phone className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Video className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggleMinimize}>
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        {participants.map(participant => (
          <div key={participant.id} className="flex items-center gap-1">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(participant.status)}`} />
            <span className="text-xs text-muted-foreground">{participant.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
