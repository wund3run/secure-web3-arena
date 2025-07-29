import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainNavigation } from '@/components/layout/navigation/MainNavigation';
import { navigationLinks } from '@/components/layout/navigation/navigation-links';
import { describe, it, expect } from 'vitest';

describe('Navigation Links', () => {
  it('renders all main navigation items', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    navigationLinks.forEach((link) => {
      expect(screen.getByText((content, element) => content.includes(link.title))).toBeInTheDocument();
    });
  });

  it('shows dropdown content when hovering over items with children', async () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const itemsWithChildren = navigationLinks.filter(link => link.children?.length);
    
    for (const item of itemsWithChildren) {
      const trigger = screen.getByText((content, element) => content.includes(item.title));
      fireEvent.mouseEnter(trigger);
      
      item.children?.forEach(child => {
        expect(screen.getByText((content, element) => content.includes(child.title))).toBeInTheDocument();
        if (child.description) {
          expect(screen.getByText((content, element) => content.includes(child.description!))).toBeInTheDocument();
        }
      });
    }
  });

  it('properly handles authentication requirements', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const authRequiredItems = navigationLinks.filter(link => link.requiresAuth);
    authRequiredItems.forEach(item => {
      const element = screen.getByText((content, element) => content.includes(item.title));
      expect(element.closest('a')).toHaveAttribute('data-auth-required', 'true');
    });
  });

  it('displays new item badges correctly', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const newItems = navigationLinks.flatMap(link => 
      [link, ...(link.children || [])].filter(item => item.isNew)
    );

    newItems.forEach(item => {
      const element = screen.getByText((content, element) => content.includes(item.title));
      expect(element.closest('div')).toContainElement(screen.getByText('New'));
    });
  });

  // New tests for responsiveness
  it('handles mobile menu interactions correctly', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();

    // Menu should be hidden initially
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-menu-open');

    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');

    // Close menu
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-menu-open');
  });

  it('maintains accessibility in mobile view', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // All items should be keyboard navigable
    const menuItems = screen.getAllByRole('menuitem');
    menuItems.forEach(item => {
      expect(item).toHaveAttribute('tabindex', '0');
    });

    // Focus should be trapped in menu when open
    const firstItem = menuItems[0];
    const lastItem = menuItems[menuItems.length - 1];

    firstItem.focus();
    fireEvent.keyDown(firstItem, { key: 'Tab', shiftKey: true });
    expect(lastItem).toHaveFocus();

    lastItem.focus();
    fireEvent.keyDown(lastItem, { key: 'Tab' });
    expect(firstItem).toHaveFocus();
  });
}); 