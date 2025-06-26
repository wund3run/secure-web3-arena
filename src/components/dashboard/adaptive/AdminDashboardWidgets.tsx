
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartCTA } from '@/components/ui/smart-cta';
import { 
  Users, 
  FileText, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardWidgetsProps {
  user: any;
  profile: any;
}

export function AdminDashboardWidgets({ user, profile }: AdminDashboardWidgetsProps) {
  const navigate = useNavigate();

  const stats = {
    totalUsers: 2543,
    activeAudits: 45,
    platformRevenue: 94250,
    disputesClosed: 12
  };

  return (
    <div className="space-y-6">
      {/* Admin CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SmartCTA
          context="urgent"
          message="3 disputes require attention"
          primary={{
            text: "Review Disputes",
            onClick: () => navigate('/admin/disputes'),
            icon: AlertTriangle
          }}
          badge="Urgent"
        />

        <SmartCTA
          context="info"
          message="Weekly platform report ready"
          primary={{
            text: "View Analytics",
            onClick: () => navigate('/admin/analytics'),
            icon: TrendingUp
          }}
        />
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.activeAudits}</p>
            <p className="text-sm text-muted-foreground">Active Audits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">${stats.platformRevenue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.disputesClosed}</p>
            <p className="text-sm text-muted-foreground">Disputes Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/admin/users')}
            className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Users className="h-5 w-5 mb-2" />
            <p className="font-medium">Manage Users</p>
            <p className="text-sm text-muted-foreground">User management and verification</p>
          </button>
          
          <button 
            onClick={() => navigate('/admin/audits')}
            className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <FileText className="h-5 w-5 mb-2" />
            <p className="font-medium">Audit Oversight</p>
            <p className="text-sm text-muted-foreground">Monitor audit quality and progress</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
