
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  name: string;
  value: number;
  average?: number;
  target?: number;
}

interface AdminPerformanceChartProps {
  title: string;
  data: DataPoint[];
  description?: string;
  valueLabel?: string;
  averageLabel?: string;
  targetLabel?: string;
  showTarget?: boolean;
  showAverage?: boolean;
}

/**
 * A reusable chart component for visualizing admin performance metrics
 * Supports line graphs with optional target and average lines
 */
export function AdminPerformanceChart({
  title,
  data,
  description,
  valueLabel = "Value",
  averageLabel = "Average",
  targetLabel = "Target",
  showTarget = false,
  showAverage = false,
}: AdminPerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.95)", 
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }} 
              />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="value"
                name={valueLabel}
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              
              {showAverage && (
                <Line
                  type="monotone"
                  dataKey="average"
                  name={averageLabel}
                  stroke="#82ca9d"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
              )}
              
              {showTarget && (
                <Line
                  type="monotone"
                  dataKey="target"
                  name={targetLabel}
                  stroke="#ff7300"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
