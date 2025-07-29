
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample performance data - in a real app, this would come from an API
const performanceData = [
  { day: "Mon", responseTime: 120, errorRate: 0.8, throughput: 85 },
  { day: "Tue", responseTime: 132, errorRate: 0.5, throughput: 89 },
  { day: "Wed", responseTime: 101, errorRate: 1.2, throughput: 91 },
  { day: "Thu", responseTime: 134, errorRate: 0.8, throughput: 86 },
  { day: "Fri", responseTime: 90, errorRate: 0.6, throughput: 95 },
  { day: "Sat", responseTime: 85, errorRate: 0.2, throughput: 88 },
  { day: "Sun", responseTime: 75, errorRate: 0.1, throughput: 80 },
];

interface AdminPerformanceChartProps {
  className?: string;
}

export function AdminPerformanceChart({ className }: AdminPerformanceChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          System Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorErrorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="responseTime"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorResponseTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
