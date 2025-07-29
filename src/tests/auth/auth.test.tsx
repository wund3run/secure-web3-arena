import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { toast } from 'sonner';
import { TestComponent } from './TestComponent';
import { mockUser, mockSession, mockProfile, mockRoles } from './mocks';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

// Mock toast notifications
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Reset localStorage
    localStorage.clear();
    
    // Mock successful session
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    // Mock successful profile fetch
    (supabase.from as any)().select().eq().single.mockResolvedValue({
      data: mockProfile,
      error: null,
    });

    // Mock successful roles fetch
    (supabase.from as any)().select().eq.mockResolvedValue({
      data: mockRoles,
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('initializes with loading state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('loads cached session data when available', async () => {
    // Set up cached data
    localStorage.setItem('auth_session', JSON.stringify(mockSession));
    localStorage.setItem('auth_profile', JSON.stringify(mockProfile));
    localStorage.setItem('auth_roles', JSON.stringify(mockRoles));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged in');
    });
  });

  it('handles offline mode gracefully', async () => {
    // Simulate offline mode
    const originalOnline = window.navigator.onLine;
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('offline')).toHaveTextContent('true');
    });

    // Restore online status
    Object.defineProperty(window.navigator, 'onLine', {
      value: originalOnline,
      configurable: true,
    });
  });

  it('signs in successfully', async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId('signin-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged in');
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('handles sign in errors', async () => {
    const errorMessage = 'Invalid credentials';
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: null,
      error: new Error(errorMessage),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      try {
        await userEvent.click(screen.getByTestId('signin-button'));
      } catch (e) {
        // Optionally log or assert on error
      }
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('signs up successfully', async () => {
    (supabase.auth.signUp as any).mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId('signup-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged in');
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('handles sign up errors', async () => {
    const errorMessage = 'Email already exists';
    (supabase.auth.signUp as any).mockResolvedValue({
      data: null,
      error: new Error(errorMessage),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId('signup-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('signs out successfully', async () => {
    (supabase.auth.signOut as any).mockResolvedValue({
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId('signout-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('not logged in');
      expect(localStorage.getItem('auth_session')).toBeNull();
      expect(localStorage.getItem('auth_profile')).toBeNull();
      expect(localStorage.getItem('auth_roles')).toBeNull();
    });
  });

  it('handles network errors during initialization', async () => {
    const errorMessage = 'Network error';
    (supabase.auth.getSession as any).mockRejectedValue(new Error(errorMessage));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('retries failed profile fetches', async () => {
    const successfulProfile = { ...mockProfile };
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: successfulProfile, error: null });

    (supabase.from as any)().select().eq().single.mockImplementation(fetchMock);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });
  });

  it('updates auth state on auth state change', async () => {
    let authChangeCallback: any;
    (supabase.auth.onAuthStateChange as any).mockImplementation((callback) => {
      authChangeCallback = callback;
      return {
        data: { subscription: { unsubscribe: vi.fn() } },
      };
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await authChangeCallback('SIGNED_IN', mockSession);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('logged in');
    });

    await act(async () => {
      await authChangeCallback('SIGNED_OUT', null);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('not logged in');
    });
  });
}); 