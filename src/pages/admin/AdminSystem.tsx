
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { SystemHealthMonitor } from "@/components/admin/dashboard/components/SystemHealthMonitor";
import { PlatformStatusMonitor } from "@/components/admin/PlatformStatusMonitor";
import { IntegrationStatus } from "@/components/admin/IntegrationStatus";

const AdminSystem = () => {
  return (
    <AdminLayout title="System Health">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">System Health Monitor</h2>
          <p className="text-muted-foreground">Monitor system status and performance metrics</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SystemHealthMonitor />
          <PlatformStatusMonitor />
        </div>

        <IntegrationStatus />
      </div>
    </AdminLayout>
  );
};

export default AdminSystem;
