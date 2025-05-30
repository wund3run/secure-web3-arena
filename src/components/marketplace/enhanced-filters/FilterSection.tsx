
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function FilterSection({ title, children, isCollapsed, onToggle }: FilterSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          onClick={onToggle}
          className="w-full justify-between p-0 h-auto font-semibold"
        >
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
