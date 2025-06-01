
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { MainNavigation } from '@/components/layout/main-navigation';

describe('Navigation Component', () => {
  it('renders navigation links', () => {
    render(<MainNavigation />);
    
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Audits')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('displays Hawkly logo', () => {
    render(<MainNavigation />);
    
    expect(screen.getByText('Hawkly')).toBeInTheDocument();
  });
});
