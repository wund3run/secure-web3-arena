
export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  type: 'text' | 'file' | 'image' | 'system';
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
  replyTo?: string;
  reactions: ChatReaction[];
  metadata?: Record<string, any>;
}

export interface ChatReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'audit';
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  archived: boolean;
  metadata?: Record<string, any>;
}

export interface ChatEvent {
  type: 'message' | 'typing' | 'reaction' | 'join' | 'leave' | 'edit' | 'delete';
  data: any;
  timestamp: Date;
  userId: string;
}

export class RealtimeChatSystem {
  private static instance: RealtimeChatSystem;
  private ws: WebSocket | null = null;
  private currentUserId: string = '';
  private currentRoomId: string = '';
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;
  private eventListeners: Map<string, Function[]> = new Map();
  private messageQueue: ChatMessage[] = [];
  private typingUsers: Set<string> = new Set();
  private connectionState: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';

  static getInstance(): RealtimeChatSystem {
    if (!RealtimeChatSystem.instance) {
      RealtimeChatSystem.instance = new RealtimeChatSystem();
    }
    return RealtimeChatSystem.instance;
  }

  async connect(userId: string, authToken: string): Promise<boolean> {
    this.currentUserId = userId;
    this.connectionState = 'connecting';
    
    try {
      // Connect to WebSocket endpoint
      const wsUrl = this.buildWebSocketUrl(authToken);
      this.ws = new WebSocket(wsUrl);
      
      this.setupWebSocketHandlers();
      
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          this.connectionState = 'error';
          resolve(false);
        }, 10000);

        this.ws!.onopen = () => {
          clearTimeout(timeout);
          this.connectionState = 'connected';
          this.reconnectAttempts = 0;
          this.flushMessageQueue();
          this.emit('connected');
          resolve(true);
        };

        this.ws!.onerror = () => {
          clearTimeout(timeout);
          this.connectionState = 'error';
          resolve(false);
        };
      });
    } catch (error) {
      console.error('Failed to connect to chat:', error);
      this.connectionState = 'error';
      return false;
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connectionState = 'disconnected';
    this.emit('disconnected');
  }

  joinRoom(roomId: string) {
    this.currentRoomId = roomId;
    this.sendEvent({
      type: 'join',
      data: { roomId },
      timestamp: new Date(),
      userId: this.currentUserId
    });
  }

  leaveRoom() {
    if (this.currentRoomId) {
      this.sendEvent({
        type: 'leave',
        data: { roomId: this.currentRoomId },
        timestamp: new Date(),
        userId: this.currentUserId
      });
      this.currentRoomId = '';
    }
  }

  sendMessage(content: string, type: 'text' | 'file' | 'image' = 'text', metadata?: Record<string, any>): ChatMessage {
    const message: ChatMessage = {
      id: this.generateMessageId(),
      roomId: this.currentRoomId,
      userId: this.currentUserId,
      userName: '', // Will be populated by server
      content,
      type,
      timestamp: new Date(),
      reactions: [],
      metadata
    };

    if (this.connectionState === 'connected') {
      this.sendEvent({
        type: 'message',
        data: message,
        timestamp: new Date(),
        userId: this.currentUserId
      });
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
    }

    return message;
  }

  editMessage(messageId: string, newContent: string) {
    this.sendEvent({
      type: 'edit',
      data: { messageId, content: newContent },
      timestamp: new Date(),
      userId: this.currentUserId
    });
  }

  deleteMessage(messageId: string) {
    this.sendEvent({
      type: 'delete',
      data: { messageId },
      timestamp: new Date(),
      userId: this.currentUserId
    });
  }

  addReaction(messageId: string, emoji: string) {
    this.sendEvent({
      type: 'reaction',
      data: { messageId, emoji, action: 'add' },
      timestamp: new Date(),
      userId: this.currentUserId
    });
  }

  removeReaction(messageId: string, emoji: string) {
    this.sendEvent({
      type: 'reaction',
      data: { messageId, emoji, action: 'remove' },
      timestamp: new Date(),
      userId: this.currentUserId
    });
  }

  startTyping() {
    if (!this.typingUsers.has(this.currentUserId)) {
      this.typingUsers.add(this.currentUserId);
      this.sendEvent({
        type: 'typing',
        data: { action: 'start' },
        timestamp: new Date(),
        userId: this.currentUserId
      });
    }
  }

  stopTyping() {
    if (this.typingUsers.has(this.currentUserId)) {
      this.typingUsers.delete(this.currentUserId);
      this.sendEvent({
        type: 'typing',
        data: { action: 'stop' },
        timestamp: new Date(),
        userId: this.currentUserId
      });
    }
  }

  async uploadFile(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('roomId', this.currentRoomId);

      const response = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  private setupWebSocketHandlers() {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      try {
        const chatEvent: ChatEvent = JSON.parse(event.data);
        this.handleIncomingEvent(chatEvent);
      } catch (error) {
        console.error('Failed to parse chat event:', error);
      }
    };

    this.ws.onclose = () => {
      this.connectionState = 'disconnected';
      this.emit('disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionState = 'error';
      this.emit('error', error);
    };
  }

  private handleIncomingEvent(event: ChatEvent) {
    switch (event.type) {
      case 'message':
        this.emit('message', event.data);
        break;
      case 'typing':
        this.handleTypingEvent(event);
        break;
      case 'reaction':
        this.emit('reaction', event.data);
        break;
      case 'edit':
        this.emit('messageEdited', event.data);
        break;
      case 'delete':
        this.emit('messageDeleted', event.data);
        break;
      case 'join':
        this.emit('userJoined', event.data);
        break;
      case 'leave':
        this.emit('userLeft', event.data);
        break;
    }
  }

  private handleTypingEvent(event: ChatEvent) {
    const { userId, action } = event.data;
    
    if (action === 'start') {
      this.typingUsers.add(userId);
    } else {
      this.typingUsers.delete(userId);
    }
    
    this.emit('typingChanged', Array.from(this.typingUsers));
  }

  private sendEvent(event: ChatEvent) {
    if (this.ws && this.connectionState === 'connected') {
      this.ws.send(JSON.stringify(event));
    }
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      this.sendEvent({
        type: 'message',
        data: message,
        timestamp: new Date(),
        userId: this.currentUserId
      });
    }
  }

  private async attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      setTimeout(() => {
        console.log(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
        this.connectionState = 'connecting';
        this.emit('reconnecting', this.reconnectAttempts);
        
        // Attempt to reconnect with stored auth
        // In a real implementation, you'd store and retrieve the auth token
        this.connect(this.currentUserId, '');
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      this.emit('reconnectFailed');
    }
  }

  private buildWebSocketUrl(authToken: string): string {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://api.hawkly.com/ws/chat'
      : 'ws://localhost:8080/ws/chat';
    
    return `${baseUrl}?token=${authToken}&userId=${this.currentUserId}`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Event system
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  getConnectionState(): string {
    return this.connectionState;
  }

  getCurrentRoom(): string {
    return this.currentRoomId;
  }

  getTypingUsers(): string[] {
    return Array.from(this.typingUsers).filter(id => id !== this.currentUserId);
  }
}

export const realtimeChat = RealtimeChatSystem.getInstance();
