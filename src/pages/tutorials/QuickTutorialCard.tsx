
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Shield, Target, Bot } from 'lucide-react';

interface QuickTutorialCardProps {
  tutorial: {
    title: string;
    duration: string;
    type: string;
    icon: string;
  };
}

const iconMap = {
  Code: Code,
  Shield: Shield,
  Target: Target,
  Bot: Bot
};

export const QuickTutorialCard: React.FC<QuickTutorialCardProps> = ({ tutorial }) => {
  const IconComponent = iconMap[tutorial.icon as keyof typeof iconMap] || Code;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <IconComponent className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base group-hover:text-primary transition-colors">
              {tutorial.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{tutorial.duration}</Badge>
              <Badge variant="secondary" className="text-xs">{tutorial.type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
