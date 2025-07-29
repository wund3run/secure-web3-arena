
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { TrendingUp } from 'lucide-react';

const CompetitiveAdvantages = () => {
  return (
    <PlaceholderPage
      title="Competitive Advantages"
      description="Discover what makes Hawkly the leading Web3 security platform and how we outperform traditional audit firms."
      icon={<TrendingUp className="h-6 w-6" />}
      features={[
        "AI-powered matching",
        "Faster delivery",
        "Lower costs",
        "Quality assurance"
      ]}
    />
  );
};

export default CompetitiveAdvantages;
