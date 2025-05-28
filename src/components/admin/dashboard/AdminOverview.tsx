
import React from 'react';
import { RoleManagement } from '../RoleManagement';
import { AdminDashboardWidgets } from './AdminDashboardWidgets';

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <AdminDashboardWidgets />
      <RoleManagement />
    </div>
  );
}
