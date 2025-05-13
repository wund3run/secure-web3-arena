
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TotalRevenueDisplay } from "./components/TotalRevenueDisplay";
import { RevenueTrendChart } from "./charts/RevenueTrendChart";
import { RevenueSources } from "./components/RevenueSources";

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
            <TotalRevenueDisplay 
              total={revenueData.total} 
              change={revenueData.change} 
              period={revenueData.period} 
            />
            
            <RevenueTrendChart trends={revenueData.trends} />
          </div>
          
          {/* Revenue Sources */}
          <RevenueSources sources={revenueData.sources} />
        </div>
      </CardContent>
    </Card>
  );
}
