
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/marketplace-data";
import AuditRequestForm from '@/components/audit-request/AuditRequestForm';

export default function AuditRequestForService() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the service details
    setIsLoading(true);
    setTimeout(() => {
      const foundService = SERVICES.find(s => s.id === serviceId);
      if (foundService) {
        setService(foundService);
      }
      setIsLoading(false);
    }, 300);
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/marketplace")}>
            Return to Marketplace
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Request Service: {service.title} | Hawkly Security Services</title>
        <meta name="description" content={`Request ${service.title} security service`} />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost"
          className="mb-6 hover:bg-background"
          onClick={() => navigate(`/service/${serviceId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 
          Back to Service Details
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Request {service.title}</h1>
            <p className="text-muted-foreground">
              Fill out the form below to request this service from {service.provider.name}
            </p>
          </div>
          
          {/* Pre-filled form with service details */}
          <AuditRequestForm 
            prefilledData={{
              serviceType: service.category,
              serviceName: service.title,
              providerId: service.id,
              providerName: service.provider.name
            }}
            onSubmitSuccess={() => navigate("/application-submitted")} 
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
