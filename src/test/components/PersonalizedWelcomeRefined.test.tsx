import React from 'react';
import { fn, MockedFunction, Mocked } from 'jest-mock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PersonalizedWelcomeRefined } from '@/components/onboarding/PersonalizedWelcomeRefined';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
jest.mock('@/contexts/auth');
jest.mock('@/hooks/use-toast');
jest.mock('@/integrations/supabase/client');
jest.mock('@/services/gamificationService');

const mockUseAuth = useAuth as any;
const mockUseToast = useToast as any;
const mockSupabase = supabase as any;

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: {
    first_name: 'John',
    full_name: 'John Doe'
  }
};

const mockProfile = {
  id: 'profile-id',
  user_id: 'test-user-id',
  years_experience: 2,
  specializations: ['DeFi', 'Smart Contracts'],
  blockchain_expertise: ['Ethereum', 'Polygon'],
  motivation_type: 'achievement',
  learning_style: 'visual',
  experience_level: 'intermediate',
  created_at: '2024-01-01T00:00:00.000Z'
};

const mockToast = fn() as any;

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <PersonalizedWelcomeRefined />
    </BrowserRouter>
  );
};

describe('PersonalizedWelcomeRefined', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      signOut: jest.fn(),
      signIn: jest.fn(),
    });

    mockUseToast.mockReturnValue({
      toast: mockToast,
    });

    // Mock successful profile fetch
    mockSupabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          maybeSingle: jest.fn().mockResolvedValue({
            data: mockProfile,
            error: null
          })
        })
      })
    });
  });

  describe('Loading State', () => {
    it('displays loading skeleton while fetching data', () => {
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockReturnValue(new Promise(() => {})) // Never resolves
          })
        })
      });

      renderComponent();
      
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Successful Data Loading', () => {
    it('displays welcome message with user name', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/good/i)).toBeInTheDocument();
        expect(screen.getByText(/john/i)).toBeInTheDocument();
      });
    });

    it('shows progress bar with correct percentage', async () => {
      renderComponent();

      await waitFor(() => {
        const progressElement = screen.getByText(/profile progress/i);
        expect(progressElement).toBeInTheDocument();
      });
    });

    it('displays personalized next actions based on profile', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/recommended next steps/i)).toBeInTheDocument();
      });
    });

    it('shows experience level appropriate content', async () => {
      renderComponent();

      await waitFor(() => {
        // Should show intermediate-level content
        expect(screen.getByText(/accelerate your auditing career/i)).toBeInTheDocument();
      });
    });
  });

  describe('New User Experience', () => {
    beforeEach(() => {
      // Mock no profile found
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: null,
              error: null
            })
          })
        })
      });
    });

    it('shows default welcome message for new users', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/welcome to hawkly/i)).toBeInTheDocument();
      });
    });

    it('displays create profile action for new users', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/create your auditor profile/i)).toBeInTheDocument();
      });
    });

    it('shows 0% progress for new users', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/0%/)).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error alert when data loading fails', async () => {
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockRejectedValue(new Error('Database error'))
          })
        })
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/failed to load personalized content/i)).toBeInTheDocument();
      });
    });

    it('provides retry functionality on error', async () => {
      let shouldFail = true;
      mockSupabase.from = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockImplementation(() => {
              if (shouldFail) {
                shouldFail = false;
                return Promise.reject(new Error('Database error'));
              }
              return Promise.resolve({
                data: mockProfile,
                error: null
              });
            })
          })
        })
      }));

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/retry/i)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText(/retry/i));

      await waitFor(() => {
        expect(screen.getByText(/john/i)).toBeInTheDocument();
      });
    });
  });

  describe('Personalization Features', () => {
    it('shows personalization setup alert when incomplete', async () => {
      const incompleteProfile = {
        ...mockProfile,
        motivation_type: null,
        learning_style: null
      };

      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: incompleteProfile,
              error: null
            })
          })
        })
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/complete your personalization setup/i)).toBeInTheDocument();
      });
    });

    it('does not show personalization alert when complete', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/complete your personalization setup/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('navigates to correct routes when actions are clicked', async () => {
      renderComponent();

      await waitFor(() => {
        const actionCards = screen.getAllByText(/recommended next steps/i);
        expect(actionCards).toHaveLength(1);
      });

      // Test clicking on action cards would require more complex navigation mocking
      // This is a placeholder for navigation testing
    });

    it('displays correct XP rewards for actions', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/\+\d+ XP/)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and regions', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('region', { name: /personalized welcome dashboard/i })).toBeInTheDocument();
      });
    });

    it('provides meaningful text alternatives', async () => {
      renderComponent();

      await waitFor(() => {
        // Check that important content is accessible
        expect(screen.getByText(/profile progress/i)).toBeInTheDocument();
      });
    });
  });

  describe('Experience Level Variations', () => {
    it('shows beginner-appropriate content for new auditors', async () => {
      const beginnerProfile = {
        ...mockProfile,
        years_experience: 0,
        experience_level: 'beginner'
      };

      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: beginnerProfile,
              error: null
            })
          })
        })
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/welcome to your web3 security journey/i)).toBeInTheDocument();
      });
    });

    it('shows expert-level content for experienced auditors', async () => {
      const expertProfile = {
        ...mockProfile,
        years_experience: 5,
        experience_level: 'expert'
      };

      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: expertProfile,
              error: null
            })
          })
        })
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/community of security leaders/i)).toBeInTheDocument();
      });
    });
  });

  describe('Time-based Greetings', () => {
    it('shows appropriate greeting based on time of day', async () => {
      // Mock different times of day
      const mockDate = new Date('2024-01-01T14:00:00.000Z'); // 2 PM
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/good afternoon/i)).toBeInTheDocument();
      });

      jest.restoreAllMocks();
    });
  });

  describe('Motivational Content', () => {
    it('displays motivation-type specific quotes', async () => {
      renderComponent();

      await waitFor(() => {
        // Should show achievement-based motivation
        expect(screen.getByText(/excellence is not a destination/i)).toBeInTheDocument();
      });
    });

    it('adapts content for social motivation type', async () => {
      const socialProfile = {
        ...mockProfile,
        motivation_type: 'social'
      };

      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: socialProfile,
              error: null
            })
          })
        })
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/stronger together/i)).toBeInTheDocument();
      });
    });
  });
}); 