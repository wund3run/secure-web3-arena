
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

const Calendar = () => {
  return (
    <StandardLayout
      title="Calendar"
      description="Manage your audit schedules and deadlines"
      className="container py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Audit Calendar</h1>
        <div className="bg-card rounded-lg p-6 border">
          <p className="text-muted-foreground mb-4">
            Track your audit deadlines, milestones, and important dates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded border-l-4 border-l-orange-500">
                  <p className="font-medium">Smart Contract Audit - DeFi Protocol</p>
                  <p className="text-sm text-muted-foreground">Due: March 15, 2024</p>
                </div>
                <div className="p-3 bg-muted rounded border-l-4 border-l-red-500">
                  <p className="font-medium">Security Review - NFT Marketplace</p>
                  <p className="text-sm text-muted-foreground">Due: March 10, 2024</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Completions</h3>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded border-l-4 border-l-green-500">
                  <p className="font-medium">Protocol Audit - Yield Farm</p>
                  <p className="text-sm text-muted-foreground">Completed: March 1, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Calendar;
