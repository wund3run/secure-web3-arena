
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency } from "@/components/admin/dashboard/utils/formatters";

export function EarningsWidget() {
  // Sample data for demonstration
  const earningsData = [
    { month: 'Jan', earnings: 5200 },
    { month: 'Feb', earnings: 4800 },
    { month: 'Mar', earnings: 6500 },
    { month: 'Apr', earnings: 5800 },
    { month: 'May', earnings: 7200 },
    { month: 'Jun', earnings: 8500 }
  ];

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Total Earnings (2023)</h4>
            <p className="text-2xl font-bold">{formatCurrency(38000)}</p>
          </div>
          <div className="text-right">
            <h4 className="text-sm font-medium text-muted-foreground">Last Month</h4>
            <p className="text-xl font-semibold text-green-500">+{formatCurrency(8500)}</p>
          </div>
        </div>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={earningsData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                formatter={(value: number) => [`${formatCurrency(value)}`, "Earnings"]}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
