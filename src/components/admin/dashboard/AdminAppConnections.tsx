
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ExternalLink, 
  Globe, 
  ShoppingCart, 
  Shield, 
  UserCheck, 
  FileText, 
  Users,
  Settings,
  Activity
} from "lucide-react";

interface AppConnection {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  status: 'active' | 'connected' | 'monitoring';
  actions?: { label: string; href: string }[];
}

export function AdminAppConnections() {
  const connections: AppConnection[] = [
    {
      title: "Main Application",
      description: "Monitor homepage, user activity, and general platform health",
      href: "/",
      icon: <Globe className="h-5 w-5" />,
      status: 'active',
      actions: [
        { label: "View Homepage", href: "/" },
        { label: "User Analytics", href: "/admin/dashboard?tab=users" }
      ]
    },
    {
      title: "Marketplace",
      description: "Manage services, providers, and marketplace activity",
      href: "/marketplace",
      icon: <ShoppingCart className="h-5 w-5" />,
      status: 'connected',
      actions: [
        { label: "Browse Services", href: "/marketplace" },
        { label: "Manage Services", href: "/admin/services" },
        { label: "Provider Applications", href: "/admin/providers" }
      ]
    },
    {
      title: "Audit System",
      description: "Track audit requests, manage auditors, and monitor security assessments",
      href: "/audits",
      icon: <Shield className="h-5 w-5" />,
      status: 'monitoring',
      actions: [
        { label: "View Audits", href: "/audits" },
        { label: "Audit Queue", href: "/admin/audits" },
        { label: "Security Reports", href: "/admin/reports" }
      ]
    },
    {
      title: "Request System",
      description: "Monitor audit requests and user submissions in real-time",
      href: "/request-audit",
      icon: <UserCheck className="h-5 w-5" />,
      status: 'active',
      actions: [
        { label: "Request Form", href: "/request-audit" },
        { label: "Pending Requests", href: "/admin/dashboard?tab=audits" },
        { label: "Request Analytics", href: "/admin/reports" }
      ]
    }
  ];

  const getStatusBadge = (status: AppConnection['status']) => {
    const config = {
      active: { variant: 'default' as const, color: 'text-green-700', label: 'Active' },
      connected: { variant: 'secondary' as const, color: 'text-blue-700', label: 'Connected' },
      monitoring: { variant: 'outline' as const, color: 'text-orange-700', label: 'Monitoring' }
    };
    
    const { variant, label } = config[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          App Feature Connections
        </CardTitle>
        <CardDescription>
          Direct access to all connected application features and their management interfaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {connections.map((connection) => (
            <div
              key={connection.href}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-md">
                    {connection.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{connection.title}</h3>
                    {getStatusBadge(connection.status)}
                  </div>
                </div>
                <Link to={connection.href} className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {connection.description}
              </p>
              
              {connection.actions && (
                <div className="flex flex-wrap gap-2">
                  {connection.actions.map((action) => (
                    <Button
                      key={action.href}
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-7 text-xs"
                    >
                      <Link to={action.href}>
                        {action.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Quick Admin Actions
          </h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/users">
                <Users className="h-3 w-3 mr-1" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/settings">
                <Settings className="h-3 w-3 mr-1" />
                Platform Settings
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/reports">
                <FileText className="h-3 w-3 mr-1" />
                Generate Reports
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
