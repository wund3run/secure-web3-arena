
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileCode, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function SmartContractAnalyzer() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Smart Contract Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Analysis Progress</span>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Progress value={75} className="h-2" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium text-red-700">3 Critical</p>
              <p className="text-sm text-red-600">Issues found</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-green-700">12 Passed</p>
              <p className="text-sm text-green-600">Security checks</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-700">2.5 Hours</p>
              <p className="text-sm text-blue-600">Analysis time</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Recent Findings</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Reentrancy vulnerability in withdraw()</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Critical</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Missing access control on mint function</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Medium</span>
            </div>
          </div>
        </div>

        <Button className="w-full">
          Generate Full Report
        </Button>
      </CardContent>
    </Card>
  );
}
