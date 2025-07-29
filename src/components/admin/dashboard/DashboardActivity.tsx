
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DashboardActivity() {
  return (
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
  );
}
