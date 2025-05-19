
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RevenueInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Optimization Insights</CardTitle>
        <CardDescription>
          Key metrics and strategies to maximize platform revenue at launch
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="models">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Revenue Models</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="strategies">Growth Strategies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Transaction Fees</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>5-10% fee from project owners</li>
                  <li>12-20% fee from auditors</li>
                  <li>Escrow service fees (1-2%)</li>
                  <li>Dispute resolution fees</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Subscription Models</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Premium auditor profiles</li>
                  <li>Enhanced project visibility</li>
                  <li>Continuous security monitoring</li>
                  <li>Educational content access</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Premium Features</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>AI-assisted auditing tools</li>
                  <li>Priority audit matching</li>
                  <li>Featured marketplace listings</li>
                  <li>Advanced analytics & reports</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">User Acquisition Metrics</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Customer Acquisition Cost (CAC): Target <$200 per paying user</li>
                  <li>Conversion Rate: 3-5% for visitors to registered users</li>
                  <li>Auditor Approval Rate: 10-20% of applicants</li>
                  <li>Monthly Active Users (MAU): Growth target 15-20%</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">Revenue Metrics</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Average Revenue Per User (ARPU): $120-300 monthly</li>
                  <li>Gross Transaction Value (GTV): $100K-500K monthly</li>
                  <li>Customer Lifetime Value (LTV): $2,000-10,000</li>
                  <li>LTV:CAC Ratio: Target >3:1</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Early Adoption</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Launch incentives for first 100 auditors</li>
                  <li>Reduced fees for first 6 months</li>
                  <li>Free security consultations for projects</li>
                  <li>Referral bonuses for new users</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Scaling Phase</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Tiered pricing introduction</li>
                  <li>Enterprise client acquisition</li>
                  <li>Partnership with blockchain platforms</li>
                  <li>Educational content monetization</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Retention Focus</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Loyalty rewards program</li>
                  <li>Reduced fees based on volume</li>
                  <li>Community reputation building</li>
                  <li>Continuous feature enhancement</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>Estimated Annual Recurring Revenue (ARR): $1.2M-$5M in Year 1</span>
        <span>Target Break-even: 18-24 months</span>
      </CardFooter>
    </Card>
  );
}
