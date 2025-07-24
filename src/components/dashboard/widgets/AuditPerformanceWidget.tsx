import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function AuditPerformanceWidget() {
  // Sample data for demonstration
  const performanceData = [
    { name: 'Smart Contract', onTime: 8, delayed: 1 },
    { name: 'dApp', onTime: 6, delayed: 2 },
    { name: 'Protocol', onTime: 4, delayed: 0 },
    { name: 'DeFi', onTime: 7, delayed: 2 },
    { name: 'NFT', onTime: 5, delayed: 1 },
  ];

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" name="On Time" stackId="a" fill="#2de08e" />
              <Bar dataKey="delayed" name="Delayed" stackId="a" fill="#fc3574" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
