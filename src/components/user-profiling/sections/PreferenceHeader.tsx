
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Star, TrendingUp } from 'lucide-react';

interface PreferenceHeaderProps {
  userSegment: string;
}

export function PreferenceHeader({ userSegment }: PreferenceHeaderProps) {
  const getSegmentBadge = () => {
    switch (userSegment) {
      case 'power_user':
        return <Badge variant="default" className="gap-1"><Star className="h-3 w-3" />Power User</Badge>;
      case 'champion':
        return <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />Champion</Badge>;
      case 'regular_user':
        return <Badge variant="outline" className="gap-1"><User className="h-3 w-3" />Regular User</Badge>;
      default:
        return <Badge variant="outline">New User</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Preferences
          </CardTitle>
          {getSegmentBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Customize your experience based on your usage patterns and preferences.
        </p>
      </CardContent>
    </Card>
  );
}
