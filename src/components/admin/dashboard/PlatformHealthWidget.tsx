
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, ShieldAlert } from "lucide-react";

interface PlatformHealthProps {
  title?: string;
  description?: string;
  className?: string;
}

export function PlatformHealthWidget({ 
  title = "Platform Health", 
  description = "Monitor key platform metrics in real-time",
  className 
}: PlatformHealthProps) {
  // In a real app, this would come from an API
  const [healthData, setHealthData] = useState({
    transactions: {
      total: 1247,
      change: 12.8,
      period: "week",
      data: [
        { name: "Mon", value: 42 },
        { name: "Tue", value: 56 },
        { name: "Wed", value: 89 },
        { name: "Thu", value: 75 },
        { name: "Fri", value: 105 },
        { name: "Sat", value: 38 },
        { name: "Sun", value: 62 },
      ]
    },
    disputes: {
      total: 28,
      change: -4.5,
      period: "week",
      data: [
        { name: "Mon", value: 5 },
        { name: "Tue", value: 4 },
        { name: "Wed", value: 6 },
        { name: "Thu", value: 3 },
        { name: "Fri", value: 4 },
        { name: "Sat", value: 2 },
        { name: "Sun", value: 4 },
      ]
    },
    users: {
      total: 8453,
      change: 7.2,
      period: "week",
      newUsers: 325,
      data: [
        { name: "Mon", value: 45 },
        { name: "Tue", value: 38 },
        { name: "Wed", value: 52 },
        { name: "Thu", value: 41 },
        { name: "Fri", value: 67 },
        { name: "Sat", value: 43 },
        { name: "Sun", value: 39 },
      ]
    }
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, we'd fetch fresh data from the API
      setHealthData(prevData => {
        // Simulate some small changes to the data
        const randomChange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        return {
          ...prevData,
          transactions: {
            ...prevData.transactions,
            data: prevData.transactions.data.map(item => ({
              ...item,
              value: Math.max(0, item.value + randomChange(-5, 5))
            }))
          },
          disputes: {
            ...prevData.disputes,
            data: prevData.disputes.data.map(item => ({
              ...item,
              value: Math.max(0, item.value + randomChange(-1, 1))
            }))
          },
          users: {
            ...prevData.users,
            data: prevData.users.data.map(item => ({
              ...item,
              value: Math.max(0, item.value + randomChange(-3, 3))
            }))
          }
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Transactions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{healthData.transactions.total}</h4>
                  <Badge variant={healthData.transactions.change >= 0 ? "success" : "error"} className="text-xs">
                    {healthData.transactions.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(healthData.transactions.change)}%
                  </Badge>
                </div>
              </div>
            </div>
            <ChartContainer 
              config={{
                transactions: {
                  label: "Transactions",
                  color: "hsl(var(--primary))"
                }
              }}
              className="aspect-[4/3] h-36"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={healthData.transactions.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            label={payload[0].payload.name}
                          >
                            {`${payload[0].value} transactions`}
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="currentColor" 
                    radius={[4, 4, 0, 0]} 
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Active Disputes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Disputes</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{healthData.disputes.total}</h4>
                  <Badge variant={healthData.disputes.change >= 0 ? "default" : "success"} className="text-xs">
                    {healthData.disputes.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(healthData.disputes.change)}%
                  </Badge>
                </div>
              </div>
            </div>
            <ChartContainer 
              config={{
                disputes: {
                  label: "Disputes",
                  color: "hsl(var(--secondary))"
                }
              }}
              className="aspect-[4/3] h-36"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={healthData.disputes.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            label={payload[0].payload.name}
                          >
                            {`${payload[0].value} disputes`}
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="currentColor" 
                    radius={[4, 4, 0, 0]} 
                    className="fill-secondary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* User Growth */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User Growth</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{healthData.users.total}</h4>
                  <Badge variant={healthData.users.change >= 0 ? "success" : "error"} className="text-xs">
                    {healthData.users.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(healthData.users.change)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Users className="h-3 w-3 inline mr-1" />
                  {healthData.users.newUsers} new this {healthData.users.period}
                </p>
              </div>
            </div>
            <ChartContainer 
              config={{
                users: {
                  label: "New Users",
                  color: "hsl(var(--accent))"
                }
              }}
              className="aspect-[4/3] h-36"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={healthData.users.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            label={payload[0].payload.name}
                          >
                            {`${payload[0].value} new users`}
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="currentColor" 
                    radius={[4, 4, 0, 0]} 
                    className="fill-accent"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
