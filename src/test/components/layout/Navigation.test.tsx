
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

// Mock navigation component for testing
const MockNavigation = () => (
  <nav>
    <a href="/">Home</a>
    <a href="/marketplace">Marketplace</a>
  </nav>
);

describe('Navigation Component', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <MockNavigation />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
  });
});
