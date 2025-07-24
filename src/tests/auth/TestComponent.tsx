import React from 'react';
import { useAuth } from '@/contexts/auth';

export const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="loading">{auth.loading.toString()}</div>
      <div data-testid="error">{auth.error || 'no error'}</div>
      <div data-testid="user">{auth.user ? 'logged in' : 'not logged in'}</div>
      <div data-testid="offline">{auth.isOffline.toString()}</div>
      <button
        data-testid="signin-button"
        onClick={() => auth.signIn('test@example.com', 'password')}
      >
        Sign In
      </button>
      <button
        data-testid="signup-button"
        onClick={() => auth.signUp('test@example.com', 'password', 'Test User', 'project_owner')}
      >
        Sign Up
      </button>
      <button
        data-testid="signout-button"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}; 