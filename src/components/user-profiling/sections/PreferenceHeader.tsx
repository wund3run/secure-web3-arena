import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';

interface PreferenceHeaderProps {
  userSegment: string;
}

export function PreferenceHeader({ userSegment }: PreferenceHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-accent-primary" />
        <h2 className="text-xl font-bold tracking-tight uppercase text-accent-primary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", letterSpacing: '0.08em' }}>
          User Preferences
        </h2>
      </div>
      <Badge variant="secondary">{userSegment.replace('_', ' ')}</Badge>
    </div>
  );
}
