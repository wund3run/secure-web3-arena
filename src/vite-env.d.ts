/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    session: unknown | null;
    user: unknown | null;
  }
}

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
    session: unknown | null;
  }

  interface AuthResponse {
    user: unknown | null;
    session: unknown | null;
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

