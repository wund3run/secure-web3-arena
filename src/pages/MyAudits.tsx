
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AuditsHeader } from '@/components/audits/audits-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Shield, Clock } from 'lucide-react';

export default function MyAudits() {
  return (
    <StandardLayout title="My Audits - Hawkly" description="View and manage your security audits">
      <AuditsHeader />
      
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                DeFi Protocol Audit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive security audit for a new DeFi lending protocol.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-500 font-medium">Completed</span>
                <Button variant="outline" size="sm">View Report</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                NFT Marketplace Audit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Security review of smart contracts for NFT trading platform.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-500 font-medium">In Progress</span>
                <Button variant="outline" size="sm">View Status</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Request New Audit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Start a new security audit for your blockchain project.
              </p>
              <Button asChild className="w-full">
                <Link to="/request-audit">Request Audit</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}
