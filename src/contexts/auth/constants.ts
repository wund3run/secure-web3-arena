
// Authentication constants

// Auth state event types
export const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED'
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hawkly_auth_token',
  REFRESH_TOKEN: 'hawkly_refresh_token',
  USER_DATA: 'hawkly_user_data'
};

// Auth redirect paths
export const REDIRECT_PATHS = {
  AFTER_LOGIN: '/',
  AFTER_SIGNUP: '/',
  AFTER_LOGOUT: '/auth',
  CALLBACK: '/auth-callback'
};

// Auth error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email address is already in use',
  WEAK_PASSWORD: 'Password is too weak',
  EXPIRED_SESSION: 'Your session has expired, please log in again',
  GENERIC_ERROR: 'Authentication error occurred'
};

// Default timeout values (in milliseconds)
export const TIMEOUTS = {
  SESSION_EXPIRY: 3600000, // 1 hour
  TOKEN_REFRESH: 300000,   // 5 minutes
  OTP_EXPIRY: 300000       // 5 minutes
};

// Authentication requirements
export const REQUIREMENTS = {
  MIN_PASSWORD_LENGTH: 8,
  REQUIRE_CAPTCHA: true,
  REQUIRE_EMAIL_VERIFICATION: true
};

// Default authentication options
export const DEFAULT_AUTH_OPTIONS = {
  persistSession: true,
  autoRefreshToken: true
};
