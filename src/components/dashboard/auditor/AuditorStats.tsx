
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Clock, DollarSign, Users } from 'lucide-react';

interface StatsData {
  activeProjects: number;
  hoursThisWeek: number;
  pendingEarnings: string;
  activeClients: number;
}

interface AuditorStatsProps {
  stats: StatsData;
}

export function AuditorStats({ stats }: AuditorStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Active Projects</span>
          </div>
          <div className="text-2xl font-bold">{stats.activeProjects}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">Hours This Week</span>
          </div>
          <div className="text-2xl font-bold">{stats.hoursThisWeek}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Pending Earnings</span>
          </div>
          <div className="text-2xl font-bold">{stats.pendingEarnings}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Active Clients</span>
          </div>
          <div className="text-2xl font-bold">{stats.activeClients}</div>
        </CardContent>
      </Card>
    </div>
  );
}
