
/**
 * Authentication constants for the Hawkly platform
 * These constants are used throughout the authentication flow
 */

// Auth state event types
export const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
  USER_DELETED: 'USER_DELETED',
};

// Authentication providers
export const AUTH_PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  GITHUB: 'github',
  METAMASK: 'metamask',
  PHANTOM: 'phantom',
  COINBASE: 'coinbase',
  WALLETCONNECT: 'walletconnect',
};

// Redirection paths
export const AUTH_REDIRECTS = {
  AFTER_SIGN_IN: '/',
  AFTER_SIGN_UP: '/onboarding',
  AFTER_SIGN_OUT: '/',
  AFTER_PASSWORD_RECOVERY: '/auth',
};

// Storage keys
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'hawkly_access_token',
  REFRESH_TOKEN: 'hawkly_refresh_token',
  USER: 'hawkly_user',
};

// Auth error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email is already in use',
  WEAK_PASSWORD: 'Password is too weak',
  NETWORK_ERROR: 'Network error. Please try again',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

// Supabase auth configuration
export const AUTH_CONFIG = {
  persistSession: true,
  detectSessionInUrl: true,
  autoRefreshToken: true
};
