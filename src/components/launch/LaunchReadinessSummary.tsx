
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Clock, Rocket } from 'lucide-react';

interface ReadinessMetric {
  category: string;
  status: 'ready' | 'warning' | 'critical';
  progress: number;
  items: { name: string; completed: boolean }[];
}

export const LaunchReadinessSummary = () => {
  const metrics: ReadinessMetric[] = [
    {
      category: 'Technical',
      status: 'ready',
      progress: 100,
      items: [
        { name: 'Core Features', completed: true },
        { name: 'Performance Tests', completed: true },
        { name: 'Security Audit', completed: true },
        { name: 'Monitoring Setup', completed: true }
      ]
    },
    {
      category: 'Business',
      status: 'warning',
      progress: 75,
      items: [
        { name: 'Legal Compliance', completed: false },
        { name: 'Support Processes', completed: true },
        { name: 'Beta Feedback', completed: true },
        { name: 'Marketing Ready', completed: true }
      ]
    },
    {
      category: 'Operations',
      status: 'ready',
      progress: 100,
      items: [
        { name: 'Backup Systems', completed: true },
        { name: 'Disaster Recovery', completed: true },
        { name: 'Alerting Active', completed: true },
        { name: 'Team Training', completed: true }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-500">Ready</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Attention Needed</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical Issues</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const overallReadiness = Math.round(
    metrics.reduce((sum, metric) => sum + metric.progress, 0) / metrics.length
  );

  const isLaunchReady = metrics.every(metric => metric.status !== 'critical') && overallReadiness >= 90;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Launch Readiness Summary
          </span>
          <Badge className={`${isLaunchReady ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {overallReadiness}% Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{overallReadiness}%</span>
          </div>
          <Progress value={overallReadiness} className="h-2" />
        </div>

        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div key={metric.category} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  {metric.category}
                </h4>
                {getStatusBadge(metric.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-1" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
                {metric.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {item.completed ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-gray-400" />
                    )}
                    <span className={item.completed ? 'text-green-700' : 'text-gray-500'}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {isLaunchReady && (
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-800 font-medium">🎉 Ready for Launch!</p>
            <p className="text-green-600 text-sm">All systems are go for production deployment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
