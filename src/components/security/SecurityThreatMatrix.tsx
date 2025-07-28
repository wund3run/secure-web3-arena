import React from 'react';
import { Badge } from '@/components/ui/badge';
import { HawklyCard } from '@/components/ui/hawkly-card';

interface ThreatItem {
  category: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  description: string;
}

const threatItems: ThreatItem[] = [
  {
    category: 'Smart Contract',
    level: 'high',
    description: 'Reentrancy vulnerabilities in DeFi protocols'
  },
  {
    category: 'Oracle',
    level: 'medium',
    description: 'Price manipulation through flash loans'
  },
  {
    category: 'Infrastructure',
    level: 'low',
    description: 'Node security and private key management'
  },
  {
    category: 'Frontend',
    level: 'medium',
    description: 'Supply chain attacks via npm packages'
  }
];

export const SecurityThreatMatrix: React.FC = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-900/20 text-red-500';
      case 'high': return 'bg-orange-900/20 text-orange-500';
      case 'medium': return 'bg-yellow-900/20 text-yellow-500';
      case 'low': return 'bg-green-900/20 text-green-500';
      default: return 'bg-blue-900/20 text-blue-500';
    }
  };

  return (
    <div className="space-y-2">
      {threatItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-2 border border-gray-800 rounded-md bg-gray-900/50">
          <div>
            <span className="text-sm font-medium">{item.category}</span>
            <p className="text-xs text-gray-400">{item.description}</p>
          </div>
          <Badge variant="outline" className={getLevelColor(item.level)}>
            {item.level}
          </Badge>
        </div>
      ))}
    </div>
  );
};
