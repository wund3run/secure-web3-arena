
export const Environment = {
  isDevelopment: () => window.location.hostname === 'localhost',
  isProduction: () => window.location.hostname !== 'localhost',
  
  // API Configuration
  supabaseUrl: 'https://divymuaksqdgjsrlptct.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU',
  
  // CDN Configuration
  cdnUrl: 'https://cdn.hawkly.dev',
  assetsUrl: 'https://assets.hawkly.dev',
  
  // Analytics Configuration
  analyticsEnabled: true,
  
  // Monitoring Configuration
  monitoringEnabled: true,
  errorReportingEnabled: true,
  
  // Feature Flags
  features: {
    realTimeUpdates: true,
    aiMatching: true,
    escrowPayments: true,
    advancedAnalytics: true,
  }
};
