
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { ServiceCard } from '@/components/marketplace/card/ServiceCard';

const mockService = {
  id: 1,
  title: 'Smart Contract Audit',
  provider: 'Test Auditor',
  description: 'Comprehensive smart contract security audit',
  price: 1000,
  rating: 4.5,
  reviewCount: 10,
  deliveryTime: '3-5 days',
  category: 'smart-contract' as const,
  image: '/test-image.jpg',
  featured: false,
  tags: ['DeFi', 'Security'],
  expertise: ['Solidity', 'Security'],
  tools: ['Slither', 'MythX'],
};

describe('ServiceCard Component', () => {
  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('Smart Contract Audit')).toBeInTheDocument();
    expect(screen.getByText('Test Auditor')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('3-5 days')).toBeInTheDocument();
  });

  it('displays rating correctly', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
  });

  it('shows service tags', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('DeFi')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });
});
