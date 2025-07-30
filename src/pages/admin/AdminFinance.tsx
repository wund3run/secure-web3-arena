import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { DollarSign, Wallet, CreditCard, TrendingUp } from 'lucide-react';

export default function AdminFinance() {
  return (
    <EnhancedPageTemplate 
      title="Financial Management" 
      description="Platform financial overview and management"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Total Revenue"
          value="$528.4k"
          trend="+18%"
          icon={DollarSign}
        />
        <LiveMetric
          title="Escrow Balance"
          value="$142.8k"
          trend="+24%"
          icon={Wallet}
        />
        <LiveMetric
          title="Processing"
          value="$32.5k"
          trend="+8%"
          icon={CreditCard}
        />
        <LiveMetric
          title="Growth Rate"
          value="+22%"
          trend="+5%"
          icon={TrendingUp}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline">Generate Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
