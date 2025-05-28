
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <PlaceholderPage
      title="User Dashboard"
      description="Your personalized dashboard is being built. This will include project overview, audit status, and account management."
      icon={<LayoutDashboard className="h-6 w-6" />}
    />
  );
};

export default Dashboard;
