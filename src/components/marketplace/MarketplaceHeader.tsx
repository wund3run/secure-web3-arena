
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Shield, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Link } from 'react-router-dom';

export function MarketplaceHeader() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '127', icon: Shield, color: 'text-blue-600' },
    { label: 'Verified Auditors', value: '89', icon: Users, color: 'text-green-600' },
    { label: 'Successful Matches', value: '256', icon: TrendingUp, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          Web3 Security Marketplace
        </Badge>
        <h1 className="text-4xl font-bold">Find Your Perfect Security Match</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with verified auditors or discover your next security project
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {user ? (
          <>
            <Link to="/submit-project">
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Submit Project
              </Button>
            </Link>
            <Link to="/auditor/signup">
              <Button variant="outline" size="lg">
                <Shield className="h-4 w-4 mr-2" />
                Become an Auditor
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/auth">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
