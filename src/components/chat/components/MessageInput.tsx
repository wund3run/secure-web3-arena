import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isConnected: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function MessageInput({ 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  onKeyPress, 
  isConnected, 
  inputRef 
}: MessageInputProps) {
  return (
    <div className="border-t p-3">
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type a message..."
          className="flex-1"
          disabled={!isConnected}
        />
        <Button 
          size="sm" 
          onClick={onSendMessage}
          disabled={!newMessage.trim() || !isConnected}
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
