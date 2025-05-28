
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Bot, Zap, Link, Code, FileText } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    count: number;
    icon: string;
  };
}

const iconMap = {
  Shield: Shield,
  Bot: Bot,
  Zap: Zap,
  Link: Link,
  Code: Code,
  FileText: FileText
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Shield;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <IconComponent className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="group-hover:text-primary transition-colors">
              {category.name}
            </CardTitle>
            <CardDescription>{category.count} tutorials</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="sm" className="w-full">
          Explore Category <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};
