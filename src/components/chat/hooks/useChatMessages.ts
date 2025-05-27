
import { useState, useEffect } from 'react';
import { ChatMessage } from '../types';

export function useChatMessages(chatId: string, userId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState<string[]>([]);

  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        content: 'Hello! I\'ve reviewed your smart contract and have some initial observations.',
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      },
      {
        id: '2',
        content: 'Great! I\'m eager to hear your feedback. What are the main areas of concern?',
        sender_id: userId || 'client-1',
        sender_name: 'You',
        timestamp: new Date(Date.now() - 240000),
        type: 'text'
      },
      {
        id: '3',
        content: 'The main concerns are around the access control patterns and potential reentrancy vulnerabilities in the withdrawal function.',
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 180000),
        type: 'text'
      }
    ];
    
    setMessages(mockMessages);
    setIsConnected(true);
  }, [chatId, userId]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const simulateResponse = () => {
    setTimeout(() => {
      const responses = [
        "Thanks for that clarification!",
        "I'll look into that right away.",
        "Let me check the documentation and get back to you.",
        "That's a great point. I'll update the report accordingly."
      ];
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(),
        type: 'text'
      };
      
      addMessage(response);
    }, 1000 + Math.random() * 2000);
  };

  return {
    messages,
    isConnected,
    isTyping,
    addMessage,
    simulateResponse,
    setIsTyping
  };
}
