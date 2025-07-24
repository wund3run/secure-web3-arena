import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MainNavigation } from '@/components/layout/navigation/MainNavigation';

describe('Navigation Integration', () => {
  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    // Check for main navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('handles mobile menu interactions', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Check if menu items are visible
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Dashboard')).toBeVisible();
    expect(screen.getByText('Security')).toBeVisible();

    // Close mobile menu
    fireEvent.click(menuButton);
    
    // Menu items should be hidden in mobile view
    expect(screen.getByText('Home')).not.toBeVisible();
  });

  it('handles dropdown menus', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    // Hover over dropdown trigger
    const securityDropdown = screen.getByText('Security');
    fireEvent.mouseEnter(securityDropdown);

    // Check if dropdown items are visible
    expect(screen.getByText('Audit Log')).toBeVisible();
    expect(screen.getByText('Settings')).toBeVisible();

    // Mouse leave should hide dropdown
    fireEvent.mouseLeave(securityDropdown);
    expect(screen.queryByText('Audit Log')).not.toBeVisible();
  });
}); 