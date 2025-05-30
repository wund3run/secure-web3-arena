
export const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API Configuration
  supabase: {
    url: 'https://divymuaksqdgjsrlptct.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU'
  },
  
  // External Services
  stripe: {
    publishableKey: process.env.NODE_ENV === 'production' 
      ? 'pk_live_51...' // Replace with actual production key when ready
      : 'pk_test_51QbOFDBLJ8LCUlAWyQJhxkL1qPZpPEy3hPJH6gWkpWGWGwJoQLuOJwJfSIE4AJ6rQbqI9eqJdZD5LkVKXxLHJBQd00x5hkN3pv' // Test key for development
  },
  
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX' // Replace with actual GA4 ID
  },
  
  // Feature Flags
  features: {
    enableAnalytics: true,
    enableErrorReporting: true,
    enableRealtime: true,
    enablePayments: true
  },
  
  // Performance
  performance: {
    enableServiceWorker: process.env.NODE_ENV === 'production',
    cacheStrategy: 'staleWhileRevalidate'
  }
};
