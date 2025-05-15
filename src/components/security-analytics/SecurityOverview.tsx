
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SecurityScoreCard } from './dashboard-components/SecurityScoreCard';
import { RiskBreakdown } from './dashboard-components/RiskBreakdown';
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Layers, ShieldAlert, ShieldCheck, Zap } from "lucide-react";

export function SecurityOverview() {
  // Sample data - in a real app this would come from a backend API
  const projectData = {
    name: "DefiSwap Protocol",
    securityScore: 82,
    vulnerabilities: {
      critical: 0,
      high: 2,
      medium: 3,
      low: 5,
      info: 8
    },
    lastScan: "2025-05-12T15:30:00Z",
    assessmentAge: "3 days",
    riskAreas: [
      { name: "Access Control", score: 90, risk: "low" },
      { name: "Reentrancy", score: 75, risk: "medium" },
      { name: "Oracle Security", score: 80, risk: "low" },
      { name: "Flash Loan Attack", score: 70, risk: "medium" },
      { name: "Overflow/Underflow", score: 95, risk: "low" },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Security Score and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityScoreCard 
          score={projectData.securityScore} 
          projectName={projectData.name} 
          lastScan={projectData.lastScan}
        />
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Vulnerability Summary</CardTitle>
            <CardDescription>Identified issues by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                  <span>Critical</span>
                </div>
                <span className="font-semibold">{projectData.vulnerabilities.critical}</span>
              </div>
              <Progress value={projectData.vulnerabilities.critical > 0 ? 100 : 0} className="h-2 bg-muted" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span>High</span>
                </div>
                <span className="font-semibold">{projectData.vulnerabilities.high}</span>
              </div>
              <Progress value={projectData.vulnerabilities.high > 0 ? 70 : 0} className="h-2 bg-muted" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Medium</span>
                </div>
                <span className="font-semibold">{projectData.vulnerabilities.medium}</span>
              </div>
              <Progress value={projectData.vulnerabilities.medium > 0 ? 50 : 0} className="h-2 bg-muted" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Low</span>
                </div>
                <span className="font-semibold">{projectData.vulnerabilities.low}</span>
              </div>
              <Progress value={projectData.vulnerabilities.low > 0 ? 30 : 0} className="h-2 bg-muted" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Risk Breakdown */}
      <RiskBreakdown riskAreas={projectData.riskAreas} />
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Run Deep Scan
            </Button>
            <Button variant="outline" className="flex items-center">
              <Layers className="mr-2 h-4 w-4" />
              Compare with Past Scans
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 text-primary mr-2" />
            Security Recommendations
          </CardTitle>
          <CardDescription>Based on your project's security profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <div className="flex items-start">
                <ShieldAlert className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium text-yellow-800">Improve Reentrancy Protection</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Consider implementing the ReentrancyGuard pattern from OpenZeppelin in your contract functions that make external calls.
                  </p>
                  <Button variant="link" className="text-yellow-700 p-0 h-auto mt-1">
                    Learn More <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex items-start">
                <ShieldAlert className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium text-blue-800">Oracle Security Enhancement</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Your price oracle implementation could benefit from using a time-weighted average price (TWAP) to protect against flash loan attacks.
                  </p>
                  <Button variant="link" className="text-blue-700 p-0 h-auto mt-1">
                    Learn More <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
