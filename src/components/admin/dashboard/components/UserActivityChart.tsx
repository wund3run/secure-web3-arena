
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserActivity {
  date: string;
  activeUsers: number;
  newUsers: number;
}

interface UserActivityChartProps {
  data?: UserActivity[];
  loading?: boolean;
  timeframe?: string;
  onTimeframeChange?: (timeframe: string) => void;
}

export function UserActivityChart({
  data = [],
  loading = false,
  timeframe = "week",
  onTimeframeChange = () => {}
}: UserActivityChartProps) {
  // Generate placeholder data if none provided or loading
  const placeholderData = React.useMemo(() => {
    if (data.length > 0 && !loading) return data;
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      
      return {
        date: date.toISOString().substring(0, 10),
        activeUsers: loading ? 0 : Math.floor(Math.random() * 100) + 50,
        newUsers: loading ? 0 : Math.floor(Math.random() * 30) + 5
      };
    });
  }, [data, loading]);
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Platform user activity over time</CardDescription>
        </div>
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 3 Months</SelectItem>
            <SelectItem value="year">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-muted animate-pulse rounded-md">
            <p className="text-muted-foreground">Loading activity data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={placeholderData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="activeUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="newUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip 
                formatter={(value) => [`${value}`, '']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                }}
              />
              <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#activeUsers)" />
              <Area type="monotone" dataKey="newUsers" name="New Users" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#newUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
