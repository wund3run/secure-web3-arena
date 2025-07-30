import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { Trophy, Users, Star, TrendingUp } from 'lucide-react';

export function Achievements() {
  return (
    <EnhancedPageTemplate 
      title="Achievements" 
      description="Track your accomplishments and milestones"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Total Achievements"
          value="42"
          trend="+3"
          icon={Trophy}
          trendType="positive"
        />
        <LiveMetric
          title="Active Streaks"
          value="156"
          trend="+12"
          icon={Users}
          trendType="positive"
        />
        <LiveMetric
          title="Points Earned"
          value="1.2k"
          trend="+280"
          icon={Star}
          trendType="positive"
        />
        <LiveMetric
          title="Weekly Progress"
          value="78%"
          trend="+12%"
          icon={TrendingUp}
          trendType="positive"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Achievements</CardTitle>
            <Button variant="outline">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add achievements list here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
