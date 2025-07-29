
export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  metadata?: Record<string, unknown>;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  role: 'client' | 'auditor' | 'support';
}

export interface RealtimeChatProps {
  chatId: string;
  participants: ChatParticipant[];
  onClose?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}
