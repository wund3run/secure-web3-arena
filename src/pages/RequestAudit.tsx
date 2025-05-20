
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuth } from '@/contexts/auth';
import AuditRequestHeader from '@/components/audit-request/AuditRequestHeader';
import WizardRequestForm from '@/components/audit-request/WizardRequestForm';
import RequestSuccessMessage from '@/components/audit-request/RequestSuccessMessage';
import { ErrorBoundary } from "@/utils/error-handling";
import LoadingState from "@/components/ui/loading-state";

const RequestAudit = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we have pre-filled data from a specific service
  const prefilledData = location.state?.serviceInfo ? {
    serviceType: location.state.serviceInfo.category,
    serviceName: location.state.serviceInfo.title,
    providerId: location.state.serviceInfo.id,
    providerName: location.state.serviceInfo.provider
  } : undefined;

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <LoadingState message="Loading..." fullPage />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Request an Audit | Hawkly</title>
        <meta name="description" content="Request a comprehensive security audit for your Web3 project. Connect with top security experts." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-10">
        <ErrorBoundary>
          {formSubmitted ? (
            <RequestSuccessMessage />
          ) : (
            <div className="container px-4 sm:px-6 lg:px-8">
              <AuditRequestHeader />
              
              {/* Wizard Form */}
              <WizardRequestForm 
                onSubmitSuccess={() => setFormSubmitted(true)} 
                prefilledData={prefilledData}
              />
              
              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Questions? Contact our support team at <a href="mailto:join@hawkly.com" className="text-primary hover:underline">join@hawkly.com</a>
                </p>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default RequestAudit;
