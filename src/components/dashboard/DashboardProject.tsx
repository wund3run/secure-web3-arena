
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Code, FileText, CheckCircle } from "lucide-react";

export function DashboardProject() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
        <p className="text-muted-foreground">Manage your Web3 project's security status</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
            <CardDescription>Your project's security overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Smart Contract Audit</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">In Progress</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Vulnerability Scan</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/project/security">View Security Status</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audit Reports</CardTitle>
            <CardDescription>Security findings and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Initial Security Review</span>
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>Contract Vulnerability Report</span>
                <Shield className="h-4 w-4 text-blue-500" />
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/project/reports">View All Reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contract Security</CardTitle>
            <CardDescription>Smart contract security status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Main Contract</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Secure</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Token Contract</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">Review Needed</span>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/project/contracts">View Contract Status</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Request New Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>Submit your project for comprehensive security review</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild>
                  <Link to="/request-audit">Request Audit</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/audit-guidelines">View Guidelines</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Security Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>Access self-service tools to improve your project's security</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild>
                  <Link to="/security-insights">Security Insights</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/tools/vulnerability-scanner">Vulnerability Scanner</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
