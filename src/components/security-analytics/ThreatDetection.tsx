
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThreatGraphVisualization } from './threat-components/ThreatGraphVisualization';
import { RealTimeMonitoring } from './threat-components/RealTimeMonitoring';
import { Shield, BarChart, Activity, RefreshCcw } from "lucide-react";

export function ThreatDetection() {
  const [activeTab, setActiveTab] = useState("real-time");
  const [isScanning, setIsScanning] = useState(false);
  
  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate a scan completion
    setTimeout(() => setIsScanning(false), 3000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Threat Detection
              </CardTitle>
              <CardDescription>
                Monitor and detect potential threats to your contracts
              </CardDescription>
            </div>
            <Button 
              onClick={handleStartScan} 
              disabled={isScanning}
              className="w-full sm:w-auto"
            >
              {isScanning ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Run Threat Scan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="real-time" className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Real-Time Monitoring
              </TabsTrigger>
              <TabsTrigger value="graph" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Threat Graph
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="real-time">
              <RealTimeMonitoring isScanning={isScanning} />
            </TabsContent>
            
            <TabsContent value="graph">
              <ThreatGraphVisualization />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Threat Intelligence Feed</CardTitle>
          <CardDescription>
            Recent threats detected in similar Web3 projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-orange-900">Flash Loan Attack Pattern Detected</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Multiple DeFi protocols have been targeted with flash loan exploits targeting price oracle manipulation.
                  </p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                  High Risk
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-orange-600">
                <span>Reported 2 hours ago</span>
                <Button variant="link" className="p-0 h-auto text-orange-600">
                  View Details
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Phishing Campaign Targeting NFT Projects</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    New phishing campaign detected targeting NFT marketplace users through fake airdrops.
                  </p>
                </div>
                <Badge variant="outline">
                  Medium Risk
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <span>Reported 1 day ago</span>
                <Button variant="link" className="p-0 h-auto">
                  View Details
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">DNS Hijacking Attempt</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Several Web3 projects reported DNS hijacking attempts to redirect users to malicious sites.
                  </p>
                </div>
                <Badge variant="outline">
                  Medium Risk
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <span>Reported 3 days ago</span>
                <Button variant="link" className="p-0 h-auto">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Create Badge component inline for simplicity
function Badge({ children, variant, className }: { 
  children: React.ReactNode; 
  variant?: string;
  className?: string;
}) {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses = variant === "outline" 
    ? "border bg-background" 
    : "bg-primary text-primary-foreground";
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className || ""}`}>
      {children}
    </span>
  );
}
