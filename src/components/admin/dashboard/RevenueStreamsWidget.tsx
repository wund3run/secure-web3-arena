
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import { Line, LineChart, PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RevenueStreamsProps {
  title?: string;
  description?: string;
  className?: string;
}

export function RevenueStreamsWidget({ 
  title = "Revenue Streams", 
  description = "Monitor revenue from various streams",
  className 
}: RevenueStreamsProps) {
  const [period, setPeriod] = useState("week");

  // In a real app, this would come from an API
  const [revenueData, setRevenueData] = useState({
    total: 94250,
    change: 8.3,
    period: "week",
    trends: [
      { name: "Mon", value: 12500 },
      { name: "Tue", value: 14200 },
      { name: "Wed", value: 16800 },
      { name: "Thu", value: 13900 },
      { name: "Fri", value: 17500 },
      { name: "Sat", value: 10200 },
      { name: "Sun", value: 9150 }
    ],
    sources: [
      { name: "Transaction Fees", value: 42500, color: "#8b5cf6" },
      { name: "Subscriptions", value: 31250, color: "#10b981" },
      { name: "Advertisements", value: 12750, color: "#f59e0b" },
      { name: "Premium Services", value: 7750, color: "#ef4444" }
    ]
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, we'd fetch fresh data from the API
      setRevenueData(prevData => {
        // Simulate some small changes to the data
        const randomChange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const updatedTrends = prevData.trends.map(item => ({
          ...item,
          value: Math.max(0, item.value + randomChange(-500, 500))
        }));
        
        const updatedSources = prevData.sources.map(item => ({
          ...item,
          value: Math.max(0, item.value + randomChange(-250, 250))
        }));
        
        const newTotal = updatedSources.reduce((sum, item) => sum + item.value, 0);
        
        return {
          ...prevData,
          total: newTotal,
          trends: updatedTrends,
          sources: updatedSources
        };
      });
    }, 8000); // Update less frequently for revenue data

    return () => clearInterval(interval);
  }, []);

  // Handle period change
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    // In a real app, we'd fetch data for the selected period
    // For now, we'll just simulate different data
    if (value === "month") {
      setRevenueData(prev => ({
        ...prev,
        period: "month",
        total: 375000,
        change: 12.5,
        trends: [
          { name: "Week 1", value: 87500 },
          { name: "Week 2", value: 92100 },
          { name: "Week 3", value: 96800 },
          { name: "Week 4", value: 98600 }
        ]
      }));
    } else if (value === "week") {
      setRevenueData(prev => ({
        ...prev,
        period: "week",
        total: 94250,
        change: 8.3,
        trends: [
          { name: "Mon", value: 12500 },
          { name: "Tue", value: 14200 },
          { name: "Wed", value: 16800 },
          { name: "Thu", value: 13900 },
          { name: "Fri", value: 17500 },
          { name: "Sat", value: 10200 },
          { name: "Sun", value: 9150 }
        ]
      }));
    } else if (value === "day") {
      setRevenueData(prev => ({
        ...prev,
        period: "day",
        total: 13500,
        change: 6.7,
        trends: [
          { name: "9AM", value: 1200 },
          { name: "11AM", value: 1750 },
          { name: "1PM", value: 2800 },
          { name: "3PM", value: 2300 },
          { name: "5PM", value: 2100 },
          { name: "7PM", value: 1850 },
          { name: "9PM", value: 1500 }
        ]
      }));
    }
  };
  
  // Format the total with currency symbol
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select 
          value={period} 
          onValueChange={handlePeriodChange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Total Revenue */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <div className="flex items-center gap-1">
                  <h3 className="text-3xl font-bold">{formatCurrency(revenueData.total)}</h3>
                  <Badge variant={revenueData.change >= 0 ? "success" : "destructive"} className="text-xs">
                    {revenueData.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(revenueData.change)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {period === "day" ? "Today" : period === "week" ? "This week" : "This month"}
                </p>
              </div>
            </div>
            
            <ChartContainer 
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--primary))"
                }
              }}
              className="h-48"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData.trends}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            value={formatCurrency(payload[0].value as number)}
                            label={payload[0].payload.name}
                          />
                        )
                      }
                      return null
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Revenue Sources */}
          <div>
            <h4 className="font-medium text-sm mb-4">Revenue by Source</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData.sources}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#fff"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fontWeight="bold"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {revenueData.sources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="space-y-4">
                  {revenueData.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                      <span className="text-sm">{formatCurrency(source.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
