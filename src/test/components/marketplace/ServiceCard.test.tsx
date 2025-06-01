
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { ServiceCard } from '@/components/marketplace/card/ServiceCard';

const mockServiceProps = {
  id: "1",
  title: 'Smart Contract Audit',
  description: 'Comprehensive smart contract security audit',
  provider: {
    name: 'Test Auditor',
    reputation: 4.5,
    level: 'expert' as const,
    isVerified: true,
  },
  pricing: {
    amount: 1000,
    currency: 'USD',
  },
  rating: 4.5,
  completedJobs: 10,
  category: 'smart-contract',
  tags: ['DeFi', 'Security'],
  imageUrl: '/test-image.jpg',
  securityScore: 85,
  responseTime: '3-5 days',
};

describe('ServiceCard Component', () => {
  it('renders service information correctly', () => {
    render(<ServiceCard {...mockServiceProps} />);
    
    expect(screen.getByText('Smart Contract Audit')).toBeInTheDocument();
    expect(screen.getByText('Test Auditor')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('3-5 days')).toBeInTheDocument();
  });

  it('displays rating correctly', () => {
    render(<ServiceCard {...mockServiceProps} />);
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
  });

  it('shows service tags', () => {
    render(<ServiceCard {...mockServiceProps} />);
    
    expect(screen.getByText('DeFi')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });
});
