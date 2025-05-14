
/// <reference types="vite/client" />

declare namespace Auth {
  interface UserProfile {
    id: string;
    email?: string;
    full_name?: string;
    avatar_url?: string;
    created_at?: string;
    updated_at?: string;
    wallet_address?: string;
  }

  interface AuthEventPayload {
    event: string;
    session: any | null;
  }

  interface AuthResponse {
    user: any | null;
    session: any | null;
    error: Error | null;
  }
}

declare namespace Marketplace {
  interface SearchFilters {
    category: string | null;
    priceRange: [number, number];
    blockchains: string[];
    rating: number | null;
    deliveryTime: string | null;
  }
}

// Global Hawkly platform types
declare namespace Hawkly {
  type NotificationType = 'info' | 'success' | 'warning' | 'error';
  
  interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    description?: string;
    createdAt: Date;
    read: boolean;
  }
}

