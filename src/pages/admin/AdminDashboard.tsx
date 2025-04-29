
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Loader, 
  BarChart4, 
  Users, 
  Shield, 
  FileText,
  Search,
  Plus,
  RefreshCw
} from "lucide-react";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AuditManagement } from "@/components/admin/AuditManagement";
import { ReportManagement } from "@/components/admin/ReportManagement";

interface AdminDashboardProps {
  section?: "dashboard" | "services" | "users" | "audits" | "reports";
}

const AdminDashboard = ({ section = "dashboard" }: AdminDashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(section);
  const navigate = useNavigate();

  // Check if admin is authenticated
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Update active tab when section prop changes
    setActiveTab(section);

    return () => clearTimeout(timer);
  }, [section]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value as any);
    navigate(`/admin/${value}`);
  };

  return (
    <AdminLayout title="Admin Dashboard">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="dashboard" className="flex gap-2">
                  <BarChart4 className="h-4 w-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Services</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden md:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="audits" className="flex gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Audits</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:inline">Reports</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>
            </div>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard 
                  title="Total Users" 
                  value="2,543" 
                  description="+180 this month" 
                  icon={<Users className="h-4 w-4 text-muted-foreground" />} 
                />
                <DashboardCard 
                  title="Active Services" 
                  value="152" 
                  description="+12 this week" 
                  icon={<Shield className="h-4 w-4 text-muted-foreground" />} 
                />
                <DashboardCard 
                  title="Completed Audits" 
                  value="854" 
                  description="+43 this month" 
                  icon={<Shield className="h-4 w-4 text-muted-foreground" />} 
                />
                <DashboardCard 
                  title="Revenue" 
                  value="$94,250" 
                  description="+10.5% from last month" 
                  icon={<BarChart4 className="h-4 w-4 text-muted-foreground" />} 
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Activity</CardTitle>
                      <Select defaultValue="today">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CardDescription>Recent platform activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["New audit request submitted", "User verification completed", "Smart contract audit completed", "New security service listed", "Critical vulnerability reported"].map((activity, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{activity}</p>
                            <p className="text-xs text-muted-foreground">
                              {i === 0 ? "Just now" : i === 1 ? "2 hours ago" : `${i + 1} hours ago`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Top Services</CardTitle>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Refresh</span>
                      </Button>
                    </div>
                    <CardDescription>Most popular services by usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Smart Contract Audit", "Security Assessment", "Penetration Testing", "Code Review", "Bug Bounty Management"].map((service, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary`}>
                              {i + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{service}</p>
                              <p className="text-xs text-muted-foreground">
                                {100 - i * 12} active users
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {95 - i * 10}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services">
              <ServiceManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="audits">
              <AuditManagement />
            </TabsContent>

            <TabsContent value="reports">
              <ReportManagement />
            </TabsContent>
          </Tabs>
        </>
      )}
    </AdminLayout>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, description, icon }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
