
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Filter,
  Download,
  BarChart4,
  Search,
  RefreshCw
} from "lucide-react";

export function ReportManagement() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                View platform metrics and generate reports
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={timeframe}
                onValueChange={setTimeframe}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Metric Cards */}
              <MetricCard 
                title="Total Revenue" 
                value="$124,750" 
                change="+12.5%" 
                trend="up" 
              />
              <MetricCard 
                title="Active Audits" 
                value="28" 
                change="+4" 
                trend="up" 
              />
              <MetricCard 
                title="New Users" 
                value="164" 
                change="-3.2%" 
                trend="down" 
              />
              <MetricCard 
                title="Vulnerabilities Found" 
                value="384" 
                change="+15.8%" 
                trend="up" 
              />
              <MetricCard 
                title="Average Audit Time" 
                value="8.2 days" 
                change="-0.5 days" 
                trend="up" 
              />
              <MetricCard 
                title="User Satisfaction" 
                value="94%" 
                change="+2%" 
                trend="up" 
              />
            </div>
            
            <div className="mt-8">
              <div className="rounded-lg border p-6 text-center">
                <BarChart4 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Advanced Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  In-depth charts and metrics are available in the full analytics dashboard
                </p>
                <Button>
                  Open Analytics Dashboard
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="rounded-md border p-4">
              <div className="space-y-4">
                <ReportItem 
                  title="Monthly Security Summary" 
                  dateGenerated="2023-11-01"
                  description="Overview of security metrics for October 2023" 
                />
                <ReportItem 
                  title="Audit Performance Review" 
                  dateGenerated="2023-10-15"
                  description="Detailed analysis of audit processes and outcomes" 
                />
                <ReportItem 
                  title="Vulnerability Trends Q3 2023" 
                  dateGenerated="2023-10-05"
                  description="Analysis of common vulnerabilities and mitigation strategies" 
                />
                <ReportItem 
                  title="User Growth & Retention" 
                  dateGenerated="2023-09-28"
                  description="Platform user metrics and engagement statistics" 
                />
                <ReportItem 
                  title="Financial Performance" 
                  dateGenerated="2023-09-15"
                  description="Revenue breakdown and financial projections" 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <VulnerabilityCard 
                category="Reentrancy" 
                count={42} 
                change="+15%"
                severity="critical"
              />
              <VulnerabilityCard 
                category="Access Control" 
                count={38} 
                change="-5%"
                severity="high"
              />
              <VulnerabilityCard 
                category="Flash Loans" 
                count={31} 
                change="+22%"
                severity="critical"
              />
              <VulnerabilityCard 
                category="Oracle Manipulation" 
                count={27} 
                change="+8%"
                severity="high"
              />
              <VulnerabilityCard 
                category="Arithmetic Issues" 
                count={24} 
                change="-12%"
                severity="medium"
              />
              <VulnerabilityCard 
                category="Timestamp Dependence" 
                count={18} 
                change="-3%"
                severity="medium"
              />
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

const MetricCard = ({ title, value, change, trend }: MetricCardProps) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm font-medium text-muted-foreground mb-2">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-xs mt-1 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
        {change} {trend === "up" ? "↑" : "↓"}
      </div>
    </div>
  );
};

interface ReportItemProps {
  title: string;
  dateGenerated: string;
  description: string;
}

const ReportItem = ({ title, dateGenerated, description }: ReportItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="space-y-1">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {new Date(dateGenerated).toLocaleDateString()}
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-3 w-3 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

interface VulnerabilityCardProps {
  category: string;
  count: number;
  change: string;
  severity: "critical" | "high" | "medium" | "low";
}

const VulnerabilityCard = ({ category, count, change, severity }: VulnerabilityCardProps) => {
  const getColor = () => {
    switch (severity) {
      case "critical": return "border-red-500 bg-red-50";
      case "high": return "border-orange-500 bg-orange-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      case "low": return "border-green-500 bg-green-50";
      default: return "";
    }
  };
  
  const getTrendColor = () => {
    if (change.startsWith("+")) return "text-red-600"; // More vulnerabilities is bad
    return "text-green-600"; // Fewer vulnerabilities is good
  };

  return (
    <div className={`rounded-lg border-l-4 p-4 ${getColor()}`}>
      <div className="text-sm font-medium mb-2">{category}</div>
      <div className="text-2xl font-bold">{count}</div>
      <div className={`text-xs mt-1 ${getTrendColor()}`}>
        {change} {change.startsWith("+") ? "↑" : "↓"}
      </div>
    </div>
  );
};
