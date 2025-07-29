import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import PersonalizationSetup from '@/components/onboarding/PersonalizationSetup';
import { useAuth } from '@/contexts/auth';

// Mock dependencies
vi.mock('@/contexts/auth');
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { code: 'PGRST116' }
              })
            }))
          }))
        }))
      })),
      insert: vi.fn().mockResolvedValue({
        data: null,
        error: null
      })
    }))
  }
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com'
};

describe('PersonalizationSetup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });
  });

  it('renders the personalization setup component', async () => {
    render(
      <BrowserRouter>
        <PersonalizationSetup />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Personalize Your Experience')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows step progress', async () => {
    render(
      <BrowserRouter>
        <PersonalizationSetup />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
    });
  });
}); 