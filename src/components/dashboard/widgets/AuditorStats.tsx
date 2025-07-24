import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function AuditorStats() {
  // Sample data for demonstration
  const performanceData = [
    { month: 'Jan', audits: 2, findings: 8 },
    { month: 'Feb', audits: 3, findings: 12 },
    { month: 'Mar', audits: 2, findings: 7 },
    { month: 'Apr', audits: 4, findings: 15 },
    { month: 'May', audits: 3, findings: 10 },
    { month: 'Jun', audits: 5, findings: 18 }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Audit Performance</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="audits" name="Audits Completed" fill="#a879ef" />
                <Bar dataKey="findings" name="Issues Found" fill="#32d9fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Average Resolution Time</h4>
              <span className="text-xl font-bold">3.5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Critical Issues Found</h4>
              <span className="text-xl font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Client Satisfaction</h4>
              <span className="text-xl font-bold">92%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Total Audits</h4>
              <span className="text-xl font-bold">19</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Pending Reviews</h4>
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Skill Rating</h4>
              <span className="text-xl font-bold">Expert</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
