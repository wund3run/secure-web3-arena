
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function ThreatGraphVisualization() {
  return (
    <div className="space-y-4">
      <Card className="border border-dashed border-muted">
        <CardContent className="flex items-center justify-center p-12 text-center">
          <div className="space-y-2">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-muted p-3">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <h3 className="font-medium">Threat Graph Visualization</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This feature displays a visual graph of potential attack vectors and their relationships. 
              A full security scan is required to generate this visualization.
            </p>
            <div className="pt-4">
              <Button>Run Full Security Scan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Common Attack Vectors</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                <div>
                  <span className="font-medium">Price Manipulation</span>
                  <p className="text-muted-foreground text-xs">
                    Attack vectors that target price oracle manipulation
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></div>
                <div>
                  <span className="font-medium">Front-Running</span>
                  <p className="text-muted-foreground text-xs">
                    Transaction ordering exploitation vectors
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></div>
                <div>
                  <span className="font-medium">Flash Loan Attacks</span>
                  <p className="text-muted-foreground text-xs">
                    Temporary high-capital manipulation patterns
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <div>
                  <span className="font-medium">Governance Attacks</span>
                  <p className="text-muted-foreground text-xs">
                    Protocol governance manipulation vectors
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Threat Intelligence</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Smart Contract Interactions</span>
                  <span className="text-green-600">Low Risk</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full w-[20%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">External Dependencies</span>
                  <span className="text-yellow-600">Medium Risk</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-yellow-500 h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Price Oracle Usage</span>
                  <span className="text-red-600">High Risk</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-red-500 h-2 rounded-full w-[80%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Access Controls</span>
                  <span className="text-green-600">Low Risk</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
