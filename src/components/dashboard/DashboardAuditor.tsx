
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Shield } from "lucide-react";

export function DashboardAuditor() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Auditor Dashboard</h1>
        <p className="text-muted-foreground">Manage your security audits and client projects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Audits</CardTitle>
            <CardDescription>Ongoing security audits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>DeFi Protocol Review</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">In Progress</span>
              </div>
              <div className="flex justify-between items-center">
                <span>NFT Marketplace Audit</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Final Review</span>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/audits/active">View All Active Audits</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audit Requests</CardTitle>
            <CardDescription>New projects awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Bridge Security Review</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">New</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DAO Smart Contract</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">New</span>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/audits/requests">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completed Audits</CardTitle>
            <CardDescription>Past security reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Lending Protocol</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>Staking Contract</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/audits/completed">View History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>Access standardized audit report templates to maintain consistency</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button variant="outline" asChild>
                  <Link to="/templates">Browse Templates</Link>
                </Button>
                <Button>
                  <Link to="/reports/new">Create New Report</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>Access our suite of analysis tools for comprehensive security audits</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button variant="outline" asChild>
                  <Link to="/tools">Security Tools</Link>
                </Button>
                <Button>
                  <Link to="/tools/code-scanner">Launch Code Scanner</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
