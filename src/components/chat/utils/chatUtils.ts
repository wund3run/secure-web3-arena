
import { ChatParticipant } from '../types';

export const getParticipantByRole = (participants: ChatParticipant[], role: 'client' | 'auditor') => {
  return participants.find(p => p.role === role);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'busy': return 'bg-yellow-500';
    default: return 'bg-gray-400';
  }
};
