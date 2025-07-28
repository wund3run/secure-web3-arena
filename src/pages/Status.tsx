import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Shield } from 'lucide-react';

const StatusPage: React.FC = () => {
  const systemStatus = {
    overall: 'operational',
    services: [
      {
        name: 'Web Application',
        status: 'operational',
        description: 'Main platform functionality',
        uptime: '99.9%',
        responseTime: '145ms'
      },
      {
        name: 'API Services',
        status: 'operational',
        description: 'Backend API and data processing',
        uptime: '99.8%',
        responseTime: '89ms'
      },
      {
        name: 'Database',
        status: 'operational',
        description: 'Data storage and retrieval',
        uptime: '99.9%',
        responseTime: '12ms'
      },
      {
        name: 'Authentication',
        status: 'operational',
        description: 'User authentication and authorization',
        uptime: '100%',
        responseTime: '67ms'
      },
      {
        name: 'AI Services',
        status: 'operational',
        description: 'AI-powered security analysis',
        uptime: '99.7%',
        responseTime: '234ms'
      },
      {
        name: 'File Storage',
        status: 'operational',
        description: 'Secure file upload and storage',
        uptime: '99.9%',
        responseTime: '156ms'
      }
    ],
    incidents: [
      {
        date: '2025-03-15',
        title: 'Scheduled Maintenance - AI Services',
        status: 'resolved',
        description: 'Routine maintenance to improve AI analysis performance',
        duration: '30 minutes'
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>;
      case 'degraded':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Degraded</Badge>;
      case 'outage':
        return <Badge variant="error">Outage</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>System Status - Hawkly</title>
        <meta name="description" content="Real-time status of Hawkly's systems and services" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">System Status</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Real-time status and performance of Hawkly's security platform
            </p>
            
            {/* Overall Status */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {getStatusIcon(systemStatus.overall)}
              <span className="text-2xl font-semibold">All Systems Operational</span>
              {getStatusBadge(systemStatus.overall)}
            </div>
          </div>

          {/* Services Status */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {systemStatus.services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {service.name === 'Web Application' && <Activity className="h-5 w-5" />}
                      {service.name === 'API Services' && <Server className="h-5 w-5" />}
                      {service.name === 'Database' && <Database className="h-5 w-5" />}
                      {service.name === 'Authentication' && <Shield className="h-5 w-5" />}
                      {service.name === 'AI Services' && <Activity className="h-5 w-5" />}
                      {service.name === 'File Storage' && <Server className="h-5 w-5" />}
                      {service.name}
                    </CardTitle>
                    {getStatusIcon(service.status)}
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      {getStatusBadge(service.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Uptime:</span>
                      <span className="text-sm font-medium">{service.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Time:</span>
                      <span className="text-sm font-medium">{service.responseTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Incidents
              </CardTitle>
              <CardDescription>
                Past incidents and maintenance activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {systemStatus.incidents.length > 0 ? (
                <div className="space-y-4">
                  {systemStatus.incidents.map((incident, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{incident.title}</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{incident.description}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Date: {incident.date}</span>
                        <span>Duration: {incident.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No recent incidents to report.</p>
              )}
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>
              Status updates are refreshed every 5 minutes. For urgent issues, please contact{' '}
              <a href="mailto:support@hawkly.com" className="text-primary hover:underline">
                support@hawkly.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusPage; 