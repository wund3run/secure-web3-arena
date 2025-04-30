
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, Cell, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryPerformanceProps {
  title?: string;
  description?: string;
  className?: string;
}

export function CategoryPerformanceWidget({ 
  title = "Service Categories", 
  description = "Track performance of security service types",
  className 
}: CategoryPerformanceProps) {
  // In a real app, these would come from an API
  const [categoryData, setCategoryData] = useState({
    topCategories: [
      { name: "Smart Contracts", value: 89, growth: 12.5, color: "#6366f1" },
      { name: "DApps", value: 76, growth: 8.2, color: "#8b5cf6" },
      { name: "Protocols", value: 72, growth: 15.3, color: "#ec4899" },
      { name: "NFTs", value: 65, growth: -4.2, color: "#f43f5e" },
      { name: "Bridges", value: 58, growth: 6.8, color: "#10b981" }
    ],
    trendingAuditTypes: [
      { name: "Gas Optimization", users: 2490, growth: 17.8 },
      { name: "Zero-Knowledge Proofs", users: 2180, growth: 24.5 },
      { name: "MEV Protection", users: 1850, growth: 12.3 },
      { name: "Formal Verification", users: 1650, growth: 9.7 },
      { name: "DAO Governance", users: 1420, growth: -2.1 }
    ]
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, we'd fetch fresh data from the API
      setCategoryData(prevData => {
        // Simulate some small changes to the data
        const randomChange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const updatedTopCategories = prevData.topCategories.map(item => ({
          ...item,
          value: Math.min(100, Math.max(0, item.value + randomChange(-2, 2))),
          growth: Math.max(-20, Math.min(30, item.growth + randomChange(-1, 1) / 2))
        }));
        
        const updatedTrendingAuditTypes = prevData.trendingAuditTypes.map(item => ({
          ...item,
          users: Math.max(0, item.users + randomChange(-50, 75)),
          growth: Math.max(-20, Math.min(30, item.growth + randomChange(-1, 1) / 2))
        }));
        
        return {
          topCategories: updatedTopCategories,
          trendingAuditTypes: updatedTrendingAuditTypes
        };
      });
    }, 7000); // Update every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Top Service Categories</h4>
            <ChartContainer 
              config={{
                categories: {
                  label: "Popularity Score",
                  color: "hsl(var(--primary))"
                }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={categoryData.topCategories}
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{data.name}</span>
                              <span className="font-semibold">{data.value} / 100</span>
                            </div>
                            <div className="flex items-center mt-1">
                              {data.growth >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1 text-rose-500" />
                              )}
                              <span className={`text-xs ${data.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {data.growth >= 0 ? '+' : ''}{data.growth}% growth
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {categoryData.topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Trending Audit Types */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Trending Audit Types</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.trendingAuditTypes.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat().format(item.users)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={item.growth >= 0 ? "success" : "destructive"} 
                        className="text-xs"
                      >
                        {item.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.growth)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="rounded-md bg-muted p-3 text-xs">
              <p className="font-medium mb-1">📈 Insights</p>
              <p className="text-muted-foreground">
                Zero-Knowledge Proof audits are trending this month with a 24.5% increase in demand. 
                Consider allocating more resources to this high-growth area.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
