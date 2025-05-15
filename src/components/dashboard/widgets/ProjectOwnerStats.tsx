
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function ProjectOwnerStats() {
  // Sample data for demonstration
  const projectData = [
    { month: 'Jan', audits: 1, vulnerabilities: 5 },
    { month: 'Feb', audits: 0, vulnerabilities: 3 },
    { month: 'Mar', audits: 1, vulnerabilities: 8 },
    { month: 'Apr', audits: 0, vulnerabilities: 2 },
    { month: 'May', audits: 2, vulnerabilities: 10 },
    { month: 'Jun', audits: 1, vulnerabilities: 4 }
  ];

  const securityScoreData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 80 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 88 }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Projects & Issues</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="audits" name="Audits Completed" fill="#3b82f6" />
                <Bar dataKey="vulnerabilities" name="Vulnerabilities" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Security Score Trend</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={securityScoreData}>
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  name="Security Score" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-2">
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium text-muted-foreground">Projects</h4>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium text-muted-foreground">Audits</h4>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium text-muted-foreground">Issues Fixed</h4>
              <p className="text-2xl font-bold">32</p>
            </div>
            <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium text-muted-foreground">Security Score</h4>
              <p className="text-2xl font-bold">88%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
