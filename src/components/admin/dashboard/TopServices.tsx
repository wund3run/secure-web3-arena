
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function TopServices() {
  return (
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
  );
}
