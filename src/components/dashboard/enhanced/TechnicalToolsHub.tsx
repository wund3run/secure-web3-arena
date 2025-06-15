
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Terminal, Database, Zap } from 'lucide-react';

export function TechnicalToolsHub() {
  const tools = [
    {
      name: 'Static Analysis',
      description: 'Automated code scanning',
      status: 'active',
      icon: Shield,
      lastUsed: '2 hours ago'
    },
    {
      name: 'Fuzzing Engine',
      description: 'Dynamic testing tool',
      status: 'inactive',
      icon: Zap,
      lastUsed: '1 day ago'
    },
    {
      name: 'Blockchain Scanner',
      description: 'On-chain analysis',
      status: 'active',
      icon: Database,
      lastUsed: '30 minutes ago'
    },
    {
      name: 'Custom Scripts',
      description: 'Personal automation',
      status: 'inactive',
      icon: Terminal,
      lastUsed: '3 days ago'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Technical Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <tool.icon className="h-4 w-4" />
                  <span className="font-medium">{tool.name}</span>
                </div>
                <Badge variant={tool.status === 'active' ? 'default' : 'secondary'}>
                  {tool.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Last used: {tool.lastUsed}
                </span>
                <Button variant="outline" size="sm">
                  Launch
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Quick Actions</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              Run Full Scan
            </Button>
            <Button variant="outline" size="sm">
              Export Results
            </Button>
            <Button variant="outline" size="sm">
              Tool Settings
            </Button>
            <Button variant="outline" size="sm">
              Add Custom Tool
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
