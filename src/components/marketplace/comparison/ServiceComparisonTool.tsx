
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, Check, Clock, DollarSign } from 'lucide-react';
import { ServiceCardProps } from '@/types/marketplace-unified';

interface ServiceComparisonToolProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  onSelectService: (service: ServiceCardProps) => void;
}

export const ServiceComparisonTool: React.FC<ServiceComparisonToolProps> = ({
  services,
  onRemoveService,
  onClearAll,
  onSelectService
}) => {
  if (services.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">No services selected for comparison</p>
          <p>Select up to 3 services to compare their features, pricing, and reviews</p>
        </div>
      </Card>
    );
  }

  const comparisonRows = [
    {
      label: 'Service Provider',
      key: 'provider',
      render: (service: ServiceCardProps) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{service.provider.name}</div>
          {service.provider.isVerified && (
            <Badge variant="default" className="text-xs">Verified</Badge>
          )}
        </div>
      )
    },
    {
      label: 'Rating',
      key: 'rating',
      render: (service: ServiceCardProps) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{service.rating}</span>
          <span className="text-muted-foreground">({service.completedJobs} reviews)</span>
        </div>
      )
    },
    {
      label: 'Pricing',
      key: 'pricing',
      render: (service: ServiceCardProps) => (
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span className="font-medium">
            ${service.pricing.amount.toLocaleString()} {service.pricing.currency}
          </span>
        </div>
      )
    },
    {
      label: 'Response Time',
      key: 'responseTime',
      render: (service: ServiceCardProps) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{service.responseTime}</span>
        </div>
      )
    },
    {
      label: 'Security Score',
      key: 'securityScore',
      render: (service: ServiceCardProps) => (
        <div className="flex items-center gap-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${service.securityScore}%` }}
            />
          </div>
          <span className="text-sm font-medium">{service.securityScore}%</span>
        </div>
      )
    },
    {
      label: 'Specializations',
      key: 'tags',
      render: (service: ServiceCardProps) => (
        <div className="flex flex-wrap gap-1">
          {service.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {service.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{service.tags.length - 3} more
            </Badge>
          )}
        </div>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Service Comparison ({services.length}/3)</CardTitle>
          <Button variant="outline" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 w-32"></th>
                {services.map((service) => (
                  <th key={service.id} className="text-center p-2 min-w-64">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-left">{service.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveService(service.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        onClick={() => onSelectService(service)}
                        className="w-full"
                      >
                        Select Service
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.key} className="border-t">
                  <td className="p-4 font-medium text-muted-foreground">
                    {row.label}
                  </td>
                  {services.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      {row.render(service)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
