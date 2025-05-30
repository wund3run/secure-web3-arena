
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Award, Users, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";

interface TrustMetric {
  label: string;
  value: number;
  max: number;
  description: string;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

interface TrustIndicatorsProps {
  auditorId?: string;
  projectId?: string;
  type: 'auditor' | 'project';
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ 
  auditorId, 
  projectId, 
  type 
}) => {
  // Mock data - in real implementation, fetch based on auditorId/projectId
  const trustMetrics: TrustMetric[] = type === 'auditor' ? [
    {
      label: "Audit Success Rate",
      value: 96,
      max: 100,
      description: "Percentage of audits completed successfully",
      status: 'excellent'
    },
    {
      label: "Client Satisfaction",
      value: 4.8,
      max: 5,
      description: "Average rating from clients",
      status: 'excellent'
    },
    {
      label: "Response Time",
      value: 87,
      max: 100,
      description: "Speed of initial response to requests",
      status: 'good'
    },
    {
      label: "Vulnerability Detection",
      value: 92,
      max: 100,
      description: "Accuracy in finding security issues",
      status: 'excellent'
    }
  ] : [
    {
      label: "Project Legitimacy",
      value: 85,
      max: 100,
      description: "Verification of project authenticity",
      status: 'good'
    },
    {
      label: "Payment History",
      value: 100,
      max: 100,
      description: "Track record of paying auditors",
      status: 'excellent'
    },
    {
      label: "Communication",
      value: 78,
      max: 100,
      description: "Quality of project communication",
      status: 'good'
    },
    {
      label: "Code Quality",
      value: 82,
      max: 100,
      description: "Initial code quality assessment",
      status: 'good'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'average':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'average':
      case 'poor':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const overallTrustScore = Math.round(
    trustMetrics.reduce((acc, metric) => acc + (metric.value / metric.max), 0) / trustMetrics.length * 100
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Trust Indicators
        </CardTitle>
        <CardDescription>
          {type === 'auditor' 
            ? "Auditor reliability and performance metrics"
            : "Project legitimacy and reliability metrics"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Trust Score */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{overallTrustScore}%</div>
          <div className="text-sm text-muted-foreground">Overall Trust Score</div>
          <Progress 
            value={overallTrustScore} 
            className="h-2" 
          />
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{metric.label}</span>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(metric.status)} text-xs`}
                  >
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 capitalize">{metric.status}</span>
                  </Badge>
                </div>
                <div className="text-sm font-medium">
                  {metric.max === 5 
                    ? `${metric.value.toFixed(1)}/${metric.max}`
                    : `${metric.value}%`
                  }
                </div>
              </div>
              
              <Progress 
                value={metric.max === 5 ? (metric.value / metric.max) * 100 : metric.value} 
                className="h-2"
              />
              
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Verification Badges */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Verifications
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Identity Verified
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="h-3 w-3 mr-1" />
              Security Certified
            </Badge>
            {type === 'auditor' && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Users className="h-3 w-3 mr-1" />
                Expert Level
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustIndicators;
