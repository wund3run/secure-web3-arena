
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, SendIcon } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SERVICES } from "@/data/marketplace-data";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactProvider() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Fetch the service details
    setIsLoading(true);
    setTimeout(() => {
      const foundService = SERVICES.find(s => s.id === serviceId);
      if (foundService) {
        setService(foundService);
        // Pre-fill the subject with service name
        setFormData(prev => ({
          ...prev,
          subject: `Inquiry about: ${foundService.title}`
        }));
      }
      setIsLoading(false);
    }, 300);
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      toast.success("Message sent successfully", {
        description: "The provider will get back to you shortly."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: formData.subject, // Keep the subject
        message: ''
      });
    }, 1500);
  };

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
        <title>Contact {service.provider.name} | Hawkly Security Services</title>
        <meta name="description" content={`Contact ${service.provider.name} about their security services`} />
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
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Contact Provider</h1>
            <p className="text-muted-foreground">
              Send a message to {service.provider.name} about their {service.title} service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder={`Hi ${service.provider.name},\n\nI'm interested in your ${service.title} service and would like to learn more...`}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>Sending<span className="loading-dots">...</span></>
                      ) : (
                        <>Send Message</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">About {service.provider.name}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Response Time</div>
                      <div>Usually within 24 hours</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground mb-1">Experience</div>
                      <div>{service.completedJobs}+ completed projects</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground mb-1">Service Rating</div>
                      <div>{service.rating.toFixed(1)}/5.0 (based on client reviews)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
