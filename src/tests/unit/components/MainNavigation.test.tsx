import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MainNavigation } from '@/components/layout/navigation/MainNavigation';

describe('MainNavigation', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays logo', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('shows mobile menu button on small screens', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );
    
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toHaveClass('visible');
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).not.toHaveClass('visible');
  });
}); 