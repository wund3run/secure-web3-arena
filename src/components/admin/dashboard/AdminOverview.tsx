
import React from 'react';
import { RoleManagement } from '../RoleManagement';
import { AdminServiceApproval } from '../AdminServiceApproval';
import { AdminActionLog } from '../AdminActionLog';
import { AdminDashboardWidgets } from './AdminDashboardWidgets';

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <AdminDashboardWidgets />
      <AdminServiceApproval />
      <RoleManagement />
      <AdminActionLog />
    </div>
  );
}
