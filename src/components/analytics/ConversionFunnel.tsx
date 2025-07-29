
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, CheckCircle } from 'lucide-react';

interface FunnelStep {
  id: string;
  name: string;
  description: string;
  users: number;
  conversionRate: number;
  dropoffRate: number;
  avgTimeToNext?: number;
}

export function ConversionFunnel() {
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Simulate funnel analytics data
    const generateFunnelData = (): FunnelStep[] => {
      const baseUsers = 1000;
      return [
        {
          id: 'landing',
          name: 'Landing Page Visit',
          description: 'Users who visited the platform',
          users: baseUsers,
          conversionRate: 100,
          dropoffRate: 0,
          avgTimeToNext: 45
        },
        {
          id: 'signup',
          name: 'Account Creation',
          description: 'Users who started registration',
          users: Math.floor(baseUsers * 0.35),
          conversionRate: 35,
          dropoffRate: 65,
          avgTimeToNext: 120
        },
        {
          id: 'profile',
          name: 'Profile Completion',
          description: 'Users who completed their profile',
          users: Math.floor(baseUsers * 0.28),
          conversionRate: 80,
          dropoffRate: 20,
          avgTimeToNext: 300
        },
        {
          id: 'first_action',
          name: 'First Action',
          description: 'Users who submitted audit request or applied as auditor',
          users: Math.floor(baseUsers * 0.22),
          conversionRate: 78.6,
          dropoffRate: 21.4,
          avgTimeToNext: 1800
        },
        {
          id: 'engagement',
          name: 'Active Engagement',
          description: 'Users who completed first transaction or audit',
          users: Math.floor(baseUsers * 0.15),
          conversionRate: 68.2,
          dropoffRate: 31.8
        }
      ];
    };

    setFunnelData(generateFunnelData());
  }, [timeRange]);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Conversion Funnel Analysis
            </CardTitle>
            <CardDescription>
              Track user journey progression and identify optimization opportunities
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelData.map((step, index) => (
          <div key={step.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-blue-100 text-blue-600' :
                  index === funnelData.length - 1 ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {index === 0 ? <Users className="h-4 w-4" /> :
                   index === funnelData.length - 1 ? <CheckCircle className="h-4 w-4" /> :
                   <Target className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="font-medium">{step.name}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{step.users.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {step.conversionRate.toFixed(1)}% conversion
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={step.conversionRate} className="h-2" />
              </div>
              <div className="flex gap-2">
                {step.dropoffRate > 0 && (
                  <Badge variant="outline" className="text-xs">
                    -{step.dropoffRate.toFixed(1)}% drop-off
                  </Badge>
                )}
                {step.avgTimeToNext && (
                  <Badge variant="secondary" className="text-xs">
                    Avg: {formatTime(step.avgTimeToNext)}
                  </Badge>
                )}
              </div>
            </div>
            
            {index < funnelData.length - 1 && (
              <div className="flex justify-center">
                <div className="w-px h-4 bg-border"></div>
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {funnelData[0]?.users.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-muted-foreground">Total Visitors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {((funnelData[funnelData.length - 1]?.users / funnelData[0]?.users) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Conversion</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {funnelData.reduce((acc, step) => acc + step.dropoffRate, 0).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Total Drop-off</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {funnelData[funnelData.length - 1]?.users.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
